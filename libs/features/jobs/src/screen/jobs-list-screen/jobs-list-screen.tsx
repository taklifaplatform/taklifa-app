
import React from 'react';

import { View, Text } from 'react-native';

export type JobsListScreenProps = {
  urlPrefix?: string;
}


export const JobsListScreen: React.FC<JobsListScreenProps> = ({
  urlPrefix = '/jobs'
}) => {
  return (
    <View>
      <Text>Welcome to jobs-list-screen!</Text>
    </View>
  );
}


export default JobsListScreen;
