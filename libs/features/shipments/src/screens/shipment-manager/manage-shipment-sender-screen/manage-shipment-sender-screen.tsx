import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CustomerShipmentsService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader } from '@zix/ui/layouts';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { FormProvider, Theme } from 'tamagui';
import { z } from 'zod';
import ShipmentManagerHeader from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../configs';
import { useMemo } from 'react';

const { useParam } = createParam<{
  shipment?: string,
  selected_driver_id?: string,
}>();

const CreateShipmentSchema = z.object({
  from_location: formFields.advanced_location.describe('Shipping from // Enter the address of the pickup location'),
  pick_date: formFields.row_date_picker.describe('Date // Pick Date'),
  pick_time: formFields.row_time_range_picker.describe('Time // Pick Time').optional(),
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
        return CustomerShipmentsService.updateShipment({
          shipment: shipmentId,
          requestBody
        })
      }
      return CustomerShipmentsService.storeShipment({
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

      return CustomerShipmentsService.retrieveShipment({
        shipment: shipmentId,
      });
    },
    queryKey: ['CustomerShipmentsService.retrieveShipment', `-${shipmentId}`],
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
      <AppHeader title={shipmentId ? "Edit Shipment" : "Create Shipment"} showBackButton />
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
              <SubmitButton onPress={() => submit()}>Confirm</SubmitButton>
            </Theme>
          )}
        >
          {(fields) => (
            <>
              <ShipmentManagerHeader
                activeStep={1}
                shipment={shipment}
                title='يرجى تحديد عنوانك والتاريخ والوقت الذي تتواجد فيه'
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
