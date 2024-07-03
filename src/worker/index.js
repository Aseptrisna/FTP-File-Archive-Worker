const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const path = require('path');

const { sourceFolder, destinationFolder } = workerData;

if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
}

fs.readdir(sourceFolder, (err, files) => {
    if (err) {
        console.error(`Gagal membaca folder sumber: ${sourceFolder}`, err);
        parentPort.postMessage('failed');
        return;
    }

    files.forEach(file => {
        const sourcePath = path.join(sourceFolder, file);
        const destinationPath = path.join(destinationFolder, file);

        fs.rename(sourcePath, destinationPath, err => {
            if (err) {
                console.error(`Gagal memindahkan file ${file}`, err);
                parentPort.postMessage('failed');
            } else {
                console.log(`File ${file} telah dipindahkan ke ${destinationPath}`);
            }
        });
    });

    parentPort.postMessage('done');
});
