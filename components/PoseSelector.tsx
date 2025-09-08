import React from 'react';
import type { Pose } from '../types';

interface PoseSelectorProps {
  poses: Pose[];
  selectedPoseId: number | null;
  onSelectPose: (id: number) => void;
}

const PoseSelector: React.FC<PoseSelectorProps> = ({ poses, selectedPoseId, onSelectPose }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-brand-light">1. Select a Pose</h2>
      <div className="grid grid-cols-4 gap-2">
        {poses.map((pose) => {
          const IconComponent = pose.icon;
          return (
          <button
            key={pose.id}
            onClick={() => onSelectPose(pose.id)}
            aria-label={`Select pose: ${pose.name}`}
            className={`p-2 rounded-lg text-center transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-secondary flex flex-col items-center justify-center aspect-square ${
              selectedPoseId === pose.id
                ? 'bg-brand-secondary text-white shadow-lg'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            <IconComponent className="w-8 h-8 mb-1" aria-hidden="true" />
            <span className="text-xs font-medium">{pose.name}</span>
          </button>
        )})}
      </div>
    </div>
  );
};

export default PoseSelector;
