
import { BadgeAlert, BadgeCheck, BadgeMinus, BadgeX } from '@tamagui/lucide-icons';
import { AuthenticatedUserTransformer, UserSimpleRoleTransformer } from '@zix/api';
import { USER_ROLES } from '@zix/services/auth';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { useRouter } from 'solito/router';
import { Button, Text, Theme, XStack, YStack } from 'tamagui';

export type UserRoleListItemProps = {
  user: AuthenticatedUserTransformer
  role: UserSimpleRoleTransformer
  isSelected: boolean,
  onPress: () => void
  onClose: () => void
}


export const UserRoleListItem: React.FC<UserRoleListItemProps> = ({
  user,
  role,
  isSelected,
  onPress,
  onClose
}) => {
  const router = useRouter()

  function getVerificationThemeName(status?: string) {
    switch (status) {
      case 'verified':
        return 'success';
      case 'pending':
        return 'warning';
      case 'in_review':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  }

  function getVerificationIcon(status?: string) {
    switch (status) {
      case 'verified':
        return BadgeCheck;
      case 'pending':
        return BadgeMinus;
      case 'in_review':
        return BadgeAlert;
      case 'rejected':
        return BadgeX;
      default:
        return BadgeMinus;
    }
  }

  const renderSubmitDocumentsButton = () => (role.name === USER_ROLES.solo_driver && (
    !user.verification_status
    || ['pending', 'rejected'].includes(user.verification_status)
  )) ? (
    <Button
      size='$2'
      fontSize='$1'
      fontWeight='700'
      scaleIcon={1.5}
      themeInverse

      onPress={async () => {
        onClose()
        router.push(`/auth/verify-kyc`)
      }}
    >
      Verify KYC
    </Button>
  ) : null

  const renderVerificationStatus = () => role.name === USER_ROLES.solo_driver && (
    <XStack gap='$2'>
      <Button
        size='$2'
        fontSize='$1'
        fontWeight='700'
        color='$color10'
        scaleIcon={1.5}
        theme={getVerificationThemeName(user.verification_status)}
        icon={getVerificationIcon(user.verification_status)}
      >
        {t(`app:company.verification_status.${user.verification_status ?? 'pending'}`)}
      </Button>

      {renderSubmitDocumentsButton()}
    </XStack>
  )

  return (
    <XStack
      onPress={() => onPress()}
      hoverStyle={{ backgroundColor: '$color5' }}
      pressStyle={{ opacity: 0.5 }}
      backgroundColor='$color1'
      theme={
        isSelected
          ? 'accent'
          : undefined
      }
      themeShallow
      paddingHorizontal='$4'
      paddingVertical='$3'
      borderBottomWidth={1}
      borderColor='$color5'
      alignItems='center'
      justifyContent='space-between'
    >
      <XStack gap='$4' alignItems='center' flex={1}>
        <UserAvatar
          user={user}
          size='$4'
        />
        <YStack gap='$2' flex={1}>
          <Text fontWeight='700'>
            {user.name ?? user.username ? `@${user.username}` : ''}
          </Text>

          {renderVerificationStatus()}

        </YStack>
      </XStack>
      <YStack>
        <Theme name="accent">
          <CustomIcon
            name="radio_button_checked"
            color={
              isSelected
                ? '$color9'
                : '$color3'
            }
          />
        </Theme>
      </YStack>
    </XStack>
  )
}


export default UserRoleListItem;
