import { useMutation } from '@tanstack/react-query';

import { useToastController } from '@tamagui/toast';
import { AuthService } from '@zix/api';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { createParam } from 'solito';
import { Link } from 'solito/link';
import { useRouter } from 'solito/router';
import { Paragraph, Stack, Text, Theme } from 'tamagui';
import { z } from 'zod';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { useMixpanel } from '@zix/services/auth';
import { SignInLink } from '../../components/signin-link/signin-link';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

const ResetPasswordSchema = z.object({
  phone_number: formFields.phone.describe(t('forms:phone_number').toString()),
});

export const ResetPasswordScreen = () => {
  useMixpanel('Reset Password Screen view')
  const { params } = useParams();
  const router = useRouter();
  const updateParams = useUpdateParams();
  const toast = useToastController();
  useEffect(() => {
    if (params?.phone) {
      updateParams({ phone: undefined }, { web: { replace: true } });
    }
  }, [params?.phone, updateParams]);


  const form = useForm<z.infer<typeof ResetPasswordSchema>>();

  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof ResetPasswordSchema>) {
      return AuthService.sendResetPasswordPinCode({
        requestBody,
      });
    },
    onSuccess(_, variables) {
      router.push(
        `/auth/reset-password/verify?${new URLSearchParams({
          phone: variables?.phone_number,
        })}`,
      );
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={ResetPasswordSchema}
        defaultValues={{
          phone: params?.phone || '',
        }}
        props={{
          phone_number: {
            backgroundColor: '#FFFFFF',
          },
        }}
        onSubmit={mutateAsync}
        renderAfter={({ submit }) => {
          return (
            <Stack gap="$4">
              <Theme name="accent">
                <SubmitButton onPress={() => submit()} borderRadius="$10" color="$color2">
                  {t('common:next')}
                </SubmitButton>
              </Theme>
              {/* <SignInLink /> */}
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
              title={t('auth:reset_password.title')}
              description={t('auth:reset_password.description')}
            />

            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};


export default ResetPasswordScreen;
