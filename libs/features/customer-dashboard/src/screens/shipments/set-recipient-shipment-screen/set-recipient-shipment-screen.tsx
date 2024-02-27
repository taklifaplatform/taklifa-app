import { useMutation } from '@tanstack/react-query';
import { InlineStepper } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields } from '@zix/ui/forms';
import { useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { FormProvider, Theme, XStack } from 'tamagui';
import { z } from 'zod';

/* eslint-disable-next-line */
export interface SetRecipientShipmentScreenProps {
  shipment: any
}

const SendFromSchema = z.object({
  location: formFields.text.describe('Pick From ').min(5),
  // date: formFields.date_picker.describe('Pick Date '),
  // time: formFields.time.describe('Pick Time '),

  notes: formFields.textarea.describe('Notes // Leave a note for the driver'),
})


export const SetRecipientShipmentScreen: React.FC<SetRecipientShipmentScreenProps> = ({ shipment }) => {
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
  )
}

export default SetRecipientShipmentScreen;
