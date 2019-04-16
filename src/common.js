function timeout(time) {
    return new Promise((resolve, reject) => {
        if(isNaN(time)) {
            reject(new Error('timeout requires a valid number'));
        }
        setTimeout(resolve, time);
    });
}

async function sleep(time) {
    return await timeout(time);
}

module.exports = { sleep };