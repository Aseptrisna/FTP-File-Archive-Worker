const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { Worker } = require('worker_threads');

const folders = [
    {
        "mainFolder": "C:\\ASEP TRISNA SETIAWAN\\FILE\\DATA\\",
        "folder": "C:\\ASEP TRISNA SETIAWAN\\FILE\\DATA"
    },
    {
        "mainFolder": "C:\\ASEP TRISNA SETIAWAN\\FILE\\IMAGE\\",
        "folder": "C:\\ASEP TRISNA SETIAWAN\\FILE\\DATA\\IMAGE"
    }
];

// Fungsi untuk mendapatkan tanggal kemarin dalam format YYYY-MM-DD
function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = ('0' + (yesterday.getMonth() + 1)).slice(-2);
    const day = ('0' + yesterday.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

// Fungsi untuk memulai worker
function startWorker(data) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, './worker/index.js'), {
            workerData: data
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

// Fungsi untuk memindahkan file gambar
async function moveImages() {
    const yesterdayDate = getYesterdayDate();

    const promises = folders.map(folder => {
        const data = {
            sourceFolder: folder.folder,
            destinationFolder: path.join(folder.mainFolder, yesterdayDate)
        };
        console.log(`Semua file folde ${data.sourceFolder} telah berhasil dipindahkan ke ${data.destinationFolder}`);
        return startWorker(data);
    });

    try {
        await Promise.all(promises);
        console.log('Semua file telah berhasil dipindahkan.');
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}

const main = async () => {

    cron.schedule('0 0 * * *', () => {
        moveImages();
    });

    console.log('Script berjalan dan dijadwalkan untuk dijalankan setiap hari pada pukul 12 malam');

    // Jadwalkan script untuk dijalankan setiap 1 menit
    // cron.schedule('* * * * *', () => {
    //     moveImages();
    // });

    // console.log('Script berjalan dan dijadwalkan untuk dijalankan setiap menit');
}

module.exports = { main }
