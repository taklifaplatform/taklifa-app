
import { useQuery } from '@tanstack/react-query';
import { DriverShipmentsService } from '@zix/api';
import { ShipmentCard } from '@zix/features/shipments';
import { DataNotFound, ZixButton } from '@zix/ui/common';
import { ZixInput } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';

import {  FlatList } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Circle, YStack, View , Text} from 'tamagui';

/* eslint-disable-next-line */
export interface ShipmentsListingScreenProps {
  urlPrefix?: string;
}

const PAGE_WIDTH = 150;
const PAGE_HEIGHT = 50;


export const ShipmentsListingScreen: React.FC<ShipmentsListingScreenProps> = ({
  urlPrefix = '/orders',
}) => {
  const [status, setStatus] = useState('pending');
  const [search, setSearch] = useState('');
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const { data } = useQuery({
    queryKey: ['DriverShipmentsService.fetchAllShipment'],
    queryFn: () => DriverShipmentsService.fetchAllShipment({}),
  });
  const filters = [
    {
      id: 1,
      key: 'pending',
      label: 'في الانتظار',
      count: 1253,
    },
    {
      id: 2,
      key: 'new',
      label: 'طلبات جديدة',
      count: 2,
    },
    {
      id: 3,
      key: 'in-progress',
      label: 'جاري التوصيل',
      count: 252,
    },
    {
      id: 4,
      key: 'delivered',
      label: 'جاري التوصيل',
      count: 15,
    },
    {
      id: 5,
      key: 'completed',
      label: 'مكتمل',
      count: data?.meta?.total || 0,
    },
    {
      id: 6,
      key: 'canceled',
      label: 'ملغاة',
      count: 1,
    },
  ];

  const carouselRef = useRef<ICarouselInstance>(null);
  useEffect(() => {
    carouselRef.current?.scrollTo({ index: activeFilterIndex, animated: true });
  }, [activeFilterIndex]);

const renderShipment = (item: any, index: number) => (
  <ZixButton
    key={index}
    backgroundColor={status === item.key ? '$color5' : '$gray3'}
    borderRadius={status === item.key ? '$4' : '$0'}
    height={50}
    onPress={() => {
      setStatus(item.key);
      setActiveFilterIndex(index);
    }}
    color={status === item.key ? '$color0' : '$gray9'}
    alignItems="center"
    iconAfter={() =>
      item.count > 9 ? (
        <View
          backgroundColor={status === item.key ? 'black' : '$gray11'}
          padding="$2"
          borderRadius={'100%'}
        >
          <Text
            color={status === item.key ? '$color5' : '$color1'}
            fontSize="$1"
            fontWeight={'800'}
          >
            {item.count}
          </Text>
        </View>
      ) : (
        <Circle
          size={28}
          backgroundColor={status === item.key ? 'black' : '$gray11'}
          elevation="$4"
        >
          <Text
            color={status === item.key ? '$color5' : '$color1'}
            fontSize="$1"
            fontWeight={'800'}
          >
            {item.count}
          </Text>
        </Circle>
      )
    }
  >
    <Text fontSize="$2" fontWeight={'bold'}>
      {t(item.label)}
    </Text>
  </ZixButton>
);

const renderFilterShipment = () => (
  <Carousel
    ref={carouselRef}
    loop={false}
    data={filters}
    defaultIndex={activeFilterIndex}
    style={{
      width: '100%',
    }}
    width={PAGE_WIDTH}
    height={PAGE_HEIGHT}
    renderItem={({ item, index }) => renderShipment(item, index)}
  />
);

  return (
    <FlatList
      onEndReachedThreshold={0.5}
      data={data?.data}
      renderItem={({ item, index }) => (
        <ShipmentCard
          key={index}
          urlPrefix={urlPrefix}
          shipment={item}
          variants="shipment"
          marginBottom="$4"
        />
      )}
      ListHeaderComponent={() => (
        <YStack flex={1} gap="$4" marginHorizontal="$3" marginTop="$4">
          <ZixInput
            rightIcon={() => (
              <CustomIcon name="search" size="$1" color={'$gray9'} />
            )}
            leftIcon={() => (
              <CustomIcon name="flip" size="$1" color={'$gray9'} />
            )}
            placeholder={t('shipment:search')}
            borderColor={'$gray10'}
            hoverStyle={{ borderColor: '$gray10' }}
            width={'100%'}
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
          {renderFilterShipment()}
        
          
        </YStack>
      )}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      ListEmptyComponent={() => (
        <DataNotFound
          message={t('shipment:shipment-not-found')}
          description={t('shipment:shipment-not-found-description')}
          imageUrl='/assests/shipmentNotFound.png'
        />
      )}
    />
  );
}


export default ShipmentsListingScreen;
