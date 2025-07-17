import { Bell, CreditCard, Handshake, House, Store } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import { Tabs } from 'expo-router';
import { t } from 'i18next';
import { useAuth } from '@zix/services/auth';

/**
 * TODO:
 * make tab title bolder and back color even if active
 */
export const AppLayout = () => {
  const { user } = useAuth();
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation:customer-dashboard.home'),
          tabBarIcon: ({ size, focused }) => (
            <House size={size} theme="accent" color={focused ? '$color1' : '$color0'} fill={focused ? '$color3' : '$color2'} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: t('common:services'),
          tabBarIcon: ({ size, focused }) => (
            <Handshake
              color={focused ? '$color1' : '$color0'}
              theme="accent"
              fill={focused ? '$color3' : '$color2'}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-store"
        options={
          user?.active_company
            ? {
                title: 'متجري',
                tabBarIcon: ({ size, focused }) => (
                  <Store
                    color={focused ? '$color1' : '$color0'}
                    theme="accent"
                    fill={focused ? '$color3' : '$color2'}
                    size={size}
                  />
                ),
              }
            : {
                href: null,
              }
        }
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: t('settings:notifications'),
          tabBarIcon: ({ size, focused }) => (
            <Bell
              color={focused ? '$color1' : '$color0'}
              theme="accent"
              fill={focused ? '$color3' : '$color2'}
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
            <CreditCard
              color={focused ? '$color1' : '$color0'}
              theme="accent"
              fill={focused ? '$color3' : '$color2'}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
