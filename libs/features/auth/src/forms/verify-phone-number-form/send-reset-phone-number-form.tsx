import { useMutation } from '@tanstack/react-query';
import { Stack, Text, Theme, XStack } from 'tamagui';

import { useToastController } from '@tamagui/toast';
import { AuthService } from '@zix/api';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { t } from 'i18next';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { z } from 'zod';
import { AuthHeader } from '../../components/auth-header/auth-header';

const SendResetPhoneNumberFormSchema = z.object({
  pin_code: formFields.code,
});
const { useParams } = createParam<{ phone?: string }>();

export type SendResetPhoneNumberFormProps = {
  onSuccess: (data?: any) => void;
  activeStep?: number;
  totalSteps?: number;
};

export const SendResetPhoneNumberForm: React.FC<SendResetPhoneNumberFormProps> = ({
  onSuccess = () => null,
  activeStep = 1,
  totalSteps,
}) => {
  const toast = useToastController();
  const form = useForm<z.infer<typeof SendResetPhoneNumberFormSchema>>();

  const { params } = useParams();

  const phoneNumber = useMemo(() => {
    return `${params?.phone}`.replaceAll(' ', '');
  }, [params?.phone]);

  const maskedPhoneNumber = useMemo(() => {
    return `${phoneNumber.slice(0, 3)} **** ${phoneNumber.slice(-3)}`;
  }, [phoneNumber]);

  const { mutateAsync } = useMutation({
    mutationFn: (variables: z.infer<typeof SendResetPhoneNumberFormSchema>) =>
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
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  async function resendCode() {
    AuthService.sendResetPasswordPinCode({
      requestBody: {
        phone_number: phoneNumber,
      },
    })
      .then(() => {
        toast.show(t('auth:pin_code.code_sent'));
      })
      .catch((error) => {
        console.log('error', JSON.stringify(error, null, 2), "phone=> ", phoneNumber);
        toast.show(error.message, {
          preset: 'error',
        });
      });
  }

  const [lastSentTime, setLastSentTime] = useState(null);
  const cooldownPeriod = 60 * 1000; // 1 minute in milliseconds
  const currentTime = new Date().getTime();
  const [canResed, setCanResed] = useState(true);

  const handleResendCode = () => {
    if (!lastSentTime || currentTime - lastSentTime >= cooldownPeriod) {
      resendCode();
      setLastSentTime(currentTime);
      // setCanResed(true) after 60 seconds
      setCanResed(false)
      setTimeout(() => {
        setCanResed(true)
      }, 60000)
    } else {
      const timeLeft = Math.ceil((cooldownPeriod - (currentTime - lastSentTime)) / 1000);
      toast.show(`Please wait ${timeLeft} more seconds before resending the code`, {
        preset: 'error',
      });
    }
  };


  const ResendCodeNumber = () => {
    return (
      <XStack
        onPress={handleResendCode}
        margin="$4"
        gap="$2"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        <Text textAlign="center" theme="alt1">
          {t('auth:pin_code.didnt_receive_code')}
        </Text>
        <Theme name="accent">
          <Text fontSize="$4" color={canResed ? "$color10" : "gray"}>
            {t('auth:pin_code.resend')}
          </Text>
        </Theme>
      </XStack>
    );
  };

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={SendResetPhoneNumberFormSchema}
        onSubmit={mutateAsync}
        defaultValues={{
          pin_code: '',
        }}
        renderAfter={({ submit }) => {
          return (
            <Stack>
              <Theme name="accent">
                <SubmitButton onPress={() => submit()} color="$color2" >
                  {t('common:confirm')}
                </SubmitButton>
              </Theme>
              <ResendCodeNumber />
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

export default SendResetPhoneNumberForm;
