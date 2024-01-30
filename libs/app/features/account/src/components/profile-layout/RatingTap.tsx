import { ChevronDown } from '@tamagui/lucide-icons';
import {
  YStack,
  Text,
  XStack,
  Accordion,
  Square,
  TextArea,
  Button
} from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { RatingCard } from './RatingCard';

export function RatingTap() {
  const data = [
    {
      id: 1,
      user: 'John Doe',
      image:
        'https://loozap.com/storage/files/tn/tal_02-10-2022/thumb-816x460-loozap_tunisie_w7q6p61__379a97e6-ca4c-4dad-aaaf-2498f548faa9',
      rating: '4/5',
      date: '12/12/2021',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ornare, nisl nibh aliquet nunc, quis aliquam urna nisl eu nunc. Sed euismod, diam quis aliquam ornare, nisl nibh aliquet nunc, quis aliquam urna nisl eu nunc.'
    },
    {
      id: 2,
      user: 'Doe',
      image:
        'https://loozap.com/storage/files/tn/tal_02-10-2022/thumb-816x460-loozap_tunisie_w7q6p61__379a97e6-ca4c-4dad-aaaf-2498f548faa9',
      rating: '4/5',
      date: '12/12/2021',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ornare, nisl nibh aliquet nunc, quis aliquam urna nisl eu nunc. Sed euismod, diam quis aliquam ornare, nisl nibh aliquet nunc, quis aliquam urna nisl eu nunc.'
    },
    {
      id: 3,
      user: 'John',
      image:
        'https://loozap.com/storage/files/tn/tal_02-10-2022/thumb-816x460-loozap_tunisie_w7q6p61__379a97e6-ca4c-4dad-aaaf-2498f548faa9',
      rating: '4/5',
      date: '12/12/2021',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ornare, nisl nibh aliquet nunc, quis aliquam urna nisl eu nunc. Sed euismod, diam quis aliquam ornare, nisl nibh aliquet nunc, quis aliquam urna nisl eu nunc.'
    }
  ];

  const renderRatingInput = () => (
    <YStack
      alignItems="center"
      marginBottom="$4"
      paddingBottom="$4"
      borderBottomWidth="$0.5"
      borderColor={'$gray5'}
    >
      <Text fontWeight="600" fontSize="$4" paddingTop="$4">
        How was your experience with
      </Text>
      <Text fontWeight="bold" fontSize="$4">
        John Doe
      </Text>
      <XStack paddingVertical="$4">
        <CustomIcon name="star" size={30} color={'#FECA16'} />
        <CustomIcon name="star" size={30} color={'#FECA16'} />
        <CustomIcon name="star" size={30} color={'#FECA16'} />
        <CustomIcon name="half_star" size={30} color={'#FECA16'} />
      </XStack>
      <TextArea
        placeholder="Enter your details..."
        width={'100%'}
        minHeight={120}
        borderWidth="$0"
        borderColor={'$gray5'}
      />
    </YStack>
  );

  const renderSubmitButtons = () => (
    <XStack justifyContent="space-between" paddingBottom="$6">
      <Button
        backgroundColor={'black'}
        width="47%"
        height={50}
        borderRadius={10}
        onPress={() => {}}
      >
        <Text color={'white'} fontWeight="bold" fontSize="$3">
          Submit
        </Text>
      </Button>
      <Button
        variant="primary"
        width="47%"
        height={50}
        borderRadius={10}
        onPress={() => {}}
      >
        <Text color={'$white'} fontWeight="bold" fontSize="$3">
          Remove
        </Text>
      </Button>
    </XStack>
  );

  return (
    <YStack flex={1} width={'100%'}>
      {renderRatingInput()}
      {renderSubmitButtons()}
      <Accordion overflow="hidden" width="100%" type="multiple">
        <Accordion.Item value="a2">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }) => (
              <>
                <Text fontSize={'$3'} fontWeight={'700'}>
                  Customer evaluation
                </Text>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            {data.map((item, index) => (
              <RatingCard item={item} />
            ))}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </YStack>
  );
}
