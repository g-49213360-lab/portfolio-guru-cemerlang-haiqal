# Laman Web Portfolio Guru Cemerlang

**Mohd Haiqal bin Abdullah Chik** — Permohonan Guru Cemerlang DG12, Sesi 2026
Guru Bahasa Inggeris, SK Abdul Samat, Klang, Selangor

Laman web statik (HTML + CSS, tanpa pergantungan luar) yang menyusun 17 fail dokumen
permohonan — 299 halaman evidens — kepada tujuh halaman yang boleh dilayari.

## Pautan langsung

| | |
| --- | --- |
| **Utama (Vercel)** | <https://mrmohdhaiqal.vercel.app> |
| Sandaran (GitHub Pages) | <https://g-49213360-lab.github.io/portfolio-guru-cemerlang-haiqal/> |
| Repo | <https://github.com/g-49213360-lab/portfolio-guru-cemerlang-haiqal> |

### Cara melancarkan kemas kini

Laman ini diterbitkan ke Vercel di bawah skop **sir-aliff**, projek `mrmohdhaiqal`.
Selepas mengedit kandungan:

```bash
cd "laman-web" && node bina.mjs && npx vercel@latest deploy --prod --yes
```

Itu sahaja — tiada GitHub diperlukan. Vercel CLI menggunakan token sendiri, jadi
akaun `gh` yang aktif tidak penting.

Repo GitHub `g-49213360-lab/portfolio-guru-cemerlang-haiqal` masih tersambung kepada
projek Vercel, jadi `git push` ke `main` juga akan mencetuskan deployment. Tetapi push
memerlukan akaun `g-49213360-lab` aktif dalam `gh` — gunakan cara Vercel di atas untuk
mengelak kerumitan itu.

---

## Cara melihat laman ini

```bash
cd "laman-web" && python3 -m http.server 8899 --bind 127.0.0.1
```

Kemudian buka <http://127.0.0.1:8899>

## Struktur

| Fail | Kandungan |
| --- | --- |
| `index.html` | Utama — profil ringkas, statistik, sorotan pencapaian, navigasi 8 bahagian |
| `profil.html` | Bahagian 1.0–1.11 — butiran asas, kelayakan akademik, dokumen rasmi |
| `kepakaran.html` | Bahagian 2.0, 3.0, 5.0 — penulisan, kajian tindakan, inovasi, program dihadiri |
| `wau.html` | Bahagian 4.0, 6.0 — anugerah kecemerlangan dan lapan faktor WAU |
| `kemenjadian.html` | Bahagian 6.7 — 16 kisah kemenjadian murid |
| `testimoni.html` | Bahagian 7.0, 8.0 — testimoni video/bertulis dan penghargaan |
| `dokumen.html` | Arkib penuh 17 fail PDF |

| Fail | Fungsi |
| --- | --- |
| `bina.mjs` | **Semua kandungan laman ada di sini.** Edit, kemudian `node bina.mjs` |
| `assets/gaya.css` | Gaya |
| `assets/laman.js` | Menu mudah alih, penapis kemenjadian, pemapar PDF |
| `assets/fon.css` + `assets/fon/` | Fon dihoskan sendiri (lihat di bawah) |
| `assets/potret.jpg` | Potret hero (dipotong daripada halaman 1 RESUME.pdf) |
| `assets/kulit/*.jpg` | Imej muka depan setiap PDF (dijana dengan `pdftoppm`) |
| `assets/og.jpg` | Imej pratonton 1200×630 untuk WhatsApp / Telegram / Facebook |
| `assets/qr/kad-qr-cetak.png` | **Kad QR sedia cetak** 2000×2600 — untuk borang permohonan atau kulit fail |
| `assets/qr/qr-mrmohdhaiqal.png` | Kod QR sahaja, 1400×1400 PNG |
| `assets/qr/qr-mrmohdhaiqal.svg` | Kod QR vektor — guna ini jika perlu dibesarkan untuk poster |

Kod QR menggunakan aras pembetulan ralat **H** (tahan sehingga 30% kerosakan cetakan)
dan telah dinyahkod semula untuk mengesahkan ia membawa ke `https://mrmohdhaiqal.vercel.app`.

## Cara mengemas kini kandungan

Semua teks, senarai dan ID fail Drive terkumpul dalam `bina.mjs`. Selepas mengedit,
jana semula HTML dan terus lancarkan:

```bash
node bina.mjs && npx vercel@latest deploy --prod --yes
```

## Bagaimana PDF dipaparkan

PDF **tidak** disalin ke dalam laman ini. Setiap dokumen dipaparkan terus daripada
folder Google Drive asal menggunakan `https://drive.google.com/file/d/<ID>/preview`.
Kesannya:

