import { H2, Theme, YStack, isWeb, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { useUser } from '@zix/core/auth';
import { useSupabase } from '@zix/core/supabase';
import { t } from 'i18next';
import { useRouter } from 'solito/router';
import { z } from 'zod';

const ChangeEmailSchema = z.object({
  current_email: formFields.text
    .email()
    .optional()
    .describe(t('forms:current_email')),
  email: formFields.text.email().describe(t('forms:new_email'))
});

export const ChangeEmailScreen = () => {
  const { user } = useUser();
  const supabase = useSupabase();
  const toast = useToastController();
  const router = useRouter();

  const handleChangePassword = async ({
    email
  }: z.infer<typeof ChangeEmailSchema>) => {
    const { data, error } = await supabase.auth.updateUser({ email });
    if (error) {
      toast.show(error.message);
    } else {
      toast.show('Check your inbox', {
        message: `We sent you a confirmation email to ${data.user.new_email}.`
      });
      router.back();
      if (!isWeb) {
        await supabase.auth.refreshSession();
      }
    }
  };

  return (
    <SchemaForm
      onSubmit={handleChangePassword}
      schema={ChangeEmailSchema}
      renderBefore={() =>
        isWeb && (
          <YStack padding="$4" paddingBottom="$2">
            <H2>{t('account:change_email.title')}</H2>
          </YStack>
        )
      }
      defaultValues={{
        current_email: user?.email,
        email: ''
      }}
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>{t('common:confirm')}</SubmitButton>
        </Theme>
      )}
    />
  );
};

export default ChangeEmailScreen;
