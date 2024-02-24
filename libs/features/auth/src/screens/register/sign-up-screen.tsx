import { useMutation } from '@tanstack/react-query';

import { Theme } from 'tamagui';
import { useToastController } from '@tamagui/toast';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { t } from 'i18next';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { z } from 'zod';

import { AuthService } from '@zix/api';
import { useAuth } from '@zix/utils';
import { authAccountTypeAtom, authUserTypeAtom } from '../../atoms';
import AcceptTermsLink from '../../components/accept-terms-link/accept-terms-link';
import { AuthHeader } from '../../components/auth-header/auth-header';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

const SignUpSchema = z
  .object({
    name: formFields.text.min(3).describe(t('forms:name')),
    phone_number: formFields.phone.describe(t('forms:phone_number')),
    phone_number_has_whatsapp: formFields.boolean_switch
      .optional()
      .describe(t('forms:is_whatsapp')),
    password: formFields.text.min(6).describe(t('forms:password')),
    password_confirmation: formFields.text
      .min(6)
      .describe(t('forms:password_confirmation')),
    accept_terms: formFields.boolean_checkbox.describe(t('forms:accept_terms')),
  })
  .required({
    name: true,
    phone_number: true,
    password: true,
    password_confirmation: true,
    accept_terms: true,
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        path: ['password_confirmation'],
        code: 'custom',
        message: t('auth:validation.password_confirmation_mismatch'),
      });
    }
  });

export const SignUpScreen = () => {
  const toast = useToastController();
  const router = useRouter();
  const { setAuthAccessToken, setAuthUser } = useAuth();

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
    return 0;
  }, [userType, accountType]);

  useEffect(() => {
    if (params?.phone) {
      updateParams({ phone: undefined }, { web: { replace: true } });
    }
  }, [params?.phone, updateParams]);

  const form = useForm<z.infer<typeof SignUpSchema>>();

  const requested_user_type =
    !accountType || accountType === 'service_requestor'
      ? 'service_requestor'
      : userType;
  const { mutate, isLoading } = useMutation({
    mutationFn: (variables: z.infer<typeof SignUpSchema>) =>
      AuthService.register({
        requestBody: {
          ...variables,
          requested_user_type,
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
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={SignUpSchema}
        defaultValues={{
          name: '',
          phone_number: params?.phone ?? '+966',
          password: '',
          password_confirmation: '',
          accept_terms: false,
          phone_number_has_whatsapp: false,
        }}
        props={{
          password: {
            secureTextEntry: true,
          },
          password_confirmation: {
            secureTextEntry: true,
          },
          accept_terms: {
            prepend: <AcceptTermsLink />,
          },
        }}
        onSubmit={mutate}
        renderAfter={({ submit }) => (
          <Theme inverse>
            <SubmitButton
              onPress={() => submit()}
              isLoading={isLoading}
              borderRadius="$10"
            >
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
