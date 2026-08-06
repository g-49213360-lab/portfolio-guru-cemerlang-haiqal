/* ==========================================================================
   Penjana laman web portfolio Guru Cemerlang
   Mohd Haiqal bin Abdullah Chik — SK Abdul Samat, Klang, Selangor

   Jalankan:  node bina.mjs
   Semua kandungan laman ada dalam fail ini. Edit di sini, jalankan semula.

   Prinsip susun atur: setiap kad dibina oleh fungsi kad() yang sama, jadi
   struktur DOM setiap kad adalah serupa. Bersama-sama dengan .kad-kaki
   (margin-top:auto), ini memastikan tinggi dan kedudukan butang sejajar
   merentas setiap baris grid — tiada kad tergantung atau senget.
   ========================================================================== */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AKAR = dirname(fileURLToPath(import.meta.url));

/* ---------------------------------------------------------------- MAKLUMAT */

const CALON = {
  nama: 'Mohd Haiqal bin Abdullah Chik',
  jawatan: 'Pegawai Perkhidmatan Pendidikan Siswazah (PPPS) Gred D10',
  peranan: 'Guru Bahasa Inggeris',
  sekolah: 'Sekolah Kebangsaan Abdul Samat, Klang, Selangor',
  emel: 'g-41341128@moe-dl.edu.my',
  sijilGuru: 'G130316-03922',
  permohonan: 'Permohonan Guru Cemerlang DG12 · Sesi 2026',
  folderDrive: '1nGl9KcVwGUeID0KKAerAKqCRIoXrXb9N',
  laman: 'https://mrmohdhaiqal.vercel.app', // tanpa garis miring di hujung
};

/* Video guna domain nocookie — YouTube tidak menetapkan kuki penjejakan
   sebelum penonton menekan main. */
const VIDEO = {
  journey: {
    id: 'qyhawB76ucs',
    tajuk: 'MY JOURNEY (Permohonan Guru Cemerlang DG12 2026)',
  },
  testimoni: {
    id: 'wtgnVll38kg',
    tajuk: 'Video Testimoni Mr. Qarl oleh Rakan Pentadbir, Guru dan Ibu Bapa',
  },
};

/* --------------------------------------------------------------- DOKUMEN */

const DOK = {
  resume:       { id: '1VIUTVQUc0FPMR6kgEpsANfiZVNhFDD5u', kulit: 'resume',       tajuk: 'Resume Calon',                          hlm: 3,  bhg: 'Pengenalan' },
  kompetensi:   { id: '1hleS1TNpv1ZFaRXJtyZ5c93-faAKEJJr', kulit: 'kompetensi',   tajuk: 'Lembaran Kompetensi & Dokumentasi',      hlm: 26, bhg: 'Bahagian 1.0' },
  lnpt:         { id: '133OL1oeaPPaT2YJjGQQ-lVyoo0F5RsXg', kulit: 'lnpt',         tajuk: 'Markah Prestasi LNPT 2023–2025',        hlm: 4,  bhg: 'Bahagian 1.4' },
  surat:        { id: '1_PjkNHvCjdvqp5vq8lix6tXWbnQZBCH3', kulit: 'surat',        tajuk: 'Salinan Surat-Surat Perkhidmatan',       hlm: 5,  bhg: 'Bahagian 1.5' },
  akademik:     { id: '13CTMQ1A62SI3LO_vHT5rmeDXNM26N4Fj', kulit: 'akademik',     tajuk: 'Sijil Kelulusan Akademik',              hlm: 3,  bhg: 'Bahagian 1.6' },
  perkhidmatan: { id: '1Nd5HzbUU_SPna6fOjc5XwmSVjDg-jGHy', kulit: 'perkhidmatan', tajuk: 'Kenyataan Perkhidmatan',                hlm: 26, bhg: 'Bahagian 1.8' },
  harta:        { id: '1IQu1I-vf2zj1cx5AcJGjoDLzP3jz6vBf', kulit: 'harta',        tajuk: 'Surat Pengisytiharan Harta',            hlm: 2,  bhg: 'Bahagian 1.9' },
  jadual:       { id: '1eL0vZNK7SuZnzdvhy-54iB24dH08h8ia', kulit: 'jadual',       tajuk: 'Jadual Waktu Mengajar 2023–2026',       hlm: 5,  bhg: 'Bahagian 1.10' },
  sijil:        { id: '1XIg-BYdbL8IALvrHpEiKhe49Xv0WIgtV', kulit: 'sijil',        tajuk: 'Sijil, Surat Penghargaan & Dokumen Sokongan', hlm: 64, bhg: 'Bahagian 1.11' },
  program:      { id: '1Y7OEKldt7PubtyipmhccNaBJdZ4sDyDL', kulit: 'program',      tajuk: 'Program & Latihan Yang Dihadiri',        hlm: 24, bhg: 'Bahagian 2.0' },
  kajian:       { id: '1WWI-CslsOdfYFs5Ko5wtZ487zoluHtnO', kulit: 'kajian',       tajuk: 'Kajian, Kertas Kerja & Penulisan Profesional', hlm: 17, bhg: 'Bahagian 3.0' },
  anugerah:     { id: '18RE03Vv7o0X53ieLEscERYrlFBibTSdN', kulit: 'anugerah',     tajuk: 'Anugerah Kecemerlangan & Pengiktirafan Terkini', hlm: 7, bhg: 'Bahagian 4.0' },
  inovasi:      { id: '1AA6ImVtsGgccp6uC_CTOUqMasNLLBit_', kulit: 'inovasi',      tajuk: 'Inovasi Berkaitan Mata Pelajaran / Bidang Kepakaran', hlm: 10, bhg: 'Bahagian 5.0' },
  wau:          { id: '177IMurG_YKZ40s1xDdzDGOYu3iUoVGWY', kulit: 'wau',          tajuk: 'Faktor WAU',                            hlm: 69, bhg: 'Bahagian 6.0' },
  kemenjadian:  { id: '1WMDITOPLPj7R8qgqND2qaSwRdmGavXII', kulit: 'kemenjadian',  tajuk: 'Kemenjadian Murid',                     hlm: 24, bhg: 'Bahagian 6.7' },
  testimoni:    { id: '125KWoEXp3FPvetfU8k2_LCv_3JU10bMJ', kulit: 'testimoni',    tajuk: 'Testimoni Calon',                       hlm: 8,  bhg: 'Bahagian 7.0' },
  penghargaan:  { id: '1PTWzPlKS-qOVXZp2452T6szy1nJAS1ID', kulit: 'penghargaan',  tajuk: 'Penghargaan',                           hlm: 2,  bhg: 'Bahagian 8.0' },
};

/* --------------------------------------------------------------- NAVIGASI */

const NAV = [
  { f: 'index.html',       t: 'Utama' },
  { f: 'profil.html',      t: 'Profil' },
  { f: 'kepakaran.html',   t: 'Kepakaran' },
  { f: 'wau.html',         t: 'Faktor WAU' },
  { f: 'kemenjadian.html', t: 'Kemenjadian Murid' },
  { f: 'testimoni.html',   t: 'Testimoni' },
  { f: 'dokumen.html',     t: 'Arkib Dokumen' },
];

/* ------------------------------------------------------------ KOMPONEN */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Butang yang membuka pemapar PDF dalam modal */
function pemicuDok(kunci, isi, kelas = '') {
  const d = DOK[kunci];
  return `<button type="button" class="${kelas}" data-dok="${d.id}" data-dok-tajuk="${esc(d.tajuk)}" data-dok-sub="${esc(d.bhg)} · ${d.hlm} halaman">${isi}</button>`;
}

const pautanEvidens = (kunci, label = 'Lihat evidens') =>
  pemicuDok(kunci, `${label} <span aria-hidden="true">→</span>`, 'btn btn-garis btn-kecil');

/** Kad dokumen dengan imej kulit */
function kadDok(kunci, nota = '') {
  const d = DOK[kunci];
  return `<button type="button" class="dok" data-dok="${d.id}" data-dok-tajuk="${esc(d.tajuk)}" data-dok-sub="${esc(d.bhg)} · ${d.hlm} halaman">
          <span class="dok-kulit"><img src="assets/kulit/${d.kulit}.jpg" alt="Muka depan ${esc(d.tajuk)}" loading="lazy" width="196" height="277"></span>
          <span class="dok-teks">
            <span class="dok-tajuk">${esc(d.tajuk)}</span>
            <span class="dok-hlm">${esc(d.bhg)} · ${d.hlm} hlm.</span>
            ${nota ? `<span class="dok-nota">${nota}</span>` : ''}
          </span>
        </button>`;
}

const kadDokSolo = (kunci, nota = '') => `<div class="dok-solo">${kadDok(kunci, nota)}</div>`;

