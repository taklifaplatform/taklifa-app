import { MediaTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { Avatar, Image, SizeTokens } from 'tamagui';

export type MediaAvatarProps = {
  size?: SizeTokens;
  media?: MediaTransformer;
};

// TODO: remove or merge with UserAvatar
export const MediaAvatar: React.FC<MediaAvatarProps> = ({
  media,
  size = '$4',
  ...props
}) => {

  return (
    <Avatar
      size={size}
      circular
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {media?.url ? (
        <Image
          source={{ uri: media.original_url }}
          alt="Image"
          width={size}
          height={size}
          resizeMode='contain'
        />
      ) : (
        <CustomIcon name="avatar" size={size} color="$color2" />
      )}
    </Avatar>
  );
};

export default MediaAvatar;
