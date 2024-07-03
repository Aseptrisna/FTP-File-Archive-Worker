# File Mover Script

Script ini bertujuan untuk memindahkan file gambar dari folder yang ditentukan ke folder dengan nama berdasarkan tanggal kemarin. Script ini menggunakan `worker_threads` untuk memproses beberapa folder secara paralel dan dijadwalkan untuk berjalan setiap jam 12 malam menggunakan modul `node-cron`.

## Prasyarat

Pastikan Anda memiliki Node.js dan npm terinstal di sistem Anda. Anda juga perlu menginstal `pm2` untuk menjaga agar proses tetap berjalan.

## Instalasi dan Setup

1. Clone repositori ini atau salin file ke dalam direktori pilihan Anda.
2. Buka terminal atau command prompt dan navigasikan ke direktori tempat file berada.
3. Instal dependensi yang diperlukan:

   ```bash
   npm install
`# #`

## Setup Folder

1. Edit bagian folders dalam file src/index.js untuk menyesuaikan dengan jalur folder yang ingin Anda pindahkan:

 ```javascript
const folders = [
  {
    "mainFolder": "C:\\ASEP TRISNA SETIAWAN\\FILE\\DATA",
    "folder": "C:\\ASEP TRISNA SETIAWAN\\FILE\\DATA"
  },
  {
    "mainFolder": "C:\\ASEP TRISNA SETIAWAN\\FILE\\IMAGE",
    "folder": "C:\\ASEP TRISNA SETIAWAN\\FILE\\IMAGE"
  }
];

 `# #`

## Menjalakankan Worker
 ```bash
npm start