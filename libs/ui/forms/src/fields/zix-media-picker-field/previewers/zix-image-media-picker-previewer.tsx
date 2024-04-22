import { ImagePlus } from "@tamagui/lucide-icons";
import { SolitoImage } from "solito/image";
import { Avatar, Button, Text, XStack, YStack, useStyle } from "tamagui";
import { ZixMediaPreviewerProps } from "../types";
import { ImageStyle } from "react-native";

export const ZixImageMediaPickerPreviewer: React.FC<ZixMediaPreviewerProps> = ({
  previews,
  onPress,
  placeholder,
  isOptional
}) => {
  const size = "$7";
  const media = previews?.length > 0 ? previews[0] : null;
  const style = useStyle({
    width: size,
    height: size,
  });
  return (
    <Button unstyled onPress={onPress}>
      <XStack justifyContent="space-around">
        <YStack alignItems="center" gap='$3'>
          <Avatar
            size={size}
            circular
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
