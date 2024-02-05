import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToastController } from '@zix/app/ui/core';
import {
  companies_TABLE,
  COMPANY_MEMBERSHIPS_TABLE,
  Tables,
  useSupabase
} from '@zix/core/supabase';
import React from 'react';

import { Theme } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { useCompanyManagerContext } from '../../../../context/UseCompanyManagerContext';
import { api } from '@zix/api';

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

  const { mutateAsync } = api.manageCompanyMembers.invite.useMutation()

  // const { mutate } = useMutation({
  //   mutationFn: async (values: Tables<'companies'>) => {
  //     console.error('=================');
  //     console.error('No company id::', activeCompany);
  //     console.error('=================');
  //     if (!activeCompany?.id) {
  //       throw new Error('No company id');
  //     }

  //     const { data, error } = await supabase
  //       .rpc('invite_company_member', {
  //         company_id: activeCompany.id,
  //         email: values.name,
  //         phone_number: values.name,
  //         role: 'driver'
  //       })
  //       .select()
  //       .single();

  //     if (error) {
  //       console.error('=================');
  //       console.error('error::', error);
  //       console.error('=================');
  //       throw error;
  //     }

  //     return data;
  //   },
  //   onSuccess: (data: Tables<'companies'>) => {
  //     queryClient.invalidateQueries([companies_TABLE, COMPANY_MEMBERSHIPS_TABLE]);
  //     toast.show('Company Created Successfully!');
  //     router.push(`/companies/${data.id}`);
  //   }
  // });

  const onSubmit = async (values: z.infer<typeof InviteDriverFormSchema>) => {
    console.error('=================');
    console.error('No company id::', activeCompany);
    console.error('=================');
    if (!activeCompany?.id) {
      throw new Error('No company id');
    }

    try {
      await mutateAsync({
        company_id: activeCompany.id,
        name: values.name,
        phone: values.phone,
        role: 'driver'
      })
    } catch (error) {
      console.error('=================');
      console.error('error::', error);
      console.error('=================');
      // throw error;
    }
  }


  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={InviteDriverFormSchema}
        defaultValues={{
          name: ''
        }}
        onSubmit={onSubmit}
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
