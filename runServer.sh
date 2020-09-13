#!/bin/bash

docker-compose restart
deno run --allow-net --allow-read --allow-write --allow-plugin --unstable server.ts &
