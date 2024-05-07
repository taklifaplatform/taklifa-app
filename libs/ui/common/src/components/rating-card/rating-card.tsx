import { ItemRatingTransformer } from '@zix/api';
import moment from 'moment';
import { Text, XStack, YStack } from 'tamagui';
import UserAvatar from '../user-avatar/user-avatar';
import RatingStars from '../rating-stars/rating-stars';

export type RatingCardProps = {
  item: ItemRatingTransformer
}

export const RatingCard: React.FC<RatingCardProps> = ({ item }) => {
  return (
    <YStack gap="$2">
      <XStack justifyContent="space-between" alignItems="flex-end">
        <XStack gap="$3">
          <UserAvatar user={item.user} />
          <YStack gap="$2" alignItems='flex-start'>
            <Text fontWeight="bold">{item.user?.name}</Text>
            <XStack gap='$10' >
              <Text color={'$color9'} fontWeight="500">
                {moment(item.created_at).fromNow()}
              </Text>
              <XStack gap="$2" alignItems="center">
                <RatingStars score={item.score || 0} size='$1' />
                <Text color={'$color9'} paddingRight="$2">
                  <Text theme='accent' fontWeight='bold' color='$color9'>{item.score}</Text> / 5
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </XStack>

      </XStack>
      <Text lineHeight="$4">{item.comment}</Text>
    </YStack>
  );
}

export default RatingCard;
