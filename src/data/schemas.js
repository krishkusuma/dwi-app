import { templateConfig } from "./templateConfig";

export const heroFields = [
  { key: "heroImage", type: "image", size: "large", label: "Foto Cover (Mobile)" },
  { key: "desktopImage", type: "image", size: "large", label: "Foto Cover (Desktop - background sisi kiri)" },
  { key: "weddingHeading", type: "text", label: "Judul Atas" },
  { key: "groomName", type: "text", label: "Nama Pria" },
  { key: "brideName", type: "text", label: "Nama Wanita" },
  { key: "recipientText", type: "text", label: "Teks Kepada" },
  { key: "errGuestName", type: "text", label: "Teks Permintaan Maaf Nama (kosongkan jika tidak perlu)" },
];

export const heroDefaultData = {
  heroImage: templateConfig.dummyHeroImage,
  desktopImage: templateConfig.dummyDesktopImage,
  weddingHeading: "The Wedding of",
  groomName: "Riyan",
  brideName: "Yunita",
  recipientText: "Kepada yth. Bapak/Ibu/Saudara/i",
  errGuestName: "Mohon maaf jika ada kesalahan penulisan nama/gelar",
};

export const openingFields = [
  { key: "weddingText", type: "text", label: "Teks Pembuka" },
  { key: "tagLine", type: "text", label: "Tag Line" },
  { key: "weddingDate", type: "date", label: "Tanggal Pernikahan" },
];

export const openingDefaultData = {
  weddingText: "Bersama keluarga, kami mengundang Anda untuk hadir di hari bahagia kami",
  tagLine: "Save the date for our wedding",
  weddingDate: "2026-12-31",
};

export const quoteFields = [
  { key: "quoteHeading", type: "text", label: "Judul" },
  { key: "quoteImage", type: "image", size: "small", label: "Foto" },
  { key: "quoteContent", type: "textarea", label: "Isi Quote", maxLength: 256 },
];

export const quoteDefaultData = {
  quoteHeading: "We Found Love",
  quoteImage: templateConfig.dummyQuoteImage,
  quoteContent:
    "Dan diantara tanda-tanda kekuasaan-Nya adalah Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu hidup tenang bersamanya.",
};

export const coupleFields = [
  { key: "coupleHeading", type: "text", label: "Judul" },
  { key: "coupleContent", type: "textarea", label: "Deskripsi", maxLength: 128 },

  { key: "groomImage_1", type: "image", size: "small", label: "Foto Pria" },
  { key: "groomFullName", type: "text", label: "Nama Lengkap Pria" },
  { key: "groomParents", type: "text", label: "Putra dari" },
  { key: "groomIG", type: "text", label: "Username Instagram Pria (tanpa @)" },

  { key: "brideImage_1", type: "image", size: "small", label: "Foto Wanita" },
  { key: "brideFullName", type: "text", label: "Nama Lengkap Wanita" },
  { key: "brideParents", type: "text", label: "Putri dari" },
  { key: "brideIG", type: "text", label: "Username Instagram Wanita (tanpa @)" },
];

export const coupleDefaultData = {
  coupleHeading: "We Are Getting Married!",
  coupleContent:
    "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.",

  groomImage_1: templateConfig.dummyGroomImage,
  groomFullName: "Riyan Kuswoyo, S.T.",
  groomParents: "Putra Kedua dari Bapak Sufian Jamal & Ibu Elmira",
  groomIG: "",

  brideImage_1: templateConfig.dummyBrideImage,
  brideFullName: "Yunita Safitri, S.Pd.",
  brideParents: "Putri Pertama dari Bapak Adi Nugroho & Ibu Gani",
  brideIG: "",
};

export const countdownFields = [
  { key: "countdownImage", type: "image", size: "large", label: "Foto" },
  { key: "countdownHeading", type: "text", label: "Judul" },
  { key: "countdownContent", type: "textarea", label: "Deskripsi", maxLength: 256 },
];

export const countdownDefaultData = {
  countdownImage: templateConfig.dummyCountdownImage,
  countdownHeading: "Save The Date",
  countdownContent:
    "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan kami.",
};

