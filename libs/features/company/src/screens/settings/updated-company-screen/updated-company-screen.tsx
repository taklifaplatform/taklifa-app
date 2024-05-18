import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import { useToastController } from '@tamagui/toast';
import { CompaniesService, CompanyAdminService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

const UpdateCompanyFormSchema = z
  .object({
    logo: formFields.image.describe('Logo // Add Company Logo').optional(),
    name: formFields.text.min(2).max(150).describe(t('forms:company_name')),
    about: formFields.textarea.describe('About // Enter company description'),
    location_id: formFields.location.describe('Company Location // Enter company location'),
  })
  .required({
    name: true,
  });

export const UpdateCompanyScreen: React.FC = () => {
  const form = useForm<z.infer<typeof UpdateCompanyFormSchema>>();
  const { user, refetchUser } = useAuth();
  const toast = useToastController();

  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => CompaniesService.retrieveCompany({
      company: user?.active_company?.id || '',
    }),
    queryKey: ['CompaniesService.retrieveCompany', user?.active_company?.id]
  })

  const { mutateAsync } = useMutation({
    async mutationFn(requestBody: z.infer<typeof UpdateCompanyFormSchema>) {
      return CompanyAdminService.update({
        company: user?.active_company?.id,
        requestBody,
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



  const renderForm = () => !!data?.data?.id && (
    <FormProvider {...form}>
      <SchemaForm
        schema={UpdateCompanyFormSchema}
        defaultValues={data.data}
        onSubmit={mutateAsync}
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


  const renderLoading = () => !data?.data?.id && (
    <FullScreenSpinner />
  )

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader showBackButton title="Update Company" />
      {renderForm()}
      {renderLoading()}
    </ScreenLayout>
  )
};

export default UpdateCompanyScreen;
