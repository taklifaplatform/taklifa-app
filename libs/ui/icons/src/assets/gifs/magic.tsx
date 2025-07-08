import { Image, ImageProps } from 'tamagui';

export const MagicGif = (props: ImageProps) => {
  return <Image source={require('./magic.gif')} {...props} />;
};
