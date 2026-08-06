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

  // ---- Penapis kemenjadian ----
  // Bar penapis mempunyai atribut `hidden` dalam HTML dan hanya didedahkan
  // di sini, jadi tanpa JavaScript kesemua kisah kekal terpapar.
  var barTapis = document.getElementById('tapis-kemenjadian');
  var senarai = document.getElementById('senarai-kemenjadian');

  if (barTapis && senarai) {
    var kad = Array.prototype.slice.call(senarai.querySelectorAll('[data-kategori]'));
    var kira = document.querySelector('.tapis-kira');
    barTapis.hidden = false;

    function tapis(pilihan) {
      var nampak = 0;
      kad.forEach(function (k) {
        var padan = pilihan === 'semua' || k.getAttribute('data-kategori').split(' ').indexOf(pilihan) > -1;
        k.hidden = !padan;
        if (padan) nampak++;
      });
      barTapis.querySelectorAll('.tapis-btn').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-tapis') === pilihan ? 'true' : 'false');
      });
      if (kira) {
        kira.textContent = pilihan === 'semua'
          ? 'Memaparkan kesemua ' + kad.length + ' kisah.'
          : 'Memaparkan ' + nampak + ' daripada ' + kad.length + ' kisah.';
      }
    }

    barTapis.addEventListener('click', function (e) {
      var b = e.target.closest('.tapis-btn');
      if (b) tapis(b.getAttribute('data-tapis'));
    });

    tapis('semua');
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
