import { Eye, MoreHorizontal, Trash2 } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { CompanyInvitationsService, CompanyInvitationTransformer, CompanyMembersService, CompanyTransformer } from '@zix/api';
import { ActionSheet, ActionSheetRef, UserAvatar } from '@zix/ui/common';
import { useRef } from 'react';
import { Button, Text, View, XStack, YStack } from 'tamagui';
import { useRouter } from 'solito/router';
import { t } from 'i18next';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@zix/services/auth';
import { Alert } from 'react-native';


/* eslint-disable-next-line */
export interface TeamMemberInvitationCardProps {
  invitation: CompanyInvitationTransformer;
  company: CompanyTransformer
}

export function TeamMemberInvitationCard({
  invitation,
  company,
}: TeamMemberInvitationCardProps) {
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const { user: authUser, getUrlPrefix } = useAuth();
  const toast = useToastController();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn(variables) {
      return CompanyInvitationsService.delete(variables);
    },
    onSuccess: (data, variables, context) => {
      toast.show('Member removed successfully!');
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
  console.log(invitation)

  const renderActionSheetForSettingManager = () => (
    <ActionSheet
      ref={actionSheetManagerRef}
      title={t('common:settings')}
      actions={[
        {
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
                      company: company.id,
                      companyInvitation: invitation.id,
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

  const renderInvitationStatus = () => (
    <View
      backgroundColor={invitation.is_rejected ? '$red3' : '$yellow3'}
      paddingVertical="$1"
      paddingHorizontal="$2"
      borderRadius="$2"
    >
      <Text
        fontWeight="bold"
        fontSize="$1"
        color={invitation.is_rejected ? '$red11' : '$yellow11'}
      >
        {invitation.is_rejected ? t('shipment:status.rejected') : t('shipment:status.pending')}
      </Text>
    </View>
  );

  return (
    <XStack
      width={'100%'}
      justifyContent="space-between"
      paddingVertical="$4"
      borderColor="$color9"
      alignItems="center"
    >
      <XStack gap="$3" alignItems="center">
        <UserAvatar user={invitation as any} size="$5" />
        <YStack gap="$2">
          <Text fontWeight="bold">{invitation.name}</Text>
          <Text color={'$gray10Dark'} fontWeight={'$10'}>
            {invitation.phone_number || invitation.email}
          </Text>
        </YStack>
      </XStack>
      <XStack alignItems="center">
        {renderInvitationStatus()}
        <Button
          iconAfter={<MoreHorizontal />}
          onPress={() => {
            console.log('press//')
            actionSheetManagerRef.current?.open()
          }}
          backgroundColor={'transparent'}
          pressStyle={{
            borderColor: 'transparent',
            backgroundColor: 'transparent',
          }}
        />
      </XStack>
      {renderActionSheetForSettingManager()}
    </XStack>
  );
}

export default TeamMemberInvitationCard;
