#!/bin/bash

psql -U $POSTGRES_USER -f ./reibun-db.sql
psql -U $POSTGRES_USER -d reibun -f ./textsearch_ja.sql
