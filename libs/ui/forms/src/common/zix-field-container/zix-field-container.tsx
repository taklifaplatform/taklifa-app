
import { ChevronDown } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import { Shake } from '@zix/ui/common';
import { useEffect, useId, useState } from 'react';
import {
  Accordion,
  Fieldset,
  SizeTokens,
  Square,
  Label as TGLabel,
  Theme,
  ThemeableStack,
  ThemeableStackProps,
  View,
  XStack,
  styled,
  useThemeName
} from 'tamagui';
import FieldError from '../field-error/field-error';


const StackContainer = styled(ThemeableStack, {
  variants: {
    labelInline: {
      true: {
        width: '100%',
        flexDirection: 'row',
        gap: '$3',
        alignItems: 'center',
      },
    },
    collapsible: {
      true: {
        width: '100%',
      },
    },
  } as const,
});

const Label = styled(TGLabel, {
  variants: {
    labelBold: {
      true: {
        fontWeight: 'bold',
      }
    }
  }
})

export type BaseZixFieldContainerProps = ThemeableStackProps & {
  size?: SizeTokens;

  collapsible?: boolean;
  fieldInfo?: typeof useFieldInfo;
  containerProps?: ThemeableStackProps;
  fieldContainerProps?: ThemeableStackProps;
  labelHidden?: boolean;
  labelInline?: boolean;
  labelBold?: boolean;
  labelPrepend?: React.ReactNode;
  labelShowRequiredAsterisk?: boolean;
};


export const ZixFieldContainer: React.FC<BaseZixFieldContainerProps> = ({
  children,
  size,
  labelHidden,
  labelInline,
  labelBold,
  collapsible,
  fieldInfo = useFieldInfo,
  containerProps = {},
  fieldContainerProps = {},
  labelPrepend = null,
  labelShowRequiredAsterisk = true,
  ...rest
}) => {
  const id = useId()
  const { error } = useTsController()
  const { label, isOptional } = fieldInfo()
  const themeName = useThemeName();
  const [activeAccordions, setActiveAccordions] = useState([id as string]);

  useEffect(() => {
    if (error && !activeAccordions.includes(id as string)) {
      setActiveAccordions([id as string]);
    }
  }, [error, activeAccordions, id]);


  const renderLabel = () =>
    (label && !labelHidden) && (
      <XStack alignItems='center' gap='$2'>
        <Label
          htmlFor={id}
          size={size || '$3'}
          textAlign="left"
          theme="alt1"
          labelBold={labelBold}
        >
          {label} {(!isOptional && labelShowRequiredAsterisk) && `*`}
        </Label>
        {labelPrepend}
      </XStack>
    );

  const renderField = () => (
    <View flex={1} {...fieldContainerProps}>
      <Shake shakeKey={error?.errorMessage}>
        {children}
      </Shake>
    </View>
  )

  const renderAccordion = () => (
    <Accordion
      value={activeAccordions}
      type="multiple"
      onValueChange={setActiveAccordions}
    >
      <Accordion.Item value={id as string}>
        <Accordion.Trigger
          flexDirection="row"
          justifyContent="space-between"
          padding="0"
          borderWidth="0"
          hoverStyle={{
            backgroundColor: 'transparent',
          }}
          focusStyle={{
            backgroundColor: 'transparent',
          }}
        >
          {({ open }: { open: boolean }) => (
            <>
              {renderLabel()}
              <Square
                theme="alt1"
                animation="quick"
                rotate={open ? '180deg' : '0deg'}
              >
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content padding="0">
          {renderField()}
          <FieldError message={error?.errorMessage} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  )


  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Fieldset flex={1}>
        {
          collapsible ? renderAccordion() : (
            <>
              <StackContainer labelInline={labelInline} {...containerProps}>
                {renderLabel()}
                {renderField()}
              </StackContainer>
              <FieldError message={error?.errorMessage} />
            </>
          )
        }
      </Fieldset>
    </Theme>
  );
};

export default ZixFieldContainer;
