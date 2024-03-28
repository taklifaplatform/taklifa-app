import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CustomerShipmentsService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner, InlineStepper } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader } from '@zix/ui/layouts';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { FormProvider, Text, Theme, View, YStack } from 'tamagui';
import { z } from 'zod';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../configs';

const { useParam } = createParam<{ shipment?: string }>();

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


  const { data } = useQuery({
    queryFn() {
      if (!shipmentId) {
        return {};
      }

      return CustomerShipmentsService.retrieveShipment({
        shipment: shipmentId,
      });
    },
    queryKey: ['CustomerShipmentsService.retrieveShipment', `-${shipmentId}`],
  })

  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof CreateShipmentSchema>) {
      if (shipmentId) {
        return CustomerShipmentsService.updateShipment({
          shipment: shipmentId,
          requestBody
        })
      }
      return CustomerShipmentsService.storeShipment({
        requestBody
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
          defaultValues={data?.data || {}}
          onSubmit={mutate}

          renderAfter={({ submit }) => (
            <Theme inverse>
              <SubmitButton onPress={() => submit()}>Confirm</SubmitButton>
            </Theme>
          )}
        >
          {(fields) => (
            <>
              <YStack alignItems='center' gap='$4'>
                <InlineStepper totalSteps={3} activeStep={1} />
                <Text>
                  يرجى تحديد عنوانك والتاريخ والوقت الذي تتواجد فيه
                </Text>
                <View height={2} width={'100%'} backgroundColor='$color3' />
              </YStack>
              {Object.values(fields)}
            </>
          )}
        </SchemaForm>

      </FormProvider>
    </>
  )
}

export default ManageShipmentSenderScreen;
