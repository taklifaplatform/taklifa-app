import { useQuery } from '@tanstack/react-query';
import { CompanyTransformer, ServicesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { ZixButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useRouter } from 'solito/router';
import { AnnouncementCard } from '@zix/features/announcements';
import { H4, Text, View, XStack, YStack, Image } from 'tamagui';

export type CompanyServicesTabProps = {
  company: CompanyTransformer
}

const SCREEN_WIDTH = Dimensions.get('window').width;
export const CompanyServicesTab: React.FC<CompanyServicesTabProps> = ({
  company
}) => {
  const router = useRouter()
  const { getUrlPrefix } = useAuth()

  const { data } = useQuery({
    queryFn: () => ServicesService.listCompanyServices({
      company: company.id as string,
    }),
    queryKey: ['ServicesService.listCompanyServices', company.id],
  })

  const renderItem = ({ item, index }) => (
    <YStack
      backgroundColor='$color2'
      borderRadius={5}
      key={index}
      marginBottom={10}
      padding={'$4'}
      gap="$4"
    >
      {
        item?.cover?.original_url && (
          <XStack
            justifyContent='space-between' alignItems='center' padding={"$4"}
          >
            <Image source={{ uri: item?.cover?.original_url || "" }}
              width={SCREEN_WIDTH / 2.5}
              height={SCREEN_WIDTH / 5}
              borderRadius={5}
            />
          </XStack>
        )
      }

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
          >{item?.title || ''}</Text>
          <XStack
            alignItems='center'
          >
            <Text
              fontWeight={'bold'}
              fontSize={'$3'}
            >{item?.price?.value || ''}</Text>
            <Text
              fontWeight={'bold'}
              fontSize={'$3'}
            > {item?.price?.currency?.code || ''}</Text>
          </XStack>

        </XStack>

        <Text>{item?.description}</Text>
        <ZixMediasListWidget medias={item?.images || []} />
      </YStack>
    </YStack>
  )


  return (
    <FlatList
      data={data?.data || []}
      contentContainerStyle={{
        gap: 10,
      }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <AnnouncementCard key={index} announcement={item} showHeader={false} />
      )}
      ListEmptyComponent={() => (
        <View flex={1} alignItems='center' gap="$8" padding='$4'>
          <CustomIcon name="empty_data" size="$18" color="$color5" />
          <H4>{t('common:no-data-found')}</H4>
        </View>
      )}
    />
  );
}

export default CompanyServicesTab;
