import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToastController } from '@zix/app/ui/core';
import {
  ORGS_TABLE,
  ORG_MEMBERSHIPS_TABLE,
  Tables,
  useSupabase
} from '@zix/core/supabase';
import React from 'react';

import { FormProvider, Theme } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { useCurrentActiveOrg } from '../../../../hooks';

const InviteDriverFormSchema = z
  .object({
    name: formFields.text
      .min(2)
      .max(25)
      .describe('Driver Name // Enter Driver Name'),
    phone: formFields.phone.describe('Phone Number // Enter Phone Number'),
    email: formFields.text.email().describe('Email // Enter Email').nullable()
  })
  .required({
    name: true
  });

export const CreateDriverScreen: React.FC = () => {
  const form = useForm<z.infer<typeof InviteDriverFormSchema>>();
  const { org } = useCurrentActiveOrg();

  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const toast = useToastController();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (values: Tables<'orgs'>) => {
      console.error('=================');
      console.error('No org id::', org);
      console.error('=================');
      if (!org?.id) {
        throw new Error('No org id');
      }

      const { data, error } = await supabase
        .rpc('invite_org_member', {
          org_id: org.id,
          email: values.name,
          phone_number: values.name,
          role: 'driver'
        })
        .select()
        .single();

      if (error) {
        console.error('=================');
        console.error('error::', error);
        console.error('=================');
        throw error;
      }

      return data;
    },
    onSuccess: (data: Tables<'orgs'>) => {
      queryClient.invalidateQueries([ORGS_TABLE, ORG_MEMBERSHIPS_TABLE]);
      toast.show('Company Created Successfully!');
      router.push(`/companies/${data.id}`);
    }
  });

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={InviteDriverFormSchema}
        defaultValues={{
          name: ''
        }}
        onSubmit={mutate}
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
