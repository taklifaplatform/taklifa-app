import { useMutation } from '@tanstack/react-query';

import { randomUUID } from 'expo-crypto';
import React from 'react';

import { useToastController } from '@tamagui/toast';
import { CompanyAdminService } from '@zix/api';
import { SchemaForm, SubmitButton, formFields } from '@zix/ui/forms';
import { useAuth } from '@zix/utils';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
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

    location: formFields.address.describe(t('forms:company_location')),
    accept_terms: formFields.accept_terms.describe(t('forms:accept_terms')),
  })
  .required({
    name: true,
    accept_terms: true,
  });

export const CreateCompanyScreen: React.FC = () => {
  const form = useForm<z.infer<typeof CreateCompanyFormSchema>>();
  const { refetchUser, redirectUserToActiveDashboard, registerSteps } = useAuth()
  const toast = useToastController();

  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof CreateCompanyFormSchema>) {
      return CompanyAdminService.create({
        requestBody,
      });
    },
    async onSuccess({ data }, variables, context) {
      if (data) {
        toast.show('Company Created Successfully!');
        console.log('====================');
        console.log('onError::', JSON.stringify(data, null, 2));
        console.log('====================');
        await refetchUser()
        redirectUserToActiveDashboard();
      }
    },
    onError(error, variables, context) {
      console.log('====================');
      console.log('onError::', JSON.stringify(error, null, 2));
      console.log('====================');
      toast.show('Company Creation Failed!');
    },
  });

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={CreateCompanyFormSchema}
        defaultValues={{
          name: '',
        }}
        onSubmit={(values) =>
          mutate({
            id: randomUUID(),
            ...values,
          })
        }
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
  );
};

export default CreateCompanyScreen;
