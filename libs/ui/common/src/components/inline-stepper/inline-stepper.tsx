import { Square, Text, Theme, XStack } from 'tamagui';

export type InlineStepperProps = {
  activeStep: number; // activeStep
  totalSteps: number;

  stepColorPrec?: string;
  stepColorActive?: string;
  stepColorPrev?: string;
};

export const InlineStepper: React.FC<InlineStepperProps> = (
  props: InlineStepperProps
) => {
  const {
    stepColorPrec = '#25D366',
    stepColorActive = '$color1',
    stepColorPrev = '#25D366',
  } = props;

  const totalSteps = Array.from(Array(props.totalSteps).keys()).map(
    (i) => i + 1
  );

  return (
    <Theme name="accent">
      <XStack margin="$4" gap="$2" alignItems="center">
        {totalSteps.map((index) => {
          return (
            <XStack key={`step-${index}`} alignItems="center">
              <Square
                key={index}
                backgroundColor={
                  index >= props.activeStep
                    ? index <= props.activeStep
                      ? stepColorActive
                      : stepColorPrev
                    : stepColorPrec
                }
                size="$3"
                borderRadius="$5"
                marginRight="$2"
              >
                <Text color="black" fontSize="$5" fontWeight="$16">
                  {index}
                </Text>
              </Square>
              {index < props.totalSteps && (
                <Text key={`text-${index}`} color="#AFAFAF" fontSize="$1">
                  ----
                </Text>
              )}
            </XStack>
          );
        })}
      </XStack>
    </Theme>
  );
};

export default InlineStepper;
