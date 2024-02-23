import { useMutation } from '@tanstack/react-query';
import { useToastController } from '@zix/app/ui/core';
import React from 'react';

import { CompanyAdminService } from '@zix/api';
import { Theme } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/app/ui/forms';
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
  const toast = useToastController();

  const router = useRouter();

  const { mutate } = useMutation({
    async mutationFn(values: z.infer<typeof UpdateCompanyFormSchema>) {
      return CompanyAdminService.update({
        company: activeCompany?.id,
        requestBody: values
      })
    },
    onSuccess() {
      refreshActiveCompany()
      toast.show('Company Updated Successfully!');
      router.back();
    },
    onError(error) {
      handleFormErrors(form, error?.body?.errors);
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
