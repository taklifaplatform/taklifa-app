import { useMutation, useQueryClient } from '@tanstack/react-query';

import React from 'react';

import { CompanyInvitationsService } from '@zix/api';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { USER_ROLES, useAuth } from '@zix/services/auth';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { Theme } from 'tamagui';
import { z } from 'zod';
import { useToastController } from '@tamagui/toast';
import { AppHeader } from '@zix/ui/layouts';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';

const InviteEmployeeFormSchema = z
  .object({
    name: formFields.text.describe('Member Name // Enter Member Name'),
    phone_number: formFields.phone.describe('Phone Number // Enter Phone Number'),
    email: formFields.text.describe('Email // Enter Email Address').optional(),
    message: formFields.textarea.describe('Message // Enter Message'),
  })
  .required({
    name: true,
  });

const { useParam } = createParam<{ role: string }>();


export const InviteEmployeeScreen: React.FC = () => {
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
      toast.show(error?.body?.message || 'Member Invitation Failed!');
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <>
      <AppHeader showBackButton title={
        role === USER_ROLES.company_driver
          ? t('company:invite_driver')
          : t('company:invite_employee')
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
    </>
  );
};

export default InviteEmployeeScreen;
