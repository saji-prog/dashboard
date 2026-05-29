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

## Integrasi API nyata

Saat ini menggunakan data mock. Untuk produksi:
1. Ganti `src/data/mockData.ts` dengan fetch ke API sensor/IoT
2. Hubungkan `chatWithAi` di `src/services/aiService.ts` ke OpenAI/Claude API
3. Tambahkan upload gambar untuk diagnosis berbasis visi komputer

## Tech stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Recharts
- Lucide React
