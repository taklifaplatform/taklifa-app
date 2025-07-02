import { useMutation } from '@tanstack/react-query';
import { Paragraph, Stack, Text, Theme } from 'tamagui';
import { AuthHeader } from '../../components/auth-header/auth-header';

import { AuthService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { createParam } from 'solito';
import { Link } from 'solito/link';
import { z } from 'zod';
import { ScreenLayout } from '@zix/ui/layouts';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

export const LoginSchema = z.object({
  phone_number: formFields.phone.describe(t('forms:phone_number').toString()),
  password: formFields.secure_text.describe(t('forms:password')),
})
  .superRefine(({ password }, ctx) => {
    if (password.length < 1) {
      ctx.addIssue({
        path: ['password'],
        code: 'custom',
        message: (t('forms:password_field_required')),
      });
    }


  });

export const LoginScreen: React.FC = () => {
  useMixpanel('Login Page view')
  const { setAuthAccessToken, setAuthUser, redirectUserToActiveDashboard } =
    useAuth();

  const { params } = useParams();
  const updateParams = useUpdateParams();
  const form = useForm<z.infer<typeof LoginSchema>>();

  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof LoginSchema>) {
      return AuthService.login({
        requestBody,
      });
    },
    onSuccess({ data }) {
      setAuthAccessToken(data?.plainTextToken);
      setAuthUser(data?.user);
      redirectUserToActiveDashboard({
        user: data?.user,
      });
    },
    onError(error: any) {
      console.log('error', error);
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
    <ScreenLayout safeAreaBottom>
      <FormProvider {...form}>
        <SchemaForm
          form={form}
          schema={LoginSchema}
          defaultValues={{
            phone_number: params?.phone || '+966 ',
            // phone_number: params?.phone || '+966',
            password: '',
          }}
          onSubmit={mutateAsync}
          props={{
            password: {
              afterElement: <ForgotPasswordLink />,
            },
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
    </ScreenLayout>
  );
};

const SignUpLink = () => {
  const phone = useWatch<z.infer<typeof LoginSchema>>({ name: 'phone_number' });

  return (
    <Link
      href={`/auth/register?${new URLSearchParams(
        phone ? { phone } : {},
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

        <Theme name="accent">
          <Text textDecorationLine="underline" color="$color1">
            {t('auth:sign_up')}
          </Text>
          <CustomIcon theme="accent" name="arrow_right" color="$color1" />
        </Theme>
      </Stack>
    </Link>
  );
};

const ForgotPasswordLink = () => {
  const phone = useWatch<z.infer<typeof LoginSchema>>({ name: 'phone_number' });

  return (
    <Theme name="accent">
      <Link
        href={`/auth/reset-password?${new URLSearchParams(
          phone ? { phone } : {},
        ).toString()}`}
      >
        <Stack flex={1} alignItems="flex-end" marginTop="$3">
          <Paragraph color="$color1">{t('auth:forgot_password')}</Paragraph>
        </Stack>
      </Link>
    </Theme>
  );
};
