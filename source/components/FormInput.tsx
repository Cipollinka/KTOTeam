import {FormInputProps} from '@/types/general';
import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  iconUri,
  type,
  className,
}) => {
  const inputId = `${label.toLowerCase()}Input`;

  return (
    <View className="mt-5 w-full text-base whitespace-nowrap">
      <Text className="text-white" nativeID={`${inputId}Label`}>
        {label}
      </Text>
      <View className="flex-row gap-2 items-center px-3 py-3.5 mt-3 w-full rounded-xl bg-zinc-800 min-h-[52px]">
        {iconUri && (
          <Image
            source={{uri: iconUri}}
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#71717A"
          className="flex-1 text-white"
          accessibilityLabel={label}
          accessibilityLabelledBy={`${inputId}Label`}
          id={inputId}
          keyboardType={type}
        />
      </View>
    </View>
  );
};
