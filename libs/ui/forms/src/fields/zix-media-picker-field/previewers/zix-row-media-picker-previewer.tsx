import { MediaFile } from "@zix/ui/common";
import { X, ImagePlus } from "@tamagui/lucide-icons";
import { Stack, Button } from "tamagui";
import { ZixMediaPreviewerProps } from "../types";

export const ZixRowMediaPickerPreviewer: React.FC<ZixMediaPreviewerProps> = ({
  previews,
  onPress,
  onRemoveMedia,
}) => {
  return (
    <Stack flexDirection='row' flexWrap='wrap' gap='$2'>
      {previews.map((media, index) => (
        <Stack
          key={index}
          alignItems="center"
          justifyContent="center"
          height="$6"
          width="$6"
          backgroundColor="$color9"
          marginHorizontal="$1"
          borderRadius="$4"
        >
          <MediaFile
            media={media}
            heightQuality={true}
            placeholder={'image'}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
              opacity: media.uploadProgress,
            }}
          />
          <Button
            onPress={() => onRemoveMedia?.(media)}
            backgroundColor="red"
            padding="$0"
            width="$1.5"
            height="$1.5"
            position="absolute"
            top="$-2"
            left="$-2"
            borderRadius="$12"
            pressStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            icon={<X size="$1.5" color="$color1" />}
          />
        </Stack>
      ))}
      <Button
        onPress={onPress}
        icon={<ImagePlus size="$2" color="black" />}
        width="$6"
        height="$6"
        backgroundColor="$color9"
        borderRadius="$4"
      />
    </Stack>
  )
}
