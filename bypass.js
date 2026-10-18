#!/usr/bin/env node
'use strict';

const readline = require('node:readline');

function inspectUrl(input) {
  let parsed;

  try {
    parsed = new URL(input);
  } catch {
    throw new Error('URL tidak valid. Masukkan URL lengkap, misalnya https://example.com/');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Hanya URL http:// atau https:// yang didukung.');
  }

  const value = parsed.searchParams.get('o');

  console.log('\n=== Hasil pemeriksaan URL ===');
  console.log('Host       :', parsed.host);
  console.log('Protokol   :', parsed.protocol);
  console.log('Parameter o:', value === null ? 'Tidak ditemukan' : 'Ditemukan');
  
  if (value !== null) {
    console.log('Panjang o  :', value.length, 'karakter');

    // Show a Base64 preview only when the value looks like Base64.
    // This is diagnostic output, not decryption or a bypass.
    const candidate = value.replace(/-/g, '+').replace(/_/g, '/');
    const looksLikeBase64 =
      candidate.length > 0 &&
      /^[A-Za-z0-9+/]*={0,2}$/.test(candidate) &&
      candidate.length % 4 !== 1;

    if (looksLikeBase64) {
      try {
        const decoded = Buffer.from(candidate, 'base64').toString('utf8');
        if (decoded && /^[\x20-\x7E\r\n\t]+$/.test(decoded)) {
          console.log('Pratinjau :', decoded.slice(0, 200));
          if (decoded.length > 200) console.log('(pratinjau dipotong)');
        } else {
          console.log('Pratinjau : Nilai tidak tampak seperti teks Base64 biasa.');
        }
      } catch {
        console.log('Pratinjau : Tidak dapat dibaca sebagai teks Base64.');
      }
    } else {
      console.log('Pratinjau : Format bukan Base64 biasa.');
    }
  }

  console.log('\nCatatan: alat ini hanya memeriksa URL. Alat ini tidak mendekripsi format khusus,');
  console.log('tidak melewati login/pembayaran, dan tidak membuka URL tujuan secara otomatis.\n');
}

function main() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    try {
      inspectUrl(args.join(' '));
    } catch (error) {
      console.error('Error:', error.message);
      process.exitCode = 1;
    }
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Masukkan URL untuk diperiksa: ', (input) => {
    try {
      inspectUrl(input.trim());
    } catch (error) {
      console.error('Error:', error.message);
      process.exitCode = 1;
    } finally {
      rl.close();
    }
  });
}

main();
