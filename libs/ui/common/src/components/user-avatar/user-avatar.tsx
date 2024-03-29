import { UserTransformer } from '@zix/api';
import { SizeTokens } from 'tamagui';
import ZixAvatar from '../zix-avatar/zix-avatar';

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
      media={user?.avatar}
      name={user?.name}
      size={size}
      {...props}
    />
  )
};

export default UserAvatar;
