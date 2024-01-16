import {
  Stack,
  Text,
  Theme,
  XStack,
  useToastController
} from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { t } from 'i18next';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { z } from 'zod';
import { User } from '@supabase/supabase-js';
import { useSupabase } from '@zix/core/supabase';
import { AuthHeader } from '../../components/auth-header/auth-header';

const VerifyPhoneNumberFormSchema = z.object({
  token: formFields.code
});
const { useParams } = createParam<{ phone?: string }>();

export type VerifyPhoneNumberFormProps = {
  onSuccess: (user?: User) => void;
  activeStep?: number;
  totalSteps?: number;
};

export const VerifyPhoneNumberForm: React.FC<VerifyPhoneNumberFormProps> = ({
  onSuccess = () => null,
  activeStep = 1,
  totalSteps
}) => {
  const supabase = useSupabase();
  const toast = useToastController();
  const form = useForm<z.infer<typeof VerifyPhoneNumberFormSchema>>();

  const { params } = useParams();

  const phoneNumber = useMemo(() => {
    return `${params?.phone}`.replaceAll(' ', '');
  }, [params?.phone]);

  const maskedPhoneNumber = useMemo(() => {
    return `${phoneNumber.slice(0, 3)} **** ${phoneNumber.slice(-3)}`;
  }, [phoneNumber]);

  async function onSubmit({
    token
  }: z.infer<typeof VerifyPhoneNumberFormSchema>) {
    const { error, data } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: token.toString(),
      type: 'sms'
    });

    if (error) {
      toast.show(error.message, {
        preset: 'error'
      });
      return;
    }

    onSuccess(data?.user || undefined);
  }
  async function resendCode() {
    const { error, ...result } = await supabase.auth.resend({
      phone: phoneNumber,
      type: 'sms'
    });

    console.log('============');
    console.log('error:', error);
    console.log('result:', result);
    console.log('============');

    if (error) {
      toast.show(error.message, {
        preset: 'error'
      });
      return;
    }
    toast.show(t('auth:pin_code.code_sent'));
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
        onSubmit={onSubmit}
        defaultValues={{
          pin_code: ''
        }}
        props={{
          pin_code: {}
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
