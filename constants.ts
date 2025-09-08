import type { Pose } from './types';
import {
  SCurveIcon,
  LookBackIcon,
  HandChinIcon,
  LeanWallIcon,
  HairFlipIcon,
  HandsHipsIcon,
  HeadDownIcon,
  StretchIcon,
  OneLegIcon,
  SelfHugIcon,
  BitingLipIcon,
  ArchingBackIcon,
  OffShoulderIcon,
  ComeHitherIcon,
} from './components/PoseIcons';

export const POSES: Pose[] = [
  { id: 1, name: 'S型曲线', prompt: 'classic S-curve pose', icon: SCurveIcon },
  { id: 2, name: '回眸一笑', prompt: 'looking back over the shoulder with a smile', icon: LookBackIcon },
  { id: 3, name: '手扶下巴', prompt: 'hand gently touching the chin, looking thoughtful', icon: HandChinIcon },
  { id: 4, name: '倚墙而立', prompt: 'casually leaning against a wall', icon: LeanWallIcon },
  { id: 5, name: '拨弄头发', prompt: 'fingers running through hair', icon: HairFlipIcon },
  { id: 6, name: '叉腰站姿', prompt: 'standing with hands on hips, looking confident', icon: HandsHipsIcon },
  { id: 7, name: '低头沉思', prompt: 'head tilted down in a pensive or shy manner', icon: HeadDownIcon },
  { id: 8, name: '伸懒腰', prompt: 'stretching arms up as if waking up', icon: StretchIcon },
  { id: 9, name: '单脚站立', prompt: 'standing on one leg, with the other bent', icon: OneLegIcon },
  { id: 10, name: '拥抱自己', prompt: 'arms wrapped around oneself in a self-hug', icon: SelfHugIcon },
  { id: 11, name: '咬嘴唇', prompt: 'seductively biting lower lip', icon: BitingLipIcon },
  { id: 12, name: '向后拱腰', prompt: 'arching back to accentuate curves', icon: ArchingBackIcon },
  { id: 13, name: '小露香肩', prompt: 'playfully pulling down the collar to show one shoulder', icon: OffShoulderIcon },
  { id: 14, name: '手指勾引', prompt: `'come hither' gesture with one finger`, icon: ComeHitherIcon },
];
