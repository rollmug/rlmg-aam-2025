# RLMG Kiosk App

This app contains utilities to sync data and assets from the remote CMS server, and to build and launch the RLMG Kiosk app.

## Initialize

Update `.env` file and `./rlmg-aam-app/.env.local` with correct variables

Run `npm install` the first time.
Then:
```sh
cd rlmg-aam-app
npm install
```

## Regular Usage:

Run `npm run sync` to update this local server with latest data and files.

Run `npm start` to build and launch the kiosk app and related services.

Run `npm run stop` to stop all services.

## SSH Keys

The sync functionality works best of SSH keys are used instead of password.

Windows: https://www.puttygen.com

`ssh-copy-id user@server`