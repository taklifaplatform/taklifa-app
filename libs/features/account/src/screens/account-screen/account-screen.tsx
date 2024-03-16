import { UserProfile } from '@zix/features/users';
import { useAuth } from '@zix/utils';

// TODO
// https://www.figma.com/file/2hwhnxKlAlXCt9EiP5tEb4/SAWAAD?type=design&node-id=1326-5896&mode=design&t=3f1TojWUsWpIXEET-4
export function AccountScreen() {
  const { user } = useAuth();

  return (
    <UserProfile user={user} />
  );
}

export default AccountScreen;
