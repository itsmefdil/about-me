# 📄 ATS CV Portfolio - Fadilah Riczky

Website portofolio interaktif berbasis **Astro** dengan tampilan & struktur berkategori **ATS CV (Resume)** yang super ringan, cepat, dan siap di-deploy ke **GitHub Pages**.

---

## 🛠️ Cara Mengedit Data CV (`cv.yaml`)

Semua data portofolio (Nama, Kontak, Summary, Experience, Skills, Education) disimpan dalam satu file YAML terpusat:
👉 **`cv.yaml`**

Untuk mengubah atau memperbarui informasi diri:
1. Buka file `cv.yaml`.
2. Edit teks/data sesuai kebutuhan (tidak perlu mengubah struktur HTML/CSS).
3. Jalankan `npm run build` atau pusk ke GitHub, Astro akan otomatis meng-generate tampilan baru!

---

## 🚀 Cara Menjalankan Secara Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# Server akan berjalan di http://localhost:4321
```

---

## 📦 Build & Deploy ke GitHub Pages

### Opsi A: Deployment Otomatis via GitHub Actions (Rekomendasi)
Workflow `.github/workflows/deploy.yml` sudah dikonfigurasi.
1. Push repository ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial ATS CV portfolio with Astro"
   git branch -M main
   git remote add origin https://github.com/itsmefdil/about-me.git
   git push -u origin main
   ```
2. Di GitHub Repository, masuk ke **Settings > Pages**.
3. Di bagian **Source**, pilih **GitHub Actions**.
4. Website akan otomatis terdeploy dan aktif!

---

## ✨ Fitur Unggulan Portofolio
- **ATS CV Layout & Typography:** Desain profesional yang disukai recruiter & HR system.
- **Data-Driven (YAML):** Cukup edit `cv.yaml` untuk mengupdate CV.
- **Print / Save to PDF:** Tombol cetak PDF instan dengan stylesheet khusus print yang rapi.
- **Dark / Light Mode:** Switcher mode terang/gelap.
- **ATS Score Simulator:** Fitur simulator untuk mencocokkan kata kunci Job Description (JD) dengan skill Fadilah.
- **Copyable Text:** Copy ringkasan CV teks polos untuk kemudahan isi form lamaran.
