#!/bin/sh

CONTAINER_ID="$(docker container ls --quiet --filter "name=mysql")"
DATE="$(date '+%Y-%m-%d_%H-%M-%S')"
PWD="CRaHGbeJzccZ0l"
DB="directus"
FNAME="$(pwd)/backups/backup-$DATE.sql"
echo $CONTAINER_ID && echo $FNAME