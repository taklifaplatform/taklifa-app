import { UserTransformer } from '@zix/api';


import { FullScreenSpinner } from '@zix/ui/common';
import { UserProfileLayout } from '../../layouts/user-profile-layout/user-profile-layout';

import { ScrollView, YStack } from 'tamagui';
import { ProfileHeader } from '../profile-header/profile-header';
import ProfileTabs from '../tabs/profile-tabs/profile-tabs';
import { UserContactActions } from '../user-contact-actions/user-contact-actions';
import { UserInfoRow } from '..//user-info-row/user-info-row';


export type UserProfileProps = {
  user?: UserTransformer
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user
}) => {
  const renderLoadingSpinner = () => !user && <FullScreenSpinner />;

  const renderUserProfile = () =>
    user && (
      <ScrollView flex={1}>
        <YStack padding="$4" marginBottom='$4' gap="$4">
          <YStack
            backgroundColor='$color2'
            borderRadius='$5'
            paddingHorizontal='$4'
            paddingBottom='$4'
            gap='$6'
          >
            <ProfileHeader user={user} />
            <UserInfoRow user={user} />
          </YStack>
          <UserContactActions user={user} />
        </YStack>
        <ProfileTabs user={user} />
      </ScrollView>
    );

  return (
    <UserProfileLayout user={user}>
      <>
        {renderLoadingSpinner()}
        {renderUserProfile()}
      </>
    </UserProfileLayout>
  );
}

export default UserProfile;