export const eventItemFields = [
  { key: "eventName", type: "text", label: "Nama Acara" },
  { key: "eventDate", type: "date", label: "Tanggal" },
  { key: "eventTime", type: "text", label: "Jam" },
  { key: "eventLocation", type: "text", label: "Lokasi" },
  { key: "eventAddress", type: "text", label: "Alamat" },
  { key: "eventMaps", type: "text", label: "Link Google Maps" },
];

export const eventDefaultData = [
  { 
    eventName: "Akad Nikah", 
    eventDate: "2026-12-31", 
    eventTime: "08:00 WIB", 
    eventLocation: "Auditorium Masjid",
    eventAddress: "Jl KHM Naim",
    eventMaps: "",
  },
  { 
    eventName: "Resepsi", 
    eventDate: "2026-12-31", 
    eventTime: "10:00 WIB", 
    eventLocation: "Auditorium Masjid", 
    eventAddress: "Jl KHM Naim",
    eventMaps: "",
  },
];

export const storySettingsFields = [
  { key: "storyEnabled", type: "toggle", label: "Aktifkan Our Story" },
  { key: "storyHeading", type: "text", label: "Judul" },
];

export const storyItemFields = [
  { key: "storyImage", type: "image", size: "large", label: "Foto" },
  { key: "storyTitle", type: "text", label: "Judul Cerita" },
  { key: "storyDate", type: "date", label: "Tanggal" },
  { key: "storyPost", type: "textarea", label: "Cerita", maxLength: 256 },
];

export const storyDefaultData = {
  storyEnabled: true,
  storyHeading: "Our Story",
  stories: [
    {
      storyImage: templateConfig.dummyStoryImages[0],
      storyTitle: "Pertama Bertemu",
      storyDate: "2020-01-01",
      storyPost: "Lorem ipsum dolor sit amet, kami pertama bertemu di...",
    },
    {
      storyImage: templateConfig.dummyStoryImages[1],
      storyTitle: "Jadian",
      storyDate: "2021-06-15",
      storyPost: "Lorem ipsum dolor sit amet, kami mulai menjalin hubungan...",
    },
    {
      storyImage: templateConfig.dummyStoryImages[2],
      storyTitle: "Lamaran",
      storyDate: "2025-03-10",
      storyPost: "Lorem ipsum dolor sit amet, momen lamaran yang tak terlupakan...",
    },
  ],
};

export const galleryDefaultData = {
  images: [...templateConfig.dummyGalleryImages],
};

export const prayFields = [
  { key: "prayEnabled", type: "toggle", label: "Aktifkan Doa untuk Pengantin" },
  { key: "prayHeading", type: "text", label: "Judul" },
  { key: "prayContent", type: "textarea", label: "Isi Doa", maxLength: 512 },
];

export const prayDefaultData = {
  prayEnabled: true,
  prayHeading: "Doa untuk pengantin",
  prayContent:
    "Lorem ipsum dolor sit amet, semoga pernikahan ini dipenuhi keberkahan dan kebahagiaan selamanya.",
};

export const inviteFields = [
  { key: "inviteHeading", type: "text", label: "Judul" },
  { key: "inviteContent", type: "textarea", label: "Isi Pesan", maxLength: 512 },
];

export const inviteDefaultData = {
  inviteHeading: "Turut Mengundang",
  inviteContent:
    "Lorem ipsum dolor sit amet, keluarga besar kedua mempelai turut mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.",
};

export const footerFields = [
  { key: "footerImage", type: "image", size: "large", label: "Foto" },
  { key: "footerContent", type: "textarea", label: "Pesan Penutup", maxLength: 256 },
];

export const footerDefaultData = {
  footerImage: templateConfig.dummyFooterImage,
  footerContent:
    "Suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
};

// General / Global settings — bukan section visual, dipakai lintas fitur
export const generalFields = [
  { key: "waNumber", type: "text", label: "Nomor WhatsApp Utama (format 62xxxxxxxxxx)" },
];

export const generalDefaultData = {
  waNumber: "",
};

