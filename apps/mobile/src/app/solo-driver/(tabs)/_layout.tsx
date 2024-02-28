import React from 'react';
import { t } from 'i18next';

import { CustomIcon } from '@zix/ui/icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation:solo-driver-dashboard.home'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon name="home" color={focused ? '$color5' : '$gray6'} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: t('navigation:solo-driver-dashboard.orders'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon name="orders" color={focused ? '$color5' : '$gray6'} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: t('navigation:solo-driver-dashboard.jobs'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon name="job" color={focused ? '$color5' : '$gray6'} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t('navigation:solo-driver-dashboard.chat'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon name="chat" color={focused ? '$color5' : '$gray6'} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
