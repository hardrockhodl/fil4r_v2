import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  selectedFile: File | null;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelect,
  isLoading,
  selectedFile,
}) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files?.[0] && !isLoading) {
        onFileSelect(e.dataTransfer.files[0]);
      }
    },
    [onFileSelect, isLoading]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0] && !isLoading) {
        onFileSelect(e.target.files[0]);
      }
    },
    [onFileSelect, isLoading]
  );

  return (
    <label
      className="upload-zone"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        onChange={handleFileChange}
        accept="*/*"
        disabled={isLoading}
      />
      <div className="upload-content">
        <div className="icon-container">
          <Upload />
        </div>
        <div className="upload-text">
          <h3>{selectedFile ? selectedFile.name : 'Upload Files'}</h3>
          <p>
            {selectedFile
              ? `${(selectedFile.size / 1024).toFixed(1)} KB`
              : 'Drag & Drop your files here OR Browse Files'}
          </p>
          <p>Max 5 GB file size</p>
        </div>
      </div>
    </label>
  );
};