/**
 * Kad seragam. Semua kad di seluruh laman melalui fungsi ini supaya
 * strukturnya sama dan barisnya sejajar.
 */
function kad({ label = '', tajuk, teks = '', butir = [], kaki = '', emas = false, pautan = '', padat = false }) {
  const kelas = ['kad', emas ? 'kad-emas' : '', padat ? 'kad-padat' : ''].filter(Boolean).join(' ');
  const isi = [
    label ? `<span class="label">${label}</span>` : '',
    `<h3>${tajuk}</h3>`,
    teks ? `<p>${teks}</p>` : '',
    butir.length ? `<ul class="senarai-tanda" style="margin-top:var(--r3)">${butir.map((b) => `<li>${b}</li>`).join('')}</ul>` : '',
    `<div class="kad-kaki">${kaki}</div>`,
  ].filter(Boolean).join('\n          ');

  return pautan
    ? `<a class="${kelas}" href="${pautan}">\n          ${isi}\n        </a>`
    : `<div class="${kelas}">\n          ${isi}\n        </div>`;
}

/** Video YouTube terbenam */
function video({ id, tajuk }) {
  return `<div class="video">
          <iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${esc(tajuk)}" loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
        </div>`;
}

const pautanYouTube = (id, label = 'Tonton di YouTube') =>
  `<a class="btn btn-garis btn-kecil" href="https://youtu.be/${id}" target="_blank" rel="noopener">${label} <span aria-hidden="true">→</span></a>`;

/** Kepala seksyen seragam: label → tajuk → pengenalan */
function kepalaSek({ label, tajuk, pengenalan = '', tengah = false }) {
  return `<div class="sek-kepala${tengah ? ' sek-kepala-tengah' : ''}">
        <span class="label label-merah">${label}</span>
        <h2>${tajuk}</h2>
        ${pengenalan ? `<p class="pengenalan">${pengenalan}</p>` : ''}
      </div>`;
}

/** Kepala halaman (bukan Utama) */
function kepalaLaman(label, tajuk, pengenalan) {
  return `<section class="laman-kepala">
  <div class="balut">
    <span class="lencana">${esc(label)}</span>
    <h1>${esc(tajuk)}</h1>
    <p class="pengenalan">${pengenalan}</p>
  </div>
</section>`;
}

/* ---------------------------------------------------------------- SUSUNAN */

function susunan({ fail, tajuk, huraian, badan }) {
  const nav = NAV.map((n) => `<a href="${n.f}"${n.f === fail ? ' aria-current="page"' : ''}>${n.t}</a>`).join('\n        ');
  const kakiNav = NAV.map((n) => `<a href="${n.f}">${n.t}</a>`).join('\n            ');
  const url = fail === 'index.html' ? `${CALON.laman}/` : `${CALON.laman}/${fail}`;

  return `<!doctype html>
<html lang="ms">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tajuk)} · ${esc(CALON.nama)}</title>
<meta name="description" content="${esc(huraian)}">
<meta name="author" content="${esc(CALON.nama)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#15171c">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(tajuk)} · ${esc(CALON.nama)}">
<meta property="og:description" content="${esc(huraian)}">
<meta property="og:type" content="profile">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Portfolio Guru Cemerlang · ${esc(CALON.nama)}">
<meta property="og:locale" content="ms_MY">
<meta property="og:image" content="${CALON.laman}/assets/og.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(CALON.nama)} — ${esc(CALON.permohonan)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(tajuk)} · ${esc(CALON.nama)}">
<meta name="twitter:description" content="${esc(huraian)}">
<meta name="twitter:image" content="${CALON.laman}/assets/og.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap">
<link rel="stylesheet" href="assets/gaya.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23a8121e'/%3E%3Ctext x='16' y='22' font-family='system-ui,sans-serif' font-size='14' font-weight='800' fill='white' text-anchor='middle'%3EMH%3C/text%3E%3C/svg%3E">
</head>
<body>
<a class="lompat" href="#kandungan">Lompat ke kandungan</a>

<header class="kepala">
  <div class="balut kepala-dalam">
    <a class="jata" href="index.html">
      <span class="jata-lambang" aria-hidden="true">MH</span>
      <span class="jata-teks">
        <span class="jata-nama">Mohd Haiqal A. Chik</span>
        <span class="jata-sub">Portfolio Guru Cemerlang</span>
      </span>
    </a>
    <button class="butang-menu" type="button" aria-expanded="false" aria-controls="nav-utama">Menu</button>
    <nav class="nav" id="nav-utama" aria-label="Navigasi utama">
        ${nav}
    </nav>
  </div>
</header>

<main id="kandungan">
${badan}
</main>

<footer class="kaki">
  <div class="balut kaki-dalam">
    <div>
      <p><strong style="color:var(--arang)">${esc(CALON.nama)}</strong><br>
      ${esc(CALON.peranan)} · ${esc(CALON.sekolah)}<br>
      <a href="mailto:${CALON.emel}">${CALON.emel}</a></p>
      <p style="margin-top:var(--r3);font-size:.8rem;color:var(--kelabu-muda)">${esc(CALON.permohonan)}<br>
      Laman ini disediakan sebagai rujukan digital kepada dokumen permohonan.<br>Semua evidens dipaparkan terus daripada fail asal.</p>
    </div>
    <nav class="kaki-nav" aria-label="Navigasi kaki">
            ${kakiNav}
    </nav>
  </div>
</footer>

<div class="modal" id="pemapar" role="dialog" aria-modal="true" aria-label="Pemapar dokumen">
  <div class="modal-kotak">
    <div class="modal-kepala">
      <h3><span data-tajuk>Dokumen</span><span data-sub></span></h3>
      <a class="btn btn-garis btn-kecil" data-drive href="#" target="_blank" rel="noopener">Buka di Drive</a>
      <button class="modal-tutup" type="button" aria-label="Tutup pemapar">&times;</button>
    </div>
    <div class="modal-badan"><iframe title="Pemapar dokumen PDF" src="about:blank"></iframe></div>
  </div>
</div>

<script src="assets/laman.js"></script>
</body>
</html>
`;
}

/* =========================================================== HALAMAN: UTAMA */

const STATISTIK = [
  ['~14', 'Tahun', 'Perkhidmatan dalam bidang pendidikan sejak 2012'],
  ['4', '', 'Lantikan jurulatih utama peringkat negeri &amp; kebangsaan'],
  ['20+', '', 'Episod sebagai penyampai DidikTV KPM (2022–2025)'],
  ['3', '', 'Buku cerita Bahasa Inggeris berdaftar ISBN'],
  ['299', 'Hlm', 'Halaman evidens dalam 17 fail dokumen'],
];

const SOROTAN = [
  {
    label: 'Anugerah · Peringkat kebangsaan',
    tajuk: 'Best Innovation Gold Award',
    teks: 'Bagi abstrak kajian <em>“Improving English Essay Writing Skills Among Year 6 Gigih Pupils Through the Use of Google Gemini Application”</em>.',
    dok: 'anugerah', emas: true,
  },
  {
    label: 'Anugerah · UPSI 2026',
    tajuk: 'Bronze — Pertandingan Kajian Tindakan (Terbuka)',
    teks: 'Karnival Pengajian Pendidikan 2026 peringkat kebangsaan. Tajuk: <em>Meningkatkan Penguasaan Menulis Emel Bahasa Inggeris Menerusi Aplikasi Gemini</em>.',
    dok: 'anugerah', emas: true,
  },
  {
    label: 'Lantikan · 2026',
    tajuk: 'Jurulatih Utama Kebangsaan Kajian Tindakan Berasaskan AI',
    teks: 'Lantikan terkini di peringkat kebangsaan, seiring peranan sebagai Jurulatih Utama Bahasa Inggeris JPN Selangor sejak 2018.',
    dok: 'sijil',
  },
  {
    label: 'Pengacaraan · Antarabangsa',
    tajuk: 'Pengacara Majlis SEAMEO SEN 2026 &amp; ASEAN 2025',
    teks: 'Selain Mesyuarat Pemukiman Pengurusan Tertinggi KPM 2025 dan Konvensyen Kebangsaan Perlindungan Murid 2024.',
    dok: 'wau',
  },
];

