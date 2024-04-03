import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SchemaForm, SubmitButton, ZixFieldContainer, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader } from '@zix/ui/layouts';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { FormProvider, Theme } from 'tamagui';
import { z } from 'zod';
import ShipmentManagerHeader from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../configs';

const { useParam } = createParam<{ shipment: string }>();

const SendFromSchema = z.object({
  to_location: formFields.advanced_location.describe('Shipping To // Enter the address of the delivery location'),

})

export const ManageShipmentBudgetScreen: React.FC = () => {
  const form = useForm<z.infer<typeof SendFromSchema>>()
  const router = useRouter()
  const { getUrlPrefix } = useAuth()
  const [shipmentId] = useParam('shipment');
  const toast = useToastController()

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

  const { mutate } = useMutation({
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
      router.push(`${getUrlPrefix}/shipment-manager/${shipmentId}/items`)
      //
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
      <AppHeader title='Shipment Details' showBackButton />
      <FormProvider {...form}>
        <SchemaForm
          form={form}
          schema={SendFromSchema}
          props={{
            to_location: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
            deliver_date: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
            deliver_time: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
          }}
          defaultValues={data.data}
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
                activeStep={2}
                shipment={data?.data}
                title='يرجى تحديد السعر المناسب لك'
              />

              <ZixFieldContainer
                label='Budget'
                {...SHARED_SHIPMENT_MANAGER_FIELD_PROPS.containerProps}
              >
                {Object.values(fields)}
              </ZixFieldContainer>

            </>
          )}
        </SchemaForm>
      </FormProvider>
    </>
  )
}

export default ManageShipmentBudgetScreen;
