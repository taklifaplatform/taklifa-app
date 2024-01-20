import { UserAvatar } from '@zix/app/ui/common';
import { Button, ScrollView, Text, H4, XStack, YStack } from '@zix/app/ui/core';
import { useUser } from '@zix/core/auth';
import { Link, useLink } from 'solito/link';

// TODO
// https://www.figma.com/file/2hwhnxKlAlXCt9EiP5tEb4/SAWAAD?type=design&node-id=1326-5896&mode=design&t=3f1TojWUsWpIXEET-4
export function AccountScreen() {
  const { profile } = useUser();
  const name = profile?.name;
  const about = profile?.about;

  return (
    <ScrollView>
      <YStack
        maxWidth={600}
        marginHorizontal="auto"
        width="100%"
        flex={1}
        gap="$4"
      >
        <YStack gap="$2">
          <XStack gap="$2" justifyContent="center" $sm={{ marginTop: '$4' }}>
            <UserAvatar user={profile} size="$10" />
          </XStack>
          <YStack gap="$2">
            {name ? (
              <H4 textAlign="center">{name}</H4>
            ) : (
              <Link href="/account/edit?edit_name=1">
                <H4 textAlign="center" textDecorationLine="underline">
                  No Name
                </H4>
              </Link>
            )}
            <Text textAlign="center">Online now</Text>
          </YStack>
        </YStack>
        <Button
          size="$4"
          marginHorizontal="$4"
          {...useLink({ href: '/account/edit' })}
          themeInverse
        >
          Edit Profile
        </Button>
      </YStack>
    </ScrollView>
  );
}

export default AccountScreen;
