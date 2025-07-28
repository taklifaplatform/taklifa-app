import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { RatingService, UpdateRatingRequest, UserTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { RatingCard, RatingStars, ZixButton } from '@zix/ui/common';
import { ZixInput } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { Button, Text, View, XStack, YStack } from 'tamagui';

/* eslint-disable-next-line */
export type UserReviewsTabProps = {
  user: UserTransformer;
};

export const UserReviewsTab: React.FC<UserReviewsTabProps> = ({ user }) => {
  const toast = useToastController();
  const { user: authUser } = useAuth();
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');

  const { data, refetch } = useQuery({
    queryFn: () =>
      RatingService.fetchRatings({
        id: user.id,
        type: 'driver',
      }),
    queryKey: ['RatingService.fetchRatings', user.id, 'driver'],
  });

  const { data: ratingTypes } = useQuery({
    queryFn: () => RatingService.fetchRatingTypes(),
    queryKey: ['RatingService.fetchRatingTypes'],
  });

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (variables: Partial<UpdateRatingRequest>) =>
      RatingService.storeRating({
        requestBody: {
          entity_type: 'driver',
          entity_id: user.id,
          ...variables,
        },
      }),
    onSuccess(data, variables, context) {
      toast.show(t('common:rating-submitted-successfully'));
      refetch();
    },
    onError(error: any) {
      toast.show(
        error?.body?.message ||
          error?.message ||
          t('app:errors.something-went-wrong'),
        {
          preset: 'error',
        },
      );
    },
  });

  const onSubmitRatings = useCallback(() => {
    mutate({
      comment,
      rates:
        ratingTypes?.data?.map((type) => ({
          rating_type_id: type.id,
          score,
        })) || [],
    });
  }, [mutate, comment, ratingTypes?.data, score]);

  const onRatingRemove = useCallback(() => {
    setScore(5);
    setComment('');
  }, []);

  const renderRatingInput = () =>
    authUser?.id !== user.id &&
    !isSuccess && (
      <YStack flex={1} alignItems="center" gap="$4">
        <YStack flex={1} alignItems="center">
          <Text fontWeight="600" fontSize="$4" paddingTop="$4">
            {t('common:how-was-your-experience-with')}
          </Text>
          <Text fontWeight="bold" fontSize="$4">
            {user.name}
          </Text>
          <RatingStars score={score} onChange={setScore} size="$1.5" />
        </YStack>

        <ZixInput
          width={800}
          textAlign="center"
          placeholder={t('common:enter-your-detail-input-placeholder')}
          isMultiline
          value={comment}
          onChangeText={setComment}
        />
        <XStack flex={1} gap="$4">
          <ZixButton
            loading={isPending}
            size="$5"
            flex={1}
            theme="accent"
            backgroundColor="red"
            onPress={onSubmitRatings}
          >
            Submit
          </ZixButton>
          {Platform.OS === 'web' ? null : (
            <Button size="$5" flex={1} themeInverse onPress={onRatingRemove}>
              Remove
            </Button>
          )}
        </XStack>
        <View
          backgroundColor="$color2"
          height="$0.25"
          width="100%"
          marginVertical="$3"
        />
      </YStack>
    );

  return (
    <YStack flex={1}>
      {renderRatingInput()}
      <ZixWidgetContainer label={`${t('common:customer-evaulation')}`}>
        <YStack gap="$4">
          {data?.data?.map((item, index) => (
            <RatingCard item={item} key={`${item.id}-${index}`} />
          ))}
          {!data?.data?.length && (
            <View
              flex={1}
              alignItems="center"
              justifyContent="center"
              paddingVertical="$8"
            >
              <CustomIcon name="star" size="$4" color="$color10" />
              <Text fontSize="$4" fontWeight="600">
                {t('common:no-reviews-yet')}
              </Text>
            </View>
          )}
        </YStack>
      </ZixWidgetContainer>
    </YStack>
  );
};

export default UserReviewsTab;
