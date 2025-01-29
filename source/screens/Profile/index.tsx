import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import Button from '@/components/ui/Button';
import {MenuItemProps, ProfileFormData} from '@/types/general';
import ProfileForm from './ProfileForm';
import MenuItem from './MenuItem';

import TOSIcon from '@/media/icons/tos.svg';
import PrivacyIcon from '@/media/icons/privacy.svg';
import WebsiteIcon from '@/media/icons/dev.svg';
import {useUserStore} from '@/store/userStore';
import {launchImageLibrary} from 'react-native-image-picker';
import BottomNavigation from '@/components/BottomNavigation';

const menuItems: MenuItemProps[] = [
  {
    title: 'Terms of use',
    Icon: TOSIcon,
    value: 'https://www.termsfeed.com/live/248be767-f29b-448d-b80d-dc7f10f1b367',
  },
  {
    title: 'Developer website',
    Icon: WebsiteIcon,
    value: 'https://www.termsfeed.com/live/248be767-f29b-448d-b80d-dc7f10f1b367',
  },
  {
    title: 'Privacy policy',
    Icon: PrivacyIcon,
    value: 'https://www.termsfeed.com/live/248be767-f29b-448d-b80d-dc7f10f1b367',
  },
];

export default function ProfileScreen() {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    about: '',
    image: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const isDisabled = !formData.name;

  useLayoutEffect(() => {
    setFormData(user);
    setIsEditing(false);
  }, []);

  useEffect(() => {
    if (!user.name) {
      setIsEditing(true);
    }
  }, [user]);

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleImageSelect = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      if (selectedImage) {
        setFormData({...formData, image: selectedImage});
      }
    }
  };

  const handleRemoveImage = () => {
    Alert.alert('Remove Image', 'Are you sure you want to remove this image?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setFormData({...formData, image: ''});
          setUser({name: user.name, image: '', about: user.about});
        },
      },
    ]);
  };

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl text-white font-bold">Profile</Text>

          {!isEditing && (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text className="text-primary font-bold">Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {isEditing && (
          <View className="mt-4">
            {formData.image && (
              <TouchableOpacity onLongPress={handleRemoveImage}>
                <View className="mx-auto">
                  <Image
                    source={{uri: formData.image}}
                    className="w-[100px] h-[100px] rounded-full"
                  />
                </View>
              </TouchableOpacity>
            )}

            {!formData?.image && (
              <TouchableOpacity onPress={handleImageSelect} className="mx-auto">
                <View className="w-[100px] h-[100px] justify-center items-center bg-secondary rounded-full">
                  <Text className="text-primary text-3xl mb-2">+</Text>
                </View>
              </TouchableOpacity>
            )}

            <View className="mt-2 gap-4">
              <ProfileForm
                formData={formData}
                onChangeForm={data => setFormData(prev => ({...prev, ...data}))}
              />

              <Button
                title="Save"
                onPress={handleSave}
                variant="primary"
                isDisabled={isDisabled}
              />
            </View>
          </View>
        )}

        {!isEditing && (
          <View>
            {formData.image && (
              <TouchableOpacity onLongPress={handleRemoveImage}>
                <View className="mx-auto">
                  <Image
                    source={{uri: formData.image}}
                    className="w-[100px] h-[100px] rounded-full"
                  />
                </View>
              </TouchableOpacity>
            )}

            <Text className="text-white text-3xl font-bold mt-2 text-center mx-auto">
              {formData.name}
            </Text>

            {formData?.about && (
              <Text className="text-white mt-2">{formData.about}</Text>
            )}
          </View>
        )}

        <View className="mt-8 gap-3">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              Icon={item.Icon}
              value={item.value}
            />
          ))}
        </View>
      </ScrollView>

      <BottomNavigation />
    </ScreenWrapper>
  );
}
