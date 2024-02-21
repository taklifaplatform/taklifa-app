import { AppHeader } from '@zix/app/ui/common';
import { ScrollView, Text } from '@zix/app/ui/core';
import React from 'react';


export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Chat" />
      <ScrollView p='$4'>
        <Text>
          Hello


        </Text>

      </ScrollView >
    </>
  );
}
