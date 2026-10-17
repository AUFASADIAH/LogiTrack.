// =======================================================
// 1. PROMISE & ASYNCHRONOUS (SIMULASI DELAY LOADING)
// =======================================================

// Fungsi membuat Promise untuk memberikan jeda waktu (delay)
function simulasiDelayProcess(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// =======================================================
// 2. FETCH API & ASYNC/AWAIT (PENGAMBILAN DATA SERVER)
// =======================================================

// Fungsi Asynchronous untuk melakukan lacak resi
async function lacakResiSimulasi(resi) {
  const btnLacak = document.getElementById('btn-lacak');
  const inputResi = document.getElementById('input-resi');

  // Menampilkan status loading pada tombol
  showToast('Memeriksa data ke server...', 'info');
  btnLacak.innerText = 'Memproses...';
  btnLacak.disabled = true;

  try {
    // FETCH API: Mengambil data dummy dari server publik
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();

    // PROMISE: Menunggu proses delay selama 1.5 detik (1500 ms)
    await simulasiDelayProcess(1500);

    // Menampilkan pesan sukses
    showToast(`Paket dengan nomor resi ${resi} ditemukan! Status: Dalam Pengiriman`, 'success');
    
    // Simpan nomor resi ke Web Storage
    simpanKeStorage(resi);
    
    inputResi.value = ''; // Kosongkan input
  } catch (error) {
    showToast('Gagal terhubung ke server!', 'error');
  } finally {
    // Mengembalikan status tombol seperti semula
    btnLacak.innerText = 'Lacak Paket';
    btnLacak.disabled = false;
  }
}


// =======================================================
// 3. WEB STORAGE (localStorage)
// =======================================================

// Fungsi menyimpan resi ke localStorage
function simpanKeStorage(resi) {
  // Ambil data lama dari localStorage (jika ada), jika tidak buat array kosong
  let riwayat = JSON.parse(localStorage.getItem('riwayatResiLogiTrack')) || [];

  // Mencegah duplikasi nomor resi
  if (!riwayat.includes(resi)) {
    riwayat.push(resi);
    // Simpan kembali array ke localStorage dalam bentuk string JSON
    localStorage.setItem('riwayatResiLogiTrack', JSON.stringify(riwayat));
  }

  // Tampilkan riwayat terbaru ke halaman
  muatRiwayatDariStorage();
}

// Fungsi membaca data dari localStorage dan menampilkan ke HTML (DOM)
function muatRiwayatDariStorage() {
  const historyList = document.getElementById('history-list');
  if (!historyList) return;

  historyList.innerHTML = ''; // Bersihkan kontainer
  
  // Baca data dari localStorage
  let riwayat = JSON.parse(localStorage.getItem('riwayatResiLogiTrack')) || [];

  // Loop setiap resi dan buat elemen tag secara dinamis
  riwayat.forEach(resi => {
    const tagResi = document.createElement('span');
    tagResi.className = 'history-tag';
    tagResi.innerText = `#${resi}`;

    // Event click untuk memasukkan kembali resi ke kolom input
    tagResi.addEventListener('click', function () {
      document.getElementById('input-resi').value = resi;
      showToast(`Nomor resi #${resi} dimuat kembali.`, 'info');
    });

    historyList.appendChild(tagResi);
  });
}


// =======================================================
// 4. EVENT LISTENERS & INTEGRASI
// =======================================================

// Memuat riwayat dari localStorage saat pertama kali halaman selesai dimuat
document.addEventListener('DOMContentLoaded', muatRiwayatDariStorage);

// Event Click pada tombol Lacak Paket
const btnLacak = document.getElementById('btn-lacak');
const inputResi = document.getElementById('input-resi');

if (btnLacak && inputResi) {
  btnLacak.addEventListener('click', function () {
    const nomorResi = inputResi.value.trim();

    if (nomorResi === '') {
      alert('Peringatan: Nomor resi tidak boleh kosong!');
      showToast('Harap masukkan nomor resi terlebih dahulu!', 'error');
    } else {
      // Panggil fungsi Async Fetch API
      lacakResiSimulasi(nomorResi);
    }
  });
}