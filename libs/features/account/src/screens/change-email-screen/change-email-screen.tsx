import { useMutation } from '@tanstack/react-query';

import { useToastController } from '@tamagui/toast';
import { UserService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

const ChangeEmailSchema = z.object({
  current_email: formFields.text
    .email()
    .optional()
    .describe(t('forms:current_email')),
  email: formFields.text.email().describe(t('forms:new_email')),
});

export const ChangeEmailScreen = () => {
  useMixpanel('Change Email Screen view')
  const { user } = useAuth();
  const toast = useToastController();
  const router = useRouter();
  const form = useForm<z.infer<typeof ChangeEmailSchema>>();

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody: z.infer<typeof ChangeEmailSchema>) =>
      UserService.updateEmail({
        requestBody,
      }),
    onSuccess({ data }) {
      toast.show('Check your inbox', {
        message: `We sent you a confirmation email to ${data?.email}.`,
      });
      router.back();
    },
    onError(error: any) {
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <ScreenLayout safeAreaBottom>
      <SchemaForm
        form={form}
        onSubmit={mutateAsync}
        schema={ChangeEmailSchema}
        renderBefore={() => (
          <AppHeader showBackButton title={t('account:change_email.title')} />
        )}
        defaultValues={{
          current_email: user?.email,
          email: '',
        }}
        renderAfter={({ submit }) => (
          <Theme inverse>
            <SubmitButton onPress={() => submit()}>
              {t('common:confirm')}
            </SubmitButton>
          </Theme>
        )}
      />
    </ScreenLayout>
  );
};

export default ChangeEmailScreen;
