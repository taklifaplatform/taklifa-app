import { Image, ImageProps } from 'tamagui';

export const CheckedGif = (props: ImageProps) => {
  return <Image source={require('./checked.gif')} {...props} />;
};
