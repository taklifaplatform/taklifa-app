import { useMutation } from '@tanstack/react-query';

import { UserVerificationService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';
import { AuthHeader } from '../../components/auth-header/auth-header';

const DriverVerificationFormSchema = z
  .object({
    driving_license_number: formFields.text.min(8).describe(t('forms:license_number')),
    driving_license_card: formFields.file.describe(
      t('forms:vehicle_driving_license')
    ),
    assurance_card: formFields.file.describe(t('forms:insurance_image')),
    accept_terms: formFields.accept_terms.describe(t('forms:accept_terms')),
  })
  .superRefine(({ accept_terms }, ctx) => {
    if (!accept_terms) {
      ctx.addIssue({
        path: ['accept_terms'],
        code: 'custom',
        message: t('auth:validation.accept_terms'),
      });
    }
  });

export const AuthDriverVerificationScreen = () => {
  const router = useRouter();
  const { registerSteps } = useAuth()


  const form = useForm<z.infer<typeof DriverVerificationFormSchema>>();
  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof DriverVerificationFormSchema>) {
      return UserVerificationService.storeDriverVerification({
        requestBody,
      });
    },
    onSuccess({ data }) {
      router.replace('/auth/register/success?redirect=/solo-driver');
    },
    onError(error: any) {
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={DriverVerificationFormSchema}
        onSubmit={mutate}
        renderAfter={({ submit }) => {
          return (
            <Theme inverse>
              <SubmitButton onPress={submit}>
                {t('common:next')}
              </SubmitButton>
            </Theme>
          );
        }}
      >
        {(fields) => (
          <>
            <AuthHeader
              showIcon={false}
              activeStep={4}
              totalSteps={registerSteps || 4}
              title={t('vehicle:verification')}
            />
            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};

export default AuthDriverVerificationScreen;
