import {Article} from '@/types/general';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

interface ArticleCardProps {
  article: Article;
  onPress: (article: Article) => void;
}

export default function ArticleCard({article, onPress}: ArticleCardProps) {
  return (
    <TouchableOpacity
      className="gap-3 p-4 rounded-2xl bg-secondary"
      onPress={() => onPress(article)}>
      {article?.image && (
        <View className="justify-center items-center rounded-2xl h-[150px] max-sm:h-[120px]">
          <Image
            source={{uri: article.image}}
            className="w-full h-full rounded-2xl"
          />
        </View>
      )}
      <View className="text-lg font-semibold leading-tight text-white">
        <Text className="text-white font-bold">{article.title}</Text>
      </View>
      <View className="text-sm leading-snug text-white text-opacity-50">
        <Text className="text-white">{article.descriptionShort}</Text>
      </View>
    </TouchableOpacity>
  );
}
