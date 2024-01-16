import { User } from '@supabase/supabase-js';
import { H2, Theme, YStack, isWeb, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { useSupabase } from '@zix/core/supabase';
import { z } from 'zod';

const ChangePasswordSchema = z
  .object({
    password: formFields.text
      .min(6)
      .describe('New Password // Enter your new password'),
    passwordConfirm: formFields.text
      .min(6)
      .describe('Confirm Password // Repeat your password')
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
      renderBefore={() =>
        isWeb && (
          <YStack padding="$4" paddingBottom="$2">
            <H2>Change Password</H2>
          </YStack>
        )
      }
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>Update Password</SubmitButton>
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
