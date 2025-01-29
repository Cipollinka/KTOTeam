import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes, RoutesWithValues} from '../types/general';
import Home from '../screens/Home';
import First from '@/screens/Greet/First';
import GreetSecond from '@/screens/Greet/Second';
import GreetThird from '@/screens/Greet/Third';
import GreetFifth from '@/screens/Greet/Fifth';
import GreetSixth from '@/screens/Greet/Sixth';
import TrainingsScreen from '@/screens/Training';
import {AddTrainingScreen} from '@/screens/AddTraining';
import {TeamScreen} from '@/screens/Team';
import AddPlayerScreen from '@/screens/AddTeam';
import UsefulScreen from '@/screens/Articles';
import ArticleDetails from '@/screens/Articles/Details';
import FinancesScreen from '@/screens/Finances';
import AddFinance from '@/screens/AddFinance';
import ProfileScreen from '@/screens/Profile';

const Stack = createNativeStackNavigator<RoutesWithValues>();

const ScreensContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.Greet_First}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.Home} component={Home} />
        <Stack.Screen name={Routes.Greet_First} component={First} />
        <Stack.Screen name={Routes.Greet_Second} component={GreetSecond} />
        <Stack.Screen name={Routes.Greet_Third} component={GreetThird} />
        <Stack.Screen name={Routes.Greet_Fifth} component={GreetFifth} />
        <Stack.Screen name={Routes.Greet_Sixth} component={GreetSixth} />

        <Stack.Screen name={Routes.Training} component={TrainingsScreen} />
        <Stack.Screen
          name={Routes.Add_Training}
          component={AddTrainingScreen}
        />

        <Stack.Screen name={Routes.Team} component={TeamScreen} />
        <Stack.Screen name={Routes.Add_Team} component={AddPlayerScreen} />

        <Stack.Screen name={Routes.Useful} component={UsefulScreen} />
        <Stack.Screen name={Routes.Useful_Detail} component={ArticleDetails} />

        <Stack.Screen name={Routes.Finances} component={FinancesScreen} />
        <Stack.Screen name={Routes.Add_Finances} component={AddFinance} />

        <Stack.Screen name={Routes.Profile} component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreensContainer;
