import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Plus } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import { Tabs } from 'expo-router';
import { t } from 'i18next';
import React from 'react';
import { Circle, Theme, YStack } from 'tamagui';

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
            <CustomIcon
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="shipments"
        options={{
          title: t('navigation:customer-dashboard.orders'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon
              name="orders"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shipment-manager"
        options={{
          title: '',
          tabBarIcon: PlusButton,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: t('navigation:customer-dashboard.store'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon
              name="store"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t('navigation:customer-dashboard.chat'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon
              name="chat"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

type TabBarIconProps = Parameters<
  Exclude<BottomTabNavigationOptions['tabBarIcon'], undefined>
>[0];

const PlusButton = ({ size, focused }: TabBarIconProps) => {

  return (
    <Theme name='accent'>
      <Circle
        // onPress={() => router.push('/customer/create-shipment')}
        position="absolute"
        backgroundColor={focused ? '$color5' : '$color9'}
        width={size + 34}
        height={size + 34}
      />
      <YStack
        position="absolute"
        justifyContent="center"
        alignItems="center"
        animation="quick"
        pointerEvents="none"
        height={size + 34}
      >
        <Plus size={size + 5} />
      </YStack>
    </Theme>
  );
};
