import { MediaTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { SolitoImage } from 'solito/image';
import { Avatar, SizeTokens, useStyle } from 'tamagui';

export type MediaAvatarProps = {
  size?: SizeTokens;
  media?: MediaTransformer;
};

export const MediaAvatar: React.FC<MediaAvatarProps> = ({
  media,
  size = '$4',
  ...props
}) => {
  const style = useStyle({
    width: size,
    height: size,
  });

  return (
    <Avatar
      size={size}
      circular
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {media?.url ? (
        <SolitoImage
          src={media.url}
          alt="your avatar"
          width={style.width as number}
          height={style.height as number}
          style={{ backgroundColor: 'white' }}
        />
      ) : (
        <CustomIcon name="avatar" size={size} color="$color2" />
      )}
    </Avatar>
  );
};

export default MediaAvatar;
