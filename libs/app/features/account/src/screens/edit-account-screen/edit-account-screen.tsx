import { useMutation } from '@tanstack/react-query';
import { Avatar, Theme, YStack, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';

import { UpdateUserRequest, UserService } from '@zix/api';
import { FullScreenSpinner } from '@zix/app/ui/common';
import { useUser } from '@zix/core/auth';
import { createParam } from 'solito';
import { SolitoImage } from 'solito/image';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { UploadAvatar } from '../../components/upload-avatar';

const { useParams } = createParam<{ edit_name?: '1'; edit_about?: '1' }>();
export const EditAccountScreen = () => {
  const { user, updateProfile } = useUser();

  if (!user?.id) {
    return <FullScreenSpinner />;
  }
  return (
    <EditProfileForm
      user={user as UpdateUserRequest}
      updateProfile={updateProfile}
    />
  );
};

const ProfileSchema = z.object({
  name: formFields.text.describe('Name // John Doe'),
  about: formFields.textarea.optional().describe('About // Tell us a bit about yourself')
});

const EditProfileForm = ({
  user,
  updateProfile
}: {
  user: UpdateUserRequest;
  updateProfile: () => void;
}) => {
  const { params } = useParams();
  const toast = useToastController();
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    async mutationFn(requestBody: z.infer<typeof ProfileSchema>) {
      return UserService.updateUser({ requestBody })
    },
    async onSuccess({ data }) {
      updateProfile()
      toast.show('Successfully updated!');
      router.back();
    }
  });

  return (
    <SchemaForm
      schema={ProfileSchema}
      props={{
        name: {
          autoFocus: !!params?.edit_name
        },
        about: {
          autoFocus: !!params?.edit_about
        }
      }}
      defaultValues={user}
      onSubmit={mutate}
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton isLoading={isLoading} onPress={() => submit()}>Update Profile</SubmitButton>
        </Theme>
      )}
    >
      {(fields) => (
        <>
          <YStack marginBottom="$10">
            <UploadAvatar>
              <UserAvatar />
            </UploadAvatar>
          </YStack>
          {Object.values(fields)}
        </>
      )}
    </SchemaForm>
  );
};

const UserAvatar = () => {
  const { avatarUrl } = useUser();
  return (
    <Avatar circular size={128} overflow='hidden'>
      <SolitoImage src={avatarUrl} alt="your avatar" width={128} height={128} />
    </Avatar>
  );
};

export default EditAccountScreen;
