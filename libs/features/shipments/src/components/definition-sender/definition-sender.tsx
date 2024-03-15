import { MessageCircle, MessageSquare, Phone } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';
import { Link } from 'solito/link';
import { XStack, YStack, Text, Stack } from 'tamagui';

/* eslint-disable-next-line */
export interface DefinitionSenderProps {
  shipment: ShipmentTransformer;
}

export const DefinitionSender: React.FC<DefinitionSenderProps> = ({
  shipment,
}) => {
  return (
    <XStack
      width={'100%'}
      justifyContent="space-between"
      alignItems='center'
      padding="$4"
      borderRadius="$6"
      backgroundColor="white"
    >
      <XStack gap="$3" alignItems="center">
        <UserAvatar size={'$4'} user={shipment?.user} />
        <YStack gap="$3">
          <Text fontSize={16} fontWeight={'600'}>
            {shipment?.user?.name}
          </Text>
          <XStack gap="$2" alignItems="center">
            <Phone size="$1" color={'$gray9'} />
            <Text fontSize={15} fontWeight={'600'} color={'$gray9'}>
              {shipment?.user?.phone_number}
            </Text>
          </XStack>
        </YStack>
        
      </XStack>
      <Link href={`/chat/${shipment?.id}`}>
      <Stack backgroundColor={'$gray6'} padding='$2' borderRadius='$4'>
          <CustomIcon name="comment" size="$1" color={'white'}/>
        </Stack>
      </Link>
    </XStack>
  );
};

export default DefinitionSender;
