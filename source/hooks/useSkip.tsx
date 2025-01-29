import {Routes} from '@/types/general';
import {useUserStore} from '@/store/userStore';

export default function useSkip(nav: any) {
  const setIsOnboarded = useUserStore(state => state.setIsOnboarded);

  const onSkip = () => {
    nav.navigate(Routes.Training);
    setIsOnboarded(true);
  };

  return onSkip;
}
