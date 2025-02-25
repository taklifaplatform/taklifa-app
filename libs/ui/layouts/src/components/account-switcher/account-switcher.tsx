import { useMutation } from '@tanstack/react-query';

import { ChevronDown, Plus, X } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import {
  ChangeActiveRoleRequest,
  CompanyAdminService,
  UserService,
} from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { UserAvatar } from '@zix/ui/common';
import { t } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'solito/router';
import {
  Avatar,
  Button,
  Dialog,
  H4,
  ListItem,
  Text,
  ThemeableStackProps,
  View,
  XStack,
  YGroup,
  YStack,
  isWeb
} from 'tamagui';
import CompanyListItem from './company-list-item/company-list-item';
import UserRoleListItem from './user-role-list-item/user-role-list-item';
import { useThemeSetting } from '@zix/providers';

export interface AccountSwitcherProps {
  containerProps?: ThemeableStackProps;
}

export const AccountSwitcher: React.FC<AccountSwitcherProps> = ({
  containerProps = {},
}) => {
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
    onError(error: any) {
      toast.show(
        error?.body?.message ||
        error?.message ||
        t('app:errors.something-went-wrong'),
        {
          preset: 'error',
        },
      );
    },
  });

  const { mutateAsync: changeActiveCompany } = useMutation({
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
    onError(error: any) {
      toast.show(
        error?.body?.message ||
        error?.message ||
        t('app:errors.something-went-wrong'),
        {
          preset: 'error',
        },
      );
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

  const { current } = useThemeSetting();

  return (
    <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
      <Dialog.Trigger>
        <XStack
          theme={current === 'dark' ? 'dark' : "light"}
          alignItems="center"
          gap="$2"
          onPress={() => setSheetOpen(true)}
          {...containerProps}
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
              <UserRoleListItem
                key={`user-role-${role.id}`}
                role={role}
                user={user}
                onPress={() => changeActiveRole({ name: role.name })}
                onClose={() => setSheetOpen(false)}
                isSelected={user?.active_role?.name === role.name}
              />
            ))}


            {user?.companies?.map((company) => (
              <CompanyListItem key={company.name} onPress={changeActiveCompany} company={company} isSelected={user?.active_company?.id === company.id} />
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
