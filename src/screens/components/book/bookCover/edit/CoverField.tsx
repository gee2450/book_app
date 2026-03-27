import { useState } from "react";
import CoverAddButton from "./CoverAddButton";
import CoverPreview from "./CoverPreview";
import { BookCoverSourceModal } from "../source";

type Props = {
  image?: Blob | null;
  onChangeImage?: (file: File) => void;
  onRemoveImage?: () => void;
};

export default function CoverField({
  image,
  onChangeImage,
  onRemoveImage,
}: Props) {
  const [openSourceModal, setOpenSourceModal] = useState(false);

  return (
    <>
      {image ? (
        <CoverPreview
          image={image}
          onClick={() => setOpenSourceModal(true)}
        />
      ) : (
        <CoverAddButton onClick={() => setOpenSourceModal(true)} />
      )}

      <BookCoverSourceModal
        open={openSourceModal}
        hasImage={!!image}
        onClose={() => setOpenSourceModal(false)}
        onSelectFile={(file) => {
          onChangeImage?.(file);
          setOpenSourceModal(false);
        }}
        onRemoveImage={() => {
          onRemoveImage?.();
          setOpenSourceModal(false);
        }}
      />
    </>
  );
}