import { useMutation } from '@tanstack/react-query';

import { Theme, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/app/ui/forms';
import moment from 'moment';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { z } from 'zod';

import { UserVerificationService } from '@zix/api';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { useRegisterStepsCounter } from '../../hooks/useRegisterStepsCounter';

const KYCFormSchema = z
  .object({
    name: formFields.text
      .min(8, { message: 'Must be 8 or more characters long' })
      .describe('Name: // Your name'),
    birth_date: formFields.date.describe('Birth Date // Enter your birth date'),
    nationality_id: formFields.country.describe(
      'Nationality // select your country'
    ),
    kyc_doc: formFields.file.describe('ID Card // Upload your identity card')
    // address: formFields.text.describe('Address:'),
  })
  .required({
    name: true,
    birth_date: true,
    nationality_id: true
  });

export const KycVerificationScreen = () => {
  const router = useRouter();
  const toast = useToastController();
  const { user, totalSteps } = useRegisterStepsCounter();

  const form = useForm<z.infer<typeof KYCFormSchema>>();
  const { mutate, isLoading } = useMutation({
    mutationFn(requestBody: z.infer<typeof KYCFormSchema>) {
      return UserVerificationService.storeUserVerification({
        requestBody
      })
    },
    onSuccess({ data }) {
      router.push('/auth/verify-driver');
    },
    onError(error: any) {
      handleFormErrors(form, error?.body?.errors);
    }
  })

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={KYCFormSchema}
        defaultValues={{
          name: user?.name || '',
          birth_date: moment().format('YYYY-MM-DD').toString(),
          nationality_id: 216,
          residence_country_id: '',
          residency_city_id: ''
          // address: '',
        }}
        props={{}}
        onSubmit={mutate}
        renderAfter={({ submit }) => {
          return (
            <Theme inverse>
              <SubmitButton isLoading={isLoading} onPress={() => submit()}>Confirm</SubmitButton>
            </Theme>
          );
        }}
      >
        {(fields) => (
          <>
            <AuthHeader
              showIcon={false}
              activeStep={3}
              totalSteps={totalSteps || 1}
              title="Confirmation of KYC"
            />
            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};

export default KycVerificationScreen;
