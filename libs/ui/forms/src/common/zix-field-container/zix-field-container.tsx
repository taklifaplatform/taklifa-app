
import { ChevronDown } from '@tamagui/lucide-icons';
import { RecursiveErrorType } from '@ts-react/form/lib/src/zodObjectErrors';
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
import { useMultiLang } from '@zix/i18n';
import Shake from '../shake/shake';


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
  stackContainerProps?: ThemeableStackProps;
  fieldContainerProps?: ThemeableStackProps;
  labelHidden?: boolean;
  labelInline?: boolean;
  labelBold?: boolean;
  labelPrepend?: React.ReactNode;
  labelShowRequiredAsterisk?: boolean;

  error?: RecursiveErrorType<any>;
  label?: string
  isOptional?: boolean
};


export const ZixFieldContainer: React.FC<BaseZixFieldContainerProps> = ({
  children,
  size,
  labelHidden,
  labelInline,
  labelBold,
  collapsible,
  stackContainerProps = {},
  fieldContainerProps = {},
  labelPrepend = null,
  labelShowRequiredAsterisk = true,
  error,
  label,
  isOptional,
  ...rest
}) => {
  const id = useId()
  const themeName = useThemeName();
  const [activeAccordions, setActiveAccordions] = useState([id as string]);

  useEffect(() => {
    if (error && !activeAccordions.includes(id as string)) {
      setActiveAccordions([id as string]);
    }
  }, [error, activeAccordions, id]);


  const renderLabel = () =>
    (label && !labelHidden) && (
      <XStack alignItems='center' justifyContent='space-between' gap='$2'>
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
      {...stackContainerProps}
    >
      <Accordion.Item value={id as string}>
        <Accordion.Trigger
          unstyled
          flexDirection='row'
          justifyContent="space-between"
          paddingVertical="$2"
          hoverStyle={{
            backgroundColor: '$color2',
          }}
          focusStyle={{
            backgroundColor: '$color2',
          }}
          {...rest}
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
    <Theme name={error ? 'error' : themeName} forceClassName>
      <Fieldset flex={1}>
        {
          collapsible ? renderAccordion() : (
            <>
              <StackContainer labelInline={labelInline} {...stackContainerProps}>
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
