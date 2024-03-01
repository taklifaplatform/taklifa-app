import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useToastController } from 'tamagui';

import { CompanyAdminService } from '@zix/api';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { useAuth } from '@zix/utils';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

const UpdateCompanyFormSchema = z
  .object({
    logo: formFields.image.describe('Logo // Add Company Logo'),
    name: formFields.text.min(2).max(150).describe(t('forms:company_name')),
    documents: formFields.files.describe(
      t('Company Documents // Attach documents...')
    ),
    // location: formFields.text
    //   .min(2)
    //   .max(25)
    //   .describe('Company Location // Enter company location'),
  })
  .required({
    name: true,
  });

export const UpdateCompanyScreen: React.FC = () => {
  const form = useForm<z.infer<typeof UpdateCompanyFormSchema>>();
  const { user, refetchUser } = useAuth()
  const toast = useToastController();

  const router = useRouter();

  const { mutate } = useMutation({
    async mutationFn(values: z.infer<typeof UpdateCompanyFormSchema>) {
      return CompanyAdminService.update({
        company: user?.active_company?.id,
        requestBody: values,
      });
    },
    onSuccess() {
      refetchUser();
      toast.show('Company Updated Successfully!');
      router.back();
    },
    onError(error) {
      handleFormErrors(form, error?.body?.errors);
    },
  });

  if (!user?.active_company?.id) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={UpdateCompanyFormSchema}
        defaultValues={user?.active_company}
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
