import { PlusSquare } from "@tamagui/lucide-icons";
import { View, useStyle } from "tamagui";

import { useMemo } from "react";
import ZixInput from "../../zix-input/zix-input";
import { ZixMediaPreviewerProps } from "../types";

export const ZixFilesInputMediaPickerPreviewer: React.FC<ZixMediaPreviewerProps> = ({
  previews,
  onPress,
  placeholder,
}) => {
  const style = useStyle({
    color: '$gray11'
  })
  const inputText = useMemo(() => {
    return previews?.length
      ? `${previews?.length} Document Updated`
      : placeholder;
  }, [previews, placeholder]);
  return (
    <View position="relative">
      <ZixInput
        value={inputText}
        rightIcon={(props) => <PlusSquare size="$2.5" fill={style.color} color="$gray1" />}
      />
      <View
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        onPress={onPress}
      />
    </View>
  )
}
