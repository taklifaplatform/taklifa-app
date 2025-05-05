import { useMutation } from '@tanstack/react-query';

import { AuthenticatedUserTransformer, UserService } from '@zix/api';
import { Theme } from 'tamagui';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToastController } from '@tamagui/toast';

const ChangePasswordSchema = z
  .object({
    password: formFields.secure_text
      .describe(t('forms:new_password').toString()),
    password_confirmation: formFields.secure_text
      .describe(t('forms:new_password_confirmation').toString()),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        path: ['password_confirmation'],
        code: 'custom',
        message:( t('forms:password_did_not_match')),
      });
    }
  });

export type ChangePasswordFormProps = {
  onSuccess?: (user: AuthenticatedUserTransformer) => void;
  children?: React.ReactNode;
};

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSuccess,
  children,
}) => {
  const toast = useToastController();
  const form = useForm<z.infer<typeof ChangePasswordSchema>>();

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody: z.infer<typeof ChangePasswordSchema>) =>
      UserService.updatePassword({
        requestBody,
      }),
    onSuccess({ data }) {
      toast.show(t('forms:password_changed_successfully'), {
        type: 'success',
        duration: 3000,
      });
      data && onSuccess?.(data);
    },
    onError(error: any) {
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <SchemaForm
      form={form}
      onSubmit={mutateAsync}
      schema={ChangePasswordSchema}
      defaultValues={{
        password: '',
        password_confirmation: '',
      }}
      props={{
        password: {
          secureTextEntry: true,
        },
        password_confirmation: {
          secureTextEntry: true,
        },
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
