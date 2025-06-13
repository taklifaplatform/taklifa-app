import { Eye, MoreHorizontal, Trash2 } from '@tamagui/lucide-icons';
import { useMutation } from '@tanstack/react-query';
import { CompanyMemberTransformer, CompanyMembersService } from '@zix/api';
import { ActionSheet, ActionSheetRef, UserAvatar } from '@zix/ui/common';
import { Button, Text, XStack, YStack } from 'tamagui';
import { useAuth } from '@zix/services/auth';
import moment from 'moment';
import { useRef } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'solito/router';
import { useToastController } from '@tamagui/toast';
import { t } from 'i18next';

export interface TeamMemberCardProps {
  member: CompanyMemberTransformer;
}

export function TeamMemberCard({
  member: { user, role, company_id },
}: TeamMemberCardProps) {
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const toast = useToastController();
  const router = useRouter();
  const { user: authUser, getUrlPrefix } = useAuth();

  const { mutate } = useMutation({
    mutationFn(variables) {
      return CompanyMembersService.delete(variables);
    },
    onSuccess: (data, variables, context) => {
      toast.show(t('common:member-removed-successfully'));
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

  const renderActionSheetForSettingManager = () => user?.id && (
    <ActionSheet
      ref={actionSheetManagerRef}
      title={t('common:settings')}
      actions={[
        {
          name: t('common:view'),
          icon: <Eye size="$1" color="$color10" />,
          onPress: () => {
            actionSheetManagerRef.current?.close();
            router.push(`${getUrlPrefix}/users/${user.id}`);
          },
        },
        {
          disabled: authUser?.id === user?.id,
          name: t('common:delete'),
          icon: <Trash2 size="$1" color="$color10" />,
          theme: 'error',
          onPress: () => {
            Alert.alert(
              t('common:delete'),
              t('common:confirm-delete'),
              [
                {
                  text: t('common:cancel'),
                  onPress: () => actionSheetManagerRef.current?.close(),
                  style: 'cancel',
                },
                {
                  text: t('common:remove'),
                  style: 'destructive',
                  onPress: () => {
                    actionSheetManagerRef.current?.close();
                    mutate({
                      company: company_id,
                      member: user.id,
                    } as any);
                  },
                },
              ],
            );
          },
        },
      ]}
    />
  );

  if (!user) {
    return null;
  }

  return (
    <XStack
      width={'100%'}
      justifyContent="space-between"
      paddingVertical="$4"
      borderColor="$color3"
      alignItems="center"
    >
      <XStack gap="$3" alignItems="center">
        <UserAvatar user={user} size="$5" />
        <YStack gap="$2">
          <Text fontWeight="bold">{user.name ?? `@${user.username}`}</Text>
          <Text color={'$color10'} fontWeight={'$10'}>
            {t('app:common.last-seen')}: {moment(user.latest_activity).fromNow()}
          </Text>
        </YStack>
      </XStack>
      <Button
        iconAfter={<MoreHorizontal />}
        onPress={() => {
          actionSheetManagerRef.current?.open();
        }}
      />
      {renderActionSheetForSettingManager()}
    </XStack>
  );
}

export default TeamMemberCard;
