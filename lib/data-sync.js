import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as dotenv from 'dotenv';
import { Client } from 'ssh2';
import checkRequirements from './check-requirements.js';
import { spawn } from 'node:child_process';
import logUpdate from 'log-update';
import Rsync from 'rsync';

dotenv.config();
const rootPath = path.resolve();
// const envPath = './.env';

function getDate() {
    let ts = Date.now();
    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();
    let hours = date_time.getHours();
    let minutes = date_time.getMinutes();
    let seconds = date_time.getSeconds();
    return `${year}-${month}-${date}_${hours}${minutes}${seconds}`;
}

export default async function syncDataAndAssets() {
    const initDir = path.join(rootPath, 'init');
    const mysqlDir = path.join(rootPath, 'mysql');
    const directusDir = path.join(rootPath, 'directus');

    console.log(chalk.magentaBright("Remote Data and Assets Sync"));
    console.log(chalk.dim("---------------------------------------------\n"));

    try {
        if (fs.existsSync(initDir)) {
            await fsPromises.rm(initDir, { recursive: true, force: true });
        }
        if (fs.existsSync(mysqlDir)) {
            await fsPromises.rm(mysqlDir, { recursive: true, force: true });
        }
        await fsPromises.mkdir(initDir);
        await fsPromises.mkdir(mysqlDir);
        if (fs.existsSync(directusDir) === false) {
            await fsPromises.mkdir(directusDir);
        }

        await dockerOperations();
        console.log(chalk.cyanBright("Syncing remote data and assets..."));
        console.log(chalk.dim("---------------------------------------------\n"));
        await syncRemoteAssets();
        syncDataFromRemote();
    } catch (err) {
        console.error(chalk.redBright(`Error: ${err}`));
    }
}

function dockerOperations() {
    return new Promise((resolve, reject) => {
        checkRequirements();

        const down = spawn('docker', ['compose', 'down']); // make sure we're not running
        logUpdate(chalk.cyanBright('Stopping Docker services...'));
        down.stderr.on('data', (data) => {
            if (data.includes('Cannot connect to the Docker daemon')) {
                logUpdate(chalk.redBright(`${data}`));
                reject(new Error('Docker daemon not running'));
                process.exit(1);
            } else {
                logUpdate(chalk.dim(`${data}`));
            }
        });

        down.on('close', (code) => {
            logUpdate.done();
            console.log(`Successfully stopped all docker services.\n`);
            resolve();
        });
    });
}

function syncRemoteAssets() {
    return new Promise((resolve, reject) => {
        dotenv.config();
        logUpdate(chalk.cyanBright('Syncing remote assets...'));
        const rsync = new Rsync()
            .shell('ssh')
            .flags('zhaveP')
            .source(`${process.env.REMOTE_USER}@${process.env.REMOTE_ADDR}:${process.env.REMOTE_DIR}/directus/uploads/`)
            .destination(path.join(rootPath, 'directus/uploads/'));

        rsync.set('delete'); // delete files not present in source
        rsync.set('ignore-existing'); // ignore files that already exist in destination

        rsync.execute((error, code, cmd) => {
            if (error) {
                logUpdate.done();
                console.error(chalk.redBright(`Error syncing remote assets: ${error}`));
                reject(error);
            } else {
                logUpdate.done();
                console.log(chalk.greenBright(`Successfully synced remote assets.`));
                resolve();
            }
        });
    });
}

export async function syncDataFromRemote() {
    dotenv.config();
    const date = getDate();
    const remoteBaseDir = process.env.REMOTE_DIR; // Base directory on the remote server
    const scriptPath = `${remoteBaseDir}/lib/remote.sh`; // Path to the script on the remote server
    const fileName = `backup-${date}.sql`;
    const backupFile = `${remoteBaseDir}/backups/${fileName}`;
    const server = `${process.env.REMOTE_USER}@${process.env.REMOTE_ADDR}`;

    // local dirs/files
    const localFile = path.join(rootPath, 'init', fileName);

    const conn = new Client();
    const connectionParams = {
        host: process.env.REMOTE_ADDR,
        username: process.env.REMOTE_USER,
        password: process.env.REMOTE_PASS,
        port: 22,
    };

    try {
        const spinner = ora('Connecting to remote server...').start();
        conn.connect(connectionParams);

        conn.on('ready', () => {
            spinner.stop();
            console.log(`${chalk.green(`Connected to remote server: ${server}`)}\n`);
            console.log(chalk.cyanBright(`Preparing database backup from remote:`) + '\n');
            console.log(chalk.dim(`Database backup file: ${backupFile}`));
            console.log(chalk.dim(`Remote base directory: ${remoteBaseDir}`) + '\n');

            conn.exec(`bash ${scriptPath} ${backupFile} ${fileName} ${process.env.MYSQL_DB} ${process.env.MYSQL_ROOT_PASS}`, (err, stream) => {
                if (err) {
                    console.error(chalk.redBright('Error executing command:'), err);
                    return;
                }

                stream.on('close', () => {
                    console.log(`${chalk.green("Remote database backup completed.")}`);
                    transferFile(conn, backupFile, localFile);
                    // conn.end();
                });

                stream.on('data', (data) => {
                    console.log(`${data}`);
                });

                stream.on('error', (data) => {
                    console.error(chalk.redBright(`STDERR: ${data}`));
                });
            });
        });
    } catch (err) {
        console.error(err);
    }
}

