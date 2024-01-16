import { Theme, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { t } from 'i18next';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { z } from 'zod';

import { useSupabase } from '@zix/core/supabase';
import { authAccountTypeAtom, authUserTypeAtom } from '../../atoms';
import AcceptTermsLink from '../../components/accept-terms-link/accept-terms-link';
import { AuthHeader } from '../../components/auth-header/auth-header';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

const SignUpSchema = z
  .object({
    name: formFields.text.min(3).describe(t('forms:name')),
    phone: formFields.phone.describe(t('forms:phone_number')),
    password: formFields.text.min(6).describe(t('forms:password')),
    password_confirmation: formFields.text
      .min(6)
      .describe(t('forms:password_confirmation')),
    accept_terms: formFields.boolean_checkbox.describe(t('forms:accept_terms'))
  })
  .required({
    name: true,
    phone: true,
    password: true,
    password_confirmation: true,
    accept_terms: true
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        path: ['password_confirmation'],
        code: 'custom',
        message: t('auth:validation.password_confirmation_mismatch')
      });
    }
  });

export const SignUpScreen = () => {
  const supabase = useSupabase();

  const toast = useToastController();
  const router = useRouter();

  const [userType] = useAtom(authUserTypeAtom);
  const [accountType] = useAtom(authAccountTypeAtom);
  const updateParams = useUpdateParams();
  const { params } = useParams();

  const totalSteps = useMemo(() => {
    if (accountType === 'service_requestor') {
      return 2;
    }
    if (userType === 'company') {
      return 3;
    }
    if (userType === 'individual') {
      return 4;
    }
  }, [userType, accountType]);

  useEffect(() => {
    if (params?.phone) {
      updateParams({ phone: undefined }, { web: { replace: true } });
    }
  }, [params?.phone, updateParams]);

  const form = useForm<z.infer<typeof SignUpSchema>>();

  async function onSubmit({
    phone,
    password,
    name
  }: z.infer<typeof SignUpSchema>) {
    const requested_user_type =
      !accountType || accountType === 'service_requestor'
        ? 'service_requestor'
        : userType;
    const { error, data } = await supabase.auth.signUp({
      phone: phone,
      password: password,
      options: {
        // To take user's name other info
        data: {
          name: name,
          requested_user_type
        }
        // channel: 'sms',
      }
    });

    // update profile

    if (error) {
      toast.show(error.message);
      const errorMessage = error?.message.toLowerCase();
      if (errorMessage.includes('phone')) {
        form.setError('phone', { type: 'custom', message: errorMessage });
      } else if (errorMessage.includes('password')) {
        form.setError('password', { type: 'custom', message: errorMessage });
      } else {
        form.setError('name', { type: 'custom', message: errorMessage });
      }

      return;
    }

    if (!data?.user?.identities?.length) {
      form.setError('phone', {
        type: 'custom',
        message: 'This phone already been used'
      });
      return;
    }

    router.push({
      pathname: '/auth/verify-phone-number',
      query: {
        phone: phone
      }
    });
  }

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={SignUpSchema}
        defaultValues={{
          name: '',
          phone: params?.phone ?? '+966',
          password: '',
          password_confirmation: '',
          accept_terms: false
        }}
        props={{
          password: {
            secureTextEntry: true
          },
          password_confirmation: {
            secureTextEntry: true
          },
          accept_terms: {
            prepend: <AcceptTermsLink />
          }
        }}
        onSubmit={onSubmit}
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
              totalSteps={totalSteps || 1}
              title={t('auth:create_new_account')}
            />

            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};
