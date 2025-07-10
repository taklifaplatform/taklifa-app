import { useMutation } from '@tanstack/react-query';

import { useToastController } from '@tamagui/toast';
import { UserVerificationService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';
import { AuthHeader } from '../../components/auth-header/auth-header';

const DriverVerificationFormSchema = z
  .object({
    driving_license_number: formFields.text
      .min(8)
      .max(15)
      .describe(t('forms:license_number')),
    driving_license_card: formFields.file.describe(
      t('forms:vehicle_driving_license'),
    ),
    assurance_card: formFields.file.describe(t('forms:insurance_image')).nullable(),
    accept_terms: formFields.accept_terms.describe(t('forms:accept_terms')).nullable(),
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
  useMixpanel('Auth Driver Verification Screen view')
  const router = useRouter();
  const { registerSteps } = useAuth();
  const toast = useToastController();
  const form = useForm<z.infer<typeof DriverVerificationFormSchema>>();
  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof DriverVerificationFormSchema>) {
      return UserVerificationService.storeDriverVerification({
        requestBody,
      });
    },
    onSuccess({ data }) {
      router.replace('/auth/register/success?redirect=/solo-driver');
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <ScreenLayout safeAreaBottom>
      <FormProvider {...form}>
        <SchemaForm
          schema={DriverVerificationFormSchema}
          props={{
            driving_license_number: {
              backgroundColor: '#FFFFFF',
            },
            driving_license_card: {
              backgroundColor: '#FFFFFF',
            },
            assurance_card: {
              backgroundColor: '#FFFFFF',
            },
          }}

          onSubmit={mutateAsync}
          renderAfter={({ submit }) => {
            return (
              <Theme name="accent">
                <SubmitButton onPress={submit} color="$color2">{t('common:next')}</SubmitButton>
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
    </ScreenLayout>
  );
};

export default AuthDriverVerificationScreen;
