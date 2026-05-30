# 🌤️ Integrasi API BMKG ke AgriMonitor

Dokumentasi lengkap mengintegrasikan cuaca real-time dari BMKG ke dashboard pertanian.

---

## 📋 **Format Data API BMKG**

### **Endpoint BMKG**
```
https://data.bmkg.go.id/DataMKG/MEWS/LatestDetailed/{PROVINSI}/{KABUPATEN}.json
```

### **Contoh Request**
```
https://data.bmkg.go.id/DataMKG/MEWS/LatestDetailed/Jawa%20Barat/BANDUNG.json
```

### **Response JSON Dari BMKG**
```json
{
  "Datetime": "2025-05-30 15:00:00",
  "Operator": "BMKGBogor",
  "T": "30",
  "Tmax": "34",
  "Tmin": "24",
  "RealFeel": "32",
  "Hu": "80",
  "WS": "3",
  "WD": "270",
  "Weather": "Hujan Sedang",
  "VisibilityValue": "10",
  "VisibilityUnit": "km",
  "Tekanan": "1010",
  "ss": "2",
  "x_Loc_Lat": "-6.2087",
  "x_Loc_Lon": "106.8456"
}
```

### **Penjelasan Field**
| Field | Arti | Satuan |
|-------|------|--------|
| `Datetime` | Waktu pengamatan | - |
| `T` | Suhu saat ini | °C |
| `Tmax` | Suhu maksimal | °C |
| `Tmin` | Suhu minimal | °C |
| `RealFeel` | Suhu terasa | °C |
| `Hu` | Kelembaban udara | % |
| `WS` | Kecepatan angin | knot |
| `WD` | Arah angin (0-360) | derajat |
| `Weather` | Kondisi cuaca (text) | - |
| `Tekanan` | Tekanan udara | mb |
| `ss` | Lama penyinaran matahari | jam |
| `x_Loc_Lat` | Latitude | - |
| `x_Loc_Lon` | Longitude | - |

---

## 🔧 **Backend Implementation (NestJS)**

### **File yang Dibuat:**
- `src/weather/weather.service.ts` — Service handle API BMKG
- `src/weather/weather.controller.ts` — Controller expose endpoint
- `src/weather/weather.module.ts` — Module configuration

### **Endpoint Backend**

```bash
# Ambil cuaca dari BMKG (auto DKI Jakarta > Jakarta Pusat)
GET http://localhost:3000/api/weather

# Ambil cuaca dengan custom province & district
GET http://localhost:3000/api/weather?province=Jawa%20Barat&district=BANDUNG

# Ambil mock data (untuk testing)
GET http://localhost:3000/api/weather/mock
```

### **Response Format (Backend)**
```json
{
  "datetime": "2025-05-30 15:00:00",
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

---

## 🎨 **Frontend Implementation (React)**

### **File yang Dibuat:**
- `src/services/weatherService.ts` — Service fetch & process cuaca
- `src/components/BmkgWeatherWidget.tsx` — React component widget cuaca
- `src/data/bmkgLocations.ts` — Daftar lokasi BMKG

### **Cara Menggunakan di React**

#### **1. Import Component**
```tsx
import { BmkgWeatherWidget } from '../components/BmkgWeatherWidget';
```

#### **2. Render Component (Default: DKI Jakarta - Jakarta Pusat)**
```tsx
<BmkgWeatherWidget />
```

#### **3. Dengan Custom Province & District**
```tsx
<BmkgWeatherWidget 
  province="Jawa Barat" 
  district="BANDUNG" 
/>
```

#### **4. Direct Service Usage**
```tsx
import { fetchWeather, getAgriRecommendation } from '../services/weatherService';

const weather = await fetchWeather('Jawa Barat', 'BANDUNG');
const recommendation = getAgriRecommendation(weather);
console.log(recommendation);
// Output: "Cuaca panas kering - Tingkatkan irigasi, pastikan cukup air"
```

---

## 📍 **Daftar Lokasi BMKG**

**Provinsi yang didukung:** 34 provinsi + DKI Jakarta

**Contoh penggunaan:**
```tsx
import { getProvinces, getDistricts } from '../data/bmkgLocations';

