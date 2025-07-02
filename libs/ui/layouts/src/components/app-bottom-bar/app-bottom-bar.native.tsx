import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Plus } from '@tamagui/lucide-icons';
import { USER_ROLES, useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { Tabs } from 'expo-router';
import { t } from 'i18next';
import { Circle, Theme, YStack } from 'tamagui';

/**
 * TODO:
 * make tab title bolder and back color even if active
 */
export const AppBottomBar = () => {
  const { activeRole } = useAuth()
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
        name="create-shipment"
        options={activeRole === USER_ROLES.customer ? {
          title: '',
          tabBarIcon: PlusButton,
        } : {
          href: null
        }}
      />
      <Tabs.Screen
        name="org"
        options={(
          activeRole === USER_ROLES.company_manager ||
          activeRole === USER_ROLES.company_owner
        ) ? { //
          title: t('navigation:company-dashboard.data'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="apps" color={color} size={size} />
          ),
        } : {
          href: null
        }}
      />
      <Tabs.Screen
        name="stores"
        options={(
          activeRole === USER_ROLES.customer ||
          activeRole === USER_ROLES.company_driver
        ) ? {
          title: t('navigation:customer-dashboard.store'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon
              name="store"
              color={color}
              size={size}
            />
          ),
        } : {
          href: null
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={activeRole !== USER_ROLES.customer ? {
          title: t('navigation:solo-driver-dashboard.jobs'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon
              name="job"
              color={color}
              size={size}
            />
          ),
        } : {
          href: null
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
        position="absolute"
        backgroundColor={focused ? '$color5' : '$color1'}
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



export default AppBottomBar;