// Wedding Gift
export const wgSettingsFields = [
  { key: "wgEnabled", type: "toggle", label: "Aktifkan Wedding Gift" },
  { key: "wgHeading", type: "text", label: "Judul" },
  { key: "wgContent", type: "textarea", label: "Deskripsi", maxLength: 256 },
];

export const wgAccountItemFields = [
  { key: "bankName", type: "text", label: "Nama Bank" },
  { key: "bankAccount", type: "text", label: "Nama Pemilik Rekening" },
  { key: "bankNumber", type: "text", label: "Nomor Rekening" },
];

export const wgDefaultData = {
  wgEnabled: true,
  wgHeading: "Wedding Gift",
  wgContent:
    "Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih, dapat melalui:",
  wgAccounts: [
    { bankName: "BCA", bankAccount: "Riyan Kuswoyo", bankNumber: "1234567890" },
    { bankName: "Mandiri", bankAccount: "Yunita Safitri", bankNumber: "0987654321" },
  ],
};

export const rsvpFields = [
  { key: "rsvpEnabled", type: "toggle", label: "Aktifkan RSVP" },
  { key: "rsvpHeading", type: "text", label: "Judul" },
  { key: "rsvpContent", type: "textarea", label: "Deskripsi", maxLength: 256 },
];

export const rsvpDefaultData = {
  rsvpEnabled: true,
  rsvpHeading: "RSVP",
  rsvpContent: "Konfirmasi kehadiran Bapak/Ibu/Saudara/i sangat berarti bagi kami.",
};

export const wishFields = [
  { key: "wishEnabled", type: "toggle", label: "Aktifkan Wedding Wishes" },
  { key: "wishFormEnabled", type: "toggle", label: "Terima ucapan baru (kalau off, form disembunyikan tapi ucapan lama tetap tampil)" },
  { key: "wishHeading", type: "text", label: "Judul" },
  { key: "wishContent", type: "textarea", label: "Deskripsi", maxLength: 256 },
];

export const wishDefaultData = {
  wishEnabled: true,
  wishFormEnabled: true,
  wishHeading: "Wedding Wishes",
  wishContent: "Sampaikan ucapan selamat, doa, dan lain-lain.",
};

export const lsSettingsFields = [
  { key: "lsEnabled", type: "toggle", label: "Aktifkan Live Streaming" },
  { key: "lsHeading", type: "text", label: "Judul" },
  { key: "lsContent", type: "textarea", label: "Deskripsi", maxLength: 256 },
];

export const lsDefaultData = {
  lsEnabled: true,
  lsHeading: "Live Streaming",
  lsContent: "Saksikan acara pernikahan kami melalui tautan di bawah ini:",
  lsChannels: { instagram: false, youtube: false },
  instagramUrl: "",
  youtubeUrl: "",
};

export const videoFields = [
  { key: "videoEnabled", type: "toggle", label: "Aktifkan Video" },
  { key: "videoHeading", type: "text", label: "Judul" },
  { key: "videoUrl", type: "text", label: "Link YouTube" },
];

export const videoDefaultData = {
  videoEnabled: true,
  videoHeading: "Video",
  videoUrl: "",
};

export const rundownFields = [
  { key: "rundownEnabled", type: "toggle", label: "Aktifkan Rundown" },
  { key: "rundownHeading", type: "text", label: "Judul" },
];

export const rundownItemFields = [
  { key: "rundownTime", type: "text", label: "Waktu" },
  { key: "rundownInfo", type: "text", label: "Kegiatan" },
];

export const rundownDefaultData = {
  rundownEnabled: true,
  rundownHeading: "Rundown",
  rundownItems: [
    { rundownTime: "11:00 AM", rundownInfo: "Guest Arrival & Registration" },
    { rundownTime: "12:00 PM", rundownInfo: "Ceremony Begins" },
  ],
};

export const qrFields = [
  { key: "qrEnabled", type: "toggle", label: "Aktifkan QR Check-in" },
  { key: "qrHeading", type: "text", label: "Judul" },
  { key: "qrImage", type: "image", size: "large", label: "Foto" },
];

export const qrDefaultData = {
  qrEnabled: true,
  qrHeading: "QR Check-in",
  qrImage: templateConfig.dummyQrImage,
};