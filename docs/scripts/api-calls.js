const token = "jHHlLcJP8cuFR6erZqiTnYabZFWPpL8FdgtMJxFEuO6RnYyXzOp2HiNo265F7AZt";

function showLoader() {
    document.getElementById("server-status").innerHTML = "";
    document.getElementById("server-status").classList.add('loader');
}

function setServerStatus(status) {
    document.getElementById("server-status").classList.remove('loader');
    document.getElementById("server-status").innerHTML = status;
}

async function updateServerStatus() {
    showLoader();
    setServerStatus(await retrieveServerStatus());
}

async function retrieveServerStatus() {
    console.log("Retriving server status...");
    try {
        let response = await fetch("https://us-east4-minecraft-275800.cloudfunctions.net/mc-server-api/server-status?token=" + token);
        if (response.status < 200 || response.status >= 300) {
            throw "Bad response status: " + response.status;
        }
        let serverStatus = await response.text();
        console.log("Server status: " + serverStatus);
        return serverStatus;
    }
    catch (err) {
        console.error(err);
    }
}

async function startServer() {
    console.log("Starting server...");
    showLoader();
    try {
        let response = await fetch("https://us-east4-minecraft-275800.cloudfunctions.net/mc-server-api/server-start?token=" + token, { method: 'PUT' });
        if (response.status < 200 || response.status >= 300) {
            throw "Bad response status: " + response.status;
        }

        function waitUntilServerStarted() {
            retrieveServerStatus().then((serverStatus) => {
                if (serverStatus === "RUNNING") {
                    setServerStatus(serverStatus);
                }
                else {
                    setTimeout(waitUntilServerStarted, 5000);
                }
            });
        }
        waitUntilServerStarted();
    }
    catch (err) {
        console.error(err);
    }
}

async function stopServer() {
    console.log("Stopping server...");
    showLoader();
    try {
        let response = await fetch("https://us-east4-minecraft-275800.cloudfunctions.net/mc-server-api/server-stop?token=" + token, { method: 'PUT' });
        if (response.status < 200 || response.status >= 300) {
            throw "Bad response status: " + response.status;
        }
        function waitUntilServerStopped() {
            retrieveServerStatus().then((serverStatus) => {
                if (serverStatus === "TERMINATED") {
                    setServerStatus(serverStatus);
                }
                else {
                    setTimeout(waitUntilServerStopped, 5000);
                }
            });
        }
        waitUntilServerStopped();
    }
    catch (err) {
        console.error(err);
    }
}
