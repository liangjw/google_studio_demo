import type { FC } from 'react';

export interface Pose {
  id: number;
  name: string;
  prompt: string;
  icon: FC<{ className?: string }>;
}