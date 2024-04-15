import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { FormProvider, Theme } from 'tamagui';
import { z } from 'zod';
import { ShipmentManagerHeader } from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../configs';

const { useParam } = createParam<{
  shipment?: string,
  selected_driver_id?: string,
}>();

const CreateShipmentSchema = z.object({
  from_location: formFields.advanced_location.describe(t('forms:shipping-from')),
  pick_date: formFields.row_date_picker.describe(t('common:date')),
  pick_time: formFields.row_time_range_picker.describe(t('common:time')).optional(),
})

export function ManageShipmentSenderScreen() {
  const form = useForm<z.infer<typeof CreateShipmentSchema>>()
  const router = useRouter()
  const toast = useToastController()
  const { getUrlPrefix } = useAuth()
  const [shipmentId] = useParam('shipment');
  const [selectedDriverId] = useParam('selected_driver_id');

  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof CreateShipmentSchema>) {
      if (shipmentId) {
        return ShipmentService.updateShipment({
          shipment: shipmentId,
          requestBody
        })
      }
      return ShipmentService.storeShipment({
        requestBody: {
          ...requestBody,
          selected_driver_id: selectedDriverId,
        }
      })
    },
    onSuccess(data, variables, context) {
      console.log('========')
      console.log('onSuccess::', data)
      console.log('========')
      if (!data.data?.id) {
        toast.show('An error occurred', { preset: 'error' })
        return
      }

      if (shipmentId) {
        router.push(`${getUrlPrefix}/shipment-manager/${data.data.id}`)
      }
      router.push(`${getUrlPrefix}/shipment-manager/${data.data.id}/recipient`)
    },
    onError(error: any) {
      toast.show(error?.body?.message || 'An error occurred', { preset: 'error' })
      handleFormErrors(form, error?.body?.errors);
    },
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

  const shipment = useMemo(() => ({
    selected_driver_id: selectedDriverId,
    ...(data?.data || {}),
  }), [data?.data, selectedDriverId])


  if (shipmentId && !data?.data) {
    return <FullScreenSpinner />
  }

  return (
    <>
      <AppHeader title={t('shipment-manager:sender.title')} showBackButton />
      <FormProvider {...form}>
        <SchemaForm
          form={form}
          schema={CreateShipmentSchema}
          props={{
            from_location: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
            pick_date: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
            pick_time: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
          }}
          defaultValues={shipment}
          onSubmit={mutate}
          renderAfter={({ submit }) => (
            <Theme inverse>
              <SubmitButton onPress={() => submit()}>
                {t('common:next')}
              </SubmitButton>
            </Theme>
          )}
        >
          {(fields) => (
            <>
              <ShipmentManagerHeader
                activeStep={1}
                shipment={shipment}
                title={t('shipment-manager:sender.description')}
              />
              {Object.values(fields)}
            </>
          )}
        </SchemaForm>
      </FormProvider>
    </>
  )
}

export default ManageShipmentSenderScreen;
