
import React, { useRef } from 'react';
import { UploadIcon, LoadingSpinner } from './icons';

interface ImageWorkspaceProps {
  originalImage: string | null;
  editedImage: string | null;
  isLoading: boolean;
  onImageUpload: (file: File) => void;
}

const ImageDisplay: React.FC<{ src: string; alt: string; title: string }> = ({ src, alt, title }) => (
  <div className="relative w-full animate-fade-in">
    <h3 className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">{title}</h3>
    <img src={src} alt={alt} className="w-full h-full object-contain rounded-xl shadow-lg" />
  </div>
);

const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({
  originalImage,
  editedImage,
  isLoading,
  onImageUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full bg-gray-800/50 rounded-2xl p-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-600">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center text-center">
            <LoadingSpinner />
            <p className="mt-4 text-lg font-semibold text-brand-light animate-pulse-fast">Transforming your pose...</p>
            <p className="text-sm text-gray-400 mt-1">This may take a moment. AI is working its magic!</p>
        </div>
      ) : (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {!originalImage ? (
                <div className="col-span-full flex flex-col items-center justify-center h-full">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                    />
                    <button
                        onClick={handleUploadClick}
                        className="flex flex-col items-center justify-center text-gray-400 hover:text-brand-light transition-colors p-8 rounded-lg"
                    >
                        <UploadIcon className="w-16 h-16 mb-4" />
                        <span className="text-xl font-bold">Upload an Image</span>
                        <span className="text-sm mt-1">Select a photo to begin</span>
                    </button>
                </div>
            ) : (
                <>
                    <ImageDisplay src={originalImage} alt="Original" title="Original" />
                    {editedImage ? (
                        <ImageDisplay src={`data:image/png;base64,${editedImage}`} alt="Edited" title="Transformed" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-center">
                            <p>Your transformed image will appear here.</p>
                        </div>
                    )}
                </>
            )}
        </div>
      )}
    </div>
  );
};

export default ImageWorkspace;
