import { useMutation } from '@tanstack/react-query';

import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors
} from '@zix/ui/forms';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

import { UserVerificationService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { t } from 'i18next';

const KYCFormSchema = z
  .object({ //
    name: formFields.text.describe(t('forms:kyc_name')),
    birth_date: formFields.date_picker.describe(t('forms:birth_date')),
    nationality_id: formFields.country.describe(t('forms:select_nationality')),
    identity_card: formFields.file.describe(t('forms:id_card')),
    location: formFields.address.describe(t('forms:living_address')),

  });

export const KycVerificationScreen = () => {
  const router = useRouter();
  const { user, registerSteps } = useAuth()

  const form = useForm<z.infer<typeof KYCFormSchema>>();
  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof KYCFormSchema>) {
      return UserVerificationService.storeUserVerification({
        requestBody,
      });
    },
    onSuccess() {
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
        }}
        props={{}}
        onSubmit={mutate}
        renderAfter={({ submit }) => {
          return (
            <Theme inverse>
              <SubmitButton onPress={() => submit()}>
                {t('common:confirm')}
              </SubmitButton>
            </Theme>
          );
        }}
      >
        {(fields) => (
          <>
            <AuthHeader
              showIcon={false}
              activeStep={3}
              totalSteps={registerSteps || 1}
              title={t('auth:kyc.title')}
            />
            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};

export default KycVerificationScreen;
