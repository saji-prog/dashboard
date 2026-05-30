import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.alert.deleteMany();
  await prisma.field.deleteMany();
  await prisma.farm.deleteMany();
  await prisma.sensorReading.deleteMany();
  await prisma.yieldForecast.deleteMany();
  await prisma.weatherForecast.deleteMany();

  const farm = await prisma.farm.create({
    data: { name: 'Kebun Sumber Rejeki', areaHa: 6.0 },
  });

  const fields = [
    {
      id: 'f1',
      name: 'Blok A — Utara',
      crop: 'Padi (IR64)',
      areaHa: 2.4,
      health: 92,
      soilMoisture: 68,
      soilPh: 6.2,
      temperature: 29,
      humidity: 78,
      ndvi: 0.72,
      status: 'optimal',
    },
    {
      id: 'f2',
      name: 'Blok B — Timur',
      crop: 'Jagung (Pioneer)',
      areaHa: 1.8,
      health: 74,
      soilMoisture: 42,
      soilPh: 5.8,
      temperature: 31,
      humidity: 62,
      ndvi: 0.58,
      status: 'warning',
    },
    {
      id: 'f3',
      name: 'Blok C — Selatan',
      crop: 'Cabai (Lokal)',
      areaHa: 0.6,
      health: 58,
      soilMoisture: 35,
      soilPh: 5.4,
      temperature: 33,
      humidity: 55,
      ndvi: 0.45,
      status: 'critical',
    },
    {
      id: 'f4',
      name: 'Blok D — Barat',
      crop: 'Tomat (Servo)',
      areaHa: 1.2,
      health: 88,
      soilMoisture: 61,
      soilPh: 6.5,
      temperature: 28,
      humidity: 71,
      ndvi: 0.69,
      status: 'optimal',
    },
  ];

  for (const f of fields) {
    await prisma.field.create({
      data: { ...f, farmId: farm.id },
    });
  }

  const alerts = [
    {
      id: 'a1',
      fieldId: 'f3',
      type: 'drought',
      severity: 'high',
      message:
        'Kelembaban tanah Blok C turun di bawah 40% — irigasi disarankan segera',
      timeLabel: '10 menit lalu',
    },
    {
      id: 'a2',
      fieldId: 'f3',
      type: 'pest',
      severity: 'medium',
      message: 'Indikasi thrips pada daun cabai terdeteksi sensor optik',
      timeLabel: '45 menit lalu',
    },
    {
      id: 'a3',
      fieldId: 'f2',
      type: 'irrigation',
      severity: 'medium',
      message: 'Jadwal irigasi Blok B tertunda 2 jam — pompa standby',
      timeLabel: '1 jam lalu',
    },
    {
      id: 'a4',
      fieldId: 'f1',
      type: 'weather',
      severity: 'low',
      message: 'Hujan ringan diprediksi besok pagi (65% probabilitas)',
      timeLabel: '2 jam lalu',
    },
  ];

  for (const a of alerts) {
    await prisma.alert.create({ data: a });
  }

  const readings = [
    { timeLabel: '06:00', moisture: 72, temp: 24, humidity: 85 },
    { timeLabel: '08:00', moisture: 70, temp: 26, humidity: 82 },
    { timeLabel: '10:00', moisture: 65, temp: 29, humidity: 75 },
    { timeLabel: '12:00', moisture: 58, temp: 32, humidity: 68 },
    { timeLabel: '14:00', moisture: 52, temp: 33, humidity: 60 },
    { timeLabel: '16:00', moisture: 55, temp: 31, humidity: 65 },
    { timeLabel: '18:00', moisture: 62, temp: 28, humidity: 72 },
    { timeLabel: '20:00', moisture: 68, temp: 26, humidity: 78 },
  ];

  for (const r of readings) {
    await prisma.sensorReading.create({ data: r });
  }

  const yields = [
    { day: 'Sen', predicted: 420, actual: 410 },
    { day: 'Sel', predicted: 435, actual: 428 },
    { day: 'Rab', predicted: 450, actual: 445 },
    { day: 'Kam', predicted: 460, actual: null },
    { day: 'Jum', predicted: 475, actual: null },
    { day: 'Sab', predicted: 480, actual: null },
    { day: 'Min', predicted: 490, actual: null },
  ];

  for (const y of yields) {
    await prisma.yieldForecast.create({ data: y });
  }

  const weather = [
    { day: 'Hari Ini', icon: 'sun', high: 33, low: 24, rain: 10 },
    { day: 'Besok', icon: 'cloud-rain', high: 30, low: 23, rain: 65 },
    { day: 'Rabu', icon: 'cloud', high: 29, low: 22, rain: 30 },
    { day: 'Kamis', icon: 'sun', high: 32, low: 24, rain: 5 },
  ];

  for (const w of weather) {
    await prisma.weatherForecast.create({ data: w });
  }

  console.log('Seed selesai — farm, fields, alerts, sensor, yield, weather');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
