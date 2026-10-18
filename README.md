# bypass

Pemeriksa URL sederhana berbasis Node.js yang bisa dijalankan di Termux. Saat ini alat ini memeriksa URL dan parameter query `o`, serta mencoba menampilkan pratinjau jika nilainya tampak seperti teks Base64 biasa.

> **Batasan:** ini bukan dekripsi Earnlink penuh dan tidak menjamin menemukan URL tujuan. Format enkripsi khusus membutuhkan spesifikasi algoritma dan format yang benar. Alat ini tidak membuka URL tujuan secara otomatis.

## Persyaratan

- Android dengan Termux
- Git
- Node.js 18 atau lebih baru

## Instalasi di Termux

```sh
pkg update
pkg install git nodejs
git clone https://github.com/baseliussiahaan-hue/bypass.git
cd bypass
npm start
```

## Cara penggunaan

Jalankan mode interaktif:

```sh
node bypass.js
```

Atau berikan URL langsung:

```sh
node bypass.js 'https://example.com/?o=SGVsbG8='
```

## Fitur

- Memvalidasi URL HTTP/HTTPS
- Menampilkan host dan protokol
- Memeriksa keberadaan parameter `o`
- Menampilkan pratinjau teks Base64 jika cocok

## Pemecahan masalah

Jika perintah `node` tidak ditemukan, jalankan:

```sh
pkg install nodejs
```

## Lisensi

MIT
