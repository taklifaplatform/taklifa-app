
import { ShipmentTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import moment from 'moment';
import React from 'react';
import { Button, H6, Text, XStack, YStack } from 'tamagui';
import { useShipmentHelper } from '../../hooks';


export interface ShipmentCardHeaderProps {
  shipment: ShipmentTransformer;
}


export const ShipmentCardHeader: React.FC<ShipmentCardHeaderProps> = ({ shipment }) => {
  const { isAuthOwner, getShipmentStatusColor } = useShipmentHelper({ shipment })

  const renderSender = () => (
    <XStack alignItems='center' gap='$2'>
      <UserAvatar size='$1' user={shipment.user} />
      <Text>
        {shipment.user?.name}
      </Text>
    </XStack>
  )

  const renderShipmentStatusBadge = () => isAuthOwner && (
    <Button
      size='$2'
      theme={getShipmentStatusColor}
    >
      {shipment.status}
    </Button>
  )

  const renderTitle = () => (
    <XStack alignItems='center' justifyContent='space-between' gap='$2'>
      <H6 textTransform='none' >
        {t('job:job-demand')}{' '} {'\n'}
        {`${t('shipment:type:' + shipment?.items_type)}`}
      </H6>
      <Text>
        {shipment.code}
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
        {isAuthOwner ? ' by You' : ''}
      </Text>
    </XStack>
  )

  return (
    <YStack gap='$2'>
      <XStack alignItems='center' justifyContent='space-between'>
        {renderSender()}
        {renderShipmentStatusBadge()}
      </XStack>
      {renderTitle()}
      {renderPublishedDate()}
    </YStack>
  );
}


export default ShipmentCardHeader;
