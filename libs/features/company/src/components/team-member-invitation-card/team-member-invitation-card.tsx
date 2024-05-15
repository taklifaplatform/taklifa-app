import { MoreHorizontal } from '@tamagui/lucide-icons';
import { CompanyInvitationTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { Button, Text, View, XStack, YStack } from 'tamagui';

/* eslint-disable-next-line */
export interface TeamMemberInvitationCardProps {
  invitation: CompanyInvitationTransformer;
}

export function TeamMemberInvitationCard({
  invitation,
}: TeamMemberInvitationCardProps) {
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
        {invitation.is_rejected ? 'Rejected' : 'Pending'}
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
            console.log('press');
            // actionSheetManagerRef.current?.open()
          }}
          backgroundColor={'transparent'}
          pressStyle={{
            borderColor: 'transparent',
            backgroundColor: 'transparent',
          }}
        />
      </XStack>
      {/* {renderActionSheetForSettingManager()} */}
    </XStack>
  );
}

export default TeamMemberInvitationCard;
