import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@zix/api';
import { Paragraph, Stack, Text, Theme } from 'tamagui';
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
import { z } from 'zod';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { ScreenLayout } from '@zix/ui/layouts';
import { useToastController } from '@tamagui/toast';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

const ResetPasswordSchema = z.object({
  phone_number: formFields.phone.describe(t('forms:phone_number').toString()),
});

export const ResetPasswordScreen = () => {
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
        onSubmit={mutateAsync}
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

const SignInLink = () => {
  const phone = useWatch<z.infer<typeof ResetPasswordSchema>>({
    name: 'phone_number',
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
            {t('auth:reset_password.done_resetting')}
          </Paragraph>
          <Theme name="accent">
            <Text textDecorationLine="underline" color={'$color1'} theme={'accent'}>
              {t('auth:sign_in')}
            </Text>
          </Theme>
          <Theme name="accent">
            <CustomIcon name="arrow_right" color="$color10" />
          </Theme>
        </Stack>
      </Link>
  );
};

export default ResetPasswordScreen;
