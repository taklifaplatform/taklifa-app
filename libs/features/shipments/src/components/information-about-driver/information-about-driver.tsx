import { SquareUserRound } from '@tamagui/lucide-icons';
import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import {
  ZixMediasListWidget,
  ZixVariantOptionsWidget,
  ZixWidgetContainer,
} from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';

import { ThemeableStackProps, YStack } from 'tamagui';

export type InformationAboutDriverProps = ThemeableStackProps & {
  driver: DriverTransformer;
};

export const InformationAboutDriver: React.FC<InformationAboutDriverProps> = ({
  driver,
  ...props
}) => {
  return (
    <ZixWidgetContainer label={t('shipment:information-about-driver')}>
      <YStack gap="$6" marginTop="$4" {...props}>
        <ZixVariantOptionsWidget
          icon={<CustomIcon name="user_info" size="$1" color={'$color5'} />}
          label={t('shipment:driver')}
          optionVariant="details"
          variant="details"
          options={[
            {
              icons: <SquareUserRound size="$1" color={'$gray9'} />,
              name: t('shipment:driver-name'),
              value: `${driver.name}`,
            },
            {
              icons: <CustomIcon name="location" size="$1" color={'$gray9'} />,
              name: t('shipment:place'),
              value: `${driver.location?.address}`,
            },
            {
              icons: <CustomIcon name="half-star" size="$1" color={'$gray9'} />,
              name: t('shipment:ratings'),
              value: `${driver.rating_stats?.score}`,
            },
            {
              icons: <CustomIcon name="company" size="$1" color={'$gray9'} />,
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
              icons: <CustomIcon name="garage" size="$1" color={'$gray9'} />,
              name: t('shipment:truck-type'),
              value: `${driver.vehicle?.information?.body_type}`,
            },
            {
              icons: (
                <CustomIcon name="local-shipping" size="$1" color={'$gray9'} />
              ),
              name: t('shipment:model'),
              value: `${driver.vehicle?.vehicle_model_id?.name}`,
            },
            {
              icons: <CustomIcon name="opacity" size="$1" color={'$gray9'} />,
              name: t('shipment:color'),
              value: `${driver.vehicle?.color}`,
            },
            {
              icons: <CustomIcon name="matricule" size="$1" color={'$gray9'} />,
              name: t('shipment:truck-plate'),
              value: `${driver.vehicle?.vin_number}`,
            },
          ]}
        />

        <ZixMediasListWidget medias={driver?.vehicle?.images} />
      </YStack>
    </ZixWidgetContainer>
  );
};

export default InformationAboutDriver;
