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
        name="company"
        options={COMPANY_MANAGER_ROLES.includes(activeRole) ? {
          title: t('navigation:company-dashboard.data'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="apps" color={color} size={size} />
          ),
        } : {
          href: null
        }}
      />
      <Tabs.Screen
        name="driver-vehicles"
        options={DRIVER_ROLES.includes(activeRole) ? {
          title: t('common:vehicle'),
          tabBarIcon: ({ size, color }) => (
            <CustomIcon name="car" color={color} size={size} />
          ),
        } : {
          href: null
        }}
      />
      <Tabs.Screen
        name="stores"
        options={activeRole === USER_ROLES.customer ? {
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
