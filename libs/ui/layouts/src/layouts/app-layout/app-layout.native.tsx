import { Bell, CreditCard, Handshake, House, Store } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import { Tabs } from 'expo-router';
import { t } from 'i18next';
import { useAuth, useCart } from '@zix/services/auth';
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
            <View position='relative'>
              <CreditCard
                color={focused ? '$color1' : '$color0'}
                theme="accent"
                fill={focused ? '$color3' : '$color2'}
                size={size}
              />
              {
                totalItems > 0 && (
                  <View
                    position='absolute'
                    top={-10}
                    right={-10}
                    backgroundColor='red'
                    paddingHorizontal={4}
                    paddingVertical={2}
                    borderRadius='50%'
                    justifyContent='center'
                    alignItems='center' >
                    <Text fontSize={'$1'} fontWeight='bold' color='white'>{totalItems}</Text>
                  </View>
                )
              }
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
