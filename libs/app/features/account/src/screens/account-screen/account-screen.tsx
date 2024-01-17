import {
  Avatar,
  Button,
  H1,
  Paragraph,
  ScrollView,
  XStack,
  YStack,
  getTokens
} from '@zix/app/ui/core';
import { useUser } from '@zix/core/auth';
import { SolitoImage } from 'solito/image';
import { Link, useLink } from 'solito/link';

// TODO
// https://www.figma.com/file/2hwhnxKlAlXCt9EiP5tEb4/SAWAAD?type=design&node-id=1326-5896&mode=design&t=3f1TojWUsWpIXEET-4
export function AccountScreen() {
  const { profile, avatarUrl } = useUser();
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
        <YStack gap="$8">
          <XStack gap="$2" justifyContent="center" $sm={{ marginTop: '$8' }}>
            <Avatar circular size="$14">
              <SolitoImage
                src={avatarUrl}
                alt="your avatar"
                width={getTokens().size['14'].val}
                height={getTokens().size['14'].val}
              />
            </Avatar>
          </XStack>
          <YStack gap="$2">
            {name ? (
              <H1 textAlign="center">{name}</H1>
            ) : (
              <Link href="/profile/edit?edit_name=1">
                <H1 textAlign="center" textDecorationLine="underline">
                  No Name
                </H1>
              </Link>
            )}

            {!!about && (
              <Paragraph theme="alt1" textAlign="center" size="$6">
                {about}
              </Paragraph>
            )}
          </YStack>
        </YStack>
        <Button
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
