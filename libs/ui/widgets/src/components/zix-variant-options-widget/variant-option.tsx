import React from 'react';

import { View, Text } from 'react-native';

export type IVariantOption = {
  icons: React.ReactNode;
  name: string;
  value: string;
};

export type VariantOptionProps = {
  option: IVariantOption;
};

export function VariantOption(props: VariantOptionProps) {
  return (
    <View>
      <Text>Welcome to zix-variant-options--widget!</Text>
    </View>
  );
}

export default VariantOption;
