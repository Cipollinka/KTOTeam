import {TouchableOpacity, View} from 'react-native';
import React from 'react';

import RoutesIcon from '@/media/icons/nav/training.svg';
import ProfileIcon from '@/media/icons/nav/profile.svg';
import QRIcon from '@/media/icons/nav/finances.svg';
import WalksIcon from '@/media/icons/nav/team.svg';
import {Routes} from '@/types/general';

import {useNavigation, useRoute} from '@react-navigation/native';
import {SvgProps} from 'react-native-svg';

interface NavItemProps {
  Icon: React.FC<SvgProps>;
  value: string;
  isActive?: boolean;
  onPress?: () => void;
}

const navigationItems = [
  {
    Icon: RoutesIcon,
    value: Routes.Training,
  },
  {
    Icon: WalksIcon,
    value: Routes.Team,
  },
  {
    Icon: QRIcon,
    value: Routes.Finances,
  },
  {
    Icon: ProfileIcon,
    value: Routes.Profile,
  },
];

function NavigationItem({Icon, isActive = false, onPress}: NavItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col flex-1 shrink items-center self-stretch my-auto basis-0 h-[43px]">
      <Icon color={isActive ? '#fff' : '#ffffff80'} width={30} height={20} />
    </TouchableOpacity>
  );
}

export default function BottomNavigation() {
  const nav = useNavigation();
  const route = useRoute();
  return (
    <View className="overflow-hidden px-10 pt-5 mt-2 w-full text-xs font-medium bg-zinc-800 border-t border-t-[#999999]">
      <View className="flex-row gap-10 items-center w-full">
        {navigationItems.map(item => {
          const isActive = item.value === route.name;
          return (
            <NavigationItem
              key={item.value}
              value={item.value}
              Icon={item.Icon}
              isActive={isActive}
              onPress={() => nav.navigate(item.value)}
            />
          );
        })}
      </View>
    </View>
  );
}
