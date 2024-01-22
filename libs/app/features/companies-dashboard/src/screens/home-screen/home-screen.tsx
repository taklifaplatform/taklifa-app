import { Text, View } from '@zix/app/ui/core';
import { useCompanyManagerContext } from '../../context/UseCompanyManagerContext';

/* eslint-disable-next-line */
export interface HomeScreenProps {}

export function HomeScreen(props: HomeScreenProps) {
  const { activeCompany } = useCompanyManagerContext();
  return (
    <View>
      <Text>Welcome to home-screen!</Text>
      <Text>{JSON.stringify(activeCompany, null, 2)}</Text>
    </View>
  );
}

export default HomeScreen;
