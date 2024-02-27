import { useMutation } from '@tanstack/react-query';

import {
  GroupFieldsSheet,
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import moment from 'moment';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

import { useToastController } from '@tamagui/toast';
import { UserVerificationService } from '@zix/api';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { useRegisterStepsCounter } from '../../hooks/useRegisterStepsCounter';

const KYCFormSchema = z
  .object({
    name: formFields.text.describe('Name: // Your name'),
    birth_date: formFields.date_picker.describe('Birth Date // Enter your birth date'),
    nationality_id: formFields.autocomplete.describe(
      'Nationality // select your country'
    ),
    identity_card: formFields.file.describe('ID Card // Upload your identity card'),

    location: z.object({
      address: formFields.text.describe('Address // Enter your address'),
      country_id: formFields.autocomplete.describe('Country // Select your country'),
      city_id: formFields.autocomplete.describe('City // Select your city'),
      state_id: formFields.autocomplete.describe('State // Select your state'),
      address_complement: formFields.text.describe('Address Complement // Enter your address complement'),
      postcode: formFields.text.describe('Postcode // Enter your postcode'),
    })
  })
  .required({
    name: true,
    birth_date: true,
    nationality_id: true,
  });

export const KycVerificationScreen = () => {
  const router = useRouter();
  const toast = useToastController();
  const { user, totalSteps } = useRegisterStepsCounter();

  const form = useForm<z.infer<typeof KYCFormSchema>>();
  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof KYCFormSchema>) {
      console.log('============')
      console.log('mutationFn::', JSON.stringify(requestBody, null, 2))
      console.log('============')
      return UserVerificationService.storeUserVerification({
        requestBody,
      });
    },
    onSuccess({ data }) {
      router.push('/auth/verify-driver');
    },
    onError(error: any) {
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={KYCFormSchema}
        defaultValues={{
          name: user?.name || '',
          birth_date: moment().format('YYYY-MM-DD').toString(),
          nationality_id: '216',
          residence_country_id: '',
          residency_city_id: '',
          // address: '',
        }}
        props={{}}
        onSubmit={mutate}
        renderAfter={({ submit }) => {
          return (
            <Theme inverse>
              <SubmitButton onPress={() => submit()}>
                Confirm
              </SubmitButton>
            </Theme>
          );
        }}
      >
        {({ location, ...fields }) => (
          <>
            <AuthHeader
              showIcon={false}
              activeStep={3}
              totalSteps={totalSteps || 1}
              title="Confirmation of KYC"
            />
            {Object.values(fields)}

            <GroupFieldsSheet
              title='Address Information'
              activator={location.address}
            >
              {Object.values(location)}
            </GroupFieldsSheet>
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};

export default KycVerificationScreen;
