
import { UserAvatar } from '@zix/ui/common'
import { CustomIcon } from '@zix/ui/icons'
import moment from 'moment'
import React from 'react'
import { Stack, ThemeableStackProps, YStack, Text, XStack } from 'tamagui'

export type DefinitionOfSenderProps = ThemeableStackProps & {
    demandJob: string
    publishedJob: string
    shipment: any
}

export const DefinitionOfSender: React.FC<DefinitionOfSenderProps> = ({
    demandJob,
    publishedJob,
    shipment
}) => {
  return (
    <Stack
        width={'100%'}
      flexDirection="column"
    >
      <YStack gap="$3">
        <Text
          fontSize={18}
          fontWeight={'400'}
          color={'$color'}
        >
          {demandJob} {shipment?.items_type}
        </Text>
        <Stack
          flexDirection="column"
          gap="$2"
          marginBottom="$3"
        >
          <XStack gap="$2" alignItems="center">
            {/* TODO change to UserAvatar */}

            <UserAvatar size={'$1'} user={shipment?.user} />
            <Text
              fontSize={12}
              fontWeight={'600'}
              color={'$gray9'}
              
            >
              {shipment?.user?.name}
            </Text>
          </XStack>
          <XStack gap="$2" alignItems="center">
            {/* <CustomIcon
              name="chronic"
              size="$1"
              $sm={{
                display: 'none',
              }}
            /> */}
            <Text
              fontSize={9}
              fontWeight={'600'}
              color={'$gray9'}
            >
              {publishedJob} {moment(shipment?.created_at).fromNow()}
            </Text>
          </XStack>
        </Stack>
      </YStack>
    </Stack>
  )
}

export default DefinitionOfSender