
import { MediaTransformer } from '@zix/api';
import { useMultiLang } from '@zix/i18n';
import React from 'react';
import { FlatList } from 'react-native';
import { Image, SizeTokens, ThemeableStackProps, View } from 'tamagui';


export type ZixMediasListWidgetProps = ThemeableStackProps & {
  medias?: MediaTransformer[];
  imageWidth?: SizeTokens;
  imageHeight?: SizeTokens;
}

export const ZixMediasListWidget: React.FC<ZixMediasListWidgetProps> = ({
  medias = [],
  imageWidth = 62,
  imageHeight = 43,
  ...props
}) => {
  // Hooks
  const { isRtl } = useMultiLang()

  if (!medias.length) return null;

  return (
    <View minHeight={imageHeight} {...props}>
      <FlatList
        data={medias}
        horizontal
        showsHorizontalScrollIndicator={false}
        inverted={isRtl}
        renderItem={({ item, index }) => (
          <Image
            key={`key-${index}`}
            source={{ uri: item.original_url }}
            width={imageWidth}
            height={imageHeight}
            borderRadius="$4"
            marginHorizontal="$2"
            resizeMode='cover'
          />
        )}
      />
    </View>
  );
}

export default ZixMediasListWidget;
