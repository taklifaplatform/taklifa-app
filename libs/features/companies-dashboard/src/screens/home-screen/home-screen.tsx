import { useAuth } from '@zix/utils';
import { Text, View } from 'tamagui';

/* eslint-disable-next-line */
export interface HomeScreenProps { }

export function HomeScreen(props: HomeScreenProps) {
  const { user } = useAuth();
  return (
    <View>
      <Text>Welcome to home-screen!</Text>
      <Text>{JSON.stringify(user?.active_company, null, 2)}</Text>
    </View>
  );
}

export default HomeScreen;
