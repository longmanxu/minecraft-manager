# minecraft-manager
Software to help me manage my Minecraft server.

The website is hosted at https://longmanxu.github.io/minecraft-manager/.

The website code is in the /docs folder. This is because GitHub pages uses the /docs to host stuff.

The Google Cloud Function hosting the API that starts and stops the server is in the /functions/mc-server-api folder. It's pretty dank.

The Cloud Function is hosted here: https://us-east4-minecraft-275800.cloudfunctions.net/mc-server-api

The bash scripts and the systemd service I used to start/stop the server on the Linux machine is in the /server folder.
