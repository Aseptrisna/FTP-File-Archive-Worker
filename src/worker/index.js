const { workerData, parentPort } = require('worker_threads');
const fs = require('fs');
const path = require('path');

const { sourceFolder, destinationFolder } = workerData;

// Membuat folder tujuan jika belum ada
if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder, { recursive: true });
}

// Membaca file di folder asal
fs.readdir(sourceFolder, (err, files) => {
  if (err) {
    parentPort.postMessage(`Error reading source folder: ${err.message}`);
    return;
  }

  files.forEach(file => {
    const sourcePath = path.join(sourceFolder, file);
    const destinationPath = path.join(destinationFolder, file);

    // Memindahkan file
    fs.rename(sourcePath, destinationPath, err => {
      if (err) {
        parentPort.postMessage(`Error moving file ${file}: ${err.message}`);
        return;
      }
    });
  });

  parentPort.postMessage(`Files moved to ${destinationFolder}`);
});
