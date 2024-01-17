import {
  Fieldset,
  H2,
  Input,
  Label,
  Theme,
  YStack,
  isWeb,
  useToastController
} from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';
import { useSupabase } from '@zix/core/supabase';
import { useUser } from '@zix/core/auth';
import { useRouter } from 'solito/router';
import { z } from 'zod';

const ChangeEmailSchema = z.object({
  email: formFields.text.email().describe('New Email // email@address.com')
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
            <H2>Change Email</H2>
          </YStack>
        )
      }
      defaultValues={{
        email: ''
      }}
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>Update Email</SubmitButton>
        </Theme>
      )}
    >
      {(fields) => (
        <>
          <Fieldset>
            <Label theme="alt1" size="$3" htmlFor="current-email">
              Current Email
            </Label>
            <Input
              disabled
              opacity={0.8}
              cursor="not-allowed"
              id="current-email"
              autoComplete="email"
              value={user?.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Fieldset>
          {Object.values(fields)}
        </>
      )}
    </SchemaForm>
  );
};

export default ChangeEmailScreen;
