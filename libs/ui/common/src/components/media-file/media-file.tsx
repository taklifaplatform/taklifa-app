/* eslint-disable @typescript-eslint/no-var-requires */
import { MediaTransformer } from '@zix/api'
import { Image, ImageProps } from 'tamagui'

export interface MediaFileProps extends Partial<ImageProps> {
  media?: MediaTransformer
  heightQuality?: boolean
  placeholder?: 'image' | 'avatar'
}

const placeholderImage = require('./placeholder-image.png')
const placeholderAvatar = require('./placeholder-avatar.png')

/**
 * Media File
 * TODO:
 * - [ ] Add support for video
 * - [ ] Add support for audio
 * - [ ] Add support for pdf
 * @param props
 * @returns
 */
export const MediaFile: React.FC<MediaFileProps> = (props) => {
  const { media, heightQuality, placeholder = 'image' } = props

  const defaultImage = placeholder === 'image' ? placeholderImage : placeholderAvatar

  if (!media) {
    return (
      <Image
        resizeMode="cover"
        alt="placeholder"
        source={defaultImage}
        {...props}
        defaultSource={defaultImage}
      />
    )
  }

  return (
    <Image
      resizeMode="contain"
      alt={String(media.id)}
      {...props}
      source={{ uri: heightQuality && media.original_url ? media.original_url : media.url }}
      defaultSource={defaultImage}
    />
  )
}

export default MediaFile;
