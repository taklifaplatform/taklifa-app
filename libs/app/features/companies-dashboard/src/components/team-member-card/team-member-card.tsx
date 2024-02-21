
import { Eye, MoreHorizontal, Pencil, Trash2 } from '@tamagui/lucide-icons';
import { CompanyMemberTransformer, api } from '@zix/api';
import { ActionSheet, ActionSheetRef, UserAvatar } from '@zix/app/ui/common';
import { Button, Text, XStack, YStack, useToastController } from '@zix/app/ui/core';
import { useUser } from '@zix/core/auth';
import { Tables } from '@zix/core/supabase';
import moment from 'moment';
import { useRef } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'solito/router';


export interface TeamMemberCardProps {
  member: CompanyMemberTransformer;
}

export function TeamMemberCard({ member: { user, role, company_id } }: TeamMemberCardProps) {
  const actionSheetManagerRef = useRef<ActionSheetRef>(null)
  const toast = useToastController()
  const router = useRouter()
  const { user: authUser } = useUser()

  const utils = api.useUtils();
  const { mutate } = api.companyManageMembers.delete.useMutation({
    onSuccess: (data, variables, context) => {
      toast.show('Member removed successfully!')
      utils.companyManageMembers.list.refetch()
    }
  })

  const renderActionSheetForSettingManager = () => (
    <ActionSheet
      ref={actionSheetManagerRef}
      title={`Settings`}
      actions={[
        {
          name: 'View Profile',
          icon: <Eye size="$1" color="$color10" />,
          onPress: () => {
            actionSheetManagerRef.current?.close()
            router.push(`/users/${user.id}`)
          },
        },
        {
          disabled: authUser?.id === user.id,
          name: 'Remove from company',
          icon: <Trash2 size="$1" color="$color10" />,
          onPress: () => {
            Alert.alert(
              'Remove member',
              `Are you sure you want to remove ${user.name} from the company?`,
              [
                {
                  text: 'Cancel',
                  onPress: () => actionSheetManagerRef.current?.close(),
                  style: 'cancel',
                },
                {
                  text: 'Remove',
                  style: 'destructive',
                  onPress: () => {
                    actionSheetManagerRef.current?.close()
                    mutate({
                      company_id,
                      member_id: user.id,
                    })
                  },
                },
              ]
            )

          },
        },
      ]}
    />
  )

  return (
    <XStack
      width={'100%'}
      justifyContent="space-between"
      paddingVertical='$4'
      borderTopWidth={1}
      borderColor='$color9'
      alignItems="center"
    >
      <XStack gap="$3" alignItems="center">
        <UserAvatar user={user} size="$5" />
        <YStack gap="$2">
          <Text fontWeight='bold'>
            {user.name}
          </Text>
          <Text color={'$gray10Dark'} fontWeight={'$10'}>
            Last activity: {moment(user.created_at).fromNow()}
          </Text>
        </YStack>
      </XStack>
      <Button
        iconAfter={<MoreHorizontal />}
        onPress={() => {
          console.log('press')
          actionSheetManagerRef.current?.open()
        }}
        backgroundColor={'transparent'}
        pressStyle={{
          borderColor: 'transparent',
          backgroundColor: 'transparent',
        }}
      />
      {renderActionSheetForSettingManager()}
    </XStack>
  );
}


export default TeamMemberCard;
