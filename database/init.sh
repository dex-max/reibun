#!/bin/bash

psql -U $POSTGRES_USER -f /scripts/reibun-db.sql
psql -U $POSTGRES_USER -d reibun -f /scripts/textsearch_ja.sql
