import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import React, { useState } from 'react';
import { createParam } from 'solito';

import { View, Text, YStack, Button, H4 } from 'tamagui';
import ShipmentManagerHeader from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CompaniesService, CompanyTransformer, DriverTransformer, DriversService, ShipmentService, UpdateShipmentRequest } from '@zix/api';
import { ZixTab } from '@zix/ui/common';
import { t } from 'i18next';
import { FlatList } from 'react-native';
import { UserCard } from '@zix/features/users';
import { CompanyCard } from '@zix/features/company';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'solito/router';
import { useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';

const { useParam } = createParam<{ shipment: string }>();

export function ManageShipmentDriversScreen() {
  const [shipmentId] = useParam('shipment');
  const [selectedDrivers, setSelectedDrivers] = useState<DriverTransformer[]>([])
  const [selectedCompanies, setSelectedCompanies] = useState<CompanyTransformer[]>([])
  const toast = useToastController()
  const router = useRouter()
  const { getUrlPrefix } = useAuth()


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


  const { mutate } = useMutation({
    mutationFn(requestBody: UpdateShipmentRequest) {
      if (!shipmentId) {
        throw new Error('Shipment ID is required')
      }
      return ShipmentService.updateShipment({
        shipment: shipmentId,
        requestBody
      })
    },
    onSuccess() {
      toast.show('Shipment items updated successfully', { preset: 'success' })
      onSkipPress()
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
    },
  })

  function onSkipPress() {
    router.push(`${getUrlPrefix}/shipment-manager/${shipmentId}/budget`)
  }

  function onConfirmPress() {
    mutate({
      invitations: [
        ...selectedDrivers.map(d => ({ driver_id: d.id })),
        ...selectedCompanies.map(c => ({ company_id: c.id }))
      ]
    })
  }

  const renderTabs = () => (
    <ZixTab
      defaultActiveTab='drivers'
      tabs={[
        {
          key: 'drivers',
          title: t('common:drivers'),
          content: (
            <FlatList
              onRefresh={driversQuery.refetch}
              refreshing={driversQuery.isFetching}
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
              ListEmptyComponent={() => (
                <View flex={1} alignItems='center' gap="$8">
                  <CustomIcon name="empty_data" size="$18" color="$color5" />
                  <H4>No Drivers Found!</H4>
                </View>
              )}
            />
          )
        },
        {
          key: 'companies',
          title: t('common:companies'),
          content: (
            <FlatList
              onRefresh={companiesQuery.refetch}
              refreshing={companiesQuery.isFetching}
              data={companiesQuery.data?.data || []}
              renderItem={({ item, index }) => (
                <CompanyCard
                  company={item}
                  key={`${index}-${item.id}`}
                  borderWidth={selectedCompanies.some(d => d.id === item.id) ? 2 : 0}
                  marginBottom='$4'
                  companyContactActionsProps={{
                    onServiceRequestPress: () => {
                      setSelectedCompanies(prev => prev.some(d => d.id === item.id)
                        ? prev.filter(d => d.id !== item.id)
                        : [...prev, item]
                      )
                    }

                  }}
                />
              )}
              ListEmptyComponent={() => (
                <View flex={1} alignItems='center' gap="$8">
                  <CustomIcon name="empty_data" size="$18" color="$color5" />
                  <H4>No Companies Found!</H4>
                </View>
              )}
            />
          )
        },
      ]}
    />
  )

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader title='Shipment Details' showBackButton />
      <YStack flex={1}>
        <ShipmentManagerHeader
          activeStep={4}
          shipment={data?.data}
          title='يرجى تحديد السيارة , السائق والشركة المناسب لك'
        />
        {renderTabs()}
        <YStack padding='$4' gap='$2'>
          <Button
            themeInverse
            onPress={onConfirmPress}
          >
            {t('common:confirm')}
          </Button>
          <Button
            variant='outlined'
            onPress={onSkipPress}
          >
            {t('common:skip')}
          </Button>
        </YStack>
      </YStack>
    </ScreenLayout>

  );
}

export default ManageShipmentDriversScreen;
