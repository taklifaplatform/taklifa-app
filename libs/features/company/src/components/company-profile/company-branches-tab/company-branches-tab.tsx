import { CompanyTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { ZixLocationInfoWidget, ZixMediasListWidget } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';
import { FlatList, Linking } from 'react-native';
import { IconProps } from 'stream-chat-react/dist/types/types';

import { H4, Text, View, XStack, YStack, Button } from 'tamagui';

export type CompanyBranchesTabProps = {
  company: CompanyTransformer
}

export const CompanyBranchesTab: React.FC<CompanyBranchesTabProps> = ({
  company
}) => {


  const renderItem = ({ item, index }) => (
    <YStack
      backgroundColor='$color2'
      borderRadius={5}
      key={index}
      marginBottom={10}
      padding={'$4'}
      gap="$4"
    >
      <YStack gap="$4" >
        <XStack
          justifyContent='space-between'
          alignItems='center'
          borderBottomWidth={0.5}
          borderColor={'$color5'}
          paddingVertical={"$2"}
        >
          <Text
            fontWeight={'bold'}
            fontSize={'$3'}
          >{item?.name || ''}</Text>
        </XStack>


        <Text textAlign='left'>{item?.description}</Text>

        <ZixLocationInfoWidget locationId={item?.location_id} height={100} />

        <Button
          flex={1}
          themeInverse
          backgroundColor='$gray7'
          icon={(props: IconProps) => <CustomIcon {...props} name="call" color='$color12' />}
          onPress={() => {
            Linking.openURL(`tel:${item?.contact_number}`);
          }}
        // {...sharedButtonStyle}
        >
          {t('shipment:call')}
        </Button>
      </YStack>
    </YStack>
  )

  return (
    <FlatList
      data={company?.branches || []}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <View flex={1} alignItems='center' gap="$8" padding='$4'>
          <CustomIcon name="empty_data" size="$18" color="$color5" />
          <H4>{t('common:no-data-found')}</H4>
        </View>
      )}
    />
  );
}

export default CompanyBranchesTab;
