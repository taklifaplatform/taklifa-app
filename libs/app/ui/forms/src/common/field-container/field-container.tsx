import { ChevronDown } from '@tamagui/lucide-icons';

import { Shake } from '@zix/app/ui/common';
import {
  Accordion,
  FontSizeTokens,
  Label,
  LabelProps,
  Paragraph,
  ParagraphProps,
  SizeTokens,
  Square,
  Theme,
  ThemeableStack,
  ThemeableStackProps,
  YStack,
  styled,
  useThemeName
} from '@zix/app/ui/core';
import { useEffect, useState } from 'react';
import FieldError from '../field-error/field-error';

export type FieldContainerProps = {
  label?: string;
  labelProps?: Omit<LabelProps, 'htmlFor' | 'ref'>;
  labelInline?: boolean;
  collapsible?: boolean;
  helperText?: string;
  helperTextProps?: ParagraphProps;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  containerProps?: ThemeableStackProps;
};

export type BaseFieldContainerProps = ThemeableStackProps &
  FieldContainerProps & {
    id?: string;
    size?: SizeTokens;
    fullWidth?: boolean;
  };

const StackContainer = styled(ThemeableStack, {
  variants: {
    fullWidth: {
      true: {
        width: '100%'
      }
    },
    labelInline: {
      true: {
        width: '100%',
        flexDirection: 'row',
        space: '$3',
        alignItems: 'center'
      }
    }
  } as const
});

export const FieldContainer: React.FC<BaseFieldContainerProps> = ({
  label,
  children,
  helperText,
  id,
  size,
  labelProps,
  required,
  error,
  errorMessage,
  helperTextProps,
  collapsible,
  ...rest
}) => {
  const themeName = useThemeName();
  const [activeAccordions, setActiveAccordions] = useState([id as string]);

  useEffect(() => {
    if (error && !activeAccordions.includes(id as string)) {
      setActiveAccordions([id as string]);
    }
  }, [error, activeAccordions, id]);

  const renderField = () => (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Shake shakeKey={helperText}>
        <YStack>
          {children}
          {errorMessage && <FieldError message={errorMessage} />}
          {helperText && (
            <Paragraph
              paddingLeft={'$2'}
              marginTop={'$2'}
              size={size as FontSizeTokens}
              {...helperTextProps}
            >
              {helperText}
            </Paragraph>
          )}
        </YStack>
      </Shake>
    </Theme>
  );

  const renderLabel = () =>
    label && (
      <Label
        htmlFor={id}
        size={size || '$3'}
        textAlign="left"
        theme="alt1"
        {...labelProps}
        color={error ? '$red10' : labelProps?.color}
        width={rest.labelInline ? 150 : labelProps?.width}
        justifyContent={
          rest.labelInline ? 'flex-end' : labelProps?.justifyContent
        }
      >
        {label} {required && `*`}
      </Label>
    );

  if (collapsible) {
    return (
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
              backgroundColor: 'transparent'
            }}
            focusStyle={{
              backgroundColor: 'transparent'
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
          <Accordion.Content padding="0">{renderField()}</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
  }

  return (
    <Theme name={error ? 'red' : themeName}>
      <StackContainer {...rest} space={rest.labelInline ? '$3' : rest.space}>
        {renderLabel()}
        {renderField()}
      </StackContainer>
    </Theme>
  );
};

export default FieldContainer;
