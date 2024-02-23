import { useMutation } from '@tanstack/react-query';

import { useToastController } from '@zix/app/ui/core';
import { randomUUID } from 'expo-crypto';
import React from 'react';

import { CompanyAdminService } from '@zix/api';
import { Theme } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { useCompanyManagerContext } from '../../context/UseCompanyManagerContext';

const CreateCompanyFormSchema = z
  .object({
    // logo: formFields.avatar.optional().describe('Add Company Logo'),
    name: formFields.text.min(2).max(150).describe(t('forms:company_name')),
    company_documents: formFields.files.describe(
      t('Company Documents // Attach documents...')
    ),
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
  const toast = useToastController();

  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn(requestBody: z.infer<typeof CreateCompanyFormSchema>) {
      return CompanyAdminService.create({
        requestBody
      });
    },
    onSuccess({ data }, variables, context) {
      if (data) {
        toast.show('Company Created Successfully!');
        console.log('====================');
        console.log('onError::', JSON.stringify(data, null, 2));
        console.log('====================');
        switchCompany(data.id);
        router.push(`/companies/${data.id}`);
      }

    },
    onError(error, variables, context) {
      console.log('====================');
      console.log('onError::', JSON.stringify(error, null, 2));
      console.log('====================');
      toast.show('Company Creation Failed!');
    }
  })

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={CreateCompanyFormSchema}
        defaultValues={{
          name: ''
        }}
        onSubmit={(values) => mutate({
          id: randomUUID(),
          ...values
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

export default CreateCompanyScreen;
