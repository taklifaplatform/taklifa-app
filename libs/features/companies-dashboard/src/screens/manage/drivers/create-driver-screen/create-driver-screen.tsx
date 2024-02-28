import { useMutation } from '@tanstack/react-query';

import React from 'react';
import { useToastController } from 'tamagui';

import { CompanyInvitationsService } from '@zix/api';
import { SchemaForm, SubmitButton, formFields } from '@zix/ui/forms';
import { useAuth } from '@zix/utils';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { Theme } from 'tamagui';
import { z } from 'zod';

const InviteDriverFormSchema = z
  .object({
    name: formFields.text
      .min(2)
      .max(25)
      .describe('Driver Name // Enter Driver Name'),
    phone: formFields.phone.describe('Phone Number // Enter Phone Number'),
  })
  .required({
    name: true,
  });

export const CreateDriverScreen: React.FC = () => {
  const form = useForm<z.infer<typeof InviteDriverFormSchema>>();
  const { user } = useAuth();

  const toast = useToastController();

  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof InviteDriverFormSchema>) {
      return CompanyInvitationsService.create({
        requestBody,
      });
    },
    onSuccess(data, variables, context) {
      toast.show('Driver Invited Successfully!');
      // router.push(`/company`);
    },
    onError(error, variables, context) {
      toast.show('Driver Invitation Failed!');
    },
  });

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={InviteDriverFormSchema}
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
  );
};

export default CreateDriverScreen;
