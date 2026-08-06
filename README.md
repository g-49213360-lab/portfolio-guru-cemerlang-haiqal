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

Vercel disambungkan kepada repo GitHub ini. **Setiap `git push` ke `main` akan
melancarkan deployment produksi baharu secara automatik** — tiada arahan tambahan perlu.

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
| `assets/laman.js` | Menu mudah alih + pemapar PDF |
| `assets/potret.jpg` | Potret hero (dipotong daripada halaman 1 RESUME.pdf) |
| `assets/kulit/*.jpg` | Imej muka depan setiap PDF (dijana dengan `pdftoppm`) |
| `assets/og.jpg` | Imej pratonton 1200×630 untuk WhatsApp / Telegram / Facebook |
| `assets/qr/kad-qr-cetak.png` | **Kad QR sedia cetak** 2000×2600 — untuk borang permohonan atau kulit fail |
| `assets/qr/qr-mrmohdhaiqal.png` | Kod QR sahaja, 1400×1400 PNG |
| `assets/qr/qr-mrmohdhaiqal.svg` | Kod QR vektor — guna ini jika perlu dibesarkan untuk poster |

Kod QR menggunakan aras pembetulan ralat **H** (tahan sehingga 30% kerosakan cetakan)
dan telah dinyahkod semula untuk mengesahkan ia membawa ke `https://mrmohdhaiqal.vercel.app`.

## Cara mengemas kini kandungan

Semua teks, senarai dan ID fail Drive terkumpul dalam `bina.mjs`. Selepas mengedit:

```bash
node bina.mjs
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

## Nota teknikal

- `<meta name="robots" content="noindex, nofollow">` disetkan pada setiap halaman supaya
  laman tidak diindeks oleh enjin carian. Buang jika mahu laman boleh dicari.
- Tiada CDN, tiada fon luar, tiada penjejak. Sesuai untuk hos statik mana-mana.
- Boleh dicetak — gaya cetak disertakan (`@media print`).
