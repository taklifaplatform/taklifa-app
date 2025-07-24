import { useMutation } from '@tanstack/react-query';
import { Stack, Theme } from 'tamagui';

import { useToastController } from '@tamagui/toast';
import { AuthService } from '@zix/api';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { t } from 'i18next';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { z } from 'zod';
import { AuthHeader } from '../../components/auth-header/auth-header';

export const VerifyPhoneNumberFormSchema = z.object({
  pin_code: formFields.code,
});
const { useParams } = createParam<{ phone?: string }>();

export type VerifyPhoneNumberFormProps = {
  onSuccess: (data?: any) => void;
  activeStep?: number;
  totalSteps?: number;
  showAppHeader?: boolean;
  phoneNumber?: string;
};

export const VerifyPhoneNumberForm: React.FC<VerifyPhoneNumberFormProps> = ({
  onSuccess = () => null,
  activeStep = 1,
  totalSteps,
  showAppHeader = true,
  phoneNumber: phoneNumberProp,
}) => {
  const toast = useToastController();
  const form = useForm<z.infer<typeof VerifyPhoneNumberFormSchema>>();

  const { params } = useParams();

  const phoneNumber = useMemo(() => {
    if (phoneNumberProp) {
      return `${phoneNumberProp}`.replaceAll(' ', '');
    }
    return `${params?.phone}`.replaceAll(' ', '');
  }, [params?.phone, phoneNumberProp]);

  const maskedPhoneNumber = useMemo(() => {
    return `${phoneNumber.slice(0, 3)} **** ${phoneNumber.slice(-3)}`;
  }, [phoneNumber]);

  const { mutateAsync } = useMutation({
    mutationFn: (variables: z.infer<typeof VerifyPhoneNumberFormSchema>) =>
      AuthService.verifyPhoneNumber({
        requestBody: {
          phone_number: phoneNumber,
          pin_code: variables.pin_code?.toString(),
        },
      }),
    onSuccess({ data }) {
      onSuccess(data);
    },
    onError(error: any) {
      toast.show(error?.body?.errors?.pin_code || error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={VerifyPhoneNumberFormSchema}
        onSubmit={mutateAsync}
        defaultValues={{
          pin_code: '',
        }}
        renderAfter={({ submit }) => {
          return (
            <Stack>
              <Theme name="accent">
                <SubmitButton onPress={() => submit()} color="$color2" backgroundColor="$color1" >
                  {t('common:next')}
                </SubmitButton>
              </Theme>
            </Stack>
          );
        }}
      >
        {(fields) => (
          <>
            <AuthHeader
              canGoBack={showAppHeader}
              showIcon={false}
              activeStep={activeStep}
              totalSteps={totalSteps}
              title={t('auth:phone_number.confirm')}
              description={`${t(
                'auth:pin_code.has_sent_to_your_mobile_number'
              )} ${maskedPhoneNumber}`}
            />
            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};

export default VerifyPhoneNumberForm;