// Dapatkan semua provinsi
const provinces = getProvinces();
// ["Aceh", "Bali", "Bangka Belitung", ..., "Sumatera Utara"]

// Dapatkan district di provinsi Jawa Barat
const jabarDistricts = getDistricts('Jawa Barat');
// ["BANDUNG", "BANJAR", "BOGOR", ...]
```

---

## 🚀 **Integrasi ke Dashboard Utama**

### **Option 1: Ganti WeatherWidget Lama**
Edit file `src/App.tsx` atau dashboard page Anda:

```tsx
import { BmkgWeatherWidget } from './components/BmkgWeatherWidget';

export default function Dashboard() {
  return (
    <div>
      <BmkgWeatherWidget province="DKI Jakarta" district="JAKARTA PUSAT" />
      {/* komponen lainnya */}
    </div>
  );
}
```

### **Option 2: Dapatkan Data Cuaca untuk Diagnosa AI**
```tsx
import { fetchWeather } from '../services/weatherService';

async function diagnoseWithWeather() {
  const weather = await fetchWeather('Jawa Barat', 'BANDUNG');
  
  // Kirim ke AI service untuk diagnosis lebih akurat
  const diagnosis = await aiDiagnose({
    symptoms: ['daun kuning', 'layu'],
    temperature: weather.temperature,
    humidity: weather.humidity,
    rainfall: weather.weather
  });
}
```

---

## 🔄 **Fallback & Error Handling**

Jika API BMKG **down** atau **error**, sistem otomatis fallback ke mock data:

```typescript
// Di weather.controller.ts
@Get()
async getWeather(...) {
  try {
    return await this.weatherService.getWeatherFromBMKG(province, district);
  } catch (error) {
    console.error('BMKG API error:', error.message);
    return this.weatherService.getMockWeatherData(); // ← Fallback
  }
}
```

---

## 🧪 **Testing**

### **Test dengan Mock Data**
```bash
curl http://localhost:3000/api/weather/mock
```

### **Test dengan API BMKG Real**
```bash
curl "http://localhost:3000/api/weather?province=Jawa%20Barat&district=BANDUNG"
```

### **Test Frontend**
```tsx
import { BmkgWeatherWidget } from './components/BmkgWeatherWidget';

// Di component manapun
<BmkgWeatherWidget province="Jawa Barat" district="BANDUNG" />
```

---

## 📊 **Rekomendasi Otomatis untuk Pertanian**

Fitur `getAgriRecommendation()` otomatis memberikan saran berdasarkan cuaca:

```
✓ Cuaca hujan → "Kurangi irigasi, pantau drainase"
✓ Panas kering (T>35, H<40) → "Tingkatkan irigasi"
✓ Angin kuat (WS>20) → "Periksa struktur tanaman"
✓ Panas lembab (T>30, H>80) → "Monitor penyakit jamur"
✓ Normal → "Lanjutkan manajemen biasa"
```

---

## 🛠️ **Troubleshooting**

### **API BMKG Tidak Respond**
- **Penyebab:** API BMKG sementara down atau koneksi internet error
- **Solusi:** Sistem auto fallback ke mock data, atau tunggu BMKG server online kembali

### **Province/District Tidak Ditemukan**
- **Penyebab:** Typo atau format nama yang salah
- **Solusi:** Gunakan `getProvinces()` & `getDistricts()` untuk validasi
- **Contoh:** Harus `"Jawa Barat"`, bukan `"jawa barat"` atau `"JAWA BARAT"`

### **Cuaca Tidak Update**
- **Penyebab:** Component belum di-refresh
- **Solusi:** Widget otomatis refresh setiap 30 menit. Manual refresh: navigate/reload page

---

## 📚 **Referensi**

- **API BMKG:** https://data.bmkg.go.id/
- **Dokumentasi Data:** https://data.bmkg.go.id/DataMKG/MEWS/
- **Format Nama:** Persis seperti di website BMKG

---

## 🎯 **Next Steps**

Setelah integrasi:
1. ✅ Test backend endpoint
2. ✅ Test frontend component
3. ✅ Masukkan ke dashboard utama
4. ✅ Update FarmContext jika perlu data global
5. ✅ Integrasi dengan AI diagnosis untuk akurasi lebih tinggi
