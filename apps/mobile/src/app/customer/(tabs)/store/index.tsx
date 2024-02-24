import { AppHeader } from '@zix/ui/common';
import { H4, View, XStack } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

export default function Screen() {
  return (
    <>
      <AppHeader title="Store" />
      <XStack flex={1} alignItems="center" justifyContent="center">
        <View>
          <CustomIcon name="empty_data" size="$20" />
          <H4 textAlign="center">No stores found...</H4>
        </View>
      </XStack>
    </>
  );
}
