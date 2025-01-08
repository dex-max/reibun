#!/bin/bash

psql -U postgres -f ./reibun-db.sql
psql -U postgres -d reibun -f ./textsearch_ja.sql
