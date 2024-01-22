import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToastController } from '@zix/app/ui/core';
import {
  ORGS_TABLE,
  ORG_MEMBERSHIPS_TABLE,
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

const CreateCompanyFormSchema = z
  .object({
    // logo: formFields.avatar.describe('Add Company Logo'),
    name: formFields.text.min(2).max(25).describe(t('forms:company_name')),
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
    mutationFn: async (values: z.infer<typeof CreateCompanyFormSchema>) => {
      console.log('===========');
      console.log('mutationFn::');
      console.log('===========');
      const { data, error } = await supabase
        .rpc('create_new_org', {
          org_name: values.name
        })
        .select('*');

      if (error) {
        throw error;
      }

      if (!data?.id) {
        console.log('===========');
        console.log(
          '{ data, error }::',
          JSON.stringify({ data, error }, null, 2)
        );
        console.log('===========');
        return null;
      }

      // try {
      //   if (values.logo) {
      //     const fileExt = values.logo.fileName.split('.').pop();
      //     const formData = new FormData();
      //     formData.append('file', {
      //       uri: values.logo.uri,
      //       name: `logo.${fileExt}`,
      //       contentType: values.logo.type
      //     });
      //     const uploadLogo = await supabase.storage.from('orgs').upload(
      //       `${data.id}/public/logo.${fileExt}`,
      //       {
      //         uri: values.logo.uri,
      //         name: `logo.${fileExt}`,
      //         contentType: values.logo.type
      //       },
      //       {
      //         contentType: values.logo.type,
      //         upsert: true
      //       }
      //     );

      //     if (uploadLogo.error) {
      //       console.log('=====================');
      //       console.error('uploadLogo::error ', JSON.stringify(uploadLogo));
      //       console.error(
      //         'upload to this path ',
      //         `${data.id}/public/logo.${fileExt}`
      //       );
      //       console.log('=====================');
      //       return;
      //     }

      //     // const publicUrlRes = await supabase.storage
      //     //   .from('orgs')
      //     //   .getPublicUrl(uploadLogo.data.path.replace(`orgs/`, ''));

      //     // await supabase
      //     //   .from('orgs')
      //     //   .update({ logo_url: publicUrlRes.data.publicUrl })
      //     //   .eq('id', data.id);
      //   }
      // } catch (error) {
      //   console.log('== upload logo error');
      // }

      return data;
    },
    onSuccess: (data: Tables<'orgs'>) => {
      queryClient.invalidateQueries([ORGS_TABLE, ORG_MEMBERSHIPS_TABLE]);
      toast.show(
        'Company Created Successfully!::',
        JSON.stringify(data, null, 2)
      );
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
