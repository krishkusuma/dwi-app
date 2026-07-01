import { useState } from "react";
import { uploadImage } from "../lib/uploadImage";
import { uploadFile } from "../lib/uploadFile";

export default function FieldRenderer({ field, value, onChange }) {
  if (field.type === "text") {
    return (
      <div className="mb-3">
        <label className="block text-sm mb-1">{field.label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          className="w-full px-2 py-1.5 border rounded"
        />
      </div>
    );
  }

  if (field.type === "textarea") {
    const currentLength = value ? value.length : 0;
    const isOverLimit = field.maxLength && currentLength >= field.maxLength;

    return (
      <div className="mb-3">
        <label className="block text-sm mb-1">{field.label}</label>
        <textarea
          value={value}
          maxLength={field.maxLength}
          onChange={(e) => onChange(field.key, e.target.value)}
          rows={4}
          className="w-full px-2 py-1.5 border rounded"
        />
        {field.maxLength && (
          <p className={`text-xs mt-1 ${isOverLimit ? "text-red-500" : "text-gray-400"}`}>
            {currentLength} / {field.maxLength} karakter
          </p>
        )}
      </div>
    );
  }

  if (field.type === "url") {
    const [touched, setTouched] = useState(false);

    const isValidUrl = (str) => {
      if (!str) return true; // kosong tidak dianggap error, biar tidak maksa wajib isi
      try {
        new URL(str);
        return true;
      } catch {
        return false;
      }
    };

    const showError = touched && !isValidUrl(value);

    return (
      <div className="mb-3">
        <label className="block text-sm mb-1">{field.label}</label>
        <input
          type="url"
          value={value}
          placeholder="https://instagram.com/username"
          onChange={(e) => onChange(field.key, e.target.value)}
          onBlur={() => setTouched(true)}
          className={`w-full px-2 py-1.5 border rounded ${showError ? "border-red-400" : ""}`}
        />
        {showError && (
          <p className="text-xs text-red-500 mt-1">
            Format link belum valid, pastikan diawali https://
          </p>
        )}
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div className="mb-3">
        <label className="block text-sm mb-1">{field.label}</label>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          className="w-full px-2 py-1.5 border rounded"
        />
      </div>
    );
  }
  if (field.type === "toggle") {
    return (
      <div className="mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(field.key, e.target.checked)}
        />
        <label className="text-sm">{field.label}</label>
      </div>
    );
  }

  if (field.type === "image") {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      // field.size menentukan preset kompresi: "large" (default) atau "small"
      const url = await uploadImage(file, field.size || "large");
      setUploading(false);

      if (url) {
        onChange(field.key, url);
      }
    };

    return (
      <div className="mb-3">
        <label className="block text-sm mb-1">{field.label}</label>
        {value && (
          <img src={value} alt={field.label} className="w-full h-32 object-cover rounded mb-2" />
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="text-sm" />
        {uploading && <p className="text-xs text-gray-400 mt-1">Mengompres & mengupload...</p>}
      </div>
    );
  }

  if (field.type === "audio") {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      const url = await uploadFile(file);
      setUploading(false);

      if (url) {
        onChange(field.key, url);
      }
    };

    return (
      <div className="mb-3">
        <label className="block text-sm mb-1">{field.label}</label>
        {value && (
          <audio src={value} controls className="w-full mb-2" />
        )}
        <input type="file" accept="audio/*" onChange={handleFileChange} disabled={uploading} className="text-sm" />
        {uploading && <p className="text-xs text-gray-400 mt-1">Mengupload...</p>}
      </div>
    );
  }

  return null;
}
