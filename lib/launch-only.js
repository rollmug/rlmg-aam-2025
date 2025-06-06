import chalk from 'chalk';
import path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import ora from 'ora';
import waitOn from 'wait-on';
import { spawn } from 'node:child_process';
import logUpdate from 'log-update';

dotenv.config();

import checkRequirements from './check-requirements.js';

const rootPath = path.resolve();
const envPath = './.env';

function outputDone() {
    dotenv.config();
    if (process.env.DIRECTUS_DOMAIN === 'localhost') {
        var appURL = 'http://localhost';
    } else {
        var appURL = process.env.DIRECTUS_DOMAIN;
    }

    console.log(chalk.green("\nAll services should be ready. You can access them at the following URLs:\n"));
    console.log(`AAM Kiosk App: ${chalk.cyan(appURL + ":3000")}`);
    console.log(`Directus CMS: ${chalk.cyan(process.env.PUBLIC_URL)}`);
    console.log(`\n${chalk.green("When you're finished, you can stop all running containers with:")}\n`);
    console.log(`npm run stop\n`);
}

try {
    console.log(chalk.magentaBright("Launch RLMG AAM App"));
    console.log(chalk.dim("---------------------------------------------\n"));

    checkRequirements();

    if (fs.existsSync(envPath) && process.env.ADMIN_EMAIL !== null && process.env.ADMIN_PASSWORD !== null) {
        console.log(chalk.green("Looks like we're already configured, so let's get things up and running."));
        console.log("\n\nAutomatically running docker compose:\n");
        launchServices();
    } else {
        console.log(chalk.redBright("Configuration not set. Run npm start to configure."));
    }
} catch (err) {
    console.error(err);
}


function launchServices() {
    dotenv.config();
    const launch = spawn('docker', ['compose', 'up', '-d', 'mysql']);

    const opts = {
        resources: [
            'tcp:127.0.0.1:3306'
        ],
        delay: 1000,
        interval: 100,
        timeout: 30000,
        tcpTimeout: 30000
    }

    launch.stderr.on('data', (data) => {

        if (data.includes('Cannot connect to the Docker daemon')) {
            logUpdate(chalk.redBright(`${data}`));
            process.exit(1);
        } else {
            logUpdate(`${data}`);
        }
    });

    launch.on('close', code => {
        logUpdate.done();
        console.log(`Docker has launched MySQL service (status = ${code}).`);

        const loader = ora('Waiting for MySQL to be ready').start();

        waitOn(opts, (err) => {
            if (err) console.log(err);
            // once here, all resources are available
            loader.stop();
            console.log('MySQL ready.');

            logUpdate("Building and launching containers:\n");
            logUpdate.done();

            const launch2 = spawn('docker', ['compose', 'up', '-d', 'cache', 'directus']);

            launch2.stdout.on('data', (data) => {
                logUpdate(`${data}`);
            });

            launch2.stderr.on('data', (data) => {
                logUpdate(`${data}`);
            });

            launch2.on('close', code => {
                logUpdate('Done.');
                logUpdate.done();

                const publicURL = process.env.PUBLIC_URL;

                const pingOpts = {
                    resources: [
                        `${publicURL}`
                    ],
                    delay: 1000,
                    interval: 300,
                    timeout: 40000,
                    tcpTimeout: 40000
                }

                if (!publicURL) {
                    logUpdate(`${chalk.redBright("Error: PUBLIC_URL is not set in the .env file.")}`);
                    process.exit(1);
                }

                logUpdate(`Pinging directus at: ${publicURL}`);
                const loader2 = ora('Waiting for Directus to be ready').start();

                waitOn(pingOpts).then(() => {
                    loader2.stop();
                    logUpdate('Directus ready. Building AAM Kiosk...');
                    logUpdate.done();

                    const launch3 = spawn('docker', ['compose', 'up', '-d', 'rlmg-aam-app']);

                    launch3.stdout.on('data', (data) => {
                        logUpdate(`${data}`);
                    });
                    launch3.stderr.on('data', (data) => {
                        logUpdate(`${data}`);
                    });
                    launch3.on('close', code => {
                        logUpdate('Done.');
                        logUpdate.done();
                        logUpdate(`${chalk.greenBright("AAM Kiosk is ready.")}`);
                        outputDone();
                    });

                }).catch((err) => {
                    loader2.stop();
                    //if we're here, it's because directus is taking too long to respond. 
                    //It may be that it's running, so let's be sure.
                    logUpdate('Directus taking a long time to respond...');

                    executeCommand('docker', ['container', 'ps', '-q', '--filter', 'name=directus'])
                        .then((output) => {
                            //console.log('Command output:', output);
                            if (!output) {
                                //if we get here, directus is not running
                                var line1 = `${chalk.redBright("Directus taking too long to respond. You may need to manually start it.")}`;
                                var line2 = `Just run ${chalk.greenBright("npm run launch")} and you should be good to go.`;
                                var line3 = `You can also check if it is running with ${chalk.greenBright("docker compose ps")}`;
                                logUpdate(`${line1} \n${line2} \n${line3}`);
                            } else {
                                var line1 = `${chalk.yellowBright("Directus appears to be running, but took a while to respond.")}`;
                                var line2 = `Just run ${chalk.greenBright("npm run launch")} to verify, and you should be good to go.`;
                                var line3 = `You can also check if it is running with ${chalk.greenBright("docker compose ps")}`;
                                logUpdate(`${line1} \n${line2} \n${line3}`);
                            }
                        })
                        .catch((error) => {
                            console.error('Command execution error:', error);
                        });
                });
            });
        });
    });
}

function executeCommand(command, args = []) {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(command, args);
        let stdoutData = '';
        let stderrData = '';

        childProcess.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        childProcess.on('close', (code) => {
            if (code === 0) {
                resolve(stdoutData);
            } else {
                reject(new Error(`Command failed with code ${code}: ${stderrData || stdoutData}`));
            }
        });

        childProcess.on('error', (err) => {
            reject(err);
        });
    });
}