#!/bin/bash
if [ "$(whoami)" != "minecraft" ]
then
	echo "$(date)    ERROR: must be run as user \"minecraft\""
elif screen -list | grep -q mc
then
	echo "$(date)    ERROR: Screen "mc" is already running"
elif ! cd '/home/minecraft/server'
then
	echo "$(date)    ERROR: Cannot open the server directory"
else
	echo "$(date)    Starting Minecraft server..."
	screen -DmS mc java \
			-Xms2g \
			-Xmx3g \
			-XX:+UseG1GC \
			-XX:MaxGCPauseMillis=50 \
			-XX:G1HeapRegionSize=32M \
			-jar /home/minecraft/server/server.jar nogui
fi
