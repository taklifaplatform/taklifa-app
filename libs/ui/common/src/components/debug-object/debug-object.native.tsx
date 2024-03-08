import React from 'react';

import { Text } from 'tamagui';

export type DebugObjectProps = {
  object: any;
};

export const DebugObject: React.FC<DebugObjectProps> = ({ object }) => {
  return <Text>{JSON.stringify(object, null, 2)}</Text>;
};

export default DebugObject;
