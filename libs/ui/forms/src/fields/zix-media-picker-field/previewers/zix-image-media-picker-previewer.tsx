import { ImagePlus } from "@tamagui/lucide-icons";
import { SolitoImage } from "solito/image";
import { Avatar, Button, Image, Text, XStack, YStack, useStyle } from "tamagui";
import { ZixMediaPreviewerProps } from "../types";
import { Dimensions, ImageStyle } from "react-native";

export const ZixImageMediaPickerPreviewer: React.FC<ZixMediaPreviewerProps> = ({
  previews,
  onPress,
  placeholder,
  isOptional,
  notAvatar
}) => {
  const size = "$7";
  const media = previews?.length > 0 ? previews[0] : null;
  const style = useStyle({
    width: size,
    height: size,
  });

  const SCREEN_WIDTH = Dimensions.get('window').width;
  if (notAvatar) {
    return <>
      <Image
        borderRadius={10}
        borderWidth={0.3}
        onPress={onPress}
        source={{ uri: media?.uri ?? media?.url ?? '' }}
        width={SCREEN_WIDTH / 1.1}
        height={SCREEN_WIDTH / 2}
        resizeMethod='auto'
        backgroundColor={media?.uri || media?.url ? undefined : '$color3'}
      />
      {
        media?.uri || media?.url ? null :
          <YStack
            onPress={onPress}
            borderRadius={10}
            borderWidth={0.3}     
            width={SCREEN_WIDTH / 1.1}
            height={SCREEN_WIDTH / 2}
            position="absolute"
            alignItems="center"
            justifyContent="center"
          >
            <ImagePlus
              size="$6"
              color="$color11"

            />
          </YStack>
      }
    </>
  }

  return (
    <Button unstyled hoverStyle={{
      cursor: 'pointer',
    }} onPress={onPress}>
      <XStack justifyContent={"space-around"}>
        <YStack alignItems="center" gap='$3'>
          <Avatar
            size={size}
            circular={!notAvatar}
            backgroundColor="$color3"
            alignItems="center"
            justifyContent="center"
          >
            {(media?.uri || media?.url) ? (
              <SolitoImage
                src={media.uri ?? media.url ?? ''}
                alt={placeholder ?? ''}
                contentFit="fill"
                style={{
                  ...style,
                  opacity: media.uploadProgress,
                } as ImageStyle}
              />
            ) : (
              <ImagePlus size="$2" color="$color11" />
            )}
          </Avatar>
          <Text>{placeholder} {isOptional ? '' : '*'} </Text>
        </YStack>
      </XStack>
    </Button>
  )
}
