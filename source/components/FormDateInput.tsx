import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, Animated} from 'react-native';
import DateIcon from '@/media/icons/date.svg';
import TimeIcon from '@/media/icons/time.svg';
import RNDateTimePicker from '@react-native-community/datetimepicker';

interface FormDateInputProps {
  label: string;
  value: Date;
  offset?: number;
  onChange: (value: Date | undefined) => void;
  mode?: 'date' | 'time';
}

export default function FormDateInput({
  label,
  value,
  mode = 'date',
  offset = 0,
  onChange,
}: FormDateInputProps) {
  const isDate = mode === 'date';
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPickerOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: isDate ? 300 - offset : 200 - offset,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 600,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isPickerOpen, slideAnim, opacityAnim]);

  return (
    <View className="flex-col w-full mt-6">
      <Text className="text-white">{label}</Text>
      <TouchableWithoutFeedback onPress={() => setIsPickerOpen(true)}>
        <View className="flex-row gap-2 items-center px-3 py-3.5 mt-3 w-full rounded-xl bg-zinc-800">
          {isDate ? <DateIcon /> : <TimeIcon />}
          <Text className="text-white">
            {value?.[isDate ? 'toDateString' : 'toLocaleTimeString']()}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {isPickerOpen && (
        <>
          <TouchableWithoutFeedback onPress={() => setIsPickerOpen(false)}>
            <View
              style={{
                position: 'absolute',
                top: -300,
                left: 0,
                right: 0,
                bottom: -300,
                zIndex: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              }}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              zIndex: 50,
              transform: [{translateY: slideAnim}],
            }}
            className="absolute mt-auto bottom-0 left-0 right-0 bg-neutral-900 rounded-t-2xl p-4 z-50">
            <RNDateTimePicker
              style={{zIndex: 20}}
              value={value}
              textColor="white"
              mode={mode}
              display="spinner"
              onChange={(_, date) => {
                setIsPickerOpen(false);
                if (date) {
                  onChange(date);
                }
              }}
            />
          </Animated.View>
        </>
      )}
    </View>
  );
}
