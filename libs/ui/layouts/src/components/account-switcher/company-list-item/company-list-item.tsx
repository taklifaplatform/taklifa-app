
import { Badge, BadgeAlert, BadgeCheck, BadgeMinus, BadgeX } from '@tamagui/lucide-icons';
import { SimpleCompanyTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { MediaAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { useRouter } from 'solito/router';
import { Button, Text, Theme, XStack, YStack } from 'tamagui';

/* eslint-disable-next-line */
export type CompanyListItemProps = {
  company: SimpleCompanyTransformer
  isSelected: boolean,
  onPress: (id: string) => void
}


export const CompanyListItem: React.FC<CompanyListItemProps> = ({
  company,
  isSelected,
  onPress
}) => {
  const { getUrlPrefix } = useAuth()
  const router = useRouter()

  function getVerificationThemeName(status?: string) {
    if (!status) return undefined;
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
        return 'dark';
    }
  }

  function getVerificationIcon(status?: string) {
    if (!status) return undefined;
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
        return Badge;
    }
  }

  const renderSubmitDocumentsButton = () => (company.verification_status && ['pending', 'rejected'].includes(company.verification_status)) ? (
    <Button
      size='$2'
      fontSize='$1'
      fontWeight='700'
      scaleIcon={1.5}
      themeInverse

      onPress={async () => {
        if (!company.id) return
        await onPress(company.id)
        router.push(`${getUrlPrefix}/company`)
        router.push(`${getUrlPrefix}/company/settings`)
      }}
    >
      Update Documents
    </Button>
  ) : null

  return (
    <XStack
      onPress={() => company.id && onPress(company.id)}
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
        <MediaAvatar
          media={company.logo}
          size='$4'
        />
        <YStack gap='$2' flex={1}>
          <Text fontWeight='700'>{company.name}</Text>

          <XStack gap='$2'>
            <Button
              size='$2'
              fontSize='$1'
              fontWeight='700'
              color='$color10'
              scaleIcon={1.5}
              theme={getVerificationThemeName(company.verification_status)}
              icon={getVerificationIcon(company.verification_status)}
            >
              {t(`app:company.verification_status.${company.verification_status}`)}
            </Button>

            {renderSubmitDocumentsButton()}
          </XStack>

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


export default CompanyListItem;
