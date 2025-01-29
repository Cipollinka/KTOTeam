import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {Finance, Player, ProfileFormData, Training} from '@/types/general';

const MMKV = new MMKVLoader().initialize();

interface State {
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;

  user: ProfileFormData;
  setUser: (user: ProfileFormData) => void;

  finances: Finance[];
  addFinance: (finance: Omit<Finance, 'id'>) => void;
  removeFinance: (id: number) => void;

  players: Player[];
  addPlayer: (player: Omit<Player, 'id'>) => void;
  editPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;

  trainings: Training[];
  addTraining: (training: Omit<Training, 'id'>) => void;
  editTraining: (training: Training) => void;
  removeTraining: (id: number) => void;
}

export const useUserStore = create(
  persist<State>(
    (set, get) => ({
      isOnboarded: false,
      setIsOnboarded: isOnboarded => set({isOnboarded}),

      user: {image: '', name: '', about: ''},
      setUser: user => set({user}),

      finances: [],
      addFinance: finance => {
        const ff = get().finances;
        const lastId = ff.length > 0 ? ff[ff?.length - 1]?.id : 0;

        set({finances: [...ff, {...finance, id: lastId + 1}]});
      },
      removeFinance: id =>
        set({finances: get().finances.filter(f => f.id !== id)}),

      players: [],
      addPlayer: player => {
        const ff = get().players;
        const lastId = ff.length > 0 ? ff[ff?.length - 1]?.id : 0;

        set({players: [...ff, {...player, id: lastId + 1}]});
      },
      editPlayer: player => {
        const ff = get().players;
        const index = ff.findIndex(f => f.id === player.id);
        set({players: [...ff.slice(0, index), player, ...ff.slice(index + 1)]});
      },
      removePlayer: id =>
        set({players: get().players.filter(f => f.id !== id)}),

      trainings: [],
      addTraining: training => {
        const ff = get().trainings;
        const lastId = ff.length > 0 ? ff[ff?.length - 1]?.id : 0;

        set({trainings: [...ff, {...training, id: lastId + 1}]});
      },
      editTraining: training => {
        const ff = get().trainings;
        const index = ff.findIndex(f => f.id === training.id);
        set({
          trainings: [...ff.slice(0, index), training, ...ff.slice(index + 1)],
        });
      },
      removeTraining: id =>
        set({trainings: get().trainings.filter(f => f.id !== id)}),
    }),
    {
      storage: {
        getItem: (key: string) => MMKV.getMap(key) ?? null,
        setItem: (key: string, value: any) => MMKV.setMap(key, value),
        removeItem: (key: string) => MMKV.removeItem(key),
      },
      name: 'user',
    },
  ),
);
