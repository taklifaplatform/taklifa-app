import React from 'react';

import { CustomIcon } from '@zix/app/ui/icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="home" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="orders" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="notifications" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="chat" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}
