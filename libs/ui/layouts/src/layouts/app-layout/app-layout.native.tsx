import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Plus } from '@tamagui/lucide-icons';
import { COMPANY_MANAGER_ROLES, DRIVER_ROLES, USER_ROLES, useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { Tabs, useRouter } from 'expo-router';
import { t } from 'i18next';
import { Button } from 'tamagui';

/**
 * TODO:
 * make tab title bolder and back color even if active
 */
export const AppLayout = () => {
  const { activeRole } = useAuth()
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
              color={focused ? '$color01' : '$color1'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stores"
        options={{
          title: t('common:market'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              name="store"
              color={focused ? '$color01' : '$color1'}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="shipments"
        options={{
          href: null,
          title: t('navigation:customer-dashboard.orders'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              name="orders"
              color={focused ? '$color01' : '$color1'}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create-shipment"
        options={{
          // TODO: the might be enabled on later, when the customer wants to enabled back create shipment feature.
          href: null
        }}
      // options={activeRole === USER_ROLES.customer ? {
      //   title: '',
      //   tabBarIcon: PlusButton,
      // } : {
      //   href: null
      // }}
      />
      <Tabs.Screen
        name="company"
        options={COMPANY_MANAGER_ROLES.includes(activeRole) ? {
          title: t('navigation:company-dashboard.data'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon name="apps" color={focused ? '$color01' : '$color1'} size={size} />
          ),
        } : {
          href: null
        }}
      />
      <Tabs.Screen
        name="driver-vehicles"
        options={DRIVER_ROLES.includes(activeRole) ? {
          title: t('common:vehicle'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon name="car" color={focused ? '$color01' : '$color1'} size={size} />
          ),
        } : {
          href: null
        }}
      />

      <Tabs.Screen
        name="jobs"
        options={/*activeRole !== USER_ROLES.customer ? {
          title: t('navigation:solo-driver-dashboard.jobs'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              name="job"
              color={focused ? '$color01' : '$color1'}
              size={size}
            />
          ),
        } : */{
            href: null
          }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: t('settings:notifications'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              name="notifications"
              color={focused ? '$color01' : '$color1'}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t('navigation:customer-dashboard.chat'),
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              name="chat"
              color={focused ? '$color01' : '$color1'}
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
  const router = useRouter()

  return (
    <Button
      theme='accent'
      onPress={() => router.replace('/app/create-shipment')}
      height={size + 34}
      width={size + 34}
      borderRadius={size + 34}
      icon={Plus}
      scaleIcon={2}
      backgroundColor={focused ? '$color5' : '$color9'}
    />
  )
};



export default AppLayout;
