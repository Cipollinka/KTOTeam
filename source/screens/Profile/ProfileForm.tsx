import {FormInput} from '@/components/FormInput';
import {ProfileFormData} from '@/types/general';
import React from 'react';
import {View, Text, TextInput} from 'react-native';

interface ProfileFormProps {
  formData: ProfileFormData;
  onChangeForm: (data: Partial<ProfileFormData>) => void;
}

export default function ProfileForm({
  formData,
  onChangeForm,
}: ProfileFormProps) {
  return (
    <View>
      <FormInput
        label="Your name"
        value={formData.name}
        onChange={text => onChangeForm({name: text})}
        placeholder="Enter your name"
      />

      <FormInput
        label="About you"
        value={formData.about}
        onChange={text => onChangeForm({about: text})}
        placeholder="Tell us a little bit about yourself"
      />
    </View>
  );
}
