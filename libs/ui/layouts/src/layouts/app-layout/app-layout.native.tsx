import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Plus } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import { Tabs, useRouter } from 'expo-router';
import { t } from 'i18next';
import { Button } from 'tamagui';

/**
 * TODO:
 * make tab title bolder and back color even if active
 */
export const AppLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation:customer-dashboard.home'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              name="home"
              size={size}
              color={focused ? '#0F5837' : '#17221D'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: t('common:services'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              name="store"
              color={focused ? '#0F5837' : '#17221D'}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: t('settings:notifications'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              name="notifications"
              color={focused ? '#0F5837' : '#17221D'}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="costs"
        options={{
          title: t('common:costs'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              name="payments"
              color={focused ? '#0F5837' : '#17221D'}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};



export default AppLayout;
