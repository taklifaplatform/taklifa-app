
import { ShipmentTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import moment from 'moment';
import React from 'react';
import { H6, Text, XStack, YStack } from 'tamagui';


export interface ShipmentCardHeaderProps {
  shipment: ShipmentTransformer;
}


export const ShipmentCardHeader: React.FC<ShipmentCardHeaderProps> = ({ shipment }) => {
  const renderSender = () => (
    <XStack alignItems='center' gap='$2'>
      <UserAvatar size='$1' user={shipment.user} />
      <Text>
        {shipment.user?.name}
      </Text>
    </XStack>
  )

  const renderTitle = () => (
    <XStack alignItems='center' justifyContent='space-between' gap='$2'>
      <H6 textTransform='none' >
        {t('job:job-demand')}{' '} {'\n'}
        {`${t('shipment:type:' + shipment?.items_type)}`}
      </H6>
      <Text>
        {/* TODO REPLACE WITH SHIPMENT CODE */}
        SWDKSA{shipment.id?.toString().substring(0, 8).toUpperCase()}
      </Text>
    </XStack>
  )

  const renderPublishedDate = () => (
    <XStack alignItems='center' gap='$1'>
      <CustomIcon
        name="chronic"
        size="$1"
      />
      <Text fontSize={10} color='$color9'>
        {t('job:job-published')} {moment(shipment.created_at).fromNow()}
      </Text>
    </XStack>
  )

  return (
    <YStack gap='$2'>
      {renderSender()}
      {renderTitle()}
      {renderPublishedDate()}
    </YStack>
  );
}


export default ShipmentCardHeader;
