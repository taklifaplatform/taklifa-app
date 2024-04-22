import { useMutation } from '@tanstack/react-query';

import { ChevronDown, Plus, X } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import {
  ChangeActiveRoleRequest,
  CompanyAdminService,
  UserService,
} from '@zix/api';
import { MediaAvatar, UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useAuth } from '@zix/services/auth';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'solito/router';
import {
  Avatar,
  Button,
  Dialog,
  H4,
  ListItem,
  Text,
  Theme,
  View,
  XStack,
  YGroup,
  YStack,
  isWeb,
  useTheme,
} from 'tamagui';

export const AccountSwitcher: React.FC = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();
  const { user, refetchUser, redirectUserToActiveDashboard } = useAuth();
  const toast = useToastController();

  const { mutate: changeActiveRole } = useMutation({
    mutationFn: (requestBody: ChangeActiveRoleRequest) =>
      UserService.changeActiveRole({
        requestBody,
      }),
    onSuccess(data) {
      toast.show('Account changed successfully');
      refetchUser();
      setSheetOpen(false);
      redirectUserToActiveDashboard({
        user: data.data,
      });
    },
  });

  const { mutate: changeActiveCompany } = useMutation({
    mutationFn: (company: string) =>
      CompanyAdminService.changeActiveCompany({
        company,
      }),
    onSuccess(data) {
      toast.show('Company changed successfully');
      refetchUser();
      setSheetOpen(false);
      redirectUserToActiveDashboard({
        user: data.data,
      });
    },
  });

  /**
   * Exclude company roles from user roles
   */
  const userRoles = useMemo(() => {
    return user?.roles?.filter((role) => !role.name?.includes('company'));
  }, [user]);

  const roleNames = useMemo(() => {
    return userRoles?.map((role) => role.name);
  }, [userRoles]);

  const snapPoints = useMemo(() => {
    const totalItems =
      (userRoles?.length ?? 1) + (user?.companies?.length ?? 1);
    const sheetHeight = totalItems * 13 > 85 ? 85 : totalItems * 13;

    return [Math.max(40, sheetHeight), 85];
  }, [user, userRoles]);

  const onAddAccount = useCallback(() => {
    setSheetOpen(false);
    if (roleNames?.includes('customer')) {
      router.push('/auth/register/user-type');
    } else {
      router.push('/auth/register');
    }
  }, [roleNames, router]);

  return (
    <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
      <Dialog.Trigger>
        <XStack
          theme="light"
          alignItems="center"
          gap="$2"
          onPress={() => setSheetOpen(true)}
        >
          {isWeb && <UserAvatar user={user} size="$4" />}
          <YStack>
            <Text fontWeight="bold" fontSize={15} numberOfLines={1}>
              {user?.name || !!user?.username ? `@${user?.username}` : '...'}
            </Text>
            {user?.active_role?.name && <Text>{user?.active_role?.name}</Text>}
          </YStack>
          {isWeb && <View width="$2" />}
          <ChevronDown size="$1" />
        </XStack>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content backgroundColor="$color1" padding="$2" width={500}>
          <YGroup flex={1} backgroundColor="$color1" width="100%">
            <XStack alignItems="center" justifyContent="space-between">
              <H4 paddingHorizontal="$4">Switch Account</H4>
              <Button
                padding="$4"
                icon={X}
                scaleIcon={1.3}
                backgroundColor="$color1"
                onPress={() => setSheetOpen(false)}
              />
            </XStack>
            {userRoles?.map((role) => (
              <YGroup.Item key={role.id}>
                <ListItem
                  disabled={user?.active_role?.name === role.name}
                  theme={
                    user?.active_role?.name === role.name ? 'accent' : undefined
                  }
                  onPress={() => changeActiveRole({ name: role.name })}
                  hoverStyle={{ backgroundColor: '$color5' }}
                  pressStyle={{ opacity: 0.5 }}
                  borderBottomColor="$color5"
                  borderBottomWidth={1}
                  icon={<UserAvatar user={user} size="$4" />}
                  iconAfter={
                    <Theme name="accent">
                      <CustomIcon
                        name="radio_button_checked"
                        color={
                          user?.active_role?.name === role.name
                            ? '$color9'
                            : '$color3'
                        }
                      />
                    </Theme>
                  }
                  scaleIcon={1.3}
                  title={user.name}
                  subTitle={role.name}
                />
              </YGroup.Item>
            ))}

            {user?.companies?.map((company) => (
              <YGroup.Item key={company.name}>
                <ListItem
                  onPress={() => company.id && changeActiveCompany(company.id)}
                  theme={
                    user?.active_company?.id === company.id
                      ? 'accent'
                      : undefined
                  }
                  disabled={user?.active_company?.id === company.id}
                  hoverStyle={{ backgroundColor: '$color5' }}
                  pressStyle={{ opacity: 0.5 }}
                  borderBottomColor="$color5"
                  borderBottomWidth={1}
                  icon={<MediaAvatar media={company.logo} size="$4" />}
                  iconAfter={
                    <Theme name="accent">
                      <CustomIcon
                        name="radio_button_checked"
                        color={
                          user?.active_company?.id === company.id
                            ? '$color9'
                            : '$color3'
                        }
                      />
                    </Theme>
                  }
                  scaleIcon={1.3}
                  title={company.name}
                  subTitle="Company Account"
                />
              </YGroup.Item>
            ))}
            <YGroup.Item>
              <ListItem
                onPress={() => onAddAccount()}
                icon={(props) => (
                  <Avatar
                    size="$4"
                    circular
                    backgroundColor="$color5"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Plus size="$2" />
                  </Avatar>
                )}
                hoverStyle={{ backgroundColor: '$color5' }}
                pressStyle={{ opacity: 0.5 }}
                marginTop="$2"
                scaleIcon={1.3}
                title="Add Account"
                subTitle="Add new company or account"
              />
            </YGroup.Item>
          </YGroup>
        </Dialog.Content>
      </Dialog.Portal>
      <Dialog.Adapt platform="touch">
        <Dialog.Sheet native modal snapPoints={snapPoints}>
          <Dialog.Sheet.Frame>
            <Dialog.Adapt.Contents />
          </Dialog.Sheet.Frame>
          <Dialog.Sheet.Overlay />
        </Dialog.Sheet>
      </Dialog.Adapt>
    </Dialog>
  );
};

export default AccountSwitcher;
