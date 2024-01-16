import { Theme, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import moment from 'moment';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { z } from 'zod';

import { useSupabase } from '@zix/core/supabase';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { useRegisterStepsCounter } from '../../hooks/useRegisterStepsCounter';

const KYCFormSchema = z
  .object({
    name: formFields.text
      .min(8, { message: 'Must be 8 or more characters long' })
      .describe('Name: // Your name'),
    birth_date: formFields.date.describe('Birth Date // Enter your birth date'),
    nationality_id: formFields.country.describe(
      'Nationality // select your country'
    ),
    kyc_doc: formFields.file.describe('ID Card // Upload your identity card')
    // address: formFields.text.describe('Address:'),
  })
  .required({
    name: true,
    birth_date: true,
    nationality_id: true
  });

export const KycVerificationScreen = () => {
  const supabase = useSupabase();
  const router = useRouter();
  const toast = useToastController();
  const { user, totalSteps } = useRegisterStepsCounter();

  const form = useForm<z.infer<typeof KYCFormSchema>>();

  async function onSubmit({
    name,
    birth_date,
    nationality_id,
    kyc_doc
  }: z.infer<typeof KYCFormSchema>) {
    if (!user) {
      return;
    }

    const { error } = await supabase.from('user_verifications').upsert({
      id: user?.id,
      name: name?.toString(),
      birth_date: moment(birth_date).format('YYYY-MM-DD').toString(),
      nationality_id: nationality_id
    });

    if (error) {
      console.log('VerifyKYCScreen::update->user_verifications ERROR', error);
      toast.show(error.message);
      return;
    }

    const result = await supabase.storage
      .from('users_verification')
      .upload(
        `${user.id}/kyc-doc.${kyc_doc.name.split('.').pop()}`,
        kyc_doc.file,
        {
          upsert: true
        }
      );

    if (result.error) {
      console.log('VerifyKYCScreen::upload->kyc_doc ERROR', result.error);
      toast.show(result.error.message);
      return;
    }

    // TODO: we might need to save the file url to the database
    // await supabase.from('user_verifications').update({ kyc_doc_url: result.data.path }).eq('id', user.id)
    router.push('/auth/verify-driver');
  }

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={KYCFormSchema}
        defaultValues={{
          name: user?.user_metadata.name || '',
          birth_date: moment().format('YYYY-MM-DD').toString(),
          nationality_id: 216,
          residence_country_id: '',
          residency_city_id: ''
          // address: '',
        }}
        props={{}}
        onSubmit={onSubmit}
        renderAfter={({ submit }) => {
          return (
            <Theme inverse>
              <SubmitButton onPress={() => submit()}>Confirm</SubmitButton>
            </Theme>
          );
        }}
      >
        {(fields) => (
          <>
            <AuthHeader
              showIcon={false}
              activeStep={3}
              totalSteps={totalSteps || 1}
              title="Confirmation of KYC"
            />
            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};

export default KycVerificationScreen;
