import { useMutation } from '@tanstack/react-query';

import { AuthenticatedUserTransformer, UserService } from '@zix/api';
import { Theme, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/app/ui/forms';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ChangePasswordSchema = z
  .object({
    password: formFields.text
      .min(6)
      .describe(t('forms:new_password').toString()),
    password_confirmation: formFields.text
      .min(6)
      .describe(t('forms:new_password_confirmation').toString())
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        path: ['password_confirmation'],
        code: 'custom',
        message: 'The passwords did not match'
      });
    }
  });

export type ChangePasswordFormProps = {
  onSuccess?: (user: AuthenticatedUserTransformer) => void;
  children?: React.ReactNode;
};

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSuccess,
  children
}) => {
  const toast = useToastController();
  const form = useForm<z.infer<typeof ChangePasswordSchema>>();


  const { mutate } = useMutation({
    mutationFn: (requestBody: z.infer<typeof ChangePasswordSchema>) => UserService.updatePassword({
      requestBody
    }),
    onSuccess({ data }) {
      toast.show('Successfully updated!');
      data && onSuccess?.(data);
    },
    onError(error: any) {
      handleFormErrors(form, error?.body?.errors);
    }
  })

  return (
    <SchemaForm
      form={form}
      onSubmit={mutate}
      schema={ChangePasswordSchema}
      defaultValues={{
        password: '',
        password_confirmation: ''
      }}
      props={{
        password: {
          secureTextEntry: true
        },
        password_confirmation: {
          secureTextEntry: true
        }
      }}
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>
            {t('common:confirm')}
          </SubmitButton>
        </Theme>
      )}
    >
      {(fields) => (
        <>
          {children}
          {Object.values(fields)}
        </>
      )}
    </SchemaForm>
  );
};

export default ChangePasswordForm;
