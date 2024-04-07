import { Phone, SquareUserRound } from '@tamagui/lucide-icons';
import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import {
  ZixMediasListWidget,
  ZixVariantOptionsWidget,
  ZixWidgetContainer,
} from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';

import { UserAvatar } from '@zix/ui/common';
import { Stack, Text, ThemeableStackProps, XStack, YStack } from 'tamagui';
import { Link } from 'solito/link';
import { ShipmentSectionWrapper } from '../shipment-section-wrapper/shipment-section-wrapper';

export type InformationAboutDriverProps = ThemeableStackProps & {
  driver: DriverTransformer;
  status: string;
};

export const InformationAboutDriver: React.FC<InformationAboutDriverProps> = ({
  driver,
  status,
  ...props
}) => {
  const renderDriver = () => (
    <XStack
      width={'100%'}
      justifyContent="space-between"
      alignItems="center"
      padding="$4"
      borderRadius="$6"
      backgroundColor="white"
    >
      <XStack gap="$3" alignItems="center">
        <UserAvatar size={'$4'} user={driver.name} />
        <YStack gap="$3">
          <Text fontSize={16} fontWeight={'600'}>
            {driver.name}
          </Text>
          <XStack gap="$2" alignItems="center">
            <Phone size="$1" color={'$color9'} />
            <Text fontSize={15} fontWeight={'600'} color={'$color9'}>
              {driver.phone_number}
            </Text>
          </XStack>
        </YStack>
      </XStack>
      <Link href={`/chat/${driver?.id}`}>
        <Stack backgroundColor={'$gray6'} padding="$2" borderRadius="$4">
          <CustomIcon name="comment" size="$1" color={'white'} />
        </Stack>
      </Link>
    </XStack>
  );
  if (status !== 'delivering') return null;

  return (
    <ShipmentSectionWrapper>
      <ZixWidgetContainer label={t('shipment:information-about-driver')}>
        <YStack gap="$6" marginTop="$4" {...props}>
          {renderDriver()}
          <ZixVariantOptionsWidget
            icon={<CustomIcon name="user_info" size="$1" color={'$color5'} />}
            label={t('shipment:driver')}
            optionVariant="details"
            variant="details"
            options={[
              {
                icons: <SquareUserRound size="$1" color={'$color9'} />,
                name: t('shipment:driver-name'),
                value: `${driver.name}`,
              },
              {
                icons: (
                  <CustomIcon name="location" size="$1" color={'$color9'} />
                ),
                name: t('shipment:place'),
                value: `${driver.location?.address}`,
              },
              {
                icons: (
                  <CustomIcon name="half-star" size="$1" color={'$color9'} />
                ),
                name: t('shipment:ratings'),
                value: `${driver.rating_stats?.score}`,
              },
              {
                icons: <CustomIcon name="company" size="$1" color={'$color9'} />,
                name: t('shipment:company'),
                value: `${driver.companies?.[0]?.name}`,
              },
            ]}
          />
          <ZixVariantOptionsWidget
            icon={<CustomIcon name="car" size="$1" color={'$color5'} />}
            label={t('shipment:truck')}
            optionVariant="details"
            variant="details"
            options={[
              {
                icons: <CustomIcon name="garage" size="$1" color={'$color9'} />,
                name: t('shipment:truck-type'),
                value: `${driver.vehicle?.information?.body_type}`,
              },
              {
                icons: (
                  <CustomIcon
                    name="local-shipping"
                    size="$1"
                    color={'$color9'}
                  />
                ),
                name: t('shipment:model'),
                value: `${driver.vehicle?.vehicle_model_id?.name}`,
              },
              {
                icons: <CustomIcon name="opacity" size="$1" color={'$color9'} />,
                name: t('shipment:color'),
                value: `${driver.vehicle?.color}`,
              },
              {
                icons: (
                  <CustomIcon name="matricule" size="$1" color={'$color9'} />
                ),
                name: t('shipment:truck-plate'),
                value: `${driver.vehicle?.vin_number}`,
              },
            ]}
          />

          <ZixMediasListWidget medias={driver?.vehicle?.images} />
        </YStack>
      </ZixWidgetContainer>
    </ShipmentSectionWrapper>
  );
};

export default InformationAboutDriver;
