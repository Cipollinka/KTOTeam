import {View, Text} from 'react-native';
import React from 'react';
import clsx from 'clsx';

import EmptyIcon from '@/media/icons/empty/empty.svg';

interface Props {
  text: string;
  withTransform?: boolean;
}

export default function EmptyData({text, withTransform}: Props) {
  return (
    <View
      className={clsx('my-auto mx-auto gap-8 justify-center items-center ', {
        'translate-y-1/3': withTransform,
      })}>
      <EmptyIcon />
      <Text className="text-white text-lg max-w-[240px] text-center">
        {text}
      </Text>
    </View>
  );
}
