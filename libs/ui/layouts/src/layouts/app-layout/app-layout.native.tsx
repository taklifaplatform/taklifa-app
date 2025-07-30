import {
  Bell,
  CreditCard,
  Handshake,
  Home,
  Store
} from '@tamagui/lucide-icons';
import { useAuth, useCart } from '@zix/services/auth';
import { Tabs } from 'expo-router';
import { t } from 'i18next';
import { Text, View } from 'tamagui';

/**
 * TODO:
 * make tab title bolder and back color even if active
 */
export const AppLayout = () => {
  const { user } = useAuth();
  const { totalItems } = useCart();
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation:customer-dashboard.home'),
          tabBarIcon: ({ size, focused }) => (
            <Home
              size={size}
              color={focused ? '#0F5837' : '#17221D'}
              fill={focused ? '#D9FFEC' : 'white'}
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
              fill={focused ? '#D9FFEC' : 'white'}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={
          user?.active_company
            ? {
                title: 'متجري',
                tabBarIcon: ({ size, focused }) => (
                  <Store
                    color={focused ? '#0F5837' : '#17221D'}
                    fill={focused ? '#D9FFEC' : 'white'}
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
              fill={focused ? '#D9FFEC' : 'white'}
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
            <View position="relative">
              <CreditCard
                color={focused ? '#0F5837' : '#17221D'}
                fill={focused ? '#D9FFEC' : 'white'}
                size={size}
              />
              {totalItems > 0 && (
                <View
                  position="absolute"
                  top={-10}
                  right={-10}
                  backgroundColor="red"
                  paddingHorizontal={4}
                  paddingVertical={2}
                  borderRadius="50%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize={'$1'} fontWeight="bold" color="white">
                    {totalItems}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
