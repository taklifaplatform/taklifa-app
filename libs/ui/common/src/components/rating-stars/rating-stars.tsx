
import { Star, StarFull, StarHalf } from '@tamagui/lucide-icons';
import React from 'react';

import { XStack, View, SizeTokens, Button } from 'tamagui';

export type RatingStarsProps = {
  score: number;
  size?: SizeTokens
  onChange?: (score: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  score,
  size = '$1',
  onChange
}) => {

  const renderStar = (index: number) => {
    const isHalf = score - index === 0.5;
    const isFilled = score - index >= 1;
    return isFilled ? <StarFull color='$color1' size={size} /> : isHalf ? <StarHalf color='$color1' size={size} /> : <Star size={size} />
  };

  return (
    <XStack theme='accent' flex={1}>
      {Array.from({ length: 5 }).map((_, index) => {

        return onChange ? (
          <Button
            unstyled
            key={index}
            onPress={() => onChange(index + 1)}
          >
            {renderStar(index)}
          </Button>
        ) : (
          <View key={index}>
            {renderStar(index)}
          </View>
        )
      })}
    </XStack>
  );
}


export default RatingStars;
