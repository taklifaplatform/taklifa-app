import { Paragraph, Stack, Text, Theme } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { CustomIcon } from '@zix/app/ui/icons';
import { useSupabase } from '@zix/core/supabase';
import { t } from 'i18next';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { createParam } from 'solito';
import { Link } from 'solito/link';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { AuthHeader } from '../../components/auth-header/auth-header';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

const ResetPasswordSchema = z.object({
  phone: formFields.phone.describe(t('forms:phone_number').toString())
});

export const ResetPasswordScreen = () => {
  const supabase = useSupabase();
  const { params } = useParams();
  const router = useRouter();
  const updateParams = useUpdateParams();
  useEffect(() => {
    if (params?.phone) {
      updateParams({ phone: undefined }, { web: { replace: true } });
    }
  }, [params?.phone, updateParams]);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>();

  async function resetPassword({ phone }: z.infer<typeof ResetPasswordSchema>) {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        channel: 'whatsapp'
      }
    });

    if (error) {
      const errorMessage = error?.message.toLowerCase();
      form.setError('phone', { type: 'custom', message: errorMessage });
      return;
    }

    router.push(
      `/auth/reset-password/verify?${new URLSearchParams({ phone })}`
    );
  }

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={ResetPasswordSchema}
        defaultValues={{
          phone: params?.phone || ''
        }}
        onSubmit={resetPassword}
        renderAfter={({ submit }) => {
          return (
            <Stack gap="$4">
              <Theme inverse>
                <SubmitButton onPress={() => submit()} borderRadius="$10">
                  {t('common:next')}
                </SubmitButton>
              </Theme>
              <SignInLink />
            </Stack>
          );
        }}
      >
        {(fields) => (
          <>
            <AuthHeader
              activeStep={1}
              totalSteps={3}
              title="Reset your password"
              description="Type in your phone number and we'll send you a pin code to reset your password"
            />

            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};

const SignInLink = () => {
  const phone = useWatch<z.infer<typeof ResetPasswordSchema>>({
    name: 'phone'
  });

  return (
    <Link
      href={`/auth/login?${new URLSearchParams(phone ? { phone } : undefined)}`}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        gap="$2"
        justifyContent="center"
      >
        <Paragraph textAlign="center" theme="alt1">
          Done resetting?{' '}
        </Paragraph>
        <Theme name="light">
          <Text textDecorationLine="underline" color="$color5">
            {t('auth:sign_in')}
          </Text>
        </Theme>
        <Theme name="light">
          <CustomIcon name="arrow_right" color="$color5" />
        </Theme>
      </Stack>
    </Link>
  );
};

export default ResetPasswordScreen;
