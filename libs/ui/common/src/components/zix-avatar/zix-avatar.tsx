import { MediaTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { useMemo, useState } from 'react';
import { Avatar, Image, SizeTokens, ThemeableStackProps, useStyle } from 'tamagui';

export type ZixAvatarProps = ThemeableStackProps & {
  size?: SizeTokens;
  media?: MediaTransformer;
  name?: string;
};

export const ZixAvatar: React.FC<ZixAvatarProps> = ({
  media,
  name,
  size = '$4',
  ...props
}) => {
  const style = useStyle({
    width: size,
    height: size,
  });


  const mediaUrl = useMemo(() => {
    if (media?.original_url) return media.original_url;

    if (!name) return null;

    const params = new URLSearchParams();
    params.append('name', name);
    params.append('size', '256');
    return `https://ui-avatars.com/api.jpg?${params.toString()}`;
  }, [name, media]);

  const [showCustomIcon, setShowCustomIcon] = useState(false)

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
      {mediaUrl && !showCustomIcon ? (
        <Image
          source={{ uri: mediaUrl }}
          alt={name ?? ''}
          style={style}
          resizeMode='contain'
          onError={() => {
            setShowCustomIcon(true)
          }}
        />
      ) : (
        <CustomIcon name="avatar" size={size} color="$color2" />
      )}
    </Avatar>
  );
};

export default ZixAvatar;
