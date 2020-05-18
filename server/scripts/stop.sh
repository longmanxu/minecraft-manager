#!/bin/bash
if [ "$(whoami)" != "minecraft" ]
then
	echo "$(date)    ERROR: must be run as user \"minecraft\""
elif ! screen -list | grep -q mc
then
	echo "$(date)    ERROR: Screen \"mc\" is not running"
else
	echo "$(date)    Stopping Minecraft server..."
	screen -p 0 -S mc -X eval 'stuff "stop"\\015'
	while screen -list | grep -q mc
	do
		sleep 1
	done
	echo "$(date)    Minecraft server is stopped."
fi
