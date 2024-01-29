import React from 'react';
import { t } from 'i18next';

import { CustomIcon } from '@zix/app/ui/icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation:company-dashboard.home'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="home" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: t('navigation:company-dashboard.orders'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="orders" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          title: t('navigation:company-dashboard.data'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="apps" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: t('navigation:company-dashboard.jobs'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="notifications" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t('navigation:company-dashboard.chat'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="chat" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}
