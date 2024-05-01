import { useMutation } from '@tanstack/react-query';

import { useToastController } from '@tamagui/toast';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { t } from 'i18next';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

import { AuthService } from '@zix/api';
import { USER_ROLES, useAuth } from '@zix/services/auth';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { ScreenLayout } from '@zix/ui/layouts';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

const SignUpSchema = z
  .object({
    username: formFields.text.min(3).describe(t('forms:username')),
    phone_number: formFields.phone.describe(t('forms:phone_number')),
    phone_number_has_whatsapp: formFields.boolean_switch
      .optional()
      .describe(t('forms:is_whatsapp')),
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
  const toast = useToastController();
  const router = useRouter();
  const updateParams = useUpdateParams();

  const {
    setAuthAccessToken,
    setAuthUser,
    registerSteps,
    requestedAccountType,
  } = useAuth();
  const { params } = useParams();

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
          ...variables,
        },
      }),
    onSuccess({ data }) {
      setAuthAccessToken(data?.plainTextToken);
      setAuthUser(data?.user);
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
            phone_number_has_whatsapp: false,
          }}
          onSubmit={mutateAsync}
          renderAfter={({ submit }) => (
            <Theme inverse>
              <SubmitButton onPress={() => submit()} borderRadius="$10">
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
