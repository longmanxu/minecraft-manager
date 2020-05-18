#!/bin/bash
if screen -list | grep -q mc
then
	NOW=$(TZ="America/Toronto" date +%s) 
	END=$(TZ="America/Toronto" date -d 'today 22:30:00' +%s)
	DIFF=$(($END-$NOW))
	screen -p 0 -S mc -X eval "stuff \"say Shutting down in $((DIFF / 60)) min...\"\\015"
fi
