import { useMutation } from '@tanstack/react-query';

import { useToastController } from '@tamagui/toast';
import { UserVerificationService } from '@zix/api';
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
import { useRegisterStepsCounter } from '../../hooks/useRegisterStepsCounter';

const DriverVerificationFormSchema = z
  .object({
    license_number: formFields.text.min(8).describe(t('forms:license_number')),
    vehicle_driving_license: formFields.file.describe(
      t('forms:vehicle_driving_license')
    ),
    insurance_image: formFields.file.describe(t('forms:insurance_image')),
    avatar: formFields.file.describe(t('forms:photo')),
    accept_terms: formFields.accept_terms.describe(t('forms:accept_terms')),
  })
  .required({
    license_number: true,
    vehicle_driving_license: true,
    insurance_image: true,
    photo: true,
  });

export const AuthDriverVerificationScreen = () => {
  const toast = useToastController();
  const router = useRouter();

  const { totalSteps } = useRegisterStepsCounter();

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
              totalSteps={totalSteps}
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
