# AgriMonitor API (NestJS)

Backend REST API untuk dashboard pertanian.

## Stack

- **NestJS** — framework API
- **Prisma** — ORM
- **SQLite** — database dev (file `prisma/dev.db`)
- Bisa diganti PostgreSQL nanti (ubah `provider` di `schema.prisma`)

## Setup

```powershell
cd backend
.\setup.ps1
npm run start:dev
```

API: http://localhost:3000/api

## Endpoints

| Method | Path | Deskripsi |
|--------|------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard/overview` | Ringkasan dashboard |
| GET | `/api/fields` | Semua lahan |
| GET | `/api/fields/:id` | Detail lahan |
| GET | `/api/alerts` | Peringatan |
| GET | `/api/sensors/hourly` | Grafik sensor per jam |
| GET | `/api/sensors/yield` | Prediksi panen |
| GET | `/api/sensors/weather` | Prakiraan cuaca |
| GET | `/api/ai/recommendations` | Rekomendasi AI |
| POST | `/api/ai/chat` | `{ "message": "..." }` |
| POST | `/api/ai/diagnose` | `{ "symptoms": "..." }` |

## PostgreSQL (produksi)

Di `.env`:

```
DATABASE_URL="postgresql://user:pass@localhost:5432/agrimonitor"
```

Ubah `provider = "postgresql"` di `prisma/schema.prisma`, lalu `npx prisma migrate dev`.
