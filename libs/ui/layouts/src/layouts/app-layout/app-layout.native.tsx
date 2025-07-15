import { Bell, CreditCard, Handshake, Store } from '@tamagui/lucide-icons';
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
            <Handshake
              color={focused ? '#0F5837' : '#17221D'}
              fill={focused ? '#EFFEF6' : '#FFFFFF'}
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
                    color={focused ? '#0F5837' : '#17221D'}
                    fill={focused ? '#EFFEF6' : '#FFFFFF'}
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
              color={focused ? '#0F5837' : '#17221D'}
              fill={focused ? '#EFFEF6' : '#FFFFFF'}
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
              color={focused ? '#0F5837' : '#17221D'}
              fill={focused ? '#EFFEF6' : '#FFFFFF'}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
