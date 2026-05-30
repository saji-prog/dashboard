<!-- QUICK START: INTEGRASI BMKG -->

# 🚀 Quick Start - Integrasi API BMKG

Panduan cepat untuk mulai menggunakan cuaca BMKG di aplikasi Anda.

---

## ✅ **Step 1: Backend - Cek Endpoint**

Pastikan backend sudah jalan:
```powershell
cd backend
npm run start:dev
```

Test endpoint:
```powershell
# Test mock data
curl http://localhost:3000/api/weather/mock

# Test API BMKG real (default: DKI Jakarta > Jakarta Pusat)
curl http://localhost:3000/api/weather

# Test dengan custom lokasi
curl "http://localhost:3000/api/weather?province=Jawa%20Barat&district=BANDUNG"
```

---

## ✅ **Step 2: Frontend - Tampilkan Widget**

### **Option A: Pakai Component Siap Pakai**

Buka `src/App.tsx` atau halaman dashboard Anda:

```tsx
import { BmkgWeatherWidget } from './components/BmkgWeatherWidget';

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Default: DKI Jakarta */}
      <BmkgWeatherWidget />
      
      {/* Atau dengan lokasi custom */}
      <BmkgWeatherWidget 
        province="Jawa Barat" 
        district="BANDUNG" 
      />
    </div>
  );
}
```

### **Option B: Pakai Service Langsung**

```tsx
import { useEffect, useState } from 'react';
import { fetchWeather, WeatherData } from '../services/weatherService';

export default function MyWeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchWeather('Jawa Barat', 'BANDUNG');
        setWeather(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!weather) return <p>Error</p>;

  return (
    <div>
      <h2>{weather.weather}</h2>
      <p>Suhu: {weather.temperature}°C</p>
      <p>Kelembaban: {weather.humidity}%</p>
    </div>
  );
}
```

---

## 📍 **Lokasi yang Tersedia**

### **Jawa Barat:**
- BANDUNG
- BANJAR
- BOGOR
- CIAMIS
- CIREBON
- GARUT
- INDRAMAYU
- KARAWANG
- KUNINGAN
- MAJALENGKA
- PANGANDARAN
- PURWAKARTA
- SUBANG
- SUKABUMI
- SUMEDANG
- TASIKMALAYA

### **Jawa Timur:**
- SURABAYA
- MALANG
- SIDOARJO
- PASURUAN
- BANYUWANGI
- JEMBER
- dll... (lihat INTEGRASI_BMKG.md untuk lengkap)

### **DKI Jakarta:**
- JAKARTA PUSAT
- JAKARTA BARAT
- JAKARTA TIMUR
- JAKARTA SELATAN
- JAKARTA UTARA

*Untuk daftar lengkap: gunakan `getProvinces()` dan `getDistricts()` dari `src/data/bmkgLocations.ts`*

---

## 🔧 **Testing Commands**

### **Backend Test:**
```bash
# Terminal 1: Backend
cd dashboard/backend
npm run start:dev

# Terminal 2: Test curl
curl http://localhost:3000/api/weather/mock
curl "http://localhost:3000/api/weather?province=Jawa%20Barat&district=BANDUNG"
```

### **Frontend Test:**
```bash
# Terminal 3: Frontend
cd dashboard
npm run dev

# Buka http://localhost:5173 di browser
# Jika pakai BmkgWeatherWidget, harus backend jalan di port 3000
```

---

## 📊 **Hasil Expected**

### **Backend Response (Mock):**
```json
{
  "datetime": "2025-05-30T15:00:00.000Z",
  "temperature": 30,
  "temperatureMax": 34,
  "temperatureMin": 24,
  "temperatureFeels": 32,
  "humidity": 80,
  "windSpeed": 3,
  "windDirection": 270,
  "weather": "Hujan Sedang",
  "pressure": 1010,
  "visibility": 10,
  "sunDuration": 2,
  "latitude": -6.2087,
  "longitude": 106.8456,
  "operator": "BMKGBogor"
}
```

### **Frontend Widget (Visual):**
```
┌─────────────────────────────┐
│ ☁️  Cuaca                    │
│     JAKARTA PUSAT, DKI Jakarta │
│                             │
│         30°C                │
│     Hujan Sedang            │
│     Terasa seperti 32°C     │
│                             │
│ Maksimal: 34°C | Minimal: 24°C │
│                             │
│ 💧 Kelembaban: 80%         │
│ 💨 Angin: 3 knot           │
│ 👁️  Jarak pandang: 10 km   │
│                             │
│ 💡 Rekomendasi Pertanian:   │
│ Cuaca hujan - Kurangi irigasi │
│                             │
│ Update: 30 Mei 2025, 15:00  │
│ Sumber: BMKGBogor           │
└─────────────────────────────┘
```

---

## ⚠️ **Troubleshooting**

### **Backend Error: ECONNREFUSED**
```
Error: ECONNREFUSED at http://localhost:3000/api/weather
```
→ Backend belum jalan, jalankan: `npm run start:dev` di folder `backend`

### **Frontend Error: CORS**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
→ Pastikan backend URL benar di `weatherService.ts`

### **Lokasi Tidak Ditemukan**
```
Error: Failed to fetch weather from BMKG
```
→ Cek format nama province/district, gunakan `getProvinces()` untuk validasi

### **API BMKG Timeout**
```
Error: Failed to fetch weather from BMKG: timeout
```
→ BMKG server sedang down, sistem fallback ke mock data otomatis

---

## 🎯 **Next Steps**

1. ✅ **Test backend endpoint** - curl di terminal
2. ✅ **Import component** - BmkgWeatherWidget ke App.tsx
3. ✅ **Check tampilan** - Buka browser, lihat widget
4. ✅ **Integrasikan ke dashboard** - Letakkan di halaman utama
5. ✅ **Gunakan data untuk AI** - Kirim cuaca ke AI diagnosis

---

## 📚 **File Reference**

- **Backend Service:** `backend/src/weather/weather.service.ts`
- **Backend Controller:** `backend/src/weather/weather.controller.ts`
- **Frontend Service:** `src/services/weatherService.ts`
- **Frontend Component:** `src/components/BmkgWeatherWidget.tsx`
- **Lokasi Data:** `src/data/bmkgLocations.ts`
- **Dokumentasi Lengkap:** `INTEGRASI_BMKG.md`

---

## 🔗 **Useful Links**

- BMKG Data API: https://data.bmkg.go.id/
- Weather Data Docs: https://data.bmkg.go.id/DataMKG/MEWS/
