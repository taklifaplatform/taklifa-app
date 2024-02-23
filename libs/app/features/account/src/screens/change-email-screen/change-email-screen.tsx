import { useMutation } from '@tanstack/react-query';

import { UserService } from '@zix/api';
import { H2, Theme, YStack, isWeb, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/app/ui/forms';
import { useUser } from '@zix/core/auth';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
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
  const toast = useToastController();
  const router = useRouter();
  const form = useForm<z.infer<typeof ChangeEmailSchema>>();

  const { mutate, isLoading } = useMutation({
    mutationFn: (requestBody: z.infer<typeof ChangeEmailSchema>) => UserService.updateEmail({
      requestBody
    }),
    onSuccess({ data }) {
      toast.show('Check your inbox', {
        message: `We sent you a confirmation email to ${data?.email}.`
      });
      router.back();
    },
    onError(error: any) {
      handleFormErrors(form, error?.body?.errors);
    }
  })

  return (
    <SchemaForm
      form={form}
      onSubmit={mutate}
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
          <SubmitButton isLoading={isLoading} onPress={() => submit()}>{t('common:confirm')}</SubmitButton>
        </Theme>
      )}
    />
  );
};

export default ChangeEmailScreen;
