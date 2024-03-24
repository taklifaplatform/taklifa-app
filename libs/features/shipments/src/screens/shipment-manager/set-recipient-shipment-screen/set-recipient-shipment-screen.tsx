import { useMutation } from '@tanstack/react-query';
import { InlineStepper } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields } from '@zix/ui/forms';
import { useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { FormProvider, Theme, XStack } from 'tamagui';
import { z } from 'zod';

const SendFromSchema = z.object({
  from_location: formFields.address.describe('Shipping from // Enter the address of the pickup location'),
  pick_date: formFields.row_date_picker.describe('Date // Pick Date'),
  pick_time: formFields.row_time_range_picker.describe('Time // Pick Time'),
})

export const SetRecipientShipmentScreen: React.FC = () => {
  const form = useForm<z.infer<typeof SendFromSchema>>()
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn(variables) {
      return Promise.resolve(variables)
    },
    onSuccess(data, variables, context) {
      router.push('/customer/shipments/1235/recipient')
      //
    },
    onError(error, variables, context) {
      //
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

export default SetRecipientShipmentScreen;
