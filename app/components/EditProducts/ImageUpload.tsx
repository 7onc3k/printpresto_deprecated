import React from 'react';

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, label }) => (
  <input
    type="file"
    onChange={onChange}
    aria-label={label}
  />
);

export default ImageUpload;