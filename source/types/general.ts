import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {KeyboardTypeOptions, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

export enum Routes {
  Home = 'Home',
  Greet_First = 'Greet_First',
  Greet_Second = 'Greet_Second',
  Greet_Third = 'Greet_Third',
  Greet_Fifth = 'Greet_Fifth',
  Greet_Sixth = 'Greet_Sixth',

  Training = 'Training',
  Add_Training = 'Add_Training',

  Team = 'Team',
  Add_Team = 'Add_Team',

  Analytics = 'Analytics',

  Useful = 'Useful',
  Useful_Detail = 'Useful_Detail',

  Finances = 'Finances',
  Add_Finances = 'Add_Finances',

  Profile = 'Profile',
}

export type RoutesWithValues = {
  [Routes.Home]: undefined;
  [Routes.Greet_First]: undefined;
  [Routes.Greet_Second]: undefined;
  [Routes.Greet_Third]: undefined;
  [Routes.Greet_Fifth]: undefined;
  [Routes.Greet_Sixth]: undefined;

  [Routes.Training]: undefined;
  [Routes.Add_Training]: {training: Training} | undefined;

  [Routes.Team]: undefined;
  [Routes.Add_Team]: {player: Player} | undefined;

  [Routes.Analytics]: undefined;

  [Routes.Useful]: undefined;
  [Routes.Useful_Detail]: {article: Article};

  [Routes.Finances]: undefined;
  [Routes.Add_Finances]: {isBuy: boolean};

  [Routes.Profile]: undefined;
};

export type RoutesT = NativeStackNavigationProp<RoutesWithValues>;

export interface DotIndicatorProps {
  isActive: boolean;
  style?: ViewStyle;
}

export interface OnboardingLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface Training {
  id: number;
  name: string;
  description: string;
  address: string;
  date: string;
  time: string;
  isSelected?: boolean;
  tabIndex: number;
}

export interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  iconUri?: string;
  type?: KeyboardTypeOptions;
  className?: string;
}

export interface TrainingFormData {
  name: string;
  description: string;
  address: string;
  date: string;
  time: string;
  notifications: boolean;
}

export interface PlayerStats {
  matches?: number;
  goals?: number;
  assists?: number;
  saves?: number;
  mistakes?: number;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  state: 'main' | 'reserve';
  stats: PlayerStats;
}

export interface NavItem {
  icon: string;
  label: string;
  isActive?: boolean;
}

export interface PlayerFormData {
  name: string;
  position: string;
  state: 'main' | 'reserve';
  stats: PlayerStats;
}

export interface Article {
  id: number;
  title: string;
  descriptionShort: string;
  descriptionLong: string;
  image: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface MenuItemProps {
  title: string;
  Icon: React.FC<SvgProps>;
  value: string;
}

export interface ProfileFormData {
  name: string;
  about: string;
  image: string;
}

export interface Finance {
  id: number;
  name: string;
  amount: number;
  date: string;
  isBuy: boolean;
}
