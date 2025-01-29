import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import ArticleCard from './Card';
import {RoutesT, Routes} from '@/types/general';
import {useNavigation} from '@react-navigation/native';
import Tabs from '@/components/Tabs';
import BottomNavigation from '@/components/BottomNavigation';

import articles from '@/data/articles.json';

const tabs = ['Rules', 'Inventory', 'Advices'];

export default function UsefulScreen() {
  const nav = useNavigation<RoutesT>();
  const [currentTab, setCurrentTab] = useState(0);
  const [articlesState, setArticlesState] = useState(articles);

  useEffect(() => {
    setArticlesState(
      articles.filter(a =>
        currentTab === 0
          ? a.category === 'rules'
          : currentTab === 1
          ? a.category === 'inventory'
          : a.category === 'advices',
      ),
    );
  }, [articles, currentTab]);

  return (
    <ScreenWrapper>
      <View className="py-4">
        <Text className="text-3xl font-bold text-white">Useful</Text>
      </View>

      <Tabs
        tab={currentTab}
        onChangeTab={setCurrentTab}
        tabs={tabs}
        coef={3.45}
      />

      <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
        <View className="gap-4">
          {articlesState.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
              onPress={article => nav.navigate(Routes.Useful_Detail, {article})}
            />
          ))}
        </View>
      </ScrollView>

      <BottomNavigation />
    </ScreenWrapper>
  );
}
