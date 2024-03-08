import { UserTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { useMemo } from 'react';
import { Avatar, SizeTokens, useStyle, Image } from 'tamagui';

export type UserAvatarProps = {
  size?: SizeTokens;
  user?: UserTransformer;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = '$4',
  ...props
}) => {
  const style = useStyle({
    width: size,
    height: size,
  });

  const avatarUrl = useMemo(() => {
    if (user?.avatar?.original_url) return user?.avatar?.original_url;

    if (!user?.name) return null;

    const params = new URLSearchParams();
    const name = user?.name || user?.username || user?.email || '';
    params.append('name', name);
    params.append('size', '256'); // will be resized again by NextImage/SolitoImage
    return `https://ui-avatars.com/api.jpg?${params.toString()}`;
  }, [user]);

  return (
    <Avatar
      size={size}
      circular
      borderWidth="$0.75"
      backgroundColor="white"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          alt={user?.name ?? ''}
          style={style}
          resizeMode='contain'
        />
      ) : (
        <CustomIcon name="avatar" size={size} color="$color2" />
      )}
    </Avatar>
  );
};

export default UserAvatar;