function transferFile(conn, backupFile, localFile) {
    console.log(chalk.cyanBright(`\nTransfer backup file to local server:\n`));
    const spinner = ora('Transferring backup file from remote...').start();

    conn.exec(`scp -f ${backupFile}`, (err, stream) => {
        if (err) {
            spinner.stop();
            console.error(chalk.redBright('Error executing command:'), err);
            return;
        }

        let fileStream;
        let fileSize = 0;
        let receivedBytes = 0;
        let expect = 'response'; // Current expected state  
        let buffer = Buffer.alloc(0);

        // Function to send acknowledgment  
        const sendByte = (byte) => {
            stream.write(Buffer.from([byte]));
        };

        // Send the initial acknowledgment byte  
        sendByte(0);

        stream.on('close', () => {
            spinner.stop();
            logUpdate(`${chalk.green("Backup file transfer completed.")}`);
            logUpdate.done();
            conn.end();
        });

        stream.on('data', (data) => {
            buffer = Buffer.concat([buffer, data]);
            while (true) {
                if (buffer.length < 1) break;
                if (expect === 'response') {
                    const response = buffer[0];
                    if (response === 0x43) {
                        expect = 'metadata';
                    } else if (response === 0x01 || response === 0x02) {
                        expect = 'error';
                        buffer = buffer.slice(1);
                    } else {
                        logUpdate.done();
                        spinner.stop();
                        console.error('Unknown server response:', response.toString(16));
                        conn.end();
                        return;
                    }
                } else if (expect === 'error') {
                    const nlIndex = buffer.indexOf(0x0A); // '\n'  
                    if (nlIndex === -1) break; // Waiting for more data  

                    const errorMsg = buffer.slice(0, nlIndex).toString();
                    logUpdate.done();
                    spinner.stop();
                    console.error(`SCP Error: ${errorMsg}`);
                    buffer = buffer.slice(nlIndex + 1);
                    conn.end();
                    return;
                } else if (expect === 'metadata') {
                    const nlIndex = buffer.indexOf(0x0A); // '\n'  
                    if (nlIndex === -1) break; // Waiting for more data  

                    const metadata = buffer.slice(0, nlIndex).toString();
                    buffer = buffer.slice(nlIndex + 1);

                    if (metadata.startsWith('C')) {
                        const parts = metadata.split(' ');
                        if (parts.length < 3) {
                            logUpdate.done();
                            spinner.stop();
                            console.error('Error: Invalid metadata:', metadata);
                            conn.end();
                            return;
                        }

                        fileSize = parseInt(parts[1], 10);
                        if (isNaN(fileSize)) {
                            logUpdate.done();
                            spinner.stop();
                            console.error('Error: Invalid file size in metadata:', metadata);
                            conn.end();
                            return;
                        }

                        // Create a write stream for the file  
                        fileStream = fs.createWriteStream(localFile);
                        fileStream.on('error', (fileErr) => {
                            logUpdate.done();
                            spinner.stop();
                            console.error('Error writing file:', fileErr);
                            conn.end();
                        });

                        // Send acknowledgment  
                        sendByte(0);

                        expect = 'data';
                        receivedBytes = 0;
                        logUpdate('Starting file transfer...');
                    } else {
                        logUpdate.done();
                        spinner.stop();
                        console.error('Error: Expected metadata line, received:', metadata);
                        conn.end();
                        return;
                    }
                } else if (expect === 'data') {
                    if (receivedBytes < fileSize) {
                        const remainingBytes = fileSize - receivedBytes;
                        const bytesToRead = Math.min(buffer.length, remainingBytes);
                        fileStream.write(buffer.slice(0, bytesToRead));
                        receivedBytes += bytesToRead;
                        buffer = buffer.slice(bytesToRead);
                        if (receivedBytes === fileSize) {
                            expect = 'data_response';
                        }
                    } else {
                        expect = 'data_response';
                    }
                } else if (expect === 'data_response') {
                    logUpdate('Bytes received:', receivedBytes);
                    if (buffer.length < 1) break; // Waiting for more data  

                    const response = buffer[0];
                    buffer = buffer.slice(1);

                    if (response === 0) {
                        fileStream.end(() => {
                            spinner.stop();
                            logUpdate(`File ${localFile} saved successfully.`);
                            logUpdate.done();
                        });
                        expect = 'end';
                        sendByte(0); // Send acknowledgment to finish  
                    } else if (response === 1 || response === 2) {
                        expect = 'error';
                    } else {
                        spinner.stop();
                        logUpdate.done();
                        console.error('Unknown server response after data transfer:', response);
                        conn.end();
                        return;
                    }
                } else if (expect === 'end') {
                    // Transfer completed  
                    spinner.stop();
                    logUpdate.done();
                    conn.end();
                    return;
                }
            }
        });

        stream.stderr.on('data', (data) => {
            console.error(`STDERR: ${data.toString()}`);
        });

        stream.on('error', (data) => {
            console.error(chalk.redBright(`STDERR: ${data}`));
        });
    });
}

syncDataAndAssets();