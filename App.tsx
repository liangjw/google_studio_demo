
import React, { useState, useCallback } from 'react';
import PoseSelector from './components/PoseSelector';
import ImageWorkspace from './components/ImageWorkspace';
import { SparklesIcon } from './components/icons';
import { editImageWithPose } from './services/geminiService';
import { POSES } from './constants';
import type { Pose } from './types';

const App: React.FC = () => {
  const [selectedPose, setSelectedPose] = useState<Pose | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePoseSelect = useCallback((id: number) => {
    const pose = POSES.find((p) => p.id === id) || null;
    setSelectedPose(pose);
  }, []);

  const handleImageUpload = (file: File) => {
    setOriginalImageFile(file);
    setEditedImage(null);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // remove the data url prefix: 'data:image/png;base64,'
        resolve(result.split(',')[1]);
      };
      reader.onerror = (err) => reject(err);
    });

  const handleTransformClick = async () => {
    if (!selectedPose || !originalImageFile) {
      setError("Please select a pose and upload an image first.");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setEditedImage(null);

    try {
      const base64Image = await toBase64(originalImageFile);
      const result = await editImageWithPose(
        base64Image,
        originalImageFile.type,
        selectedPose.prompt
      );
      setEditedImage(result);
    } catch (err) {
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-light">
            AI Pose Changer
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Transform your photos with classic model poses, powered by Gemini.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <PoseSelector
              poses={POSES}
              selectedPoseId={selectedPose?.id ?? null}
              onSelectPose={handlePoseSelect}
            />
            
            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4 text-brand-light">2. Upload & Transform</h2>
               <p className="text-gray-400 mb-4 text-sm">
                After uploading an image and selecting a pose, click the button below to start the transformation.
               </p>
              <button
                onClick={handleTransformClick}
                disabled={!selectedPose || !originalImageFile || isLoading}
                className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-secondary"
              >
                <SparklesIcon className="w-5 h-5" />
                <span>{isLoading ? 'Transforming...' : 'Transform Image'}</span>
              </button>
              {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
            </div>
          </div>

          <div className="lg:col-span-2 h-[400px] md:h-[600px]">
            <ImageWorkspace
              originalImage={originalImagePreview}
              editedImage={editedImage}
              isLoading={isLoading}
              onImageUpload={handleImageUpload}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
