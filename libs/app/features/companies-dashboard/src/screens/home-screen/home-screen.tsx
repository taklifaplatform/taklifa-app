import { Text, View } from '@zix/app/ui/core';
import { useCurrentActiveOrg } from '../../hooks/useCurrentActiveOrg';

/* eslint-disable-next-line */
export interface HomeScreenProps {}

export function HomeScreen(props: HomeScreenProps) {
  const { data } = useCurrentActiveOrg();
  return (
    <View>
      <Text>Welcome to home-screen!</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}

export default HomeScreen;
