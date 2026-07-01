/**
 * Bagi array gambar jadi N kolom berdasarkan index (round-robin),
 * dipakai untuk layout galeri 2-kolom (atau lebih, kalau template lain mau).
 * Setiap item tetap menyimpan index aslinya untuk keperluan lightbox.
 * @param {string[]} images
 * @param {number} columnCount - default 2
 * @returns {Array<Array<{url: string, index: number}>>}
 */
 export function splitIntoColumns(images, columnCount = 2) {
  const columns = Array.from({ length: columnCount }, () => []);

  images.forEach((url, index) => {
    columns[index % columnCount].push({ url, index });
  });

  return columns;
}