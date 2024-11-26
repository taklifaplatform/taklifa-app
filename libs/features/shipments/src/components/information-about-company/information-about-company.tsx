import { Phone, SquareUserRound, X } from '@tamagui/lucide-icons';
import { CompanyTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import {
  ZixVariantOptionsWidget,
  ZixWidgetContainer
} from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';

import { ZixAvatar } from '@zix/ui/common';
import { Link } from 'solito/link';
import { Stack, Text, ThemeableStackProps, XStack, YStack } from 'tamagui';
import { ShipmentSectionWrapper } from '../shipment-section-wrapper/shipment-section-wrapper';

export type InformationAboutCompanyProps = ThemeableStackProps & {
  company: CompanyTransformer;
  channelId?: string;
};

export const InformationAboutCompany: React.FC<InformationAboutCompanyProps> = ({
  company,
  channelId,
  ...props
}) => {
  const renderCompany = () => (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      padding="$4"
      borderRadius="$6"
      backgroundColor="white"
    >
      <XStack gap="$3" alignItems="center">
        <ZixAvatar size={'$4'} media={company.logo} />
        <YStack gap="$3" flex={1}>
          <XStack
            justifyContent='space-between'
            alignItems='center'
          >
            <Text fontSize={16} fontWeight={'600'}>
              {company.name}
            </Text>
            {!!channelId && <Link href={`/app/chat/channels/${channelId}`}>
              <Stack backgroundColor={'$gray6'} padding="$2" borderRadius="$4">
                <CustomIcon name="comment" size="$1" color={'white'} />
              </Stack>
            </Link>}
          </XStack>

          <Text flex={1} fontSize={15} fontWeight={'600'} color={'$color9'}>
            {company.about}
          </Text>
        </YStack>
      </XStack>

    </XStack>
  );

  return (
    <ShipmentSectionWrapper>
      <ZixWidgetContainer label={t('shipment:information-about-driver')}>
        <YStack gap="$6" marginTop="$4" {...props}>
          {renderCompany()}
          <ZixVariantOptionsWidget
            icon={<CustomIcon name="user_info" size="$1" color={'$color5'} />}
            label={'Company'}
            optionVariant="details"
            variant="details"
            options={[
              {
                icons: <SquareUserRound size="$1" color={'$color9'} />,
                name: 'Name',
                value: `${company.name}`,
              },
              {
                icons: (
                  <CustomIcon name="half-star" size="$1" color={'$color9'} />
                ),
                name: t('shipment:ratings'),
                value: `${company.rating_stats?.score}`,
              },
            ]}
          />

        </YStack>
      </ZixWidgetContainer>
    </ShipmentSectionWrapper>
  );
};

export default InformationAboutCompany;
