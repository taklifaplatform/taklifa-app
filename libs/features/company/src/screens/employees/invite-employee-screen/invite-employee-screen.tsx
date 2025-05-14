import { useMutation, useQueryClient } from '@tanstack/react-query';

import React from 'react';

import { useToastController } from '@tamagui/toast';
import { CompanyInvitationsService } from '@zix/api';
import { USER_ROLES, useAuth, useMixpanel } from '@zix/services/auth';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

const InviteEmployeeFormSchema = z
  .object({
    name: formFields.text.describe(t('forms:name')),
    phone_number: formFields.phone.describe(t('forms:phone_number')),
    email: formFields.text.describe(t('forms:email')).optional(),
    message: formFields.textarea.describe(t('forms:message')),
  })
  .required({
    name: true,
  });

const { useParam } = createParam<{ role: string }>();


export const InviteEmployeeScreen: React.FC = () => {
  useMixpanel('Invite Employee Screen view')
  const form = useForm<z.infer<typeof InviteEmployeeFormSchema>>();
  const { user } = useAuth();
  const [role] = useParam('role');
  const router = useRouter()

  const toast = useToastController();
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof InviteEmployeeFormSchema>) {
      return CompanyInvitationsService.create({
        company: user?.active_company?.id || '',
        requestBody: {
          ...requestBody,
          role
        },
      });
    },
    onSuccess(data, variables, context) {
      console.log('=====')
      console.log('context::', context)
      console.log('=====')
      toast.show('Invitation Sent Successfully!');
      router.back()
      queryClient.invalidateQueries({ queryKey: ['CompanyInvitationsService.list'] })
    },
    onError(error: any, variables, context) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader showBackButton title={
        role === USER_ROLES.company_driver
          ? t('common:invite-driver')
          : t('common:invite-manager')
      } />

      <FormProvider {...form}>
        <SchemaForm
          schema={InviteEmployeeFormSchema}
          defaultValues={{
            name: '',
          }}
          onSubmit={(values) =>
            mutate({
              ...values,
              role: 'company_driver',
              company_id: user?.active_company?.id,
            })
          }
          renderAfter={({ submit }) => {
            return (
              <Theme inverse>
                <SubmitButton onPress={() => submit()}>
                  {t('common:next')}
                </SubmitButton>
              </Theme>
            );
          }}
        />
      </FormProvider>
    </ScreenLayout>
  );
};

export default InviteEmployeeScreen;
