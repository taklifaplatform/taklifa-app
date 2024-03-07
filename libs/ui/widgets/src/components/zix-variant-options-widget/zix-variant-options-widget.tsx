import React from 'react';

import { View, Text } from 'react-native';
import { IVariantOption } from './variant-option';

export interface ZixVariantOptionsWidgetProps {
  icon: React.ReactNode;
  label: string;
  options: IVariantOption[];
}

export function ZixVariantOptionsWidget(props: ZixVariantOptionsWidgetProps) {
  return (
    <View>
      <Text>Welcome to zix-variant-options--widget!</Text>
    </View>
  );
}

export default ZixVariantOptionsWidget;
