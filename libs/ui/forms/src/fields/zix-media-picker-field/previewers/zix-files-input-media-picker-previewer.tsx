import { Check, Plus, PlusSquare, X, XCircle } from "@tamagui/lucide-icons";
import { Button, Text, XStack, useStyle } from "tamagui";
import { t } from 'i18next';
import { IconProps } from "@tamagui/helpers-icon";
import { MediaTransformer } from "@zix/api";
import { useMemo } from "react";
import { SHARED_FIELDS_STYLE } from "../../fields-config";
import { ZixMediaPreviewerProps } from "../types";
import { Alert } from "react-native";

export const ZixFilesInputMediaPickerPreviewer: React.FC<ZixMediaPreviewerProps> = ({
  previews,
  onPress,
  placeholder,
  onRemoveMedia
}) => {
  const style = useStyle({
    color: '$color11'
  })
  const redStyle = useStyle({
    color: '$color10'
  })
  const inputText = useMemo(() => {
    return previews?.length
      ? `${previews?.length} ${t('common:document-update')}`
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
              theme='success'
              width="$3"
              backgroundColor='transparent'
              color='$color1'
              icon={(props: IconProps) => <Check {...props} />}
              scaleIcon={1.8}
              onPress={() => {
                Alert.alert('Are you sure you want to delete this document?', '', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete', onPress: () => {
                      previews?.map((item) => onRemoveMedia?.(item as MediaTransformer))
                    }
                  },
                ])
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
