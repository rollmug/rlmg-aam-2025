# RLMG Kiosk App

Update `.env` file and `./rlmg-aam-app/.env.local` with correct variables

Run `npm run sync` to update this local server with latest data and files.

Run `npm start` to build and launch the kiosk app and related services.

Run `npm run stop` to stop all services.

## SSH Keys

The sync functionality works best of SSH keys are used instead of password.

Windows: https://www.puttygen.com

`ssh-copy-id user@server`