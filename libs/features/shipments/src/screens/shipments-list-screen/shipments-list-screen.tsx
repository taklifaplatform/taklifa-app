import { useQuery } from '@tanstack/react-query';
import { ShipmentFilterTransformer, ShipmentService } from '@zix/api';
import { DataNotFound, ZixButton } from '@zix/ui/common';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useAuth } from '@zix/services/auth';
import { FlatList } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Circle, Stack, Text, View, YStack, useMedia, useStyle } from 'tamagui';
import ShipmentCard from '../../components/shipment-card/shipment-card';

export type ShipmentsListScreenProps = {
  variant: 'shipments' | 'jobs';
};

export const ShipmentsListScreen: React.FC<ShipmentsListScreenProps> = ({
  variant = 'shipments',
}) => {
  const { activeRole, getUrlPrefix } = useAuth();
  const media = useMedia();

  const screenTitle = useMemo(() => {
    if (variant === 'jobs') {
      return t('common:jobs');
    }
    return t('common:orders');
  }, [variant]);

  const [status, setStatus] = useState<any>(undefined);
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
    if (activeFilterIndex > 3 && activeFilterIndex > (shipmentFilterQuery?.data?.data?.length || 0)) {
      carouselRef.current?.scrollTo({ index: activeFilterIndex, animated: true });
    }
  }, [activeFilterIndex, shipmentFilterQuery?.data?.data?.length]);

  const renderShipment = (item: ShipmentFilterTransformer, index: number) => (
    <ZixButton
      key={index}
      theme={status === item.status ? 'accent' : undefined}
      backgroundColor={status === item.status ? '$color9' : '$color2'}
      borderRadius="$0"
      height="$4"
      textProps={{
        textTransform: 'capitalize',
      }}
      onPress={() => {
        setStatus(status === item.status ? undefined : item.status);
        setActiveFilterIndex(status === item.status ? 0 : index);
      }}
      iconAfter={() => !!item.count && (
        <Circle
          size="$2"
          backgroundColor={status === item.status ? '$color12' : '$color10'}
        >
          <Text color="white" fontSize="$1">
            {index}
          </Text>
        </Circle>
      )}
    >
      {t(item.status as any)}
    </ZixButton>
  );

  const renderShipmentFilters = () =>
    variant === 'shipments' && (
      <View padding="$4" height='$6' $gtMd={{ display: 'none' }}>
        <Carousel
          ref={carouselRef}
          loop={false}
          data={[
            {
              key: 'all',
              status: 'all',
            },
            ... (
              shipmentFilterQuery?.data?.data || []
            )
          ]}
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
    <ScreenLayout authProtected>
      <AppHeader
        title={screenTitle}
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch,
        }}
      />
      <YStack flex={1}>
        {renderShipmentFilters()}
        <FlatList
          key={`shipment-list-${media.gtMd ? 'lg' : 'sm'}`}
          refreshing={isLoading}
          onRefresh={refetch}
          style={useStyle({
            flex: 1,
            // padding: '$2',
          })}
          data={data?.data}
          numColumns={media.gtMd ? 2 : 1}
          renderItem={({ item, index }) => (
            <Stack $gtMd={{ flex: 1, flexBasis: 1 }} padding="$2">
              <ShipmentCard
                key={index}
                urlPrefix={`${getUrlPrefix}/${variant}`}
                shipment={item}
                variant={variant}
                flex={1}
              />
            </Stack>
          )}
          ListEmptyComponent={() =>
            !isLoading ? (
              <DataNotFound
                message={t('shipment:shipment-not-found')}
                description={t('shipment:shipment-not-found-description')}
                imageUrl="/assets/shipmentNotFound.png"
              />
            ) : null
          }
        />
      </YStack>
    </ScreenLayout>
  );
};

export default ShipmentsListScreen;
