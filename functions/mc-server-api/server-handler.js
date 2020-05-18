'usestrict';

const Compute = require('@google-cloud/compute');
const compute = new Compute();

const vm = compute.zone('northamerica-northeast1-c').vm('mc-server');

async function getServerStatus() {
    const data = await vm.get();
    return data[1].status;
}

async function startServer() {
    await vm.start();
}

async function stopServer() {
    await vm.stop();
}

module.exports = {
    getServerStatus,
    startServer,
    stopServer
};