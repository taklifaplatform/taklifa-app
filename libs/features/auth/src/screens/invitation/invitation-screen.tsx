import { Stack, Text, Theme, YStack } from 'tamagui';

import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthService, CompanyMemberInvitationService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SchemaForm, SubmitButton, handleFormErrors } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { VerifyPhoneNumberForm } from '../../forms/verify-phone-number-form/verify-phone-number-form';
import { LoginSchema } from '../login/login-screen';
import { SignUpSchema } from '../register/sign-up-screen';
const { useParam } = createParam<{ code: string }>();

export const InvitationScreen: React.FC = () => {
  useMixpanel('Invitation Page view')
  const {
    user,
    setAuthAccessToken,
    setAuthUser,
  } = useAuth();
  const loginForm = useForm<z.infer<typeof LoginSchema>>();
  const registerForm = useForm<z.infer<typeof SignUpSchema>>();
  const toast = useToastController();
  const [invitationCode] = useParam('code');
  const [shouldVerifyPhoneNumber, setShouldVerifyPhoneNumber] = useState(false);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['CompanyMemberInvitationService.retrieve', invitationCode],
    queryFn: () => CompanyMemberInvitationService.retrieve({ invitationCode }),
  })

  const { mutateAsync: loginAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof LoginSchema>) {
      return AuthService.login({
        requestBody,
      });
    },
    onSuccess({ data }) {
      setAuthAccessToken(data?.plainTextToken);
      setAuthUser(data?.user);
      //
    },
    onError(error: any) {
      console.log('error', error);
      handleFormErrors(loginForm, error?.body?.errors);
    },
  });
  const { mutateAsync: registerAsync } = useMutation({
    mutationFn: (variables: z.infer<typeof SignUpSchema>) =>
      AuthService.register({
        requestBody: {
          is_customer: true,
          ...variables,
        },
      }),
    onSuccess({ data }) {
      setAuthAccessToken(data?.plainTextToken);
      setAuthUser(data?.user);
      // show phone verification
      setShouldVerifyPhoneNumber(true);
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
      handleFormErrors(registerForm, error?.body?.errors);
    },
  });

  const { mutateAsync: acceptInvitationAsync, isPending } = useMutation({
    mutationFn: () => CompanyMemberInvitationService.accept({ invitationCode }),
    onSuccess() {
      toast.show(t('app:success.invitation-accepted'), {
        preset: 'success',
      });
      router.push('/app');
    },
    onError(error: any) {
      console.log('error', error);
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
    },
  });

  const renderHeader = () => (
    <>
      <Theme name="accent">
        <CustomIcon name="logo" size={100} color="$color1" />
      </Theme>
      <Text fontSize={30} fontWeight="800" textAlign="center">
        لقد تمت دعوتك للانضمام إلى {data?.data?.company?.name}
      </Text>
    </>
  )

  const renderLoginForm = () => data?.data?.existing_user?.id && (
    <SchemaForm
      form={loginForm}
      schema={LoginSchema}
      defaultValues={{
        phone_number: data?.data?.existing_user?.phone_number,
      }}
      props={{
        phone_number: {
          disabled: true,
        }
      }}
      onSubmit={loginAsync}
      renderAfter={({ submit }) => {
        return (
          <Stack gap="$4">
            <Theme name="accent">
              <SubmitButton onPress={() => submit()} borderRadius="$10" color="$color2">
                التالي
              </SubmitButton>
            </Theme>
          </Stack>
        );
      }}
    >
      {(fields) => (
        <>
          <YStack
            justifyContent="center"
            alignItems="center"
            gap="$4"
            padding="$6"
          >
            {renderHeader()}
            <Text
              textAlign="center"
              fontSize={16}
              fontWeight="400"
              lineHeight={30}
            >
              يرجى تسجيل الدخول لقبول الدعوة
            </Text>
          </YStack>
          {Object.values(fields)}
        </>
      )}
    </SchemaForm>
  )

  const renderRegisterForm = () => (data?.data?.id && !data?.data?.existing_user?.id) && (
    <SchemaForm
      form={registerForm}
      schema={SignUpSchema}
      onSubmit={registerAsync}
      defaultValues={{
        username: data?.data?.name?.toLowerCase()?.replace(/\s+/g, '_'),
        phone_number: data?.data?.existing_user?.phone_number,
      }}
      props={{
        phone_number: {
          disabled: true,
        }
      }}
      renderAfter={({ submit }) => {
        return (
          <Stack gap="$4">
            <Theme inverse>
              <SubmitButton onPress={() => submit()} borderRadius="$10">
                التالي
              </SubmitButton>
            </Theme>
          </Stack>
        );
      }}
    >
      {(fields) => (
        <>
          <YStack
            justifyContent="center"
            alignItems="center"
            gap="$4"
            padding="$6"
          >
            {renderHeader()}
            <Text
              textAlign="center"
              fontSize={16}
              fontWeight="400"
              lineHeight={30}
            >
              يرجى إنشاء حساب لقبول الدعوة
            </Text>
          </YStack>
          {Object.values(fields)}
        </>
      )}
    </SchemaForm>
  )


  const renderVerifyPhoneNumberForm = () => (data?.data?.id && shouldVerifyPhoneNumber) && (
    <VerifyPhoneNumberForm
      showAppHeader={false}
      phoneNumber={data?.data?.phone_number}
      onSuccess={() => {
        setShouldVerifyPhoneNumber(false)
      }}
    />
  )

  const renderAcceptInvitation = () => (
    <YStack flex={1} gap="$6" padding="$6">
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$4"
        padding="$6"
      >
        {renderHeader()}
        <Text
          textAlign="center"
          fontSize={16}
          fontWeight="400"
          lineHeight={30}
        >
          هل ترغب في قبول هذه الدعوة؟
        </Text>
      </YStack>

      <Stack gap="$4">
        <Theme inverse>
          <SubmitButton
            loading={isPending}
            onPress={() => acceptInvitationAsync()}
            borderRadius="$10"
            size="$5"
          >
            قبول الدعوة
          </SubmitButton>
        </Theme>

        <SubmitButton
          onPress={() => {
            router.push(
              Platform.select({
                web: '/',
                default: '/app',
              })
            );
          }}
          borderRadius="$10"
          size="$5"
          backgroundColor="$gray3"
          color="$gray12"
        >
          رفض الدعوة
        </SubmitButton>

        <SubmitButton
          onPress={() => {
            setAuthAccessToken('');
            setAuthUser({});
          }}
          borderRadius="$10"
          size="$5"
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="$gray5"
        >
          تسجيل الدخول بحساب آخر
        </SubmitButton>
      </Stack>
    </YStack>
  )


  return (
    <ScreenLayout safeAreaBottom>
      {!user?.id && renderLoginForm()}
      {!user?.id && renderRegisterForm()}
      {!data?.data?.id && <FullScreenSpinner />}
      {renderVerifyPhoneNumberForm()}
      {(data?.data?.id && !!user?.id && !shouldVerifyPhoneNumber) && renderAcceptInvitation()}
    </ScreenLayout>
  );
};
