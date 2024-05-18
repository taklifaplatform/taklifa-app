import { useMutation } from '@tanstack/react-query';

import React from 'react';

import { useToastController } from '@tamagui/toast';
import { CompanyAdminService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';
import { AuthHeader } from '../../components/auth-header/auth-header';

const CreateCompanyFormSchema = z
  .object({
    logo: formFields.image.optional().describe('Logo // Add Company Logo'),
    name: formFields.text.min(2).max(150).describe(t('forms:company_name')),
    legal_documents: formFields.files.describe(
      t('forms:company_legal_documents')
    ),

    location_id: formFields.location.describe(t('forms:company_location')),
    accept_terms: formFields.accept_terms.describe(t('forms:accept_terms')),
  })
  .required({
    name: true,
    accept_terms: true,
  });

export const CreateCompanyScreen: React.FC = () => {
  const form = useForm<z.infer<typeof CreateCompanyFormSchema>>();
  const { refetchUser, registerSteps } = useAuth()
  const toast = useToastController();
  const router = useRouter()

  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof CreateCompanyFormSchema>) {
      return CompanyAdminService.create({
        requestBody,
      });
    },
    onSuccess() {
      toast.show('Company Created Successfully!');
      refetchUser()
      router.push('/auth/register/success')
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <ScreenLayout safeAreaBottom>
      <FormProvider {...form}>
        <SchemaForm
          schema={CreateCompanyFormSchema}
          defaultValues={{
            name: '',
          }}
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
        >
          {(fields) => (
            <>
              <AuthHeader
                showIcon={false}
                activeStep={2}
                totalSteps={registerSteps || 1}
                title={t('auth:formation_of_company.title')}
              />
              {Object.values(fields)}
            </>
          )}
        </SchemaForm>
      </FormProvider>
    </ScreenLayout>
  );
};

export default CreateCompanyScreen;
