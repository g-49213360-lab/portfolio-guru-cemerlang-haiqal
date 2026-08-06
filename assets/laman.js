/* Menu mudah alih · penapis (tersambung URL) · carian arkib · pemapar PDF */
(function () {
  'use strict';

  /* ---------------------------------------------------------- Menu mudah alih */

  var btnMenu = document.querySelector('.butang-menu');
  var nav = document.getElementById('nav-utama');
  if (btnMenu && nav) {
    btnMenu.addEventListener('click', function () {
      var buka = nav.classList.toggle('buka');
      btnMenu.setAttribute('aria-expanded', buka ? 'true' : 'false');
    });
  }

  /* ------------------------------------------------------------------ Penapis */
  /**
   * Penapis boleh guna semula. Keadaannya disimpan dalam URL supaya pautan
   * boleh dikongsi, butang kembali berfungsi, dan kategori terbuka semula
   * selepas halaman disegarkan.
   *
   * Bar penapis mempunyai atribut `hidden` dalam HTML dan hanya didedahkan
   * di sini — tanpa JavaScript, kesemua item kekal terpapar.
   */
  function pasangPenapis(idBar, idSenarai, param, kataSemua, kataSatu) {
    var bar = document.getElementById(idBar);
    var senarai = document.getElementById(idSenarai);
    if (!bar || !senarai) return null;

    var item = Array.prototype.slice.call(senarai.querySelectorAll('[data-kategori], [data-jenis]'));
    var kira = senarai.parentNode.querySelector('.tapis-kira');
    var input = document.getElementById('cari-dok');
    var pilihan = 'semua';
    var carian = '';
    bar.hidden = false;

    function padan(el) {
      var kat = el.getAttribute('data-kategori') || el.getAttribute('data-jenis') || '';
      var okKategori = pilihan === 'semua' || kat.split(' ').indexOf(pilihan) > -1;
      var okCarian = !carian || (el.getAttribute('data-cari') || '').indexOf(carian) > -1;
      return okKategori && okCarian;
    }

    function lukis() {
      var nampak = 0;
      item.forEach(function (el) {
        var ok = padan(el);
        el.hidden = !ok;
        if (ok) nampak++;
      });
      bar.querySelectorAll('.tapis-btn').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-tapis') === pilihan ? 'true' : 'false');
      });
      if (kira) {
        kira.textContent = nampak === item.length
          ? 'Memaparkan kesemua ' + item.length + ' ' + kataSemua + '.'
          : nampak === 0
            ? 'Tiada ' + kataSatu + ' sepadan. Cuba kata kunci lain atau pilih Semua.'
            : 'Memaparkan ' + nampak + ' daripada ' + item.length + ' ' + kataSemua + '.';
      }
    }

    function simpanUrl(tolak) {
      var u = new URL(window.location.href);
      if (pilihan === 'semua') u.searchParams.delete(param);
      else u.searchParams.set(param, pilihan);
      var kaedah = tolak ? 'pushState' : 'replaceState';
      history[kaedah]({ tapis: pilihan }, '', u.pathname + u.search + u.hash);
    }

    function bacaUrl() {
      var nilai = new URL(window.location.href).searchParams.get(param) || 'semua';
      var sah = bar.querySelector('[data-tapis="' + nilai.replace(/"/g, '') + '"]');
      pilihan = sah ? nilai : 'semua';
      lukis();
    }

    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.tapis-btn');
      if (!b) return;
      pilihan = b.getAttribute('data-tapis');
      lukis();
      simpanUrl(true);
    });

    if (input) {
      input.addEventListener('input', function () {
        carian = input.value.trim().toLowerCase();
        lukis();
      });
    }

    window.addEventListener('popstate', bacaUrl);
    bacaUrl();
    return lukis;
  }

  pasangPenapis('tapis-kemenjadian', 'senarai-kemenjadian', 'kategori', 'kisah', 'kisah');
  pasangPenapis('tapis-dok', 'senarai-dok', 'jenis', 'dokumen', 'dokumen');

  /* ------------------------------------------------------- Tukar paparan arkib */

  var tukar = document.querySelector('.tukar-papar');
  var gridDok = document.getElementById('senarai-dok');
  if (tukar && gridDok) {
    tukar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-papar]');
      if (!b) return;
      var senarai = b.getAttribute('data-papar') === 'senarai';
      gridDok.classList.toggle('mod-senarai', senarai);
      tukar.querySelectorAll('button').forEach(function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });
    });
  }

  /* --------------------------------------------------------------- Video facade */
  /**
   * Iframe YouTube tidak dimuatkan sehingga penonton menekan main. Ini
   * menghapuskan permintaan pihak ketiga dan kotak hitam pada muat awal.
   */
  document.querySelectorAll('.video-facade').forEach(function (kotak) {
    kotak.addEventListener('click', function () {
      if (kotak.dataset.dimuat) return;
      kotak.dataset.dimuat = '1';
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + kotak.dataset.video + '?rel=0&autoplay=1';
      f.title = kotak.dataset.tajuk || 'Video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      kotak.innerHTML = '';
      kotak.appendChild(f);
    });
  });

  /* --------------------------------------------------------- Pemapar imej evidens */

  var lb = document.getElementById('pemapar-imej');
  if (lb) {
    var lbImej = lb.querySelector('[data-lb-imej]');
    var lbTajuk = lb.querySelector('[data-lb-tajuk]');
    var lbKira = lb.querySelector('[data-lb-kira]');
    var lbUndur = lb.querySelector('[data-lb-undur]');
    var lbMaju = lb.querySelector('[data-lb-maju]');
    var set = [];
    var kini = 0;
    var pembukaImej = null;

    function lukisLb() {
      var x = set[kini];
      lbImej.src = x.getAttribute('data-imej');
      lbImej.alt = x.getAttribute('data-kapsyen') || 'Halaman evidens';
      lbTajuk.textContent = x.getAttribute('data-kapsyen') || '';
      lbKira.textContent = (kini + 1) + ' / ' + set.length;
      lbUndur.disabled = kini === 0;
      lbMaju.disabled = kini === set.length - 1;
    }

    function bukaLb(item) {
      var galeri = item.closest('[data-galeri]');
      set = Array.prototype.slice.call(galeri.querySelectorAll('.galeri-item'));
      kini = set.indexOf(item);
      pembukaImej = item;
      lukisLb();
      lb.classList.add('buka');
      document.body.style.overflow = 'hidden';
      lb.querySelector('[data-lb-tutup]').focus();
    }

    function tutupLb() {
      lb.classList.remove('buka');
      lbImej.src = '';
      document.body.style.overflow = '';
      if (pembukaImej) { pembukaImej.focus(); pembukaImej = null; }
    }

    function alih(arah) {
      var baharu = kini + arah;
      if (baharu < 0 || baharu >= set.length) return;
      kini = baharu;
      lukisLb();
    }

    document.addEventListener('click', function (e) {
      var item = e.target.closest('.galeri-item');
      if (item) { bukaLb(item); return; }
      if (!lb.classList.contains('buka')) return;
      if (e.target.closest('[data-lb-tutup]') || e.target === lb) tutupLb();
      else if (e.target.closest('[data-lb-undur]')) alih(-1);
      else if (e.target.closest('[data-lb-maju]')) alih(1);
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('buka')) return;
      if (e.key === 'Escape') tutupLb();
      else if (e.key === 'ArrowLeft') alih(-1);
      else if (e.key === 'ArrowRight') alih(1);
    });
  }

  /* ------------------------------------------------------------ Pemapar dokumen */

  var modal = document.getElementById('pemapar');
  if (!modal) return;

  var tajukEl = modal.querySelector('[data-tajuk]');
  var subEl = modal.querySelector('[data-sub]');
  var rangka = modal.querySelector('iframe');
  var pautanDrive = modal.querySelector('[data-drive]');
  var btnTutup = modal.querySelector('.modal-tutup');
  var pembukaTerakhir = null;

  function buka(id, tajuk, sub) {
    if (!id) return;
    tajukEl.textContent = tajuk || 'Dokumen';
    subEl.textContent = sub || '';
    rangka.src = 'https://drive.google.com/file/d/' + id + '/preview';
    pautanDrive.href = 'https://drive.google.com/file/d/' + id + '/view';
    modal.classList.add('buka');
    document.body.style.overflow = 'hidden';
    btnTutup.focus();
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
    if (!modal.classList.contains('buka')) return;
    if (e.key === 'Escape') { tutup(); return; }
    // Kekalkan fokus dalam modal semasa ia terbuka
    if (e.key !== 'Tab') return;
    var fokusable = modal.querySelectorAll('a[href], button:not([disabled]), iframe');
    if (!fokusable.length) return;
    var pertama = fokusable[0];
    var akhir = fokusable[fokusable.length - 1];
    if (e.shiftKey && document.activeElement === pertama) { e.preventDefault(); akhir.focus(); }
    else if (!e.shiftKey && document.activeElement === akhir) { e.preventDefault(); pertama.focus(); }
  });
})();
