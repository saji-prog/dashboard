import { Injectable } from '@nestjs/common';
import { Field } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface AiRecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  field?: string;
  action: string;
}

export interface DiagnosisResult {
  condition: string;
  confidence: number;
  severity: 'ringan' | 'sedang' | 'berat';
  treatment: string[];
  prevention: string[];
}

const CROP_KNOWLEDGE: Record<string, string[]> = {
  padi: [
    'Padi membutuhkan kelembaban tanah 60-80% selama fase vegetatif.',
    'Pupuk NPK 16-16-16 dianjurkan 2 minggu setelah tanam.',
    'Waspadai wereng coklat dan blast pada musim hujan.',
  ],
  jagung: [
    'Jagung optimal pada pH tanah 5.8-7.0.',
    'Irigasi tetes lebih efisien untuk jagung pada musim kemarau.',
    'Ulat grayak sering muncul saat suhu > 30°C.',
  ],
  cabai: [
    'Cabai sensitif terhadap thrips dan antraknosa.',
    'Kelembaban ideal 65-75%, hindari genangan air.',
    'Pemangkasan tunas samping meningkatkan produktivitas.',
  ],
  tomat: [
    'Tomat membutuhkan drainase baik dan pH 6.0-6.8.',
    'Busuk daun (early blight) muncul saat kelembaban tinggi.',
    'Penyiraman pagi hari mengurangi risiko jamur.',
  ],
};

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  private async getFields(): Promise<Field[]> {
    return this.prisma.field.findMany();
  }

  private detectCrop(text: string): string | null {
    const lower = text.toLowerCase();
    if (lower.includes('padi')) return 'padi';
    if (lower.includes('jagung')) return 'jagung';
    if (lower.includes('cabai')) return 'cabai';
    if (lower.includes('tomat')) return 'tomat';
    return null;
  }

  private analyzeFields(fields: Field[]): string {
    const critical = fields.filter((f) => f.status === 'critical');
    const warning = fields.filter((f) => f.status === 'warning');
    const avgMoisture = Math.round(
      fields.reduce((s, f) => s + f.soilMoisture, 0) / fields.length,
    );
    const avgHealth = Math.round(
      fields.reduce((s, f) => s + f.health, 0) / fields.length,
    );

    let summary = `Kondisi kebun saat ini: rata-rata kesehatan tanaman ${avgHealth}%, kelembaban tanah ${avgMoisture}%.\n\n`;

    if (critical.length > 0) {
      summary += `PERHATIAN — ${critical.length} blok kritis:\n`;
      critical.forEach((f) => {
        summary += `• ${f.name} (${f.crop}): kelembaban ${f.soilMoisture}%, kesehatan ${f.health}%. Segera lakukan irigasi dan inspeksi hama.\n`;
      });
    }

    if (warning.length > 0) {
      summary += `\n${warning.length} blok perlu pemantauan:\n`;
      warning.forEach((f) => {
        summary += `• ${f.name}: kelembaban ${f.soilMoisture}% — pertimbangkan irigasi tambahan.\n`;
      });
    }

    if (critical.length === 0 && warning.length === 0) {
      summary +=
        'Semua blok dalam kondisi optimal. Pertahankan jadwal irigasi rutin.';
    }

    return summary;
  }

  async generateRecommendations(): Promise<AiRecommendation[]> {
    const fields = await this.getFields();
    const recs: AiRecommendation[] = [];

    fields.forEach((f) => {
      if (f.soilMoisture < 45) {
        recs.push({
          id: `irr-${f.id}`,
          priority: f.soilMoisture < 38 ? 'high' : 'medium',
          title: `Irigasi darurat — ${f.name}`,
          description: `Kelembaban tanah ${f.soilMoisture}% (target 55-70%). Tanaman ${f.crop} berisiko stres air.`,
          field: f.name,
          action:
            'Aktifkan irigasi tetes selama 45 menit, pantau ulang dalam 2 jam.',
        });
      }
      if (f.health < 70) {
        recs.push({
          id: `health-${f.id}`,
          priority: f.health < 60 ? 'high' : 'medium',
          title: `Inspeksi kesehatan — ${f.name}`,
          description: `Skor kesehatan ${f.health}%. NDVI ${f.ndvi.toFixed(2)} menunjukkan stres vegetatif.`,
          field: f.name,
          action:
            'Periksa daun bagian bawah, cek tanda hama. Pertimbangkan pupuk daun NPK.',
        });
      }
      if (f.soilPh < 5.8) {
        recs.push({
          id: `ph-${f.id}`,
          priority: 'low',
          title: `Koreksi pH tanah — ${f.name}`,
          description: `pH ${f.soilPh} sedikit asam untuk ${f.crop}.`,
          field: f.name,
          action: 'Aplikasikan kapur pertanian 500 kg/ha secara bertahap.',
        });
      }
    });

    recs.push({
      id: 'weather-1',
      priority: 'medium',
      title: 'Persiapan hujan besok',
      description:
        'Probabilitas hujan 65% besok pagi. Sesuaikan jadwal penyemprotan.',
      action:
        'Tunda aplikasi pestisida. Pastikan saluran drainase tidak tersumbat.',
    });

    const order = { high: 0, medium: 1, low: 2 };
    return recs.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  diagnoseFromSymptoms(symptoms: string): DiagnosisResult {
    const lower = symptoms.toLowerCase();

    if (
      lower.includes('daun kuning') ||
      lower.includes('menguning') ||
      lower.includes('klorosis')
    ) {
      return {
        condition: 'Kekurangan Nitrogen / Klorosis',
        confidence: 87,
        severity: lower.includes('seluruh') ? 'sedang' : 'ringan',
        treatment: [
          'Aplikasi pupuk urea 50 kg/ha atau pupuk daun N tinggi',
          'Periksa pH tanah — klorosis memperburuk jika pH > 7.5',
          'Pastikan drainase tidak terganggu',
        ],
        prevention: [
          'Jadwal pemupukan berkala sesuai fase tanaman',
          'Analisis tanah setiap musim',
        ],
      };
    }

    if (
      lower.includes('bintik') ||
      lower.includes('bercak') ||
      lower.includes('hitam') ||
      lower.includes('antraknosa')
    ) {
      return {
        condition: 'Antraknosa / Bercak Daun',
        confidence: 82,
        severity: 'sedang',
        treatment: [
          'Buang daun terinfeksi, jangan dibuang di area kebun',
          'Semprot fungisida berbahan aktif mankozeb atau tembaga',
          'Kurangi kelembaban dengan jarak tanam lebih renggang',
        ],
        prevention: [
          'Rotasi tanaman, hindari menanam spesies sama berturut-turut',
          'Siram di pangkal, hindari membasahi daun',
        ],
      };
    }

    if (
      lower.includes('lubang') ||
      lower.includes('dimakan') ||
      lower.includes('ulat') ||
      lower.includes('wereng')
    ) {
      return {
        condition: 'Serangan Hama (Ulat/Wereng)',
        confidence: 79,
        severity:
          lower.includes('parah') || lower.includes('banyak') ? 'berat' : 'sedang',
        treatment: [
          'Inspeksi visual pagi-sore saat hama aktif',
          'Aplikasi insektisida nabati (Bacillus thuringiensis) untuk ulat',
          'Perangkap feromon untuk monitoring populasi',
        ],
        prevention: [
          'Tanam refugia / tanaman perangkap',
          'Pertahankan keanekaragaman hayati (musuh alami)',
        ],
      };
    }

    if (lower.includes('layu') || lower.includes('gulung')) {
      return {
        condition: 'Layu / Stres Air atau Fusarium',
        confidence: 74,
        severity: 'sedang',
        treatment: [
          'Periksa kelembaban tanah — irigasi jika < 50%',
          'Jika akar coklat dan busuk: isolasi tanaman, aplikasi Trichoderma',
          'Hindari genangan air',
        ],
        prevention: ['Irigasi teratur, mulsa organik', 'Disinfeksi alat panen'],
      };
    }

    return {
      condition: 'Diagnosis awal — gejala tidak spesifik',
      confidence: 55,
      severity: 'ringan',
      treatment: [
        'Ambil foto close-up daun, batang, dan akar',
        'Catat kondisi cuaca 3 hari terakhir',
        'Konsultasi dengan penyuluh pertanian setempat',
      ],
      prevention: [
        'Pemantauan mingguan NDVI dan sensor kelembaban',
        'Catat riwayat pemupukan dan penyemprotan',
      ],
    };
  }

  async chat(userMessage: string): Promise<{ reply: string }> {
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));

    const fields = await this.getFields();
    const lower = userMessage.toLowerCase();

    if (
      lower.includes('kondisi') ||
      lower.includes('status') ||
      lower.includes('kebun') ||
      lower.includes('laporan')
    ) {
      return { reply: this.analyzeFields(fields) };
    }

    if (
      lower.includes('rekomendasi') ||
      lower.includes('saran') ||
      lower.includes('apa yang harus')
    ) {
      const recs = await this.generateRecommendations();
      const reply =
        'Rekomendasi AI berdasarkan data sensor:\n\n' +
        recs
          .slice(0, 5)
          .map(
            (r, i) =>
              `${i + 1}. [${r.priority.toUpperCase()}] ${r.title}\n   ${r.description}\n   → ${r.action}`,
          )
          .join('\n\n');
      return { reply };
    }

    if (lower.includes('panen') || lower.includes('hasil')) {
      return {
        reply:
          'Prediksi panen minggu ini:\n\n' +
          '• Padi Blok A: ~1.2 ton/ha (fase mengisi butir 85%)\n' +
          '• Jagung Blok B: ~8.5 ton/ha (estimasi 2 minggu lagi)\n' +
          '• Cabai Blok C: turun 15% karena stres air — perbaiki irigasi dulu\n' +
          '• Tomat Blok D: ~12 ton/ha (kondisi baik)\n\n' +
          'Total estimasi revenue minggu ini: Rp 18.4 juta (+3% vs minggu lalu).',
      };
    }

    if (lower.includes('cuaca') || lower.includes('hujan')) {
      return {
        reply:
          'Prakiraan cuaca 4 hari ke depan:\n\n' +
          '• Hari ini: Cerah, 24-33°C, kemungkinan hujan 10%\n' +
          '• Besok: Hujan ringan-sedang pagi (65%), 23-30°C\n' +
          '• Rabu: Berawan, 22-29°C\n' +
          '• Kamis: Cerah kembali\n\n' +
          'Saran: Tunda penyemprotan pestisida hingga Kamis.',
      };
    }

    const crop = this.detectCrop(userMessage);
    if (crop && CROP_KNOWLEDGE[crop]) {
      return {
        reply:
          `Informasi untuk tanaman ${crop}:\n\n` +
          CROP_KNOWLEDGE[crop].map((k, i) => `${i + 1}. ${k}`).join('\n'),
      };
    }

    if (
      lower.includes('irigasi') ||
      lower.includes('siram') ||
      lower.includes('air')
    ) {
      const dry = fields.filter((f) => f.soilMoisture < 50);
      if (dry.length === 0) {
        return {
          reply:
            'Semua blok memiliki kelembaban cukup. Irigasi rutin malam hari (18:00-20:00) tetap disarankan.',
        };
      }
      return {
        reply:
          `Blok yang perlu irigasi segera:\n` +
          dry
            .map((f) => `• ${f.name}: ${f.soilMoisture}% (target 55-70%)`)
            .join('\n') +
          '\n\nGunakan irigasi tetes 45 menit per blok kering.',
      };
    }

    return {
      reply:
        'Saya asisten AI AgriMonitor (backend NestJS). Tanya tentang kondisi kebun, rekomendasi, panen, cuaca, atau irigasi.',
    };
  }
}
