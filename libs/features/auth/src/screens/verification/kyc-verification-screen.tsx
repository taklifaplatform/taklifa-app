import { useMutation } from '@tanstack/react-query';

import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

import { useToastController } from '@tamagui/toast';
import { UserVerificationService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { AuthHeader } from '../../components/auth-header/auth-header';

const KYCFormSchema = z.object({
  // name: formFields.text.describe(t('forms:kyc_name')),
  // birth_date: formFields.date_picker.describe(t('forms:birth_date')),
  nationality_id: formFields.country.describe(t('forms:select_nationality')),
  identity_card: formFields.file.describe(t('forms:id_card')).optional(),
  location_id: formFields.location.describe(t('forms:living_address')),
});

export const KycVerificationScreen = () => {
  useMixpanel('Kyc Verification Screen view')
  const router = useRouter();
  const { user, registerSteps, refetchUser } = useAuth();
  const toast = useToastController();

  const form = useForm<z.infer<typeof KYCFormSchema>>();
  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof KYCFormSchema>) {
      return UserVerificationService.storeUserVerification({
        requestBody,
      });
    },
    onSuccess() {
      refetchUser();
      router.replace('/auth/register/success?redirect=/solo-driver');
      // router.push('/auth/verify-driver');
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
          form={form}
          schema={KYCFormSchema}
          defaultValues={{
            name: user?.name || '',
          }}
          props={{
            location_id: {
              backUrl: '/auth/verify-kyc',
            }
          }}
          onSubmit={mutateAsync}
          renderAfter={({ submit }) => {
            return (
              <Theme name="accent">
                <SubmitButton onPress={() => submit()} color="$color2" backgroundColor="$color1">
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
    </ScreenLayout>
  );
};

export default KycVerificationScreen;
