import { Shake } from '@zix/app/ui/common';
import {
  FontSizeTokens,
  Label,
  LabelProps,
  Paragraph,
  ParagraphProps,
  SizeTokens,
  ThemeableStack,
  ThemeableStackProps,
  YStack,
  styled
} from '@zix/app/ui/core';

export type FieldContainerProps = {
  label?: string;
  labelProps?: Omit<LabelProps, 'htmlFor' | 'ref'>;
  labelInline?: boolean;
  helperText?: string;
  helperTextProps?: ParagraphProps;
  required?: boolean;
  error?: boolean;
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
  helperTextProps,
  ...rest
}) => {
  return (
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
              color={error ? '$red10' : undefined}
            >
              {helperText}
            </Paragraph>
          )}
        </YStack>
      </Shake>
    </StackContainer>
  );
};

export default FieldContainer;
