import { useEffect, useMemo, useState } from "react";

export function useCoverPreview(initialImage: Blob | null) {
  const [image, setImage] = useState<Blob | null>(initialImage);

  const previewUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const changeImage = (file: File) => {
    setImage(file);
  };

  const removeImage = () => {
    setImage(null);
  };

  return {
    image,
    previewUrl,
    changeImage,
    removeImage,
  };
}