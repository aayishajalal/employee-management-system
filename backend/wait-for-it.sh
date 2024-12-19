#!/bin/bash
# wait-for-it.sh

host=$1
port=$2
timeout=$3

nc -z "$host" "$port" && echo "Connection successful!" || exit 1
