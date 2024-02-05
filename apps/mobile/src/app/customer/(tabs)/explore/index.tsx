import { api } from '@zix/api';
import { AppHeader } from '@zix/app/ui/common';
import { View, Text } from '@zix/app/ui/core';
import React from 'react';

export default function Screen() {
  const query = api.countries.get.useQuery()
  return (
    <>
      <AppHeader showBackButton title="Chat" />
      <View>
        <Text>Chat</Text>
        <Text>query:: {JSON.stringify(query, null, 2)}</Text>
      </View>
    </>
  );
}
