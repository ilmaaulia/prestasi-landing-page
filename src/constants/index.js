const activityType = ['Aktivitas Kemahasiswaan', 'Kompetisi', 'PKM']
const achievementType = ['Science', 'Seni', 'Olahraga', 'Lainnya']
const competitionLevel = ['Internasional', 'Nasional', 'Regional', 'Lainnya']
const studentStudyProgram = [
  'Pendidikan Biologi',
  'Pendidikan Fisika',
  'Pendidikan Matematika',
  'Pendidikan Teknologi Informasi',
  'Sistem Informasi',
  'Pendidikan Bahasa dan Sastra Indonesia',
  'Pendidikan Bahasa Inggris',
  'Pendidikan Guru Sekolah Dasar',
  'Pendidikan IPS',
  'Pendidikan Pancasila dan Kewarganegaraan',
]
const tagColors = [
  'primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark',
]

const activityTypeOptions = [
  { value: '', label: 'Jenis Aktivitas' },
  ...activityType.map(item => ({ value: item, label: item })),
]
const achievementTypeOptions = [
  { value: '', label: 'Jenis Prestasi' },
  ...achievementType.map(item => ({ value: item, label: item })),
]
const competitionLevelOptions = [
  { value: '', label: 'Tingkat Kompetisi' },
  ...competitionLevel.map(item => ({ value: item, label: item })),
]
const studyProgramOptions = [
  { value: '', label: 'Program Studi' },
  ...studentStudyProgram.map(item => ({ value: item, label: item })),
]

export {
  studentStudyProgram,
  activityTypeOptions,
  achievementTypeOptions,
  competitionLevelOptions,
  studyProgramOptions,
  tagColors,
}