const KAD_NAVIGASI = [
  ['Bahagian 1.0', 'Dokumentasi &amp; Lembaran Kompetensi', 'Borang pemarkahan pencerapan PdP 2026, lembaran kompetensi, LNPT 2023–2025, kenyataan perkhidmatan dan dokumen rasmi.', 'profil.html'],
  ['Bahagian 2.0', 'Program &amp; Latihan Yang Dihadiri', 'Sepuluh evidens program peringkat kebangsaan, negeri dan daerah — daripada Persidangan Edufluencers KPM hingga bengkel semakan kurikulum.', 'kepakaran.html#program'],
  ['Bahagian 3.0', 'Kajian, Kertas Kerja &amp; Penulisan', 'Tiga buku cerita berdaftar ISBN, panel penulis modul BPK, modul intervensi PBD, kajian tindakan dan artikel HIP dalam Dewan Masyarakat DBP.', 'kepakaran.html#penulisan'],
  ['Bahagian 4.0', 'Anugerah &amp; Pengiktirafan Terkini', 'Best Innovation Gold Award dan Bronze Pertandingan Kajian Tindakan (Terbuka) Karnival Pengajian Pendidikan 2026 peringkat kebangsaan.', 'wau.html#anugerah'],
  ['Bahagian 5.0', 'Inovasi Bidang Kepakaran', 'Pengintegrasian digital melalui Canva dan Google Classroom, 20+ set permainan tatabahasa Blooket, perkongsian PdPC menerusi Telegram dan TikTok.', 'kepakaran.html#inovasi'],
  ['Bahagian 6.0', 'Faktor WAU', 'Lapan faktor: Edufluencer KPM, juruacara majlis, penyampai DidikTV KPM, bahan sumber teknologi, ahli panel, penulis, kemenjadian murid dan kelas kondusif.', 'wau.html'],
  ['Bahagian 6.7', 'Kemenjadian Murid', 'Enam belas kisah kemenjadian — johan peringkat negeri, anugerah emas kebangsaan, dan bekas murid yang kini menjadi guru pelatih serta pelajar seni lakon.', 'kemenjadian.html'],
  ['Bahagian 7.0', 'Testimoni Calon', 'Video testimoni sepuluh individu termasuk Guru Besar, pengurusan DidikTV KPM dan wakil ibu bapa, serta lima testimoni bertulis.', 'testimoni.html'],
];

