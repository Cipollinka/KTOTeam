import {DotIndicatorProps} from '@/types/general';
import * as React from 'react';
import {View} from 'react-native';

export const DotIndicator: React.FC<DotIndicatorProps> = ({
  isActive,
  style,
}) => (
  <View
    className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-stone-600'}`}
    style={style}
  />
);
