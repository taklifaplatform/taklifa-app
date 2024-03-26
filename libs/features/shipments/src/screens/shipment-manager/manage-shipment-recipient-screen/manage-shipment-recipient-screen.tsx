import { useMutation } from '@tanstack/react-query';
import { CustomerShipmentsService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { InlineStepper } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { FormProvider, Theme, XStack } from 'tamagui';
import { z } from 'zod';
import { createParam } from 'solito';
import { useToastController } from '@tamagui/toast';

const SendFromSchema = z.object({
  from_location: formFields.address.describe('Shipping from // Enter the address of the pickup location'),
  pick_date: formFields.row_date_picker.describe('Date // Pick Date'),
  pick_time: formFields.row_time_range_picker.describe('Time // Pick Time'),
})

const { useParam } = createParam<{ shipment: string }>();


export const ManageShipmentRecipientScreen: React.FC = () => {
  const form = useForm<z.infer<typeof SendFromSchema>>()
  const router = useRouter()
  const { getUrlPrefix } = useAuth()
  const [shipmentId] = useParam('shipment');
  const toast = useToastController()


  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof SendFromSchema>) {
      if (!shipmentId) {
        throw new Error('Shipment ID is required')
      }
      return CustomerShipmentsService.updateShipment({
        shipment: shipmentId,
        requestBody
      })
    },
    onSuccess(data, variables, context) {
      router.push(`${getUrlPrefix}/shipments/${shipmentId}/edit/items`)
      //
    },
    onError(error: any) {
      toast.show(error?.body?.message || 'An error occurred', { preset: 'error' })
      handleFormErrors(form, error?.body?.errors);
    },
  })

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={SendFromSchema}
        props={{}}
        onSubmit={mutate}
        renderBefore={() => (
          <XStack alignItems="center" >
            <InlineStepper totalSteps={3} activeStep={1} />
          </XStack>
        )}
        renderAfter={({ submit }) => (
          <Theme inverse>
            <SubmitButton onPress={() => submit()}>Confirm</SubmitButton>
          </Theme>
        )}
      />
    </FormProvider>
  )
}

export default ManageShipmentRecipientScreen;
