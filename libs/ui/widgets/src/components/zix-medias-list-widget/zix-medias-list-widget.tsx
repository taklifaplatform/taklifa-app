
import { MediaTransformer } from '@zix/api';
import { useMultiLang } from '@zix/i18n';
import React from 'react';
import { FlatList } from 'react-native';
import { Image, ThemeableStackProps, View } from 'tamagui';


export type ZixMediasListWidgetProps = ThemeableStackProps & {
  medias?: MediaTransformer[];
  imageWidth?: number;
  imageHeight?: number;
}

export const ZixMediasListWidget: React.FC<ZixMediasListWidgetProps> = ({
  medias = [],
  imageWidth = 62,
  imageHeight = 43,
  ...props
}) => {
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
            source={{ uri: item.url }}
            width={imageWidth}
            height={imageHeight}
            borderRadius="$4"
            marginHorizontal="$2"
          />
        )}
      />
    </View>
  );
}

export default ZixMediasListWidget;
