import { useQuery } from '@tanstack/react-query';
import { ShipmentFilterTransformer, ShipmentService } from '@zix/api';
import { ZixButton } from '@zix/ui/common';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import React, { useMemo, useState } from 'react';

import { useAuth, useMixpanel } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { FlatList } from 'react-native';
import { Circle, H4, ScrollView, Stack, Text, View, YStack, useMedia, useStyle } from 'tamagui';
import ShipmentCard from '../../components/shipment-card/shipment-card';

export type ShipmentsListScreenProps = {
  variant: 'shipments' | 'jobs';
};

export const ShipmentsListScreen: React.FC<ShipmentsListScreenProps> = ({
  variant = 'shipments',
}) => {
  useMixpanel('Shipments List Screen view')
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

  const renderShipment = (item: ShipmentFilterTransformer, index: number) => (
    <ZixButton
      width={150}
      key={index}
      theme={status === item.status ? 'accent' : undefined}
      backgroundColor={status === item.status ? '$color9' : '$color2'}
      borderRadius={status === item.status ? "$4" : "$0"}
      height="$4"
      textProps={{
        textTransform: 'capitalize',
        fontWeight: '700',
        fontSize: '$2',
      }}
      onPress={() => {
        setStatus(status === item.status ? undefined : item.status)
      }}
      iconAfter={() => !!item.count && (
        <Circle
          size="$1"
          backgroundColor={status === item.status ? '$color12' : '$color10'}
        >
          <Text color="white" fontSize="$1">
            {index}
          </Text>
        </Circle>
      )}
    >
      {t(`common:${item.status as any}`)}
    </ZixButton>
  );

  const renderShipmentFilters = () =>
    variant === 'shipments' && (
      <View padding="$4" height='$6' $gtMd={{ display: 'none' }}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            height={50}
          >
            {
              [
                { key: 'all', status: 'all' },
                ...(shipmentFilterQuery?.data?.data || [])
              ].map((item, index) => renderShipment(item, index))
            }
          </ScrollView>
        </View>
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
              <View flex={1} alignItems='center' gap="$8" paddingTop="$8">
                <CustomIcon name="empty_data" size="$18" color="$color5" />
                <H4>{t('shipment:shipment-not-found')}</H4>
                <Text>{t('shipment:shipment-not-found-description')}</Text>
              </View>

            ) : null
          }
        />
      </YStack>
    </ScreenLayout>
  );
};

export default ShipmentsListScreen;
