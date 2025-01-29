import {View, Text, Image} from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import BackButton from '@/components/BackButton';
import {Article} from '@/types/general';

export default function ArticleDetails({route}: any) {
  const article = route.params.article as Article;

  return (
    <ScreenWrapper>
      <BackButton />

      {article.image && (
        <Image
          className="w-full h-[200px] rounded-3xl mt-2"
          source={{uri: article.image}}
        />
      )}

      <Text className="text-white text-2xl font-bold mt-2">
        {article.title}
      </Text>
      <Text className="text-white text-lg mt-2">{article.descriptionLong}</Text>
    </ScreenWrapper>
  );
}
