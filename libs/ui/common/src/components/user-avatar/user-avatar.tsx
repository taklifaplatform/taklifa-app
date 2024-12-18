import { UserTransformer } from '@zix/api';
import { SizeTokens } from 'tamagui';
import ZixAvatar from '../zix-avatar/zix-avatar';
import { getLastActivityStatus } from '@zix/utils';

export type UserAvatarProps = {
  size?: SizeTokens;
  user?: UserTransformer;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = '$4',
  ...props
}) => {

  return (
    <ZixAvatar
      media={user?.avatar || user?.logo}
      name={user?.name}
      size={size}
      borderColor={getLastActivityStatus(user).color}
      {...props}
    />
  )
};

export default UserAvatar;
