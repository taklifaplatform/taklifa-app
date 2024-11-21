import { MinusSquare, PlusSquare } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService, ShipmentTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SubmitButton, ZixFieldContainer, ZixSelectRowOptionField, formFields } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { ShipmentItem } from 'libs/ui/forms/src/form-fields';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Button, ScrollView, Separator, View, YStack } from 'tamagui';
import { z } from 'zod';
import ShipmentManagerHeader from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';

const { useParam } = createParam<{ shipment: string }>();

const SendFromSchema = z.object({
  items_type: formFields.select_row.describe('Shipment Type // Enter the type of the shipment'),
  // items_type: formFields.text.describe('Shipment Type // Enter the type of the shipment'),
  items: formFields.shipment_items.describe('Items // Enter the items details'), //
})

export const ManageShipmentItemsScreen: React.FC = () => {
  const router = useRouter()
  const { getUrlPrefix } = useAuth()
  const [shipmentId] = useParam('shipment');
  const toast = useToastController()

  const [shipment, setShipment] = useState<ShipmentTransformer>({
    items_type: 'document',
    items: [
      {}
    ]
  })

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

  useEffect(() => {
    setShipment(data?.data ?? {})
  }, [data])

  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof SendFromSchema>) {
      if (!shipmentId) {
        throw new Error('Shipment ID is required')
      }
      return ShipmentService.updateShipment({
        shipment: shipmentId,
        requestBody
      })
    },
    onSuccess(data, variables, context) {
      toast.show('Shipment items updated successfully', { preset: 'success' })
      if (data?.data?.selected_driver_id || data?.data?.selected_company_id) {
        router.push(`${getUrlPrefix}/shipment-manager/${shipmentId}/summary`)
      } else {
        router.push(`${getUrlPrefix}/shipment-manager/${shipmentId}/assign-driver`)
      }

      //
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
    },
  })


  useEffect(() => {
    if (shipment?.items_type !== 'multiple_boxes') {
      setShipment((prev) => ({
        ...prev,
        items: prev.items?.slice(0, 1) ?? []
      }))
    }
  }, [shipment.items_type])

  useEffect(() => {
    if (shipment?.items?.length === 0) {
      setShipment((prev) => ({
        ...prev,
        items: [
          {}
        ]
      }))
    }
  }, [shipment.items])


  const renderLoading = () => shipmentId && !data?.data && (
    <FullScreenSpinner />
  )

  const renderFullForm = () => (
    <YStack flex={1}>
      <ScrollView flex={1} >

        <ZixFieldContainer label='Shipment Type' labelBold collapsible stackContainerProps={{ padding: '$4' }}>
          <ZixSelectRowOptionField
            value={shipment?.items_type}
            onChange={(items_type) => setShipment((prev) => ({ ...prev, items_type }))}
            options={[
              {
                name: 'document',
                id: 'document',
                icon: 'document'
              },
              {
                name: 'box',
                id: 'box',
                icon: 'box'
              },
              {
                name: 'boxes',
                id: 'multiple_boxes',
                icon: 'box-add'
              },
              {
                name: 'other',
                id: 'other',
                icon: 'other'
              }
            ]}
          />
        </ZixFieldContainer>

        <ZixFieldContainer stackContainerProps={{ padding: '$4' }}>
          <ShipmentItemsField
            selectedType={shipment?.items_type}
            value={shipment?.items}
            onChange={(items) => setShipment((prev) => ({ ...prev, items }))}
          />
        </ZixFieldContainer>
      </ScrollView >
      <SubmitButton
        themeInverse
        margin='$4'
        onPress={() => mutateAsync(shipment)}>
        {t('common:next')}
      </SubmitButton>
    </YStack >
  )

  return (
    <ScreenLayout safeAreaBottom>
      <AppHeader title='Shipment Details' showBackButton />
      <ShipmentManagerHeader
        activeStep={2}
        shipment={data?.data}
        title='يرجى تحديد ما تقوم بشحنه'
      />
      {renderFullForm()}
      {renderLoading()}
    </ScreenLayout>
  )
}


export const ShipmentItemsField: React.FC = ({
  onChange, value, selectedType
}) => {

  const renderAddItemButton = () => (
    <Button
      marginTop='$4'
      icon={PlusSquare}
      onPress={() => {
        onChange([
          ...(value || []),
          {
            images: [],
            notes: '',
            dim_height: '',
            dim_width: '',
            dim_length: '',
            content: '',
          }
        ])
      }}
      fontWeight={600}
    >
      {t('common:add-box')}
    </Button>
  )

  const renderRemoveItemButton = (itemIndex: number) => (
    <Button
      theme='error'
      marginTop='$4'
      icon={MinusSquare}
      onPress={() => {
        onChange(value?.filter((_, i) => i !== itemIndex))
      }}
      fontWeight={600}
    >
      {t('common:remove-box')}
    </Button>
  )

  return (
    <View>
      {
        value?.map((item, index) => (
          <YStack key={`item-${index}`}>
            <ShipmentItem
              index={index}
              value={item}
              onChange={(newValue) => {
                onChange(value.map((v, i) => i === index ? newValue : v));
              }}
            />
            {renderRemoveItemButton(index)}
          </YStack>
        ))
      }

      <Separator marginTop='$4' />
      {(selectedType === 'multiple_boxes' || value.length === 0) && renderAddItemButton()}
    </View>
  );
}

export default ManageShipmentItemsScreen;
