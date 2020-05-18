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
    try {
        let response = await fetch("https://us-east4-minecraft-275800.cloudfunctions.net/mc-server-api/server-status?token=" + token);
        if (response.status < 200 || response.status >= 300) {
            throw "Bad response status: " + response.status;
        }
        let serverStatus = await response.text();
        return serverStatus;
    }
    catch (err) {
        alert(err);
        console.error(err);
    }
}

async function startServer() {
    showLoader();
    try {
        let response = await fetch("https://us-east4-minecraft-275800.cloudfunctions.net/mc-server-api/server-start?token=" + token, { method: 'PUT' });
        if (response.status < 200 || response.status >= 300) {
            throw "Bad response status: " + response.status;
        }
        let serverStatus = await retrieveServerStatus();
        while (serverStatus !== "RUNNING") {
            serverStatus = await retrieveServerStatus();
        }
        setServerStatus(serverStatus);
    }
    catch (err) {
        alert(err);
        console.error(err);
    }
}

async function stopServer() {
    showLoader();
    try {
        let response = await fetch("https://us-east4-minecraft-275800.cloudfunctions.net/mc-server-api/server-stop?token=" + token, { method: 'PUT' });
        if (response.status < 200 || response.status >= 300) {
            throw "Bad response status: " + response.status;
        }
        let serverStatus = await retrieveServerStatus();
        while (serverStatus !== "TERMINATED") {
            serverStatus = await retrieveServerStatus();
        }
        setServerStatus(serverStatus);
    }
    catch (err) {
        alert(err);
        console.error(err);
    }
}
