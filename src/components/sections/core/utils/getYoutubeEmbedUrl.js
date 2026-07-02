/**
 * Convert berbagai format link YouTube (watch?v=, youtu.be/, shorts/, embed/)
 * jadi URL embed yang bisa dipakai langsung di <iframe src="...">.
 * @param {string} url - link YouTube dari input klien
 * @returns {string} embed URL, atau string kosong kalau tidak valid/tidak dikenali
 */
export function getYoutubeEmbedUrl(url) {
    if (!url) return "";
  
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&]+)/,
      /(?:youtu\.be\/)([^?]+)/,
      /(?:youtube\.com\/embed\/)([^?]+)/,
      /(?:youtube\.com\/shorts\/)([^?]+)/,
    ];
  
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
  
    return "";
  }