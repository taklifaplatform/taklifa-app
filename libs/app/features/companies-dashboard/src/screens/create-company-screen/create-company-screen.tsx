import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToastController } from '@zix/app/ui/core';
import {
  companies_TABLE,
  COMPANY_MEMBERSHIPS_TABLE,
  Tables,
  uploadMediaFile,
  useSupabase
} from '@zix/core/supabase';
import React from 'react';

import { Theme } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { useCompanyManagerContext } from '../../context/UseCompanyManagerContext';

const CreateCompanyFormSchema = z
  .object({
    logo: formFields.avatar.optional().describe('Add Company Logo'),
    name: formFields.text.min(2).max(150).describe(t('forms:company_name')),
    // documents: formFields.file.describe(
    //   t('Company Documents // Attach documents...')
    // ),
    // location: formFields.text
    //   .min(2)
    //   .max(25)
    //   .describe('Company Location // Enter company location'),
    accept_terms: formFields.boolean_checkbox.describe(t('forms:accept_terms'))
  })
  .required({
    name: true,
    accept_terms: true
  });

export const CreateCompanyScreen: React.FC = () => {
  const form = useForm<z.infer<typeof CreateCompanyFormSchema>>();
  const { switchCompany } = useCompanyManagerContext();
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const toast = useToastController();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof CreateCompanyFormSchema>) => {
      const { data, error } = await supabase
        .rpc('create_new_company', {
          company_name: values.name
        })
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      if (!data?.id) {
        return null;
      }

      if (values.logo) {
        const uploadedAvatar = await uploadMediaFile({
          file: values.logo,
          bucket: 'companies',
          path: `${data.id}/public`
        });
        if (uploadedAvatar) {
          await supabase
            .from('companies')
            .update({
              logo: uploadedAvatar
            })
            .eq('id', data?.id)
            .select('*');
        }
      }

      switchCompany(data.id);

      return data;
    },
    onSuccess: (data: Tables<'companies'>) => {
      queryClient.invalidateQueries([companies_TABLE, COMPANY_MEMBERSHIPS_TABLE]);
      toast.show('Company Created Successfully!');
      router.push(`/companies/${data.id}`);
    },
    onError: (error) => {
      console.log('====================');
      console.log('onError::', error);
      console.log('====================');
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
