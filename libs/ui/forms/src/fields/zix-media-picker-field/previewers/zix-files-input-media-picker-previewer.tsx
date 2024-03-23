import { Plus, PlusSquare, X, XCircle } from "@tamagui/lucide-icons";
import { Button, Text, XStack, useStyle } from "tamagui";

import { IconProps } from "@tamagui/helpers-icon";
import { MediaTransformer } from "@zix/api";
import { useMemo } from "react";
import { SHARED_FIELDS_STYLE } from "../../fields-config";
import { ZixMediaPreviewerProps } from "../types";

export const ZixFilesInputMediaPickerPreviewer: React.FC<ZixMediaPreviewerProps> = ({
  previews,
  onPress,
  placeholder,
  onRemoveMedia
}) => {
  const style = useStyle({
    color: '$gray11'
  })
  const redStyle = useStyle({
    color: '$color10'
  })
  const inputText = useMemo(() => {
    return previews?.length
      ? `${previews?.length} Document Updated`
      : placeholder;
  }, [previews, placeholder]);


  return (
    <XStack
      {...SHARED_FIELDS_STYLE}
      paddingLeft="$4"
      alignItems="center"
      justifyContent="space-between"
      onPress={onPress}
    >
      <Text fontSize='$3'>{inputText}</Text>

      <XStack gap='$2' paddingHorizontal='$2'>
        {
          !!previews?.length && (
            <Button
              theme='error'
              width="$3"
              color='$color9'
              icon={(props: IconProps) => <X {...props} />}
              scaleIcon={1.8}
              onPress={() => {
                previews?.map((item) => onRemoveMedia?.(item as MediaTransformer))
              }}
            />
          )
        }
        <Button
          width="$3"
          color='$color10'
          icon={(props: IconProps) => <Plus {...props} />}
          scaleIcon={1.8}
          onPress={onPress}
        />
      </XStack>
    </XStack>
  )
}
