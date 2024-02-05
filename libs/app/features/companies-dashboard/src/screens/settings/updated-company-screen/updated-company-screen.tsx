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
import { useCompanyManagerContext } from '../../../context/UseCompanyManagerContext';

const UpdateCompanyFormSchema = z
  .object({
    logo: formFields.avatar.describe('Add Company Logo'),
    name: formFields.text.min(2).max(150).describe(t('forms:company_name'))
    // documents: formFields.file.describe(
    //   t('Company Documents // Attach documents...')
    // ),
    // location: formFields.text
    //   .min(2)
    //   .max(25)
    //   .describe('Company Location // Enter company location'),
  })
  .required({
    name: true
  });

export const UpdateCompanyScreen: React.FC = () => {
  const form = useForm<z.infer<typeof UpdateCompanyFormSchema>>();
  const { activeCompany, refreshActiveCompany } = useCompanyManagerContext();
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const toast = useToastController();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof UpdateCompanyFormSchema>) => {
      if (!activeCompany?.id) {
        throw new Error('No active company');
      }

      const updatedData = {
        ...activeCompany,
        name: values.name
      };

      if (values.logo) {
        const uploadedAvatar = await uploadMediaFile({
          file: values.logo,
          bucket: 'companies',
          path: `${activeCompany.id}/public`
        });
        if (uploadedAvatar) {
          updatedData.logo = uploadedAvatar;
        }
      }

      const { data, error } = await supabase
        .from('companies')
        .update(updatedData)
        .eq('id', activeCompany?.id)
        .select('*');

      if (error) {
        throw error;
      }
      refreshActiveCompany();

      return data;
    },
    onSuccess: (data: Tables<'companies'>) => {
      queryClient.invalidateQueries([companies_TABLE, COMPANY_MEMBERSHIPS_TABLE]);
      toast.show('Company Updated Successfully!');
      router.back();
    },
    onError: (error) => {
      console.log('====================');
      console.log('onError::', error);
      console.log('====================');
    }
  });

  if (!activeCompany?.id) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={UpdateCompanyFormSchema}
        defaultValues={activeCompany}
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

export default UpdateCompanyScreen;
