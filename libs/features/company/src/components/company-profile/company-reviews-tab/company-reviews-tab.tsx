import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CompanyTransformer, RatingService, UpdateRatingRequest } from '@zix/api';
import { RatingCard, RatingStars, ZixButton } from '@zix/ui/common';
import { ZixInput } from '@zix/ui/forms';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { useCallback, useState } from 'react';
import {
  Button,
  Text,
  View,
  XStack,
  YStack
} from 'tamagui';

export type CompanyReviewsTabProps = {
  company: CompanyTransformer
}

export const CompanyReviewsTab: React.FC<CompanyReviewsTabProps> = ({
  company
}) => {
  const toast = useToastController()
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState('')

  const { data, refetch } = useQuery({
    queryFn: () => RatingService.fetchRatings({
      id: company.id,
      type: 'company',
    }),
    queryKey: ['RatingService.fetchRatings', company.id, 'company']
  })

  const { data: ratingTypes } = useQuery({
    queryFn: () => RatingService.fetchRatingTypes(),
    queryKey: ['RatingService.fetchRatingTypes']
  })

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (variables: Partial<UpdateRatingRequest>) => RatingService.storeRating({
      requestBody: {
        entity_type: 'company',
        entity_id: company.id,
        ...variables
      }
    }),
    onSuccess(data, variables, context) {
      toast.show('Rating submitted successfully')
      refetch()
    },
  })

  const onSubmitRatings = useCallback(() => {
    mutate({
      comment,
      rates: ratingTypes?.data?.map(type => ({
        rating_type_id: type.id,
        score
      })) || [],
    })
  }, [mutate, comment, ratingTypes?.data, score])

  const onRatingRemove = useCallback(() => {
    setScore(5)
    setComment('')
  }, [])


  const renderRatingInput = () => (!isSuccess) && (
    <YStack alignItems="center" gap='$4'>
      <Text fontWeight="600" fontSize="$4" paddingTop="$4">
        How was your experience with
      </Text>
      <Text fontWeight="bold" fontSize="$4">
        {company.name}
      </Text>
      <RatingStars score={score} onChange={setScore} size='$1.5' />

      <ZixInput
        placeholder="Enter your details..."
        isMultiline
        value={comment}
        onChangeText={setComment}
      />
      <XStack gap='$4'>
        <ZixButton
          loading={isPending}
          size='$5'
          flex={1}
          theme='accent'
          onPress={onSubmitRatings}
        >
          Submit
        </ZixButton>
        <Button
          size='$5'
          flex={1}
          themeInverse
          onPress={onRatingRemove}
        >
          Remove
        </Button>
      </XStack>
      <View
        backgroundColor="$color2"
        height="$1"
        width='100%'
        marginVertical='$3'
      />
    </YStack>
  );


  return (
    <YStack flex={1}>
      {renderRatingInput()}
      <ZixWidgetContainer label='Customer evaluation'>
        <YStack gap='$4'>
          {data?.data?.map((item, index) => (
            <RatingCard item={item} key={`${item.id}-${index}`} />
          ))}
          {
            !data?.data?.length && (
              <Text>No ratings available</Text>
            )
          }
        </YStack>
      </ZixWidgetContainer>
    </YStack>
  );
}

export default CompanyReviewsTab;
