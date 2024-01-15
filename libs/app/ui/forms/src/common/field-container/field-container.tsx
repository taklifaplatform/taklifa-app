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
import { use, useEffect, useState } from 'react';
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
  collapsible = true,
  ...rest
}) => {
  const themeName = useThemeName();
  const [activeAccordions, setActiveAccordions] = useState([id as string]);

  useEffect(() => {
    if (error && !activeAccordions.includes(id as string)) {
      setActiveAccordions([id as string]);
    }
  }, [error, activeAccordions, id]);

  if (collapsible) {
    return (
      <Theme name={error ? 'error' : themeName}>
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
                  {label && (
                    <Label
                      htmlFor={id}
                      size={size || '$3'}
                      textAlign="left"
                      theme="alt1"
                      {...labelProps}
                      color={error ? '$red10' : labelProps?.color}
                      width={rest.labelInline ? 150 : labelProps?.width}
                      justifyContent={
                        rest.labelInline
                          ? 'flex-end'
                          : labelProps?.justifyContent
                      }
                    >
                      {label} {required && `*`} : {themeName}
                    </Label>
                  )}
                  <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                    <ChevronDown size="$1" />
                  </Square>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.Content padding="0">
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
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Theme>
    );
  }
  return (
    <Theme name={error ? 'error' : themeName}>
      <StackContainer {...rest} space={rest.labelInline ? '$3' : rest.space}>
        {label && (
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
        )}
        <Shake shakeKey={helperText}>
          <YStack>
            {children}
            {helperText && (
              <Paragraph
                paddingLeft={'$2'}
                marginTop={'$2'}
                size={size as FontSizeTokens}
                {...helperTextProps}
                color={error ? 'red' : undefined}
              >
                {helperText}
              </Paragraph>
            )}
          </YStack>
        </Shake>
      </StackContainer>
    </Theme>
  );
};

export default FieldContainer;
