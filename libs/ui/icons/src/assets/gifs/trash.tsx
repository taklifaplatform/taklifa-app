import { Image, ImageProps } from 'tamagui';

export const TrashGif = (props: ImageProps) => {
  return <Image source={require('./trash.gif')} {...props} />;
};
