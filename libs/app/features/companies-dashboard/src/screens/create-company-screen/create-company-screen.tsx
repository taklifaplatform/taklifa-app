import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToastController } from '@zix/app/ui/core';
import { Tables, useSupabase } from '@zix/core/supabase';
import React from 'react';

import { FormProvider, Theme } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { z } from 'zod';

const CreateCompanyFormSchema = z
  .object({
    // logo: formFields.text.describe(t('forms:company_logo')),
    name: formFields.text.min(2).max(25).describe(t('forms:company_name')),
    // legal_document: formFields.file.describe(t('forms:company_legal_document')),
    // location: formFields.text.describe(t('forms:company_location')),
    accept_terms: formFields.boolean_checkbox.describe(t('forms:accept_terms'))
  })
  .required({
    name: true,
    // logo: true,
    // location: true,
    // legal_document: true,
    accept_terms: true
  });

export const CreateCompanyScreen: React.FC = () => {
  const form = useForm<z.infer<typeof CreateCompanyFormSchema>>();

  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const toast = useToastController();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (values: Tables<'orgs'>) => {
      const { data, error } = await supabase
        .rpc('create_new_org', {
          org_name: values.name
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (data: Tables<'orgs'>) => {
      queryClient.invalidateQueries(['orgs']);
      toast.show('Company Created Successfully!');
      router.push(`/companies/${data.id}`);
    }
  });

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={CreateCompanyFormSchema}
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

export default CreateCompanyScreen;