function halamanUtama() {
  const badan = `
<section class="hero">
  <div class="balut hero-dalam">
    <div class="hero-teks">
      <span class="lencana">${esc(CALON.permohonan)}</span>
      <h1>${esc(CALON.nama)}</h1>
      <p class="hero-jawatan">
        <strong>${esc(CALON.peranan)}</strong><br>
        ${esc(CALON.jawatan)}<br>
        ${esc(CALON.sekolah)}
      </p>
      <p class="hero-gred"><span>Opsyen</span> Bahasa Inggeris · Sijil Guru Malaysia ${esc(CALON.sijilGuru)}</p>
      <div class="btn-baris hero-cta">
        <a class="btn btn-utama" href="profil.html">Mula dengan profil calon</a>
        <a class="btn btn-hantu" href="dokumen.html">Arkib 17 dokumen</a>
      </div>
    </div>
    <div class="hero-potret">
      <img src="assets/potret.jpg" alt="Potret ${esc(CALON.nama)}" width="640" height="800">
    </div>
  </div>
</section>

<section class="statistik" aria-label="Statistik ringkas">
  <div class="balut">
    <div class="statistik-grid">
      ${STATISTIK.map(([n, u, l]) => `<div class="stat">
        <div class="stat-nilai">${n}<em>${u}</em></div>
        <div class="stat-label">${l}</div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sek">
  <div class="balut">
    <div class="belah">
      <div>
        <span class="label label-merah" style="margin-bottom:var(--r3)">Ringkasan calon</span>
        <h2>Ruang ialah anugerah, dan peluang ialah amanah.</h2>
        <div class="utama-teks" style="margin-top:var(--r4)">
          <p>Hampir 14 tahun dalam perkhidmatan pendidikan, bermula sebagai guru di SK Layon, Nabawan, Sabah dan kini di SK Abdul Samat, Klang. Lantikan sebagai <strong>Master Trainer CEFR pada 2016</strong> membuka ruang memimpin bengkel dan melatih guru-guru Bahasa Inggeris.</p>
          <p>Penguasaan kurikulum Bahasa Inggeris diserlahkan melalui lebih <strong>dua puluh episod DidikTV KPM</strong>. Kemahiran berbahasa Melayu dan Inggeris membuka peluang menggalas peranan pengacara majlis di peringkat kementerian, termasuk peringkat ASEAN dan SEAMEO.</p>
          <p>Sebagai <strong>Edufluencer KPM</strong>, sumbangan diteruskan dalam ruang digital — permainan tatabahasa di Blooket, video PdPC di TikTok, Instagram dan Facebook, serta bahan percuma menerusi Telegram dan Ruang Ilmu DELIMa KPM.</p>
        </div>
        <div class="btn-baris" style="margin-top:var(--r5)">${pautanEvidens('wau', 'Baca naratif penuh Faktor WAU')}</div>
      </div>
      <blockquote class="petikan">
        <p>“Segala yang terhimpun dalam Faktor WAU ini bukanlah untuk dibanggakan, tetapi untuk disyukuri dan dikongsi. Kerana apabila kita bekerja dengan ikhlas, berani berinovasi dan setia kepada amanah pendidikan, kita sebenarnya sedang menulis masa depan bangsa, huruf demi huruf, jiwa demi jiwa, dalam kitab besar bernama harapan.”</p>
        <footer>Faktor WAU · hlm. 205–206</footer>
      </blockquote>
    </div>
  </div>
</section>

<section class="sek sek-kelabu">
  <div class="balut">
    ${kepalaSek({
      label: 'Sorotan terkini',
      tajuk: 'Pencapaian dan pengiktirafan terkini',
      pengenalan: 'Empat pencapaian paling terkini yang menyokong permohonan ini. Klik untuk memapar fail evidens asal.',
    })}
    <div class="grid grid-2">
      ${SOROTAN.map((s) => kad({
        label: s.label, tajuk: s.tajuk, teks: s.teks, emas: s.emas, kaki: pautanEvidens(s.dok),
      })).join('\n      ')}
    </div>
  </div>
</section>

<section class="sek">
  <div class="balut">
    ${kepalaSek({
      label: 'Struktur portfolio',
      tajuk: 'Lapan bahagian utama',
      pengenalan: 'Portfolio permohonan ini merangkumi 17 fail dokumen dengan 299 halaman evidens, bernombor sehingga halaman 311.',
    })}
    <div class="grid grid-2">
      ${KAD_NAVIGASI.map(([label, tajuk, teks, pautan]) => kad({
        label, tajuk, teks, pautan, kaki: '<span class="kad-pautan">Lihat bahagian</span>',
      })).join('\n      ')}
    </div>
  </div>
</section>

<section class="sek sek-kelabu">
  <div class="balut">
    ${kepalaSek({
      label: 'Persembahan multimedia',
      tajuk: 'MY JOURNEY',
      pengenalan: 'Perjalanan hampir 14 tahun dalam bidang pendidikan dirangkumkan dalam sebuah video berdurasi 5 minit, dihasilkan menggunakan Gemini, ChatGPT dan VEO 3.',
      tengah: true,
    })}
    <div style="max-width:900px;margin-inline:auto">
      ${video(VIDEO.journey)}
      <div class="btn-baris btn-baris-tengah" style="margin-top:var(--r4)">${pautanYouTube(VIDEO.journey.id)}</div>
    </div>
  </div>
</section>

<section class="sek">
  <div class="balut">
    <div class="hubungi">
      <span class="lencana">Hubungi</span>
      <h2>Sebarang pertanyaan berkaitan permohonan ini</h2>
      <p>Semua evidens dalam laman ini dipaparkan terus daripada fail PDF asal yang dikemukakan bersama borang permohonan.</p>
      <div class="btn-baris">
        <a class="btn btn-utama" href="mailto:${CALON.emel}">${CALON.emel}</a>
        <a class="btn btn-hantu" href="https://drive.google.com/drive/folders/${CALON.folderDrive}" target="_blank" rel="noopener">Folder dokumen di Drive</a>
      </div>
    </div>
  </div>
</section>
`;
  return susunan({
    fail: 'index.html',
    tajuk: 'Portfolio Guru Cemerlang',
    huraian: `Portfolio digital permohonan Guru Cemerlang DG12 Sesi 2026 — ${CALON.nama}, Guru Bahasa Inggeris SK Abdul Samat, Klang.`,
    badan,
  });
}

/* ========================================================== HALAMAN: PROFIL */

const LANTIKAN = [
  ['Edufluencer KPM', '2022 hingga kini'],
  ['Jurulatih Utama Bahasa Inggeris JPN Selangor', '2018 hingga kini'],
  ['Jurulatih Utama NILAM PPD Klang', '2024 hingga kini'],
  ['Jurulatih Utama Kebangsaan Kajian Tindakan Berasaskan AI', '2026 hingga kini'],
  ['Master Trainer CEFR', 'dilantik pada 2016'],
  ['Ketua Hakim Poem Recitation', 'peringkat negeri Selangor 2025'],
];

const KEMAHIRAN = [
  'Penulisan ilmiah — buku cerita, kajian tindakan dan modul pembelajaran',
  'Pengacaraan majlis dalam Bahasa Melayu dan Bahasa Inggeris',
  'Pengeditan dan penghasilan video',
  'Teknologi dalam pendidikan — Canva, Blooket, DELIMa, Gemini, ChatGPT, NotebookLM, Suno',
];

const PENDIDIKAN = [
  ['2016', 'Ijazah Sarjana Pendidikan Awal Kanak-Kanak', 'UNITAR International University'],
  ['2012', 'Ijazah Sarjana Muda Pendidikan Bahasa Inggeris Sebagai Bahasa Kedua', 'Universiti Malaya'],
  ['2005', 'Sijil Pelajaran Malaysia', 'MRSM Jasin, Melaka'],
  ['2003', 'Penilaian Menengah Rendah', 'MRSM Pendang, Kedah'],
];

function halamanProfil() {
  const badan = `
${kepalaLaman('Bahagian 1.0 · Dokumentasi', 'Profil, kelayakan & dokumentasi rasmi',
    'Maklumat asas calon, latar pendidikan, skor pencerapan PdP dan kesemua dokumen rasmi yang disertakan dalam Bahagian 1.0 hingga 1.11 portfolio.')}

<section class="sek">
  <div class="balut">
    <div class="belah">
      <div>
        <span class="label label-merah" style="margin-bottom:var(--r3)">Maklumat calon</span>
        <h2>Butiran asas</h2>
        <div class="jad-balut" style="margin-top:var(--r4)">
          <table class="jad">
            <tbody>
              <tr><th scope="row">Nama</th><td>${esc(CALON.nama)}</td></tr>
              <tr><th scope="row">Jawatan</th><td>${esc(CALON.jawatan)}</td></tr>
              <tr><th scope="row">Opsyen</th><td>Bahasa Inggeris</td></tr>
              <tr><th scope="row">Sekolah</th><td>${esc(CALON.sekolah)}</td></tr>
              <tr><th scope="row">No. Sijil Guru Malaysia</th><td>${esc(CALON.sijilGuru)}</td></tr>
              <tr><th scope="row">Institusi pertama</th><td>SK Layon, Nabawan, Sabah</td></tr>
              <tr><th scope="row">Ikhtisas</th><td>Sarjana Muda Perguruan</td></tr>
              <tr><th scope="row">E-mel</th><td><a href="mailto:${CALON.emel}">${CALON.emel}</a></td></tr>
              <tr><th scope="row">Permohonan</th><td>Guru Cemerlang DG12, Sesi 2026</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <span class="label label-merah" style="margin-bottom:var(--r3)">Peranan &amp; lantikan</span>
        <h2>Profil profesional</h2>
        <ul class="senarai-tanda" style="margin-top:var(--r4)">
          ${LANTIKAN.map(([n, t]) => `<li><strong>${n}</strong> — ${t}</li>`).join('\n          ')}
        </ul>
        <h3 style="margin-top:var(--r5)">Kemahiran</h3>
        <ul class="senarai-tanda" style="margin-top:var(--r3)">
          ${KEMAHIRAN.map((k) => `<li>${k}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="sek sek-kelabu">
  <div class="balut">
    ${kepalaSek({ label: 'Latar pendidikan', tajuk: 'Kelayakan akademik' })}
    <div class="belah">
      <div class="masa">
        ${PENDIDIKAN.map(([thn, t, inst]) => `<div class="masa-item">
          <span class="label label-merah">${thn}</span>
          <h3>${t}</h3>
          <p>${inst}</p>
        </div>`).join('\n        ')}
      </div>
      ${kad({
        label: 'Bahagian 1.1 · Tahun 2026',
        tajuk: 'Borang pemarkahan pencerapan PdP peringkat dalaman institusi',
        teks: 'Pencerapan pengajaran dan pembelajaran direkodkan oleh empat pihak berbeza:',
        butir: [
          '<strong>Eviden A</strong> — skor pencerapan oleh Ketua Jabatan',
          '<strong>Eviden B</strong> — skor pencerapan oleh PK Pentadbiran dan PK Kokurikulum',
          '<strong>Eviden C</strong> — skor pencerapan oleh rakan panitia Bahasa Inggeris',
        ],
        kaki: pautanEvidens('kompetensi', 'Buka Lembaran Kompetensi'),
      })}
    </div>
  </div>
</section>

<section class="sek">
  <div class="balut">
    ${kepalaSek({
      label: 'Bahagian 1.0 – 1.11',
      tajuk: 'Dokumen rasmi yang disertakan',
      pengenalan: 'Sembilan fail dokumentasi rasmi. Klik mana-mana kulit untuk membacanya dalam laman ini.',
    })}
    <div class="dok-grid">
      ${kadDok('kompetensi', 'Borang pemarkahan pencerapan PdP 2026, borang permohonan bercetak dan lembaran kompetensi.')}
      ${kadDok('lnpt', 'Markah prestasi Pegawai Perkhidmatan Pendidikan bagi tahun 2023, 2024 dan 2025.')}
      ${kadDok('perkhidmatan', 'Kenyataan perkhidmatan penuh.')}
      ${kadDok('akademik', 'Sijil Ijazah Sarjana Muda (2012) dan Ijazah Sarjana (2016).')}
      ${kadDok('surat', 'Surat kenaikan pangkat, pengesahan pelantikan, pengesahan dalam perkhidmatan dan pertukaran dari SK Layon ke SK Abdul Samat.')}
      ${kadDok('jadual', 'Jadual waktu mengajar bagi tahun 2023, 2024, 2025 dan 2026.')}
      ${kadDok('harta', 'Surat pemakluman pengisytiharan harta terkini.')}
      ${kadDok('sijil', 'Evidens peringkat antarabangsa, kebangsaan, negeri, daerah/zon dan institusi — sepuluh evidens setiap peringkat.')}
      ${kadDok('resume', 'Resume calon, Sijil Guru Malaysia dan pautan persembahan multimedia MY JOURNEY.')}
    </div>
  </div>
</section>
`;
  return susunan({
    fail: 'profil.html',
    tajuk: 'Profil & Kelayakan',
    huraian: 'Butiran asas calon, kelayakan akademik, lantikan profesional dan dokumen rasmi Bahagian 1.0–1.11.',
    badan,
  });
}

/* ======================================================= HALAMAN: KEPAKARAN */

const PENULISAN = [
  ['Buku cerita Bahasa Inggeris pertama', '2019', 'Berdaftar ISBN di Perpustakaan Negara Malaysia. Muka hadapan dan belakang buku disertakan sebagai evidens.'],
  ['Buku cerita Bahasa Inggeris kedua', '2022', 'Buku cerita kedua, turut berdaftar ISBN.'],
  ['Buku cerita Bahasa Inggeris ketiga', '2025', 'Buku cerita terkini, diterbitkan pada 2025.'],
  ['Panel penulis Modul Pentaksiran Bilik Darjah untuk kelas padat sekolah rendah', '', 'Lantikan sebagai panel penulis modul di peringkat Bahagian Pembangunan Kurikulum.'],
  ['Panel penulis Modul Bimbingan MOBIM Tahap 2', '', 'Termasuk sesi penyelarasan dan uji rintis bahan MOBIM Bahasa Inggeris Tahun Satu sesi 2023/2024.'],
  ['Modul intervensi murid PBD TP1 &amp; TP2 dalam kemahiran membaca', '', 'Modul intervensi yang dihasilkan sendiri untuk murid tahap penguasaan 1 dan 2.'],
  ['Modul MMI Part 5 UASA', '', 'Penulisan modul persediaan UASA.'],
  ['Artikel HIP dalam Dewan Masyarakat DBP', '', 'Artikel berkaitan Highly Immersive Programme dalam majalah Dewan Masyarakat, Dewan Bahasa dan Pustaka.'],
];

const PROGRAM = [
  ['Persidangan Edufluencers KPM Tahun 2025', 'Peringkat kebangsaan'],
  ['Bengkel Kerja Semakan Kandungan Kurikulum Bahasa Inggeris KSPK, KSSR dan KSSM Tahun 2025 (Zon Tengah)', 'Bahagian Pembangunan Kurikulum'],
  ['Program Imersif Tinggi (HIP) sempena kehadiran delegasi Haemil Middle School, Korea ke SK Bandar Bukit Mahkota, Selangor', 'Antarabangsa'],
  ['Bengkel Penyelarasan Hakim Karnival Pendidikan Murid Orang Asli dan Pribumi Peringkat Negeri Selangor Tahun 2024', 'Peringkat negeri'],
  ['Sesi Penyebaran Maklumat berkaitan Pentaksiran Bilik Darjah kepada Edufluencer KPM', 'Peringkat kebangsaan'],
  ['Sesi Penyebaran Maklumat Majlis Pelancaran Laporan Tahunan 2023 PPPM 2013–2025', 'Peringkat kebangsaan'],
  ['Bengkel Training of Trainers (T.O.T) MBMMBI Siri 1 &amp; Siri 2 2023', 'Latihan jurulatih'],
  ['Bengkel Pemantapan Pelan Strategik Organisasi Panitia Bahasa Inggeris Sekolah Rendah Daerah Klang Tahun 2025', 'Peringkat daerah'],
  ['Bengkel Kerja Kajian Tindakan Menggunakan Teknologi Kecerdasan Buatan Generatif (Gen-AI)', 'Peringkat kebangsaan'],
  ['Sesi Penyelarasan dan Uji Rintis Bahan Modul Bimbingan (MOBIM) Bahasa Inggeris Tahun Satu Sesi 2023/2024', 'Bahagian Pembangunan Kurikulum'],
];

const INOVASI_KONGSI = [
  ['Blooket', 'Perkongsian lebih 20 set permainan tatabahasa dalam talian, termasuk set dengan jumlah dimainkan paling tinggi.'],
  ['Telegram', 'Saluran perkongsian bahan PdPC secara percuma kepada guru dan murid.'],
  ['TikTok', 'Perkongsian idea PdPC dalam bentuk video pendek.'],
  ['YouTube', 'Perkongsian pelbagai video pengajaran dan persembahan.'],
  ['Facebook', 'Perkongsian bahan PdPC kepada komuniti guru.'],
  ['Ruang Ilmu DELIMa KPM', 'Perkongsian bahan rujukan dalam platform rasmi KPM.'],
];

function halamanKepakaran() {
  const badan = `
${kepalaLaman('Bahagian 2.0 · 3.0 · 5.0', 'Kepakaran, penulisan & inovasi',
    'Penulisan profesional dan buku berdaftar ISBN, kajian tindakan berasaskan AI, inovasi pengintegrasian digital dalam bilik darjah, serta program dan latihan yang dihadiri.')}

<section class="sek" id="penulisan">
  <div class="balut">
    ${kepalaSek({
      label: 'Bahagian 3.0',
      tajuk: 'Kajian, kertas kerja &amp; penulisan profesional',
      pengenalan: 'Sembilan evidens penulisan — buku cerita, modul kurikulum, modul intervensi, abstrak kajian tindakan dan artikel majalah.',
    })}
    <div class="belah">
      <ol class="senarai-nombor">
        ${PENULISAN.map(([t, thn, k]) => `<li><strong>${t}</strong><span>${thn ? `<b style="color:var(--emas);font-weight:700">${thn}</b> · ` : ''}${k}</span></li>`).join('\n        ')}
      </ol>
      <div style="display:grid;gap:var(--r4)">
        ${kad({
          label: 'Pendaftaran ISBN', emas: true,
          tajuk: 'Tiga buah buku cerita dan sebuah modul berdaftar ISBN',
          teks: 'Kesemuanya didaftarkan di Perpustakaan Negara Malaysia — bukti sumbangan penulisan yang kekal dan boleh dirujuk.',
        })}
        ${kadDokSolo('kajian', 'Sembilan evidens penulisan profesional, termasuk muka hadapan dan belakang setiap buku.')}
      </div>
    </div>
  </div>
</section>

<section class="sek sek-kelabu" id="kajian">
  <div class="balut">
    ${kepalaSek({
      label: 'Kajian tindakan',
      tajuk: 'Tiga kajian tindakan berasaskan aplikasi AI',
      pengenalan: 'Kajian dijalankan dalam bilik darjah sendiri di SK Abdul Samat, dengan data ujian pra dan pasca serta maklum balas murid.',
    })}
    <div class="grid grid-2">
      <div class="panel">
        <span class="label">Abstrak · 2025 · Best Innovation Gold Award</span>
        <p class="tajuk-kajian">Meningkatkan Kemahiran Menulis Karangan Bahasa Inggeris Dalam Kalangan Murid Tahun 6 Gigih Melalui Penggunaan Aplikasi Google Gemini</p>
        <p>Kajian tindakan ini melibatkan 38 orang murid Tahun 6 Gigih. Intervensi dilaksanakan selama empat bulan, April hingga Julai 2025. Data dikumpul melalui ujian pra, ujian pasca serta maklum balas murid.</p>
        <p>Dapatan menunjukkan peningkatan ketara dalam pencapaian markah penulisan serta keyakinan murid menghasilkan karangan yang lebih tersusun dan gramatis. Murid memberikan maklum balas positif terhadap penggunaan Google Gemini yang membantu menambah kosa kata dan idea penulisan.</p>
        <p class="kunci"><strong>Kata kunci:</strong> Bahasa Inggeris, penulisan, karangan, Gemini, Google, UASA</p>
      </div>
      <div class="panel">
        <span class="label">Abstrak · 2025 · Amalan terbaik</span>
        <p class="tajuk-kajian">Pengintegrasian Digital Melalui Canva dan Google Classroom: Meningkatkan Kualiti dan Kadar Penghantaran Tugasan Projek Murid Tahun 4 Gigih</p>
        <p>Projek 1 (Mac 2025) dijalankan secara konvensional dengan buku skrap fizikal — hanya 21 murid menghantar tepat pada masa, 15 menghantar lewat, dan hasil kerja kurang kemas. Projek 2 dilaksanakan sepenuhnya secara digital menggunakan Canva dan dihantar melalui Google Classroom dalam bentuk PDF.</p>
        <p>Hasilnya, <strong>kesemua 36 murid</strong> berjaya menghantar dalam tempoh ditetapkan dengan hasil kerja yang lebih kemas, kreatif dan tersusun. Kaedah ini kemudian digunapakai oleh guru-guru panitia Bahasa Inggeris yang lain.</p>
        <p class="kunci"><strong>Kata kunci:</strong> Pengintegrasian Digital, Canva, Google Classroom, PBL, Bahasa Inggeris</p>
      </div>
    </div>
    <div style="margin-top:var(--r4)">
      ${kad({
        label: 'Bronze · Peringkat kebangsaan · 10 Januari 2026', emas: true,
        tajuk: 'Meningkatkan Penguasaan Menulis Emel Bahasa Inggeris Menerusi Aplikasi Gemini',
        teks: 'Memenangi Bronze bagi kategori Pertandingan Kajian Tindakan (Terbuka), Karnival Pengajian Pendidikan 2026 peringkat kebangsaan, anjuran Jabatan Pengajian Pendidikan, Fakulti Pembangunan Manusia, Universiti Pendidikan Sultan Idris.',
        kaki: pautanEvidens('anugerah', 'Lihat sijil pencapaian'),
      })}
    </div>
  </div>
</section>

<section class="sek" id="inovasi">
  <div class="balut">
    ${kepalaSek({
      label: 'Bahagian 5.0',
      tajuk: 'Inovasi berkaitan mata pelajaran &amp; bidang kepakaran',
      pengenalan: 'Lima evidens inovasi — daripada amalan bilik darjah sendiri hinggalah perkongsian bahan secara terbuka kepada komuniti guru.',
    })}
    <div class="grid grid-3">
      ${INOVASI_KONGSI.map(([p, k]) => kad({ label: 'Platform perkongsian', tajuk: p, teks: k })).join('\n      ')}
    </div>
    <div class="btn-baris" style="margin-top:var(--r5)">${pautanEvidens('inovasi', 'Buka Bahagian 5.0 — Inovasi')}</div>
  </div>
</section>

<section class="sek sek-kelabu" id="program">
  <div class="balut">
    ${kepalaSek({
      label: 'Bahagian 2.0',
      tajuk: 'Program &amp; latihan yang dihadiri',
      pengenalan: 'Sepuluh evidens program dan latihan, merentas peringkat antarabangsa, kebangsaan, negeri dan daerah.',
    })}
    <div class="belah">
      <ol class="senarai-nombor">
        ${PROGRAM.map(([t, p]) => `<li><strong>${t}</strong><span>${p}</span></li>`).join('\n        ')}
      </ol>
      <div>${kadDokSolo('program', 'Sijil, surat dan gambar bagi kesepuluh program.')}</div>
    </div>
  </div>
</section>
`;
  return susunan({
    fail: 'kepakaran.html',
    tajuk: 'Kepakaran, Penulisan & Inovasi',
    huraian: 'Penulisan profesional berdaftar ISBN, kajian tindakan berasaskan AI, inovasi digital bilik darjah, serta program dan latihan yang dihadiri.',
    badan,
  });
}

/* ============================================================ HALAMAN: WAU */

const WAU = [
  {
    no: '6.1', tajuk: 'Edufluencer KPM', dok: 'wau',
    teks: 'Dilantik sebagai Edufluencer KPM sejak 2022, dengan sijil penghargaan berterusan bagi 2022 hingga 2025.',
    butir: [
      'EXCO Edufluencers Selangor 2023',
      'Podcast JPN Selangor bersama Edufluencers KPM',
      'Mengacara reruai KPM di Setahun Kerajaan MADANI, Stadium Kuala Selangor',
    ],
  },
  {
    no: '6.2', tajuk: 'Juruacara majlis', dok: 'wau',
    teks: 'Kemahiran berbahasa Melayu dan Inggeris membuka peluang menggalas peranan pengacara majlis di peringkat kementerian dan antarabangsa.',
    butir: [
      'Pengacara SEAMEO SEN 2026 dan ASEAN 2025',
      'Juruacara Mesyuarat Pemukiman Pengurusan Tertinggi KPM 2025',
      'Pengacara Konvensyen Kebangsaan Perlindungan Murid 2024',
      'AJK Petrosains Science Drama Competition 2023 Grand Finals',
      'AJK Persembahan Karnival Karakter Generasi MADANI 2024',
      'Jemputan ke Festival TV PSS dan penyampai anugerah 2024',
    ],
  },
  {
    no: '6.3', tajuk: 'Penyampai DidikTV KPM', dok: 'wau',
    teks: 'Penguasaan kurikulum Bahasa Inggeris diserlahkan melalui lebih dua puluh episod DidikTV KPM sepanjang 2022 hingga 2025.',
    butir: [
      'Penyampai DidikTV KPM 2022–2025',
      'Surat panggilan rakaman 6 Februari, 16 April dan 12 Jun 2025',
    ],
  },
  {
    no: '6.4', tajuk: 'Bahan sumber teknologi pendidikan', dok: 'wau',
    teks: 'Kehadiran dalam ruang digital dengan bahan yang boleh diguna semula oleh guru lain, secara percuma.',
    butir: [
      'Lebih 20 set permainan tatabahasa dalam talian di Blooket',
      'Perkongsian bahan PdPC menerusi Telegram dan Facebook',
      'Perkongsian idea PdPC menerusi TikTok',
      'Perkongsian video menerusi laman YouTube',
      'Perkongsian bahan rujukan menerusi Ruang Ilmu DELIMa KPM',
    ],
  },
  {
    no: '6.5', tajuk: 'Ahli panel', dok: 'wau',
    teks: 'Jemputan sebagai ahli panel dan tetamu wacana profesional di peringkat negeri dan kebangsaan.',
    butir: [
      'Tetamu Podcast Bual Bestari, Sinar Harian — “PAJSK Penting Kepada Pelajar?”',
      'Ahli panel Bicara Buku Laporan Pencapaian Tujuh Teras NADI KPM 2024',
      'Ahli panel Diskusi Meja Bulat Berfokus Teacher Talk',
      'Ahli panel Forum Transformasi Kepimpinan Guru Abad 21, IPG Kampus Pendidikan Islam',
      'Ahli panel Podcast Pentaksiran Bilik Darjah Negeri Selangor 2025',
      'Tetamu Podcast DILEA Studio — Think Local, Speak Global!',
    ],
  },
  {
    no: '6.6', tajuk: 'Penulis', dok: 'kajian',
    teks: 'Tiga buah buku cerita dan sebuah modul yang memiliki ISBN tersendiri setelah didaftarkan di Perpustakaan Negara Malaysia.',
    butir: [
      'Buku cerita Bahasa Inggeris pertama (2019), kedua (2022) dan ketiga (2025)',
      'Modul MMI Part 5 UASA',
      'Panel penulis Modul Pentaksiran Bilik Darjah untuk kelas padat',
      'Panel penulis Modul Bimbingan MOBIM Tahap 2',
      'Modul intervensi murid PBD TP1 &amp; TP2 dalam kemahiran membaca',
    ],
  },
  {
    no: '6.7', tajuk: 'Kemenjadian murid', dok: 'kemenjadian',
    teks: 'Enam belas kisah kemenjadian murid, daripada johan peringkat negeri hinggalah bekas murid yang kini menjadi guru pelatih dan pelajar seni lakon.',
    butir: [
      'Johan English Sketch dan Poetry Recitation peringkat negeri Selangor',
      'Anugerah Emas Show and Tell peringkat kebangsaan',
    ],
    pautan: 'kemenjadian.html',
  },
  {
    no: '6.8', tajuk: 'Kelas kondusif', dok: 'wau',
    teks: 'Evidens usaha membina persekitaran bilik darjah yang kondusif untuk pembelajaran Bahasa Inggeris.',
    butir: [],
  },
];

const PERINGKAT_SOKONGAN = [
  ['Antarabangsa', 'Pembentang di 1st International Conference on Digital Innovations in Education and Social Sciences; penceramah Bengkel English Empowered Hands-on Pedagogy for Early Childhood Students (UCMI, 14 Jun 2025) dan Bengkel English Empowered AI Tools (UCMI, 17 Ogos 2024); pembentang K-SEMANIS 2024 dan 2025.'],
  ['Kebangsaan', 'Sepuluh evidens termasuk Bronze Kajian Tindakan UPSI 2026, pengacara program kelolaan Petrosains, dan surat panggilan rakaman DidikTV KPM.'],
  ['Negeri', 'Sepuluh evidens termasuk tetamu jemputan Podcast Bual Bestari Sinar Harian dan sumbangan peringkat negeri Selangor.'],
  ['Daerah / Zon', 'Sepuluh evidens sumbangan, pelibatan dan pencapaian peringkat daerah Klang dan zon.'],
  ['Institusi', 'Sepuluh evidens sumbangan dan pencapaian di peringkat SK Abdul Samat.'],
];

function halamanWau() {
  const badan = `
${kepalaLaman('Bahagian 4.0 · 6.0', 'Faktor WAU & anugerah kecemerlangan',
    'Lapan faktor WAU yang merangkumkan sumbangan di luar bilik darjah — dan dua anugerah kecemerlangan terkini di peringkat kebangsaan.')}

<section class="sek">
  <div class="balut">
    <div class="belah">
      <div>
        <span class="label label-merah" style="margin-bottom:var(--r3)">Naratif</span>
        <h2>Ruang dan Peluang</h2>
        <div class="utama-teks" style="margin-top:var(--r4)">
          <p>Lantikan sebagai Master Trainer CEFR pada 2016 bukan pengiktirafan semata-mata, tetapi mandat untuk membina suara yang mampu mengangkat wacana ilmu ke pentas yang lebih bermakna — memimpin bengkel, melatih guru-guru dan membentuk generasi pendidik yang bukan sahaja fasih kurikulum, malah berjiwa empati.</p>
          <p>Di sebalik layar, sumbangan diteruskan sebagai panel penulis dua modul di Bahagian Pembangunan Kurikulum. Tiga buah buku cerita dan sebuah modul yang memiliki ISBN tersendiri menjadi saksi bahawa bahasa mampu membentuk jiwa, dan cerita mampu membina makna.</p>
        </div>
        <div class="btn-baris" style="margin-top:var(--r5)">${pautanEvidens('wau', 'Buka Bahagian 6.0 (69 hlm.)')}</div>
      </div>
      <blockquote class="petikan">
        <p>“Namun, Kemenjadian Murid tetap menjadi keutamaan. Ia bukan slogan, tetapi doa yang dijelmakan dalam tindakan dan pencapaian.”</p>
        <footer>Faktor WAU · hlm. 206</footer>
      </blockquote>
    </div>
  </div>
</section>

<section class="sek sek-kelabu" id="anugerah">
  <div class="balut">
    ${kepalaSek({
      label: 'Bahagian 4.0',
      tajuk: 'Anugerah kecemerlangan &amp; pengiktirafan terkini',
      pengenalan: 'Lima evidens anugerah, termasuk dua pencapaian dalam pertandingan kajian tindakan peringkat kebangsaan.',
    })}
    <div class="grid grid-2">
      ${kad({
        label: 'Gold Award', emas: true,
        tajuk: 'Best Innovation Gold Award',
        teks: 'Bagi abstrak kajian <em>“Improving English Essay Writing Skills Among Year 6 Gigih Pupils Through the Use of Google Gemini Application”</em>.',
        kaki: pautanEvidens('anugerah'),
      })}
      ${kad({
        label: 'Bronze · 10 Januari 2026', emas: true,
        tajuk: 'Pertandingan Kajian Tindakan (Terbuka) — Karnival Pengajian Pendidikan 2026',
        teks: 'Peringkat kebangsaan, anjuran Jabatan Pengajian Pendidikan, Fakulti Pembangunan Manusia, Universiti Pendidikan Sultan Idris. Tajuk: <em>Meningkatkan Penguasaan Menulis Emel Bahasa Inggeris Menerusi Aplikasi Gemini</em>.',
        kaki: pautanEvidens('anugerah'),
      })}
    </div>
  </div>
</section>

<section class="sek">
  <div class="balut">
    ${kepalaSek({ label: 'Bahagian 6.0', tajuk: 'Lapan faktor WAU' })}
    <div class="grid grid-2">
      ${WAU.map((w) => kad({
        label: `Faktor ${w.no}`,
        tajuk: w.tajuk,
        teks: w.teks,
        butir: w.butir,
        kaki: w.pautan
          ? `<a class="btn btn-garis btn-kecil" href="${w.pautan}">Lihat halaman <span aria-hidden="true">→</span></a>`
          : pautanEvidens(w.dok),
      })).join('\n      ')}
    </div>
  </div>
</section>

<section class="sek sek-kelabu">
  <div class="balut">
    ${kepalaSek({
      label: 'Bahagian 1.11',
      tajuk: 'Sumbangan merentas lima peringkat',
      pengenalan: 'Fail sokongan 64 halaman disusun mengikut peringkat, dengan sepuluh evidens bagi setiap peringkat kebangsaan, negeri, daerah dan institusi.',
    })}
    <div class="grid" style="gap:var(--r3)">
      ${PERINGKAT_SOKONGAN.map(([p, k]) => kad({ label: 'Peringkat', tajuk: p, teks: k, padat: true })).join('\n      ')}
    </div>
    <div class="btn-baris" style="margin-top:var(--r5)">${pautanEvidens('sijil', 'Buka fail sokongan (64 hlm.)')}</div>
  </div>
</section>
`;
  return susunan({
    fail: 'wau.html',
    tajuk: 'Faktor WAU & Anugerah',
    huraian: 'Lapan faktor WAU: Edufluencer KPM, juruacara majlis, penyampai DidikTV KPM, bahan sumber teknologi, ahli panel, penulis, kemenjadian murid dan kelas kondusif.',
    badan,
  });
}

/* ==================================================== HALAMAN: KEMENJADIAN */

const KEMENJADIAN = [
  ['Auni Hannani binti Hasbuddin', 'Guru pembimbing Poetry Recitation', 'Pasukan SK Abdul Samat mendapat tempat ke-3 peringkat negeri Selangor tahun 2022. Auni kini pelajar Tingkatan 3 di MRSM ATM Bera, Pahang.'],
  ['Muhamad Syakir bin Kamaruzaman', 'Bimbingan intensif temuduga IPG', 'Selepas sesi bimbingan intensif persediaan temuduga kemasukan ke Institut Pendidikan Guru, Syakir ditawarkan jurusan TESL di IPG Kampus Tuanku Bainun.'],
  ['Pasukan Trio Monodrama “Kasih Yang Tersisa”', 'Penulis skrip &amp; jurulatih', 'Menghasilkan skrip dalam Bahasa Melayu dan berguru dengan rakan dalam bidang teater untuk memahami konsep trio monodrama. Beraksi di Auditorium Dewan Bahasa dan Pustaka. Salah seorang murid, Damia Qisya, kini pelajar seni lakon di Sekolah Seni Malaysia Kuala Lumpur.'],
  ['Areff Jeffre anak Johan — SK Sungai Bumbun (A)', 'Ketua jurulatih negeri Selangor', 'Naib Johan Poem Recitation, Karnival Pendidikan Murid Orang Asli peringkat kebangsaan 2025. Sebagai Ketua Hakim peringkat negeri Selangor, diberi mandat JPN Selangor menjadi ketua jurulatih — membantu memperbaiki teks sajak, sebutan dan gaya persembahan. Kejayaan ini memecahkan kemarau pencapaian Selangor bagi kategori ini di peringkat kebangsaan.'],
  ['Pasukan Scrabble sekolah', 'Jurulatih', 'Buat pertama kalinya pasukan Scrabble SK Abdul Samat menduduki kelompok 30 terbaik daripada hampir 80 sekolah rendah di daerah Klang.'],
  ['Pasukan TKRS sekolah', 'Jurulatih pengucapan awam', 'Latihan intensif selama seminggu semasa waktu rehat dan selepas PdPC untuk 10 kadet TKRS, dengan penghasilan lebih 20 teks pidato. Kesemua kadet berjaya dinaikkan pangkat sebagai Koperal TKRS.'],
  ['Pasukan Show and Tell', 'Anugerah Emas peringkat kebangsaan', 'Membimbing, melatih, menyediakan skrip serta merekod pembentangan bagi pertandingan Show &amp; Tell sempena Karnival HIP peringkat kebangsaan 2024.'],
  ['Muhammad Daaris Amsyar bin Mohd Rozi', 'Tempat ke-4 Dare to Spell PPD Klang', 'Berjaya mendapat tempat ke-4 daripada 70 peserta keseluruhan di peringkat PPD Klang.'],
  ['Pasukan English Sketch SKAS', 'Johan negeri Selangor 2022', 'Melatih hampir 20 murid selama hampir 3 bulan untuk sebuah pementasan. Pasukan drama Bahasa Inggeris 2021 dan 2022, diangkat sebagai Johan peringkat negeri Selangor pada 2022.'],
  ['Pasukan Poetry Recitation SK Abdul Samat', 'Johan Karnival Koakademik Selangor 2023', 'Berganding bahu bersama Cikgu Nazirah menukilkan sebuah sajak yang berjaya menjadi Johan dalam Karnival Koakademik Bahasa Inggeris peringkat negeri Selangor tahun 2023.'],
  ['Dua murid — bacaan doa &amp; lafaz ikrar', 'AJK acara peringkat kebangsaan', 'Dua murid terpilih oleh pihak penganjur untuk mengetuai bacaan doa dan lafaz ikrar dalam pertandingan akhir Seni Kraf Kolaj peringkat kebangsaan 2024 — dalam program yang sama, calon bertugas sebagai juruacara majlis.'],
  ['Abid, Nadia, Rizqi &amp; Cinta', 'Bakat pengacaraan', 'Abid dan Nadia kini pelajar IPGM Kampus Bahasa Antarabangsa. Rizqi dan Cinta kini di sekolah menengah dan masih menggalas tugas sebagai pengacara majlis rasmi di sekolah mereka.'],
  ['53 murid — Pidato 3 Minit Bahasa Inggeris', 'Aspirasi MADANI KPM 2024', 'Penyertaan 53 murid dalam pertandingan pidato 3 minit Bahasa Inggeris.'],
  ['Pasukan Choral Speaking SK Abdul Samat', 'Peringkat negeri Selangor 2022', 'Mara ke peringkat negeri Selangor pada tahun 2022.'],
  ['HIP: Let’s Read and Share', 'Peringkat kebangsaan 2021', 'Penyertaan dalam pertandingan HIP: Let’s Read and Share peringkat kebangsaan.'],
  ['Show and Tell HIPMAX', 'Pencapaian Emas kebangsaan 2024', 'Pencapaian Emas dalam pertandingan Show and Tell HIPMAX peringkat kebangsaan 2024.'],
];

function halamanKemenjadian() {
  const badan = `
${kepalaLaman('Bahagian 6.7', 'Kemenjadian murid',
    'Enam belas kisah kemenjadian yang direkodkan dalam portfolio — pencapaian pertandingan, bimbingan individu, dan bekas murid yang kini meneruskan jejak dalam pendidikan dan seni.')}

<section class="sek">
  <div class="balut">
    <div class="belah" style="margin-bottom:var(--r6)">
      <blockquote class="petikan">
        <p>“Kemenjadian Murid tetap menjadi keutamaan. Ia bukan slogan, tetapi doa yang dijelmakan dalam tindakan dan pencapaian.”</p>
        <footer>Faktor WAU · hlm. 206</footer>
      </blockquote>
      ${kad({
        label: 'Video khas',
        tajuk: 'Testimoni bekas anak-anak didik',
        teks: 'Sebuah video khas menghimpunkan testimoni bekas murid, disertakan dalam portfolio sebagai kod QR. Terdapat juga tiga catatan bertulis daripada bekas murid SK Abdul Samat.',
        kaki: pautanEvidens('kemenjadian', 'Buka Bahagian 6.7 (24 hlm.)'),
      })}
    </div>
    <div class="grid grid-2">
      ${KEMENJADIAN.map(([nama, peranan, teks], i) => kad({
        label: `Kemenjadian ${String(i + 1).padStart(2, '0')} · ${peranan}`,
        tajuk: nama,
        teks,
      })).join('\n      ')}
    </div>
  </div>
</section>
`;
  return susunan({
    fail: 'kemenjadian.html',
    tajuk: 'Kemenjadian Murid',
    huraian: 'Enam belas kisah kemenjadian murid di bawah bimbingan Mohd Haiqal bin Abdullah Chik — johan peringkat negeri, anugerah emas kebangsaan dan bimbingan individu.',
    badan,
  });
}

/* ====================================================== HALAMAN: TESTIMONI */

/* Kesepuluh individu ini muncul dalam SATU video yang sama. */
const SUARA_VIDEO = [
  ['Pn. Rozana Adam', 'Guru Besar SK Abdul Samat'],
  ['Pn. Azrina Hadzman', 'PK Kokurikulum SKAS'],
  ['Pn. Ainul Husna', 'Ketua Panitia Bahasa Inggeris'],
  ['Pn. Saranya', 'Guru Bahasa Inggeris SKAS'],
  ['Pn. Mazuwin Mailan', 'AKP SK Abdul Samat'],
  ['Pn. Aminah &amp; En. Raja', 'Pengawal keselamatan sekolah'],
  ['Pn. Fadzlena &amp; Pn. Salmah', 'Pengurusan DidikTV KPM'],
  ['En. Muhammad Nazmi', 'World Teacher Prize 2025'],
  ['Pn. Anizah', 'Wakil ibu bapa'],
  ['Pn. Suaibah', 'NYDP PIBG SKAS'],
];

const TESTIMONI_TULIS = [
  'Bekas Penolong Kanan Pentadbiran',
  'Bekas Guru Besar SK Abdul Samat',
  'Rakan guru panitia Bahasa Inggeris (dua testimoni)',
  'Pegawai SISC+ PPD Klang',
];

function halamanTestimoni() {
  const badan = `
${kepalaLaman('Bahagian 7.0 · 8.0', 'Testimoni & penghargaan',
    'Sebuah video testimoni yang menghimpunkan sepuluh suara — pentadbir, rakan guru, kakitangan sekolah, pengurusan DidikTV KPM dan wakil ibu bapa — serta lima testimoni bertulis.')}

<section class="sek">
  <div class="balut">
    ${kepalaSek({
      label: 'Bahagian 7.0',
      tajuk: 'Video testimoni',
      pengenalan: 'Satu video khas merakamkan pandangan rakan pentadbir, guru, kakitangan sekolah dan ibu bapa terhadap calon.',
      tengah: true,
    })}
    <div style="max-width:900px;margin-inline:auto">
      ${video(VIDEO.testimoni)}
      <div class="btn-baris btn-baris-tengah" style="margin-top:var(--r4)">${pautanYouTube(VIDEO.testimoni.id)}</div>

      <div style="margin-top:var(--r7)">
        <span class="label label-merah" style="margin-bottom:var(--r3)">Sepuluh suara dalam video ini</span>
        <ul class="senarai-nama">
          ${SUARA_VIDEO.map(([nama, jawatan]) => `<li><strong>${nama}</strong><span>${jawatan}</span></li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="sek sek-kelabu">
  <div class="balut">
    ${kepalaSek({ label: 'Testimoni bertulis', tajuk: 'Lima testimoni bertulis' })}
    <div class="belah">
      ${kad({
        label: 'Bahagian 7.0',
        tajuk: 'Daripada pentadbir, rakan guru dan pegawai SISC+',
        butir: TESTIMONI_TULIS,
        kaki: pautanEvidens('testimoni', 'Buka Bahagian 7.0'),
      })}
      <div>${kadDokSolo('testimoni', 'Senarai penuh pemberi testimoni, kod QR video khas dan salinan testimoni bertulis.')}</div>
    </div>
  </div>
</section>

<section class="sek">
  <div class="balut">
    ${kepalaSek({ label: 'Bahagian 8.0', tajuk: 'Seuntai kata untuk dirasa' })}
    <div class="belah">
      <div class="utama-teks">
        <p>Penghargaan dirakamkan kepada barisan pentadbir SK Abdul Samat yang diterajui oleh <strong>Encik Faridzul Azwan bin Mohd Kamarudin</strong>, serta rakan-rakan guru yang sentiasa memberi ruang, peluang dan kepercayaan untuk terus meneroka potensi diri dan menyumbang bakti dalam pelbagai lapangan di pelbagai peringkat.</p>
        <p>Penghargaan juga ditujukan kepada para pegawai di peringkat Kementerian Pendidikan, JPN Selangor dan PPD Klang atas bimbingan, kepercayaan dan peluang yang diberikan — serta kepada isteri, anak-anak dan seluruh keluarga yang memahami dan menguatkan sepanjang perjalanan kerjaya ini.</p>
        <div class="btn-baris" style="margin-top:var(--r5)">${pautanEvidens('penghargaan', 'Buka Bahagian 8.0')}</div>
      </div>
      <blockquote class="petikan">
        <p>“Tidak dilupakan para ibu bapa, anak-anak murid yang saya kasihi serta bekas anak-anak didik yang telah menjadikan saya guru yang lebih sabar dan lebih matang hari ini. Kalianlah sebab saya terus bangkit dengan semangat yang tidak pernah pudar.”</p>
        <footer>Penghargaan · hlm. 311</footer>
      </blockquote>
    </div>
  </div>
</section>
`;
  return susunan({
    fail: 'testimoni.html',
    tajuk: 'Testimoni & Penghargaan',
    huraian: 'Video testimoni sepuluh suara dan lima testimoni bertulis daripada pentadbir, rakan guru, pengurusan DidikTV KPM dan pegawai SISC+ PPD Klang.',
    badan,
  });
}

/* ======================================================== HALAMAN: DOKUMEN */

const SUSUN_DOK = [
  ['Pengenalan', ['resume']],
  ['Bahagian 1.0 – 1.11 · Dokumentasi', ['kompetensi', 'lnpt', 'surat', 'akademik', 'perkhidmatan', 'harta', 'jadual', 'sijil']],
  ['Bahagian 2.0 – 5.0 · Kompetensi profesional', ['program', 'kajian', 'anugerah', 'inovasi']],
  ['Bahagian 6.0 – 8.0 · Faktor WAU, testimoni & penghargaan', ['wau', 'kemenjadian', 'testimoni', 'penghargaan']],
];

function halamanDokumen() {
  const jumlahHlm = Object.values(DOK).reduce((a, d) => a + d.hlm, 0);
  const badan = `
${kepalaLaman('Arkib', 'Arkib dokumen permohonan',
    `Kesemua ${Object.keys(DOK).length} fail PDF yang dikemukakan bersama permohonan ini — sebanyak ${jumlahHlm} halaman evidens. Klik mana-mana kulit untuk membacanya tanpa meninggalkan laman.`)}

<section class="sek">
  <div class="balut">
    ${SUSUN_DOK.map(([tajuk, senarai]) => `<div style="margin-bottom:var(--r7)">
      <h2 style="font-size:1.28rem;margin-bottom:var(--r4)">${tajuk}</h2>
      <div class="dok-grid">
        ${senarai.map((k) => kadDok(k)).join('\n        ')}
      </div>
    </div>`).join('\n    ')}

    <div class="hubungi">
      <span class="lencana">Sumber asal</span>
      <h2>Folder dokumen di Google Drive</h2>
      <p>Setiap dokumen dalam laman ini dipaparkan terus daripada folder Drive asal, tanpa salinan berasingan. Sebarang kemas kini pada fail Drive akan terus terpapar di sini.</p>
      <div class="btn-baris">
        <a class="btn btn-utama" href="https://drive.google.com/drive/folders/${CALON.folderDrive}" target="_blank" rel="noopener">Buka folder di Drive</a>
      </div>
    </div>
  </div>
</section>
`;
  return susunan({
    fail: 'dokumen.html',
    tajuk: 'Arkib Dokumen',
    huraian: `Kesemua ${Object.keys(DOK).length} fail PDF permohonan Guru Cemerlang — ${jumlahHlm} halaman evidens.`,
    badan,
  });
}

/* ------------------------------------------------------------------- TULIS */

const HALAMAN = {
  'index.html': halamanUtama(),
  'profil.html': halamanProfil(),
  'kepakaran.html': halamanKepakaran(),
  'wau.html': halamanWau(),
  'kemenjadian.html': halamanKemenjadian(),
  'testimoni.html': halamanTestimoni(),
  'dokumen.html': halamanDokumen(),
};

mkdirSync(AKAR, { recursive: true });
for (const [fail, isi] of Object.entries(HALAMAN)) {
  writeFileSync(join(AKAR, fail), isi, 'utf8');
  console.log(`✓ ${fail}  (${(isi.length / 1024).toFixed(1)} KB)`);
}
console.log(`\nSiap. ${Object.keys(HALAMAN).length} halaman dijana di ${AKAR}`);
