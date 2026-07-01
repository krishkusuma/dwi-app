import { useState } from "react";
import { uploadImage } from "../lib/uploadImage";

const MAX_PHOTOS = 12;

export default function GalleryEditor({ images, onChange }) {
  const [uploading, setUploading] = useState(false);
  const isAtMax = images.length >= MAX_PHOTOS;

  const handleAddImages = async (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = MAX_PHOTOS - images.length;
    const filesToUpload = files.slice(0, remainingSlots);

    setUploading(true);

    const uploadedUrls = [];
    for (const file of filesToUpload) {
      const url = await uploadImage(file, "large");
      if (url) uploadedUrls.push(url);
    }

    setUploading(false);
    onChange([...images, ...uploadedUrls]);
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {images.map((url, index) => (
          <div key={index} className="relative">
            <img src={url} alt={`Galeri ${index + 1}`} className="w-full h-20 object-cover rounded" />
            <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 text-xs">×</button>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-1">{images.length} / {MAX_PHOTOS} foto</p>

      {isAtMax ? (
        <p className="text-xs text-amber-700">Maksimal {MAX_PHOTOS} foto tercapai. Hapus foto lain untuk menambah.</p>
      ) : (
        <input type="file" accept="image/*" multiple onChange={handleAddImages} disabled={uploading} className="text-sm" />
      )}

      {uploading && <p className="text-xs text-gray-400 mt-1">Mengompres & mengupload {images.length > 0 ? "foto tambahan" : "foto"}...</p>}
    </div>
  );
}
