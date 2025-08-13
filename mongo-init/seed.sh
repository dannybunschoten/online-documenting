#!/bin/bash

set -e

mongoimport --db online-documenting --collection data-models --file /docker-entrypoint-initdb.d/data-model.json --jsonArray
mongoimport --db online-documenting --collection data-snapshots --file /docker-entrypoint-initdb.d/data-snapshot.json --jsonArray
