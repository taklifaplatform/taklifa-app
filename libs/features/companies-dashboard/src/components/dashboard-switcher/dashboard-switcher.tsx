import { useMutation } from '@tanstack/react-query';

import {
  ChevronDown,
  ChevronDownCircle,
  Circle,
  PlusSquare,
  X
} from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { ChangeActiveRoleRequest, CompanyAdminService, UserService } from '@zix/api';
import { MediaAvatar, UserAvatar } from '@zix/ui/common';
import { useAuth } from '@zix/utils';
import { useMemo, useState } from 'react';
import { useRouter } from 'solito/router';
import { Button, H4, ListItem, Sheet, Text, XStack, YGroup } from 'tamagui';


export const DashboardSwitcher: React.FC = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();
  const { user, refetchUser, redirectUserToActiveDashboard } = useAuth();
  const toast = useToastController()


  const { mutate: changeActiveRole } = useMutation({
    mutationFn: (requestBody: ChangeActiveRoleRequest) => UserService.changeActiveRole({
      requestBody
    }),
    onSuccess(data) {
      toast.show('Account changed successfully');
      refetchUser()
      setSheetOpen(false)
      redirectUserToActiveDashboard({
        user: data.data
      })
    },
  })

  const { mutate: changeActiveCompany } = useMutation({
    mutationFn: (company: string) => CompanyAdminService.changeActiveCompany({
      company
    }),
    onSuccess(data) {
      toast.show('Company changed successfully');
      refetchUser()
      setSheetOpen(false)
      redirectUserToActiveDashboard({
        user: data.data
      })
    },
  })

  /**
   * Exclude company roles from user roles
   */
  const userRoles = useMemo(() => {
    return user?.roles?.filter(role => !role.name?.includes('company'))
  }, [user])

  const snapPoints = useMemo(() => {
    const totalItems = (userRoles?.length ?? 1) + (user?.companies?.length ?? 1);
    const sheetHeight = totalItems * 15 > 85 ? 85 : totalItems * 10;

    return [
      sheetHeight,
      85
    ]
  }, [user, userRoles])

  function onNavigate(route: string, replace = true) {
    setSheetOpen(false);
    if (replace) {
      router.replace(route);
      return;
    }
    router.push(route);
  }

  return (
    <>
      <XStack alignItems="center" gap="$2" onPress={() => setSheetOpen(true)}>
        <Text fontWeight="bold" fontSize={15} numberOfLines={1}>
          {user?.name}
        </Text>
        <ChevronDown size="$1" />
      </XStack>

      <Sheet
        native
        modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={snapPoints}
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame>
          <Sheet.ScrollView backgroundColor='$color1'>
            <YGroup marginBottom="$4">
              <XStack alignItems='center' justifyContent='space-between'>
                <H4 padding="$4">Change Account</H4>
                <Button icon={X} scaleIcon={1.3} backgroundColor='$color1' onPress={() => setSheetOpen(false)} />
              </XStack>
              {userRoles?.map((role) => (
                <YGroup.Item key={role.id}>
                  <ListItem
                    onPress={() => changeActiveRole({ name: role.name })}
                    borderBottomColor='$gray5'
                    borderBottomWidth={1}
                    icon={<UserAvatar user={user} size='$4' />}
                    iconAfter={user?.active_role?.name === role.name ? ChevronDownCircle : Circle}
                    scaleIcon={1.3}
                    title={user.name}
                    subTitle={role.name}
                  />
                </YGroup.Item>
              ))}
              <H4 padding="$4">Change Companies</H4>
              {user?.companies?.map((company) => (
                <YGroup.Item key={company.name}>
                  <ListItem
                    onPress={() => company.id && changeActiveCompany(company.id)}
                    borderBottomColor='$gray5'
                    borderBottomWidth={1}
                    icon={<MediaAvatar media={company.logo} size='$4' />}
                    iconAfter={user?.active_company?.id === company.id ? ChevronDownCircle : Circle}
                    scaleIcon={1.3}
                    title={company.name}
                    subTitle='Company Account'
                  />
                </YGroup.Item>
              ))}
              <YGroup.Item>
                <ListItem
                  onPress={() => onNavigate('/companies/create', false)}
                  marginVertical="$2"
                  paddingVertical="$4"
                  hoverTheme
                  icon={PlusSquare}
                  title="Create New Company"
                />
              </YGroup.Item>
            </YGroup>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default DashboardSwitcher;
