import { AppHeader } from '@zix/ui/layouts';
import React, { useState } from 'react';
import { createParam } from 'solito';

import { View, Text, YStack, Button } from 'tamagui';
import ShipmentManagerHeader from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { useQuery } from '@tanstack/react-query';
import { CompaniesService, DriverTransformer, DriversService, ShipmentService } from '@zix/api';
import { ZixTab } from '@zix/ui/common';
import { t } from 'i18next';
import { FlatList } from 'react-native';
import { UserCard } from '@zix/features/users';
import { CompanyCard } from '@zix/features/company';

const { useParam } = createParam<{ shipment: string }>();

export function ManageShipmentDriversScreen() {
  const [shipmentId] = useParam('shipment');
  const [selectedDrivers, setSelectedDrivers] = useState<DriverTransformer[]>([])

  const { data } = useQuery({
    queryFn() {
      if (!shipmentId) {
        return { data: {} };
      }

      return ShipmentService.retrieveShipment({
        shipment: shipmentId,
      });
    },
    queryKey: ['ShipmentService.retrieveShipment', `-${shipmentId}`],
  })

  const driversQuery = useQuery({
    queryFn: () => DriversService.fetchAllDrivers({}),
    queryKey: ['DriversService.fetchAllDrivers'],
  })

  const companiesQuery = useQuery({
    queryFn: () => CompaniesService.fetchAllCompanies({}),
    queryKey: ['CompaniesService.fetchAllCompanies'],
  })

  const renderTabs = () => (
    <ZixTab
      defaultActiveTab='drivers'
      tabs={[
        {
          key: 'drivers',
          title: t('common:drivers'),
          content: (
            <FlatList
              data={driversQuery.data?.data || []}
              renderItem={({ item, index }) => (
                <UserCard
                  user={item}
                  key={`${index}-${item.id}`}
                  borderWidth={selectedDrivers.some(d => d.id === item.id) ? 2 : 0}
                  marginBottom='$4'
                  userContactActionsProps={{
                    onServiceRequestPress: () => {
                      // alert('Service Request Pressed')
                      setSelectedDrivers(prev => prev.some(d => d.id === item.id)
                        ? prev.filter(d => d.id !== item.id)
                        : [...prev, item]
                      )
                    }

                  }}
                />
              )}
            />
          )
        },
        {
          key: 'companies',
          title: t('common:companies'),
          content: (
            <FlatList
              data={companiesQuery.data?.data || []}
              renderItem={({ item, index }) => (
                <CompanyCard
                  company={item}
                  key={`${index}-${item.id}`}
                  borderWidth={selectedDrivers.some(d => d.id === item.id) ? 2 : 0}
                  marginBottom='$4'
                  userContactActionsProps={{
                    // onServiceRequestPress: () => {
                    //   // alert('Service Request Pressed')
                    //   setSelectedDrivers(prev => prev.some(d => d.id === item.id)
                    //     ? prev.filter(d => d.id !== item.id)
                    //     : [...prev, item]
                    //   )
                    // }

                  }}
                />
              )}
            />
          )
        },
      ]}
    />
  )

  return (
    <>
      <AppHeader title='Shipment Details' showBackButton />
      <YStack flex={1}>
        <ShipmentManagerHeader
          activeStep={4}
          shipment={data?.data}
          title='يرجى تحديد السيارة , السائق والشركة المناسب لك'
        />
        {renderTabs()}
        <YStack padding='$4' gap='$2'>
          <Button themeInverse>
            {t('common:confirm')}
          </Button>
          <Button variant='outlined'>
            {t('common:skip')}
          </Button>
        </YStack>
      </YStack>
    </>

  );
}

export default ManageShipmentDriversScreen;
