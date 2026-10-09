// 1. Toast Notification Function
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// 2. DOM 1: Validasi Lacak Paket
const btnLacak = document.getElementById('btn-lacak');
const inputResi = document.getElementById('input-resi');

if (btnLacak && inputResi) {
  btnLacak.addEventListener('click', function () {
    const nomorResi = inputResi.value.trim();
    if (nomorResi === '') {
      showToast('Harap masukkan nomor resi terlebih dahulu!', 'error');
    } else {
      showToast(`Paket dengan nomor resi ${nomorResi} ditemukan!`, 'success');
      tambahRiwayat(nomorResi);
      inputResi.value = '';
    }
  });
}

// 3. DOM 2: Toggle Mode Terang/Gelap
const btnTheme = document.getElementById('btn-theme');
if (btnTheme) {
  btnTheme.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      btnTheme.innerHTML = '<i class="fa-solid fa-sun"></i> Terang';
      showToast('Berhasil mengubah ke Mode Terang', 'info');
    } else {
      btnTheme.innerHTML = '<i class="fa-solid fa-moon"></i> Mode';
      showToast('Berhasil mengubah ke Mode Gelap', 'info');
    }
  });
}

// 4. DOM 3: Tambah Tag Riwayat Resi Dinamis
const historyList = document.getElementById('history-list');
function tambahRiwayat(resi) {
  if (!historyList) return;
  const tagResi = document.createElement('span');
  tagResi.className = 'history-tag';
  tagResi.innerText = `#${resi}`;

  tagResi.addEventListener('click', function () {
    inputResi.value = resi;
    showToast(`Nomor resi #${resi} dimuat kembali.`, 'info');
  });

  historyList.appendChild(tagResi);
}