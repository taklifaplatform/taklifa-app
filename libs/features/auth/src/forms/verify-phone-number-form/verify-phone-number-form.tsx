import { useMutation } from '@tanstack/react-query';
import { Stack, Text, Theme, XStack } from 'tamagui';

import { useToastController } from '@tamagui/toast';
import { AuthService, UserTransformer } from '@zix/api';
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

const VerifyPhoneNumberFormSchema = z.object({
  pin_code: formFields.code,
});
const { useParams } = createParam<{ phone?: string }>();

export type VerifyPhoneNumberFormProps = {
  onSuccess: (user?: UserTransformer) => void;
  activeStep?: number;
  totalSteps?: number;
};

export const VerifyPhoneNumberForm: React.FC<VerifyPhoneNumberFormProps> = ({
  onSuccess = () => null,
  activeStep = 1,
  totalSteps,
}) => {
  const toast = useToastController();
  const form = useForm<z.infer<typeof VerifyPhoneNumberFormSchema>>();

  const { params } = useParams();

  const phoneNumber = useMemo(() => {
    return `${params?.phone}`.replaceAll(' ', '');
  }, [params?.phone]);

  const maskedPhoneNumber = useMemo(() => {
    return `${phoneNumber.slice(0, 3)} **** ${phoneNumber.slice(-3)}`;
  }, [phoneNumber]);

  const { mutate } = useMutation({
    mutationFn: (variables: z.infer<typeof VerifyPhoneNumberFormSchema>) =>
      AuthService.verifyPhoneNumber({
        requestBody: {
          phone_number: phoneNumber,
          pin_code: variables.pin_code?.toString(),
        },
      }),
    onSuccess({ data }) {
      onSuccess(data?.user);
    },
    onError(error: any) {
      alert('error');
      handleFormErrors(form, error?.body?.errors);
    },
  });

  async function resendCode() {
    AuthService.sendPhoneNumberVerification({
      requestBody: {
        phone_number: phoneNumber,
      },
    })
      .then(() => {
        toast.show(t('auth:pin_code.code_sent'));
      })
      .catch((error) => {
        toast.show(error.message, {
          preset: 'error',
        });
      });
  }

  const ResendCodeNumber = () => {
    return (
      <XStack
        onPress={() => resendCode()}
        margin="$4"
        gap="$2"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        <Text textAlign="center" theme="alt1">
          {t('auth:pin_code.didnt_receive_code')}
        </Text>
        <Theme name="light">
          <Text fontSize="$4" color="$color5">
            {t('auth:pin_code.resend')}
          </Text>
        </Theme>
      </XStack>
    );
  };

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={VerifyPhoneNumberFormSchema}
        onSubmit={mutate}
        defaultValues={{
          pin_code: '',
        }}
        props={{
          pin_code: {},
        }}
        renderAfter={({ submit }) => {
          return (
            <Stack>
              <ResendCodeNumber />
              <Theme inverse>
                <SubmitButton onPress={() => submit()}>
                  {t('common:confirm')}
                </SubmitButton>
              </Theme>
            </Stack>
          );
        }}
      >
        {(fields) => (
          <>
            <AuthHeader
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
