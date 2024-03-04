
import { ShipmentTransformer } from '@zix/api';
import React from 'react';

import { View, Text } from 'react-native';

export type JobCardProps = {
  job: ShipmentTransformer
}


export const JobCard : React.FC<JobCardProps> = (props) => {
  return (
    <View>
      <Text>Welcome to job-card!</Text>
      
    </View>
  );
}


export default JobCard;
