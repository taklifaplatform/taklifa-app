import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useToastController } from '@tamagui/toast';
import { CompaniesService, CompanyAdminService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
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
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

const { useParam } = createParam<{ company: string }>();

const UpdateCompanyFormSchema = z
  .object({
    logo: formFields.image.describe(`Logo // ${t('common:add-company-logo')}`).optional(),
    name: formFields.text.min(2).max(150).describe(t('forms:company_name')),
    about: formFields.textarea.describe(`${t('common:tab-about')} // ${t('common:enter-your-detail-input-placeholder')}`),
    location_id: formFields.location.describe(`${t('common:company-location')} // ${t('common:enter-company-location')}`),
  })
  .required({
    name: true,
  });

export const UpdateCompanyScreen: React.FC = () => {
  useMixpanel('Update Company Screen view')
  const [companyId] = useParam('company');

  const form = useForm<z.infer<typeof UpdateCompanyFormSchema>>();
  const { user, refetchUser } = useAuth();
  const toast = useToastController();
  const queryClient = useQueryClient();

  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => companyId ? CompaniesService.retrieveCompany({
      company: companyId,
    }) : undefined,
    queryKey: ['CompaniesService.retrieveCompany', companyId]
  })

  const { mutateAsync } = useMutation({
    async mutationFn(requestBody: z.infer<typeof UpdateCompanyFormSchema>) {
      return CompanyAdminService.update({
        company: companyId,
        requestBody,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['CompaniesService.retrieveCompany', companyId]
      });
      refetchUser();
      toast.show('Company Updated Successfully!');
      router.back();
    },
    onError(error) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
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
      <AppHeader showBackButton title={t('common:update-company')} />
      {renderForm()}
      {renderLoading()}
    </ScreenLayout>
  )
};

export default UpdateCompanyScreen;
