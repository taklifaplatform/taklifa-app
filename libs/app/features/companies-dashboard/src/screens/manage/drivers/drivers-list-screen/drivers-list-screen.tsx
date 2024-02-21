
import { api } from '@zix/api';
import React from 'react';

import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface DriversListScreenProps {
}


export function DriversListScreen(props: DriversListScreenProps) {
  const { data} = api.manageCompany.list.useQuery()
  return (
    <View>
      <Text>Welcome to drivers-list-screen!</Text>
    </View>
  );
}


export default DriversListScreen;
