#!/bin/bash

apt update && apt install curl unzip -y

curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.3.3

export DENO_INSTALL="/root/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

cd /usr/src/app
deno run --allow-net --allow-read --allow-write --allow-plugin --unstable server.ts
