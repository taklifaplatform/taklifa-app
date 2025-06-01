import { useMutation } from '@tanstack/react-query';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { Theme, View } from 'tamagui';

import { useToastController } from '@tamagui/toast';
import { UserService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { z } from 'zod';

const { useParams } = createParam<{ edit_name?: '1'; edit_about?: '1' }>();

const ProfileSchema = z
  .object({
    avatar: formFields.image
      .describe('Avatar // Upload avatar')
      .nullable()
      .optional(),
    username: formFields.text.describe(`${t('forms:username')}`),
    name: formFields.text.describe(`${t('forms:name')}`),
    // phone_number: formFields.phone.describe(`${t('forms:phone_number')}`),
    about: formFields.textarea.describe(`${t('forms:about')}`),
  })
  .required({
    name: true,
    phone_number: true,
    about: true,
  });

export const EditAccountScreen = () => {
  useMixpanel('Edit Account Screen view')
  const { user, refetchUser } = useAuth();
  const { params } = useParams();

  const form = useForm();
  const toast = useToastController();
  const router = useRouter();

  const { mutateAsync } = useMutation({
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
      console.log('========');
      console.log('onError::', JSON.stringify(error, null, 2));
      console.log('========');
    },
  });

  if (!user?.id) {
    return <FullScreenSpinner />;
  }


  return (
    <ScreenLayout safeAreaBottom>
      <View flex={1}>
        <AppHeader showBackButton title="Edit Profile" />
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
          onSubmit={mutateAsync}
          renderAfter={({ submit }) => (
            <Theme inverse>
              <SubmitButton onPress={() => submit()}>
                {t('common:confirm')}
              </SubmitButton>
            </Theme>
          )}
        />
      </View>
    </ScreenLayout>
  );
};

export default EditAccountScreen;
