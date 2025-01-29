import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DotIndicator} from '@/components/DotIndicator';
import Button from '@/components/ui/Button';
import {RoutesT, Routes} from '@/types/general';
import {useNavigation} from '@react-navigation/native';
import useSkip from '@/hooks/useSkip';
import {useUserStore} from '@/store/userStore';

const GreetFirst: React.FC = () => {
  const nav = useNavigation<RoutesT>();
  const dots = Array(5).fill(null);
  const isOnboarded = useUserStore(state => state.isOnboarded);

  React.useLayoutEffect(() => {
    if (isOnboarded) {
      nav.navigate(Routes.Training);
    }
  }, [isOnboarded]);

  const onSkip = useSkip(nav);

  const onNext = () => {
    nav.navigate(Routes.Greet_Second);
  };

  return (
    <ScreenWrapper>
      <View className=" mt-3">
        <View className="self-start">
          <Text
            className="text-3xl font-medium text-white"
            accessibilityRole="header">
            Welcome to KTO!
          </Text>
          <Text className="mt-3.5 text-lg text-white" accessibilityRole="text">
            Add your sports team
          </Text>
        </View>
      </View>

      <Image
        source={require('@/media/images/greet/1.png')}
        className="w-full h-[73%] object-fill"
        resizeMode="cover"
        accessibilityRole="image"
      />

      <View className="flex-row justify-between mt-auto  mb-4">
        <View className="w-[130px]" />

        <View className="items-center justify-center gap-4">
          <View className="flex-row gap-1">
            {dots.map((_, index) => (
              <DotIndicator key={index} isActive={index === 0} />
            ))}
          </View>
          <TouchableOpacity
            onPress={onSkip}
            accessibilityRole="button"
            accessibilityLabel="Skip onboarding">
            <Text className=" text-white text-center">Skip</Text>
          </TouchableOpacity>
        </View>

        <Button title="Next" onPress={onNext} />
      </View>
    </ScreenWrapper>
  );
};

export default GreetFirst;
