import { useState, useEffect, useRef } from "react";
import ImageCropModal from "./ImageCropModal";

/**
 * Input upload foto dengan preview dan crop bawaan.
 * - initialPreviewUrl: foto yang sudah ada (dipakai saat mode edit)
 * - aspect: rasio crop, mis. 1 untuk persegi, 16/9 untuk landscape
 * - onChange(file): dipanggil dengan File hasil crop, siap dimasukkan ke FormData
 */
export default function PhotoUploadWithCrop({
  label = "Foto",
  hint,
  aspect = 1,
  initialPreviewUrl = null,
  onChange,
}) {
  const [preview, setPreview] = useState(initialPreviewUrl);
  const [rawSrc, setRawSrc] = useState(null);
  const [cropOpen, setCropOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setPreview(initialPreviewUrl);
  }, [initialPreviewUrl]);

  const handleFileSelect = (file) => {
    if (!file) return;
    setRawSrc(URL.createObjectURL(file));
    setCropOpen(true);
  };

  const handleCropDone = (croppedFile) => {
    setCropOpen(false);
    setPreview(URL.createObjectURL(croppedFile));
    onChange(croppedFile);
  };

  const handleCropCancel = () => {
    setCropOpen(false);
    setRawSrc(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-1.5">
        {label}{" "}
        {hint && <span className="text-gray font-normal">{hint}</span>}
      </label>

      {preview && (
        <div className="mb-3">
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 rounded-xl object-cover border border-gray-200"
          />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        className="w-full text-sm"
      />

      {rawSrc && (
        <ImageCropModal
          open={cropOpen}
          imageSrc={rawSrc}
          aspect={aspect}
          onCancel={handleCropCancel}
          onDone={handleCropDone}
        />
      )}
    </div>
  );
}
