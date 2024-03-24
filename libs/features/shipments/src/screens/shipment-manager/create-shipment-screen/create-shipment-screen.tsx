import { useToastController } from '@tamagui/toast';
import { useMutation } from '@tanstack/react-query';
import { CustomerShipmentsService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { InlineStepper } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { FormProvider, Theme, XStack } from 'tamagui';
import { z } from 'zod';

/* eslint-disable-next-line */
export interface CreateShipmentScreenProps {
  shipment: any
}

const CreateShipmentSchema = z.object({
  from_location: formFields.address.describe('Shipping from // Enter the address of the pickup location'),
  pick_date: formFields.row_date_picker.describe('Date // Pick Date'),
  pick_time: formFields.row_time_range_picker.describe('Time // Pick Time'),
})

export const CreateShipmentScreen: React.FC<CreateShipmentScreenProps> = ({ shipment }) => {
  const form = useForm<z.infer<typeof CreateShipmentSchema>>()
  const router = useRouter()
  const toast = useToastController()
  const { getUrlPrefix } = useAuth()

  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof CreateShipmentSchema>) {
      return CustomerShipmentsService.storeShipment({
        requestBody
      })
    },
    onSuccess(data, variables, context) {
      if (!data.data?.id) {
        toast.show('An error occurred', { preset: 'error' })
        return
      }
      router.push(`${getUrlPrefix}/shipments/${data.data.id}/edit`)
      router.push(`${getUrlPrefix}/shipments/${data.data.id}/edit/recipient`)
    },
    onError(error: any) {
      toast.show(error?.body?.message || 'An error occurred', { preset: 'error' })
      handleFormErrors(form, error?.body?.errors);
    },
  })

  return (
    <>
      <AppHeader title="Create Shipment" showBackButton />
      <FormProvider {...form}>
        <SchemaForm
          form={form}
          schema={CreateShipmentSchema}
          props={{}}
          defaultValues={shipment}
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
    </>
  )
}

export default CreateShipmentScreen;
