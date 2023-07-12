const readline = require('readline-sync');
const fs = require('fs');

// Fungsi untuk menambahkan tugas
function tambahTugas() {
  const tugasBaru = readline.question('Masukkan tugas baru: ');
  fs.appendFileSync('to-do-list.txt', `${tugasBaru}\n`);
  console.log(`Tugas "${tugasBaru}" berhasil ditambahkan.`);
}

// Fungsi untuk menampilkan daftar tugas
function tampilkanTugas() {
  const data = fs.readFileSync('to-do-list.txt', 'utf8');
  if (data === '') {
    console.log('Daftar tugas kosong.');
  } else {
    console.log('===== Daftar Tugas =====');
    const tugasArray = data.split('\n');
    tugasArray.forEach((tugas, index) => {
      console.log(`${index + 1}. ${tugas}`);
    });
  }
}

// Fungsi untuk menghapus tugas
function hapusTugas() {
  tampilkanTugas();
  const nomorTugas = parseInt(readline.question('Masukkan nomor tugas yang ingin dihapus: '));
  const data = fs.readFileSync('to-do-list.txt', 'utf8');
  const tugasArray = data.split('\n');
  if (nomorTugas >= 1 && nomorTugas <= tugasArray.length) {
    const tugasTerhapus = tugasArray.splice(nomorTugas - 1, 1)[0];
    fs.writeFileSync('to-do-list.txt', tugasArray.join('\n'));
    console.log(`Tugas "${tugasTerhapus}" berhasil dihapus.`);
  } else {
    console.log('Nomor tugas tidak valid.');
  }
}

// Fungsi utama untuk menjalankan aplikasi To-Do List
function jalankanToDoList() {
  console.log('===== Aplikasi To-Do List =====');

  while (true) {
    console.log('\nMenu cuy:');
    console.log('1. Tambah Tugas');
    console.log('2. Tampilkan Tugas');
    console.log('3. Hapus Tugas');
    console.log('4. Keluar');
    console.log('');
    console.log('===============================');
    console.log('')
    const pilihan = parseInt(readline.question('Masukkan nomor menu: '));

    switch (pilihan) {
      case 1:
        tambahTugas();
        break;
      case 2:
        tampilkanTugas();
        break;
      case 3:
        hapusTugas();
        break;
      case 4:
        console.log('Terima kasih. Sampai jumpa!');
        return;
      default:
        console.log('Aksi tidak valid.');
    }
  }
}

// Jalankan aplikasi To-Do List
jalankanToDoList();