# 📄 ATS CV & Developer Portfolio - Fadilah Riczky

Website portofolio profesional dan ATS Resume interaktif berbasis **Astro SSG** (Static Site Generator) dengan dukungan konten terpusat **Markdown & YAML**, SEO teroptimasi, domain kustom `fadilahriczky.web.id`, dan siap di-deploy ke **GitHub Pages**.

---

## ✨ Fitur Unggulan

- 🏛️ **Monochrome ATS Design**: Desain profesional dengan kontras teks 2 warna murni (Hitam & Putih), border serba siku (`0px`), dan tata letak ringkas yang disukai *recruiter* & sistem ATS.
- 🗂️ **Terorganisir di Folder `content/`**:
  - `content/data/`: Data CV terpisah per kategori (`personal.yaml`, `summary.yaml`, `experience.yaml`, `skills.yaml`, `education.yaml`, `community.yaml`).
  - `content/blog/`: Artikel teknologi berbasis Markdown.
  - `content/speakers/`: Sesi pembicara & workshop lengkap dengan poster asli dan tautan slide/video.
  - `content/projects/`: Portofolio proyek & otomatisasi infrastruktur DevOps.
  - `content/community/`: Aktivitas kepemimpinan & keterlibatan komunitas tech.
- 🖨️ **Ultra-Compact ATS Print & PDF**: Dukungan pencetakan PDF instan via `@media print` dengan pengaturan otomatis menyembunyikan header/footer bawaan browser (*date, URL, page number*).
- 🌓 **Zero-Flicker Light / Dark Mode**: Pergantian tema gelap/terang tanpa adanya kilatan warna (*no theme flicker / FOUT*) saat berpindah halaman.
- 🔍 **SEO & Search Engine Ready**:
  - Domain Kustom: `https://fadilahriczky.web.id/`
  - Berkas `CNAME` & `robots.txt` otomatis.
  - Penjana `sitemap.xml` dinamis berbasis route & konten.
  - Terintegrasi OpenGraph, Twitter Cards, dan Structured Data (JSON-LD Schema.org `Person`).

---

## 📁 Struktur Berkas Konten (`content/`)

```text
about-me/
├── content/
│   ├── data/                 # Berkas Data CV (YAML)
│   │   ├── personal.yaml
│   │   ├── summary.yaml
│   │   ├── experience.yaml
│   │   ├── skills.yaml
│   │   ├── education.yaml
│   │   └── community.yaml
│   ├── blog/                 # Artikel Blog (Markdown)
│   ├── speakers/             # Sesi Pembicara & Workshop (Markdown)
│   ├── projects/             # Portofolio Proyek (Markdown)
│   └── community/            # Profil Detail Komunitas (Markdown)
├── public/
│   ├── CNAME                 # Custom Domain GitHub Pages (fadilahriczky.web.id)
│   ├── robots.txt            # Instruksi Crawler Search Engine
│   └── posters/              # Poster Asli Sesi Pembicara
└── src/
    ├── pages/                # Route Statis Astro
    └── utils/                # Utility Loader YAML & Markdown
```

---

## 🚀 Cara Menjalankan Secara Lokal

```bash
# 1. Clone repository
git clone git@github.com:itsmefdil/about-me.git
cd about-me

# 2. Install dependencies
npm install

# 3. Jalankan server pengembangan
npm run dev

# Server akan berjalan di http://localhost:4321
```

---

## 📦 Command Build & Pratinjau

```bash
# Build static site ke folder dist/
npm run build

# Preview hasil build lokal
npm run preview
```

---

## 🌐 Deployment ke GitHub Pages

Repository ini sudah dilengkapi dengan berkas konfigurasi **GitHub Actions Workflow** di `.github/workflows/deploy.yml` dan **`CNAME`** untuk custom domain (`fadilahriczky.web.id`).

1. Push perubahan ke GitHub:
   ```bash
   git add .
   git commit -m "feat: update portfolio content & features"
   git push -u origin main
   ```
2. Buka repository GitHub di browser ➔ masuk ke **Settings > Pages**.
3. Pada opsi **Source**, pilih **GitHub Actions**.
4. Website akan otomatis di-build dan dipublikasikan ke `https://fadilahriczky.web.id/`.

---

## 📜 Lisensi & Hak Cipta
Hak Cipta © {new Date().getFullYear()} **Fadilah Riczky**. Dibuat dengan [Astro](https://astro.build).
