import { useMutation } from '@tanstack/react-query';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { Theme } from 'tamagui';

import { useToastController } from '@tamagui/toast';
import { UserService } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import { AppHeader } from '@zix/ui/layouts';
import { useAuth } from '@zix/utils';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { z } from 'zod';

const { useParams } = createParam<{ edit_name?: '1'; edit_about?: '1' }>();

const ProfileSchema = z.object({
  avatar: formFields.image.describe('Avatar // Upload avatar'),
  name: formFields.text.describe('Name // John Doe'),
  phone_number: formFields.phone.describe('Phone Number // 1234567890'),
  about: formFields.textarea
    .describe('About // Tell us a bit about yourself')
    .optional()
}).required({
  name: true
});

export const EditAccountScreen = () => {
  const { user, refetchUser } = useAuth();
  const { params } = useParams();

  const form = useForm();
  const toast = useToastController();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof ProfileSchema>) {
      return UserService.updateUser({ requestBody });
    },
    onSuccess() {
      refetchUser();
      toast.show('Successfully updated!');
      router.back();
    },
    onError(error: any) {
      toast.show(error.message);
      handleFormErrors(form, error?.body?.errors);
      console.log('========')
      console.log('onError::', JSON.stringify(error, null, 2))
      console.log('========')
    },
  });

  if (!user?.id) {
    return <FullScreenSpinner />;
  }

  return (
    <SchemaForm
      form={form}
      schema={ProfileSchema}
      props={{
        name: {
          autoFocus: !!params?.edit_name,
        },
        about: {
          autoFocus: !!params?.edit_about,
        },
      }}
      defaultValues={user}
      onSubmit={mutate}
      renderBefore={() => (
        <AppHeader showBackButton title="Edit Profile" />
      )}
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>
            {t('common:confirm')}
          </SubmitButton>
        </Theme>
      )}
    />
  );
};

export default EditAccountScreen;
