import { CustomIcon } from '@zix/app/ui/icons';
import { Button, XStack } from 'tamagui';
import { OnboardingControlsProps } from './onboarding-controls';

export const OnboardingControls = ({
  currentIdx,
  onChange,
  stepsCount,
  onFinish
}: OnboardingControlsProps) => {
  const handleGoNext = () => {
    if (currentIdx + 1 > stepsCount - 1) {
      onFinish?.();
      return;
    }
    onChange(currentIdx + 1);
  };

  const handleSkip = () => {
    onFinish?.();
  };

  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      padding="$5"
      gap="$5"
    >
      <Button
        chromeless
        color="$color"
        pressStyle={{
          backgroundColor: '$color6'
        }}
        borderRadius="$10"
        onPress={() => handleSkip()}
      >
        Skip
      </Button>

      <Button
        pressStyle={{
          backgroundColor: '$color6',
          borderColor: '$color6'
        }}
        chromeless
        bordered
        borderColor="$color"
        flex={1}
        borderRadius="$10"
        color="$color"
        onPress={() => handleGoNext()}
        iconAfter={(props) => <CustomIcon name="chevron_right" {...props} />}
      >
        Continue
      </Button>
    </XStack>
  );
};
