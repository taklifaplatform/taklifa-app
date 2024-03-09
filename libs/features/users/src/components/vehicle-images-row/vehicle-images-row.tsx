import { MediaTransformer } from '@zix/api';
import { FlatList } from 'react-native';
import { Image, YStack } from 'tamagui';

export type VehicleImagesRowProps = {
  medias?: MediaTransformer[];
};

export const VehicleImagesRow: React.FC<VehicleImagesRowProps> = ({
  medias = [],
}) => {
  return (
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
  );
};

export default VehicleImagesRow;
