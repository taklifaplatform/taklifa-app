import React from 'react';
import { Text } from 'tamagui';

export type DebugObjectProps = {
  object: any;
};

export const DebugObject: React.FC<DebugObjectProps> = ({ object }) => {
  return (
    <Text>
      <pre className="ignore-css">{JSON.stringify(object, null, 2)}</pre>
    </Text>
  );
};

export default DebugObject;
