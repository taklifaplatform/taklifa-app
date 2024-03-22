import { useQuery } from '@tanstack/react-query';
import { ShipmentFilterTransformer, ShipmentService } from '@zix/api';
import { DataNotFound, ZixButton } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useAuth } from '@zix/services/auth';
import { FlatList } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Circle, Stack, Text, View, YStack } from 'tamagui';
import ShipmentCard from '../../components/shipment-card/shipment-card';

export type ShipmentsListScreenProps = {
  variant: 'shipments' | 'jobs';
};

export const ShipmentsListScreen: React.FC<ShipmentsListScreenProps> = ({
  variant = 'shipments',
}) => {
  const { activeRole, getUrlPrefix } = useAuth();

  const screenTitle = useMemo(() => {
    if (variant === 'jobs') {
      return 'Jobs';
    }
    return 'Orders';
  }, [variant]);

  const [status, setStatus] = useState<any>('pending');
  const [search, setSearch] = useState('');
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const { data, refetch, isLoading } = useQuery({
    queryFn: () =>
      ShipmentService.fetchAllShipment({
        search,
        role: activeRole,
        status,
      }),
    queryKey: ['ShipmentService.fetchAllShipment', search, activeRole, status],
  });
  const shipmentFilterQuery = useQuery({
    queryFn: () =>
      ShipmentService.fetchShipmentFilters({
        role: activeRole,
        search,
      }),
    queryKey: ['ShipmentService.fetchShipmentFilters', activeRole, search],
  });

  const carouselRef = useRef<ICarouselInstance>(null);
  useEffect(() => {
    carouselRef.current?.scrollTo({ index: activeFilterIndex, animated: true });
  }, [activeFilterIndex]);

  const renderShipment = (item: ShipmentFilterTransformer, index: number) => (
    <ZixButton
      key={index}
      theme='accent'
      backgroundColor={status === item.status ? '$color9' : '$color2'}
      borderRadius={status === item.status ? '$4' : '$0'}
      height={50}
      onPress={() => {
        setStatus(item.status);
        setActiveFilterIndex(index);
      }}
      color={status === item.status ? '$color0' : '$color9'}
      alignItems="center"
      iconAfter={() =>
        item.count > 9 ? (
          <View
            backgroundColor={status === item.status ? 'black' : '$gray11'}
            padding="$2"
            borderRadius={'100%'}
          >
            <Text
              color={status === item.status ? '$color5' : '$color1'}
              fontSize="$1"
              fontWeight={'800'}
            >
              {item.count}
            </Text>
          </View>
        ) : (
          <Circle
            size={28}
            backgroundColor={status === item.status ? 'black' : '$gray11'}
            elevation="$4"
          >
            <Text
              color={status === item.status ? '$color5' : '$color1'}
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
        {t(item.status)}
      </Text>
    </ZixButton>
  );

  const renderShipmentFilters = () =>
    variant === 'shipments' && (
      <View paddingHorizontal="$4">
        <Carousel
          ref={carouselRef}
          loop={false}
          data={shipmentFilterQuery?.data?.data || []}
          defaultIndex={activeFilterIndex}
          style={{
            width: '100%',
          }}
          width={150}
          height={50}
          renderItem={({ item, index }) => renderShipment(item, index)}
        />
      </View>
    );

  return (
    <>
      <AppHeader
        title={screenTitle}
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch,
        }}
      />
      <YStack flex={1} gap="$4" paddingVertical="$4">
        {renderShipmentFilters()}
        <FlatList
          refreshing={isLoading}
          onRefresh={refetch}
          style={{ flex: 1 }}
          onEndReachedThreshold={0.5}
          data={data?.data}
          numColumns={2}
          renderItem={({ item, index }) => (
            <Stack $gtSm={{ flex: 1, flexBasis: 1 }}>
              <ShipmentCard
                key={index}
                urlPrefix={`${getUrlPrefix}/${variant}`}
                shipment={item}
                variant={variant}
                marginHorizontal="$2"
                marginBottom="$2"
                isDetail={false}
                flex={1}
              />
            </Stack>
          )}
          ListEmptyComponent={() => (
            <DataNotFound
              message={t('shipment:shipment-not-found')}
              description={t('shipment:shipment-not-found-description')}
              imageUrl="/assets/shipmentNotFound.png"
            />
          )}
        />
      </YStack>
    </>
  );
};

export default ShipmentsListScreen;
