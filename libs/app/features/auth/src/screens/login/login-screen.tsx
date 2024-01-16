import { Paragraph, Stack, Text, Theme } from '@zix/app/ui/core';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { useUserRedirect } from '../../hooks/useUserRedirect';

import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { CustomIcon } from '@zix/app/ui/icons';
import { useSupabase } from '@zix/core/supabase';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { createParam } from 'solito';
import { Link } from 'solito/link';
import { z } from 'zod';
import AcceptTermsLink from '../../components/accept-terms-link/accept-terms-link';
// import { AcceptTermsLink } from '../components/AcceptTermsLink';
const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

const LoginSchema = z
  .object({
    phone: formFields.text.describe('Phone Number'),
    // phone: formFields.phone.describe(t('forms:phone_number').toString()),
    password: formFields.text.min(8).describe(t('forms:password'))
    // accept_terms: formFields.boolean_checkbox.describe(t('forms:accept_terms'))
  })
  .required({
    phone: true,
    password: true,
    accept_terms: true
  });

export const LoginScreen: React.FC = () => {
  const supabase = useSupabase();
  const { params } = useParams();
  const updateParams = useUpdateParams();
  const { redirectUser } = useUserRedirect();

  useEffect(() => {
    // remove the persisted email from the url, mostly to not leak user's email in case they share it
    if (params?.phone) {
      updateParams({ phone: undefined }, { web: { replace: true } });
    }
  }, [params?.phone, updateParams]);
  const form = useForm<z.infer<typeof LoginSchema>>();

  async function signInWithEmail({
    phone,
    password
  }: z.infer<typeof LoginSchema>) {
    const { error, data } = await supabase.auth.signInWithPassword({
      phone: phone,
      password: password
    });

    if (error) {
      const errorMessage = error?.message.toLowerCase();
      if (errorMessage.includes('phone')) {
        form.setError('phone', { type: 'custom', message: errorMessage });
      } else if (errorMessage.includes('password')) {
        form.setError('password', { type: 'custom', message: errorMessage });
      } else {
        form.setError('password', { type: 'custom', message: errorMessage });
      }
    } else {
      redirectUser(data?.user);
    }
  }

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={LoginSchema}
        defaultValues={{
          phone: params?.phone || '+966',
          password: ''
        }}
        onSubmit={signInWithEmail}
        props={{
          password: {
            afterElement: <ForgotPasswordLink />,
            secureTextEntry: true
          },
          accept_terms: {
            prepend: <AcceptTermsLink />
          }
        }}
        renderAfter={({ submit }) => {
          return (
            <Stack gap="$4">
              <Theme inverse>
                <SubmitButton onPress={() => submit()} borderRadius="$10">
                  {t('auth:sign_in')}
                </SubmitButton>
              </Theme>
              <SignUpLink />
            </Stack>
          );
        }}
      >
        {(fields) => (
          <>
            <AuthHeader
              title={t('common:app_name')}
              description={t('common:welcome')}
            />
            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};

const SignUpLink = () => {
  const phone = useWatch<z.infer<typeof LoginSchema>>({ name: 'phone' });

  return (
    <Link
      href={`/auth/register?${new URLSearchParams(
        phone ? { phone } : {}
      ).toString()}`}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        gap="$2"
        justifyContent="center"
      >
        <Paragraph textAlign="center" theme="alt1">
          {t('auth:dont_have_account')}{' '}
        </Paragraph>
        <Theme name="light">
          <Text textDecorationLine="underline" color="$color5">
            {t('auth:sign_up')}
          </Text>
        </Theme>
        <Theme name="light">
          <CustomIcon name="arrow_right" color="$color5" />
        </Theme>
      </Stack>
    </Link>
  );
};

const ForgotPasswordLink = () => {
  const phone = useWatch<z.infer<typeof LoginSchema>>({ name: 'phone' });

  return (
    <Theme name="light">
      <Link
        href={`/auth/reset-password?${new URLSearchParams(
          phone ? { phone } : {}
        ).toString()}`}
      >
        <Stack flex={1} alignItems="flex-end" marginTop="$3">
          <Paragraph color="$color5">{t('auth:forgot_password')}</Paragraph>
        </Stack>
      </Link>
    </Theme>
  );
};
