import { User } from '@supabase/supabase-js';
import { Theme, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { useSupabase } from '@zix/core/supabase';
import { t } from 'i18next';
import { z } from 'zod';

const ChangePasswordSchema = z
  .object({
    password: formFields.text
      .min(6)
      .describe(t('forms:new_password').toString()),
    passwordConfirm: formFields.text
      .min(6)
      .describe(t('forms:new_password_confirmation').toString())
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: 'custom',
        message: 'The passwords did not match'
      });
    }
  });

export type ChangePasswordFormProps = {
  onSuccess?: (user: User) => void;
  children?: React.ReactNode;
};

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSuccess,
  children
}) => {
  const supabase = useSupabase();
  const toast = useToastController();

  const handleChangePassword = async ({
    password
  }: z.infer<typeof ChangePasswordSchema>) => {
    const { error, data } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.show(error.message);
    } else {
      toast.show('Successfully updated!');
      onSuccess?.(data?.user);
    }
  };

  return (
    <SchemaForm
      onSubmit={handleChangePassword}
      schema={ChangePasswordSchema}
      defaultValues={{
        password: '',
        passwordConfirm: ''
      }}
      props={{
        password: {
          secureTextEntry: true
        },
        passwordConfirm: {
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
