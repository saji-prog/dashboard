/**
 * Daftar provinsi dan kabupaten/kota yang didukung API BMKG
 * Format: Persis seperti yang digunakan BMKG
 */

export const BMKG_LOCATIONS = {
  'Aceh': ['BANDA ACEH', 'LHOKSEUMAWE', 'SABANG'],
  'Bali': ['DENPASAR', 'SINGARAJA'],
  'Bangka Belitung': ['PANGKAL PINANG', 'SUNGAI LIAT'],
  'Banten': ['SERANG', 'TANGERANG', 'TANGERANG SELATAN'],
  'Bengkulu': ['BENGKULU'],
  'DI Yogyakarta': ['YOGYAKARTA'],
  'DKI Jakarta': [
    'JAKARTA PUSAT',
    'JAKARTA BARAT',
    'JAKARTA TIMUR',
    'JAKARTA SELATAN',
    'JAKARTA UTARA',
  ],
  'Gorontalo': ['GORONTALO'],
  'Jambi': ['JAMBI', 'SUNGAI PENUH'],
  'Jawa Barat': [
    'BANDUNG',
    'BANJAR',
    'BOGOR',
    'CIAMIS',
    'CIREBON',
    'GARUT',
    'INDRAMAYU',
    'KARAWANG',
    'KUNINGAN',
    'MAJALENGKA',
    'PANGANDARAN',
    'PURWAKARTA',
    'SUBANG',
    'SUKABUMI',
    'SUMEDANG',
    'TASIKMALAYA',
  ],
  'Jawa Tengah': [
    'AMBARAWA',
    'CILACAP',
    'DEMAK',
    'GROBOGAN',
    'JEPARA',
    'KARANGANYAR',
    'KENDAL',
    'KLATEN',
    'KUDUS',
    'MAGELANG',
    'PATI',
    'PEMALANG',
    'PURBALINGGA',
    'PURWODADI',
    'PURWOREJO',
    'REMBANG',
    'SALATIGA',
    'SEMARANG',
    'SRAGEN',
    'SUKOHARJO',
    'SURAKARTA',
    'TEGAL',
    'TEMANGGUNG',
    'WONOSOBO',
  ],
  'Jawa Timur': [
    'BLITAR',
    'BATU',
    'BANYUWANGI',
    'BONDOWOSO',
    'GRESIK',
    'JEMBER',
    'JOMBANG',
    'KEDIRI',
    'LUMAJANG',
    'MADIUN',
    'MAGETAN',
    'MALANG',
    'MOJOKERTO',
    'NGANJUK',
    'NGAWI',
    'PACITAN',
    'PAMEKASAN',
    'PASURUAN',
    'PONOROGO',
    'SAMPANG',
    'SIDOARJO',
    'SITUBONDO',
    'SUMENEP',
    'SURABAYA',
    'TRENGGALEK',
    'TUBAN',
    'TULUNGAGUNG',
  ],
  'Kalimantan Barat': ['KUCHING', 'PONTIANAK', 'SAMBAS'],
  'Kalimantan Selatan': ['BANJARMASIN', 'BANJARBARU'],
  'Kalimantan Tengah': ['PALANGKA RAYA'],
  'Kalimantan Timur': ['BALIKPAPAN', 'BERAU', 'SAMARINDA', 'TARAKAN'],
  'Kalimantan Utara': ['TARAKAN', 'TANJUNG SELOR'],
  'Kepulauan Riau': ['BATAM', 'TANJUNG PINANG'],
  'Lampung': ['BANDAR LAMPUNG', 'KALIANDA', 'LAMPUNG PANJANG'],
  'Maluku': ['AMBON', 'MANADO'],
  'Maluku Utara': ['TERNATE', 'TIDORE'],
  'Nusa Tenggara Barat': ['MATARAM', 'SUMBAWA BARAT'],
  'Nusa Tenggara Timur': ['KUPANG', 'RUTENG'],
  'Papua': ['JAYAPURA', 'MANOKWARI', 'TIMIKA'],
  'Papua Barat': ['MANADO', 'MANOKWARI', 'SORONG'],
  'Riau': ['PEKANBARU', 'DUMAI'],
  'Sulawesi Barat': ['MAMUJU'],
  'Sulawesi Selatan': ['MAKASSAR', 'PALOPO'],
  'Sulawesi Tengah': ['PALU', 'MANADO'],
  'Sulawesi Tenggara': ['KENDARI', 'MANADO'],
  'Sulawesi Utara': ['MANADO'],
  'Sumatera Barat': ['PADANG', 'BUKITTINGGI', 'PADANG PANJANG'],
  'Sumatera Selatan': ['PALEMBANG', 'PRABUMULIH'],
  'Sumatera Utara': ['MEDAN', 'SIBOLGA'],
};

/**
 * Contoh penggunaan:
 * - Dapatkan list provinsi: Object.keys(BMKG_LOCATIONS)
 * - Dapatkan list kabupaten: BMKG_LOCATIONS['Jawa Barat']
 * - Parameter API: province="Jawa Barat", district="BANDUNG"
 */

export function getProvinces(): string[] {
  return Object.keys(BMKG_LOCATIONS).sort();
}

export function getDistricts(province: string): string[] {
  return BMKG_LOCATIONS[province as keyof typeof BMKG_LOCATIONS] || [];
}

/**
 * Validasi apakah location valid di BMKG API
 */
export function isValidBMKGLocation(
  province: string,
  district: string,
): boolean {
  const districts = getDistricts(province);
  return districts.includes(district);
}
