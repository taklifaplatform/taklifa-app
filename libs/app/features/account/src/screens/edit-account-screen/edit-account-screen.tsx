import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, Theme, YStack, useToastController } from '@zix/app/ui/core';
import { SchemaForm, SubmitButton, formFields } from '@zix/app/ui/forms';

import { useUser } from '@zix/core/auth';
import { useSupabase } from '@zix/core/supabase';
import { createParam } from 'solito';
import { SolitoImage } from 'solito/image';
import { useRouter } from 'solito/router';
import { z } from 'zod';
import { UploadAvatar } from '../../components/upload-avatar';
import { FullScreenSpinner } from '@zix/app/ui/common';

const { useParams } = createParam<{ edit_name?: '1'; edit_about?: '1' }>();
export const EditAccountScreen = () => {
  const { profile, user } = useUser();

  if (!profile || !user?.id) {
    return <FullScreenSpinner />;
  }
  return (
    <EditProfileForm
      userId={user.id}
      initial={{ name: profile.name, about: profile.about }}
    />
  );
};

const ProfileSchema = z.object({
  name: formFields.text.describe('Name // John Doe'),
  about: formFields.textarea.describe('About // Tell us a bit about yourself')
});

const EditProfileForm = ({
  initial,
  userId
}: {
  initial: { name: string | null; about: string | null };
  userId: string;
}) => {
  const { params } = useParams();
  const supabase = useSupabase();
  const toast = useToastController();
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    async mutationFn(data: z.infer<typeof ProfileSchema>) {
      await supabase
        .from('profiles')
        .update({ name: data.name, about: data.about })
        .eq('id', userId);
    },
    async onSuccess() {
      toast.show('Successfully updated!');
      await queryClient.invalidateQueries(['profile', userId]);
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
      defaultValues={{
        name: initial.name ?? '',
        about: initial.about ?? ''
      }}
      onSubmit={(values) => mutation.mutate(values)}
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>Update Profile</SubmitButton>
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
    <Avatar circular size={128}>
      <SolitoImage src={avatarUrl} alt="your avatar" width={128} height={128} />
    </Avatar>
  );
};

export default EditAccountScreen;
