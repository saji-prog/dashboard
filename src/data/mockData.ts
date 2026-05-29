export interface Field {
  id: string;
  name: string;
  crop: string;
  areaHa: number;
  health: number;
  soilMoisture: number;
  soilPh: number;
  temperature: number;
  humidity: number;
  ndvi: number;
  status: "optimal" | "warning" | "critical";
}

export interface Alert {
  id: string;
  fieldId: string;
  type: "pest" | "drought" | "disease" | "weather" | "irrigation";
  severity: "low" | "medium" | "high";
  message: string;
  time: string;
}

export interface SensorReading {
  time: string;
  moisture: number;
  temp: number;
  humidity: number;
}

export const fields: Field[] = [
  {
    id: "f1",
    name: "Blok A — Utara",
    crop: "Padi (IR64)",
    areaHa: 2.4,
    health: 92,
    soilMoisture: 68,
    soilPh: 6.2,
    temperature: 29,
    humidity: 78,
    ndvi: 0.72,
    status: "optimal",
  },
  {
    id: "f2",
    name: "Blok B — Timur",
    crop: "Jagung (Pioneer)",
    areaHa: 1.8,
    health: 74,
    soilMoisture: 42,
    soilPh: 5.8,
    temperature: 31,
    humidity: 62,
    ndvi: 0.58,
    status: "warning",
  },
  {
    id: "f3",
    name: "Blok C — Selatan",
    crop: "Cabai (Lokal)",
    areaHa: 0.6,
    health: 58,
    soilMoisture: 35,
    soilPh: 5.4,
    temperature: 33,
    humidity: 55,
    ndvi: 0.45,
    status: "critical",
  },
  {
    id: "f4",
    name: "Blok D — Barat",
    crop: "Tomat (Servo)",
    areaHa: 1.2,
    health: 88,
    soilMoisture: 61,
    soilPh: 6.5,
    temperature: 28,
    humidity: 71,
    ndvi: 0.69,
    status: "optimal",
  },
];

export const alerts: Alert[] = [
  {
    id: "a1",
    fieldId: "f3",
    type: "drought",
    severity: "high",
    message: "Kelembaban tanah Blok C turun di bawah 40% — irigasi disarankan segera",
    time: "10 menit lalu",
  },
  {
    id: "a2",
    fieldId: "f3",
    type: "pest",
    severity: "medium",
    message: "Indikasi thrips pada daun cabai terdeteksi sensor optik",
    time: "45 menit lalu",
  },
  {
    id: "a3",
    fieldId: "f2",
    type: "irrigation",
    severity: "medium",
    message: "Jadwal irigasi Blok B tertunda 2 jam — pompa standby",
    time: "1 jam lalu",
  },
  {
    id: "a4",
    fieldId: "f1",
    type: "weather",
    severity: "low",
    message: "Hujan ringan diprediksi besok pagi (65% probabilitas)",
    time: "2 jam lalu",
  },
];

export const hourlyReadings: SensorReading[] = [
  { time: "06:00", moisture: 72, temp: 24, humidity: 85 },
  { time: "08:00", moisture: 70, temp: 26, humidity: 82 },
  { time: "10:00", moisture: 65, temp: 29, humidity: 75 },
  { time: "12:00", moisture: 58, temp: 32, humidity: 68 },
  { time: "14:00", moisture: 52, temp: 33, humidity: 60 },
  { time: "16:00", moisture: 55, temp: 31, humidity: 65 },
  { time: "18:00", moisture: 62, temp: 28, humidity: 72 },
  { time: "20:00", moisture: 68, temp: 26, humidity: 78 },
];

export const weeklyYield = [
  { day: "Sen", predicted: 420, actual: 410 },
  { day: "Sel", predicted: 435, actual: 428 },
  { day: "Rab", predicted: 450, actual: 445 },
  { day: "Kam", predicted: 460, actual: null },
  { day: "Jum", predicted: 475, actual: null },
  { day: "Sab", predicted: 480, actual: null },
  { day: "Min", predicted: 490, actual: null },
];

export const weatherForecast = [
  { day: "Hari Ini", icon: "sun", high: 33, low: 24, rain: 10 },
  { day: "Besok", icon: "cloud-rain", high: 30, low: 23, rain: 65 },
  { day: "Rabu", icon: "cloud", high: 29, low: 22, rain: 30 },
  { day: "Kamis", icon: "sun", high: 32, low: 24, rain: 5 },
];
