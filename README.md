# AgriMonitor — Dashboard Monitoring Pertanian

Dashboard monitoring pertanian dengan fitur AI untuk memantau lahan, sensor, cuaca, dan mendapatkan rekomendasi cerdas.

## Fitur

### Monitoring
- **Dashboard real-time** — kesehatan tanaman, kelembaban tanah, suhu, prediksi panen
- **Manajemen lahan** — 4 blok dengan data sensor (NDVI, pH, kelembaban)
- **Grafik sensor** — tren kelembaban, suhu, kelembaban udara per jam
- **Prakiraan cuaca** — 4 hari ke depan
- **Pusat peringatan** — hama, kekeringan, irigasi, cuaca

### AI Assistant
- **Chat AI** — tanya kondisi kebun, irigasi, cuaca, prediksi panen
- **Diagnosis penyakit** — analisis gejala tanaman (daun kuning, bercak, hama, layu)
- **Rekomendasi otomatis** — saran irigasi, inspeksi, koreksi pH berdasarkan data sensor

## Menjalankan

### Cara termudah (jika `npm` tidak dikenali di terminal)

PowerShell di folder proyek:

```powershell
.\dev.ps1
```

Atau double-click file **`dev.bat`**.

### Cara normal

```bash
npm install
npm run dev
```

Buka http://localhost:5173 di browser.

### `npm` tidak dikenali?

Node.js sudah terpasang, tapi terminal Cursor perlu PATH terbaru. Pilih salah satu:

1. **Jalankan `.\dev.ps1`** (disarankan)
2. **Tutup semua terminal**, buka terminal baru, lalu `npm run dev`
3. **Restart Cursor** sepenuhnya
4. Atau jalankan sekali di terminal yang sama:
   ```powershell
   $env:Path = "C:\Program Files\nodejs;" + $env:Path
   npm run dev
   ```

## Build produksi

```bash
npm run build
npm run preview
```

## Backend (NestJS)

Folder `backend/` — REST API + database SQLite.

```powershell
# Terminal 1 — backend
cd backend
.\setup.ps1
npm run start:dev

# Terminal 2 — frontend
cd ..
.\dev.ps1
```

Frontend otomatis proxy `/api` → `http://localhost:3000`. Badge kanan atas:
- **Backend API** — terhubung ke NestJS
- **Mock (offline)** — backend mati, pakai data lokal

Detail API: lihat [backend/README.md](backend/README.md)

## Struktur proyek

```
dashboard/
├── src/           # Frontend React
├── backend/       # NestJS + Prisma + SQLite
├── dev.ps1        # Jalankan frontend
└── backend/setup.ps1
```

## Tech stack

**Frontend:** React 19, Vite, Tailwind, Recharts  
**Backend:** NestJS, Prisma, SQLite (dev) / PostgreSQL (produksi nanti)
