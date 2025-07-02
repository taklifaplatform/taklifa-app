import { CustomIcon } from '@zix/ui/icons';
import { Square, Text, XStack } from 'tamagui';

export type ShipmentInlineStepperProps = {
  activeStep: number; // activeStep
  totalSteps: number;

  stepColorPrec?: string;
  stepColorActive?: string;
  stepColorPrev?: string;
};

const icons: any = {
  1: 'near_me',
  2: 'location_check',
  3: 'box_add',
  4: 'contact_calendar',
  5: 'paper_money',
}

export const ShipmentInlineStepper: React.FC<ShipmentInlineStepperProps> = (
  props: ShipmentInlineStepperProps
) => {
  const {
    stepColorPrec = '$color3',
    stepColorActive = '$color1',
    stepColorPrev = '$color3',
  } = props;

  const totalSteps = Array.from(Array(props.totalSteps).keys()).map(
    (i) => i + 1
  );

  const renderStep = (index: number) => {
    const useAccentTheme = index <= props.activeStep;
    return (
      <XStack key={`step-${index}`} alignItems="center">
        <Square
          theme={useAccentTheme ? 'accent' : undefined}
          themeShallow
          key={index}
          backgroundColor='$color3'
          // backgroundColor={
          //   index >= props.activeStep
          //     ? index <= props.activeStep
          //       ? stepColorActive
          //       : stepColorPrev
          //     : stepColorPrec
          // }
          size="$3"
          borderRadius="$5"
          marginRight="$2"
        >
          <CustomIcon name={icons[index]} size={20} color={index >= props.activeStep ? '$color10' : '$color12'} />
        </Square>
        {index < props.totalSteps && (
          <Text key={`text-${index}`} color="#AFAFAF" fontSize="$1">
            ----
          </Text>
        )}
      </XStack>
    )
  }

  return (
    <XStack margin="$4" gap="$2" alignItems="center">
      {totalSteps.map(renderStep)}
    </XStack>
  );
};

export default ShipmentInlineStepper;
