import { Theme, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { useSupabase } from '@zix/core/supabase';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { useRegisterStepsCounter } from '../../hooks/useRegisterStepsCounter';
import AcceptTermsLink from '../../components/accept-terms-link/accept-terms-link';
import { AuthHeader } from '../../components/auth-header/auth-header';

const DriverVerificationFormSchema = z
  .object({
    license_number: formFields.text.min(8).describe(t('forms:license_number')),
    vehicle_driving_license: formFields.file.describe(
      t('forms:vehicle_driving_license')
    ),
    insurance_image: formFields.file.describe(t('forms:insurance_image')),
    avatar: formFields.file.describe(t('forms:photo')),
    accept_terms: formFields.boolean_checkbox.describe(t('forms:accept_terms'))
  })
  .required({
    license_number: true,
    vehicle_driving_license: true,
    insurance_image: true,
    photo: true
  });

export const AuthDriverVerificationScreen = () => {
  const supabase = useSupabase();

  const toast = useToastController();
  const router = useRouter();

  const { user, totalSteps } = useRegisterStepsCounter();

  const form = useForm<z.infer<typeof DriverVerificationFormSchema>>();

  async function verifyDriver({
    license_number,
    vehicle_driving_license,
    insurance_image,
    avatar
  }: z.infer<typeof DriverVerificationFormSchema>) {
    if (!user) {
      return;
    }

    const { error } = await supabase.from('user_verifications').upsert({
      id: user?.id,
      driving_license_number: license_number
    });
    if (error) {
      console.log(
        'VerifyDriverScreen::update->user_verifications ERROR',
        error
      );
      toast.show(error.message);
      return;
    }

    const uploadResults = await Promise.all([
      supabase.storage
        .from('users_verification')
        .upload(
          `${user.id}/driving-license.${vehicle_driving_license.name
            .split('.')
            .pop()}`,
          vehicle_driving_license.file,
          {
            upsert: true
          }
        ),
      supabase.storage
        .from('users_verification')
        .upload(
          `${user.id}/insurance-image.${insurance_image.name.split('.').pop()}`,
          insurance_image.file,
          {
            upsert: true
          }
        ),
      supabase.storage
        .from('avatars')
        .upload(
          `${user.id}/avatar.${avatar.name.split('.').pop()}`,
          avatar.file,
          {
            upsert: true
          }
        )
    ]);

    if (uploadResults.some((result) => result.error)) {
      console.log('VerifyDriverScreen::upload ERROR', uploadResults);
      toast.show(
        uploadResults.find((result) => result.error)?.error?.message ||
          'Oops something went wrong!!'
      );
      return;
    }

    const uploadAvatarResult = uploadResults.find((result) =>
      result?.data?.path.includes('avatar')
    );

    if (uploadAvatarResult?.data) {
      const publicUrlRes = await supabase.storage
        .from('avatars')
        .getPublicUrl(uploadAvatarResult.data.path.replace(`avatars/`, ''));

      await supabase
        .from('users')
        .update({ avatar_url: publicUrlRes.data.publicUrl })
        .eq('id', user.id);
    }

    router.replace('/auth/register/success?redirect=/solo-driver');
  }

  return (
    <FormProvider {...form}>
      <SchemaForm
        schema={DriverVerificationFormSchema}
        props={{
          accept_terms: {
            prepend: <AcceptTermsLink />
          }
        }}
        onSubmit={(values) => verifyDriver(values)}
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
              activeStep={4}
              totalSteps={totalSteps}
              title={t('vehicle:verification')}
            />
            {Object.values(fields)}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};

export default AuthDriverVerificationScreen;
