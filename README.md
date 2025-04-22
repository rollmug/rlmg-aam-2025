# RLMG Kiosk App

This app contains utilities to sync data and assets from the remote CMS server, and to build and launch the RLMG Kiosk app.

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

Generate SSH keys on the locakl machine, and authorize them on remote server:

```shell
ssh-keygen -t rsa -b 4096 -C "dave@rlmg.com"
```

```shell
ssh-keygen -t rsa -b 4096 -C "dave@rlmg.com"
ssh-copy-id davek@ACTUAL_REMOTE_IP_HERE
# test by doing:
ssh davek@ACTUAL_REMOTE_IP_HERE
# then ctrl-d to exit
```

## Regular Usage:

Be sure you are in the root of the project directory (`./rlmg-aam-2025`)

Run `npm run sync` to update this local server with latest data and files. This could take a long time the first time you run it. Subsequent syncs will be much faster.

Run `npm start` to build and launch the kiosk app and related services.

Run `npm run stop` to stop all services.

## SSH Keys

The sync functionality works best of SSH keys are used instead of password.

Windows: https://www.puttygen.com

`ssh-copy-id user@server`