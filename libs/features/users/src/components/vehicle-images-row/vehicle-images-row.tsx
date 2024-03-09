import { MediaTransformer } from '@zix/api';
import { FlatList } from 'react-native';
import { Image, ThemeableStackProps, View, YStack } from 'tamagui';

export type VehicleImagesRowProps = ThemeableStackProps & {
  medias?: MediaTransformer[];
};

export const VehicleImagesRow: React.FC<VehicleImagesRowProps> = ({
  medias = [],
  ...props
}) => {

  if (!medias.length) return null;
  return (
    <View {...props}>
      <FlatList
        data={medias}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <YStack
            key={`key-${index}`}
            borderRadius="$4"
            width={62}
            height={43}
            marginHorizontal="$2"
          >
            <Image
              source={{ uri: item.url }}
              style={{
                borderRadius: 8,
                width: '100%',
                height: '100%',
              }}
            />
          </YStack>
        )}
      />
    </View>
  );
};

export default VehicleImagesRow;
