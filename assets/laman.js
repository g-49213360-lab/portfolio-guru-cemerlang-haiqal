/* Menu mudah alih + pemapar dokumen PDF (Google Drive) */
(function () {
  'use strict';

  // ---- Menu mudah alih ----
  var btn = document.querySelector('.butang-menu');
  var nav = document.getElementById('nav-utama');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var buka = nav.classList.toggle('buka');
      btn.setAttribute('aria-expanded', buka ? 'true' : 'false');
    });
  }

  // ---- Pemapar dokumen ----
  var modal = document.getElementById('pemapar');
  if (!modal) return;

  var tajukEl = modal.querySelector('[data-tajuk]');
  var subEl = modal.querySelector('[data-sub]');
  var rangka = modal.querySelector('iframe');
  var pautanDrive = modal.querySelector('[data-drive]');
  var pembukaTerakhir = null;

  function buka(id, tajuk, sub) {
    if (!id) return;
    tajukEl.textContent = tajuk || 'Dokumen';
    subEl.textContent = sub || '';
    rangka.src = 'https://drive.google.com/file/d/' + id + '/preview';
    pautanDrive.href = 'https://drive.google.com/file/d/' + id + '/view';
    modal.classList.add('buka');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-tutup').focus();
  }

  function tutup() {
    modal.classList.remove('buka');
    rangka.src = 'about:blank';
    document.body.style.overflow = '';
    if (pembukaTerakhir) { pembukaTerakhir.focus(); pembukaTerakhir = null; }
  }

  document.addEventListener('click', function (e) {
    var pemicu = e.target.closest('[data-dok]');
    if (pemicu) {
      e.preventDefault();
      pembukaTerakhir = pemicu;
      buka(pemicu.getAttribute('data-dok'), pemicu.getAttribute('data-dok-tajuk'), pemicu.getAttribute('data-dok-sub'));
      return;
    }
    if (e.target.closest('.modal-tutup') || e.target === modal) tutup();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('buka')) tutup();
  });
})();
