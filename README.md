# RLMG Kiosk App

This app contains utilities to sync data and assets from the remote CMS server, and to build and launch the RLMG Kiosk app.

## Install

```shell
git clone https://github.com/rollmug/rlmg-aam-2025.git
```
```shell
cd rlmg-aam-2025
``` 

## Initialize

**Important!** Update `.env` file and `./rlmg-aam-app/.env.local` with correct variables before proceeding.

Run `npm install` the first time. Then run:

```sh
cd rlmg-aam-app
npm install
cd ../
```

## Firewall

**Important!** When syncing data and assets from remote server, make sure the IP of your local machine is whitelisted in the remote server's firewall (otherwise, connecting to remote will timeout and fail).

## SSH Keys

Generate SSH keys on the local machine, and authorize them on remote server:

```shell
ssh-keygen -t rsa -b 4096 -C "my-name@my-email.com"
```

```shell
ssh-copy-id my-user@ACTUAL_REMOTE_IP_HERE
# test by doing:
ssh my-user@ACTUAL_REMOTE_IP_HERE
# then ctrl-d to exit
```

## Regular Usage:

Be sure you are in the root of the project directory (`./rlmg-aam-2025`)

Run `npm run sync` to update this local server with latest data and files. This could take a long time the first time you run it. Subsequent syncs will be much faster.

Run `npm start` to build and launch the kiosk app and related services.

Run `npm run stop` to stop all services.

## Troubleshooting

To force a clean slate, run `npm run stop` then `docker system prune -a` (then confirm). On next `npm start`, all images and containers will be rebuilt from scratch.
