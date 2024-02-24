import { useMutation } from '@tanstack/react-query';
import { Paragraph, Stack, Text, Theme } from 'tamagui';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { useUserRedirect } from '../../hooks/useUserRedirect';

import { AuthService } from '@zix/api';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { useAuth } from '@zix/utils';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { createParam } from 'solito';
import { Link } from 'solito/link';
import { z } from 'zod';
import AcceptTermsLink from '../../components/accept-terms-link/accept-terms-link';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

const LoginSchema = z
  .object({
    phone_number: formFields.phone.describe(t('forms:phone_number').toString()),
    password: formFields.text.min(8).describe(t('forms:password')),
  })
  .required({
    phone_number: true,
    password: true,
  });

export const LoginScreen: React.FC = () => {
  const { setAuthAccessToken, setAuthUser } = useAuth();

  const { params } = useParams();
  const updateParams = useUpdateParams();
  const { redirectUser } = useUserRedirect();
  const form = useForm<z.infer<typeof LoginSchema>>();

  const { mutate, isLoading } = useMutation({
    mutationFn(requestBody: z.infer<typeof LoginSchema>) {
      return AuthService.login({
        requestBody,
      });
    },
    onSuccess({ data }) {
      setAuthAccessToken(data?.plainTextToken);
      setAuthUser(data?.user);
      redirectUser(data?.user);
    },
    onError(error: any) {
      handleFormErrors(form, error?.body?.errors);
    },
  });

  useEffect(() => {
    // remove the persisted email from the url, mostly to not leak user's email in case they share it
    if (params?.phone) {
      updateParams({ phone: undefined }, { web: { replace: true } });
    }
  }, [params?.phone, updateParams]);

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={LoginSchema}
        defaultValues={{
          phone_number: params?.phone || '+966',
          password: '',
        }}
        onSubmit={mutate}
        props={{
          password: {
            afterElement: <ForgotPasswordLink />,
            secureTextEntry: true,
          },
          accept_terms: {
            prepend: <AcceptTermsLink />,
          },
        }}
        renderAfter={({ submit }) => {
          return (
            <Stack gap="$4">
              <Theme inverse>
                <SubmitButton
                  isLoading={isLoading}
                  onPress={() => submit()}
                  borderRadius="$10"
                >
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
  const phone = useWatch<z.infer<typeof LoginSchema>>({ name: 'phone_number' });

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
  const phone = useWatch<z.infer<typeof LoginSchema>>({ name: 'phone_number' });

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
