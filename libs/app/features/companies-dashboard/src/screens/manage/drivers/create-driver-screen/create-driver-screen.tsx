import { useQueryClient } from '@tanstack/react-query';
import { useToastController } from '@zix/app/ui/core';
import {
  useSupabase
} from '@zix/core/supabase';
import React from 'react';

import { api } from '@zix/api';
import { Theme } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { useCompanyManagerContext } from '../../../../context/UseCompanyManagerContext';

const InviteDriverFormSchema = z
  .object({
    name: formFields.text
      .min(2)
      .max(25)
      .describe('Driver Name // Enter Driver Name'),
    phone: formFields.phone.describe('Phone Number // Enter Phone Number')
  })
  .required({
    name: true
  });

export const CreateDriverScreen: React.FC = () => {
  const form = useForm<z.infer<typeof InviteDriverFormSchema>>();
  const { activeCompany } = useCompanyManagerContext();

  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const toast = useToastController();

  const router = useRouter();

  const { mutate } = api.manageCompanyMembers.invite.useMutation({
    onSuccess(data, variables, context) {
      toast.show('Driver Invited Successfully!');
      // router.push(`/companies/${activeCompany?.id}`);
    },
    onError(error, variables, context) {
      toast.show('Driver Invitation Failed!');
    }
  })



  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={InviteDriverFormSchema}
        defaultValues={{
          name: ''
        }}
        onSubmit={(values) => mutate({
          ...values,
          role: 'driver',
          company_id: activeCompany?.id,
        })}
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