- Laman ini kecil (± 1 MB), bukan 900 MB
- Kemas kini pada fail Drive terus terpapar di laman
- **Syarat:** folder Drive mesti kekal berkongsi "sesiapa yang mempunyai pautan boleh lihat".
  Jika perkongsian ditutup, pemapar akan gagal memuatkan.

ID fail Drive disimpan dalam objek `DOK` di dalam `bina.mjs`.

## Yang masih perlu diputuskan

1. **Nombor telefon** — sengaja tidak dipaparkan. Jika mahu, tambah pada bahagian
   `CALON` dan pada jadual di `halamanProfil()`.
2. **Nombor kad pengenalan dalam RESUME.pdf** — lihat bahagian di bawah.

Video "MY JOURNEY" (<https://youtu.be/qyhawB76ucs>) sudah terbenam di halaman Utama.

## Yang sengaja tidak dipaparkan

- Nombor kad pengenalan (ada dalam Sijil Guru Malaysia, halaman 2 Resume)
- Nombor telefon peribadi

Kedua-duanya masih boleh dilihat oleh sesiapa yang membuka fail PDF asal melalui laman ini.
Jika ini menjadi kebimbangan, hadkan perkongsian folder Drive kepada individu tertentu
sahaja — tetapi ambil perhatian bahawa pemapar PDF dalam laman ini juga akan berhenti
berfungsi untuk orang luar.

## Fon

Dihoskan sendiri — **tiada permintaan kepada Google Fonts atau mana-mana hos luar**.
Laman kekal berfungsi jika rangkaian sekolah menyekat `fonts.gstatic.com`.

| Keluarga | Guna | Fail |
| --- | --- | --- |
| Source Serif 4 | Tajuk dan petikan | `source-serif-4-normal.woff2` (101 KB), `source-serif-4-italic.woff2` (42 KB) |
| Plus Jakarta Sans | Teks badan dan antara muka | `plus-jakarta-sans-normal.woff2` (22 KB) |

Ketiga-tiganya fail *variable* — satu fail meliputi keseluruhan julat berat, jadi
tiga fail sudah memadai. Subset `latin` sahaja, dipangkas dengan `pyftsubset`
kepada ASCII penuh, Latin-1 dan tanda tipografi yang digunakan. Jumlah 164 KB
berbanding 767 KB jika semua subset dan berat dimuat turun mentah.

Kedua-dua keluarga di bawah **SIL Open Font License 1.1**, yang membenarkan
pengehosan sendiri. Untuk menjana semula selepas menukar keluarga fon, muat turun
CSS Google Fonts, ambil blok `latin` sahaja, nyahduplikasi mengikut URL, kemudian
`pyftsubset` setiap fail.

## Penapis kemenjadian

Halaman Kemenjadian mempunyai penapis: **Semua · Pertandingan · Bimbingan individu ·
Bekas murid**. Kategori setiap kisah ditetapkan dalam elemen keempat setiap baris
`KEMENJADIAN` di dalam `bina.mjs` — satu kisah boleh tergolong dalam lebih daripada
satu kategori.

Bar penapis mempunyai atribut `hidden` dalam HTML dan hanya didedahkan oleh
JavaScript, jadi tanpa JavaScript kesemua 16 kisah tetap terpapar.

## Cap versi aset

`bina.mjs` menambah `?v=<hash>` pada CSS dan JS berdasarkan kandungan fail.
Tanpa ini pelayar akan terus menghidangkan gaya lama selepas deploy.

## Nota teknikal

- `<meta name="robots" content="noindex, nofollow">` disetkan pada setiap halaman supaya
  laman tidak diindeks oleh enjin carian. Buang jika mahu laman boleh dicari.
- Tiada CDN, tiada fon luar, tiada penjejak. Sesuai untuk hos statik mana-mana.
- Boleh dicetak — gaya cetak disertakan (`@media print`).

## Menutup halaman evidens tertentu

Galeri evidens memaparkan halaman portfolio yang dirender daripada PDF. Sebahagian
halaman mengandungi data peribadi pihak ketiga — contohnya halaman 4 set
`kemenjadian` memaparkan nama penuh dan nombor kad pengenalan seorang murid dalam
surat tawaran yang ditampal ke halaman itu.

Untuk menutupnya, edit objek `KECUALI` dalam `bina.mjs`:

```js
const KECUALI = {
  kemenjadian: [4],        // nombor seperti pada kapsyen "Hlm. 4"
  sijil: [12, 30],
};
```

Kemudian:

```bash
node bina.mjs && npx vercel@latest deploy --prod --yes
```

Halaman itu hilang daripada galeri serta-merta. Fail imejnya kekal dalam
`assets/eviden/` tetapi tidak lagi dipaut dari mana-mana halaman.

**Nota:** halaman yang sama masih boleh dicapai melalui PDF asal di folder Google
Drive yang dipaut dari laman. Untuk menutupnya sepenuhnya, fail PDF di Drive
perlu diganti dengan versi yang telah ditapis.
