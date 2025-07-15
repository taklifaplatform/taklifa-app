import { useMutation } from '@tanstack/react-query';

import { useToastController } from '@tamagui/toast';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

import { AuthService } from '@zix/api';
import { USER_ROLES, useAuth, useMixpanel } from '@zix/services/auth';
import { ScreenLayout } from '@zix/ui/layouts';
import { AuthHeader } from '../../components/auth-header/auth-header';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

export const SignUpSchema = z
  .object({
    name: formFields.text.min(3).describe(t('forms:name')),
    phone_number: formFields.phone.describe(t('forms:phone_number')),
    email: formFields.text.email().describe(t('forms:email')).optional().nullable(),
    password: formFields.secure_text.describe(t('forms:password')),
    password_confirmation: formFields.secure_text.describe(
      t('forms:password_confirmation'),
    ),
    accept_terms: formFields.accept_terms.describe(t('forms:accept_terms')),
  })
  .required({
    username: true,
    phone_number: true,
    password: true,
    password_confirmation: true,
    accept_terms: true,
  })
  .superRefine(({ password_confirmation, password, accept_terms }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        path: ['password_confirmation'],
        code: 'custom',
        message: t('auth:validation.password_confirmation_mismatch'),
      });
    }

    if (!accept_terms) {
      ctx.addIssue({
        path: ['accept_terms'],
        code: 'custom',
        message: t('auth:validation.accept_terms'),
      });
    }
  });

export const SignUpScreen = () => {
  useMixpanel('Sign Up Page view')
  const toast = useToastController();
  const router = useRouter();
  const updateParams = useUpdateParams();
  const [method, setMethod] = useState<string | null>(null);

  const {
    setAuthAccessToken,
    setAuthUser,
    registerSteps,
    requestedAccountType,
  } = useAuth();
  const { params } = useParams();

  useEffect(() => {
    if (params?.method) {
      setMethod(params?.method);
    }
  }, [params?.method]);

  useEffect(() => {
    if (params?.phone) {
      updateParams({ phone: undefined }, { web: { replace: true } });
    }
  }, [params?.phone, updateParams]);

  const form = useForm<z.infer<typeof SignUpSchema>>();

  const { mutateAsync } = useMutation({
    mutationFn: (variables: z.infer<typeof SignUpSchema>) =>
      AuthService.register({
        requestBody: {
          is_customer: requestedAccountType === USER_ROLES.customer,
          // is_company_owner: requestedAccountType === USER_ROLES.company_owner,
          // is_service_provider: requestedAccountType === USER_ROLES.service_provider,
          ...variables,
        },
      }),
    onSuccess({ data }) {
      if (data?.plainTextToken) {
        setAuthAccessToken(data?.plainTextToken);
      }
      if (data?.user) {
        setAuthUser(data?.user);
      }
      router.push({
        pathname: '/auth/verify-phone-number',
        query: {
          phone: data?.user?.phone_number,
        },
      });
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
          schema={SignUpSchema}
          defaultValues={{
            username: '',
            name: '',
            phone_number: params?.phone ?? '+966',
            password: '',
            password_confirmation: '',
            accept_terms: false,
          }}
          props={{
            email: {
              containerProps: {
                showFieldset: method === 'email' ? true : false,
              },
            },
            password: {
              containerProps: {
                showFieldset: method === 'google' || method === 'apple' ? false : true,
              },
            },
            password_confirmation: {
              containerProps: {
                showFieldset: method === 'google' || method === 'apple' ? false : true,
              },
            }
          }}
          onSubmit={mutateAsync}
          renderAfter={({ submit }) => (
            <Theme name="accent">
              <SubmitButton onPress={() => submit()} borderRadius="$10" color="$color2">
                {t('common:next')}
              </SubmitButton>
            </Theme>
          )}
        >
          {(fields) => (
            <>
              <AuthHeader
                showIcon={false}
                activeStep={1}
                totalSteps={registerSteps || 1}
                title={t('auth:create_new_account')}
              />
              {Object.values(fields)}
            </>
          )}
        </SchemaForm>
      </FormProvider>
    </ScreenLayout>
  );
};
