import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Plus } from '@tamagui/lucide-icons';
import { Circle, Theme, YStack } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { Tabs, useRouter } from 'expo-router';
import { t } from 'i18next';
import React from 'react';

/**
 * TODO:
 * make tab title bolder and back color even if active
 */
export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation:customer-dashboard.home'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="home" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: t('navigation:customer-dashboard.orders'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="orders" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="create-shipment"
        options={{
          title: '',
          tabBarIcon: PlusButton
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('navigation:customer-dashboard.store'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="notifications" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t('navigation:customer-dashboard.chat'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="chat" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}

type TabBarIconProps = Parameters<
  Exclude<BottomTabNavigationOptions['tabBarIcon'], undefined>
>[0];

const PlusButton = ({ size, focused, color }: TabBarIconProps) => {
  const router = useRouter();

  return (
    <Theme>
      <Circle
        onPress={() => router.push('/customer/create-shipment')}
        pos="absolute"
        backgroundColor={focused ? '$color' : '$color5'}
        width={size + 34}
        height={size + 34}
      />
      <YStack
        pos="absolute"
        jc="center"
        ai="center"
        animation="quick"
        pointerEvents="none"
        height={size + 34}
      >
        <Plus color={focused ? '$color5' : '$color'} size={size + 5} />
      </YStack>
    </Theme>
  );
};
