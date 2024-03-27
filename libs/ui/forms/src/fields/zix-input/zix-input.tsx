import { IconProps } from '@tamagui/helpers-icon';
import { useMultiLang } from '@zix/i18n';
import React, { Ref, forwardRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputFocusEventData
} from 'react-native';
import { Input, InputProps, Stack, TextArea, ThemeableStackProps, XStack } from 'tamagui';
import { SHARED_FIELDS_STYLE } from '../fields-config';

export type ZixInputProps = InputProps & {
  isMultiline?: boolean;
  hasError?: boolean;

  leftIcon?: React.FC<IconProps>;
  onLeftIconPress?: () => void;
  rightIcon?: React.FC<IconProps>;
  onRightIconPress?: () => void;
  containerProps?: ThemeableStackProps
};

export const ZixInput = forwardRef(function ZixInputEl(
  {
    hasError,
    isMultiline,
    leftIcon,
    rightIcon,
    onLeftIconPress,
    onRightIconPress,

    onBlur,
    containerProps = {},
    ...rest
  }: ZixInputProps,
  ref: Ref<TextInput> | undefined
) {
  const [focus, setFocus] = useState<boolean>(false);
  const { isRtl } = useMultiLang();

  const shouldFlip = isRtl
  // const shouldFlip = isRtl && Platform.OS === 'web'

  const currentInputProps = {
    ...SHARED_FIELDS_STYLE,
    textAlign: shouldFlip ? 'right' : 'left',
    ...((leftIcon && !shouldFlip || shouldFlip && rightIcon)
      ? {
        paddingLeft: '$8',
      }
      : {}),
    ...((rightIcon && !shouldFlip || shouldFlip && leftIcon)
      ? {
        paddingRight: '$8',
      }
      : {}),
    onFocus: () => {
      setFocus(true);
    },
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur?.(e);
      setFocus(false);
    },
    ...rest,
  };
  const currentIconProps = {
    color: hasError ? '$red8' : focus ? '$color6' : '$color10',
  };


  const renderInput = () => isMultiline ? (
    <TextArea
      {...currentInputProps}
      minHeight={rest.minHeight || '$10'}
      ref={ref}
    />
  ) : (
    // TODO: check why, when we're using numberOfLines={2} is counting it as single line
    <Input {...currentInputProps} numberOfLines={2} autoCapitalize="none" ref={ref} />
  )

  return (
    <XStack alignItems="center" {...containerProps}>
      {renderInput()}
      {leftIcon && (
        <Stack
          position="absolute"
          left={shouldFlip ? 'auto' : '$3'}
          right={shouldFlip ? '$3' : 'auto'}
          onPress={() => {
            onLeftIconPress?.();
          }}
        >
          {leftIcon?.({
            ...currentIconProps,
            size: '$1.5',
          })}
        </Stack>
      )}
      {rightIcon && (
        <Stack
          position="absolute"
          left={shouldFlip ? '$3' : 'auto'}
          right={shouldFlip ? 'auto' : '$3'}
          onPress={() => {
            onRightIconPress?.();
          }}
        >
          {rightIcon?.({
            ...currentIconProps,
            size: '$1.5',
          })}
        </Stack>
      )}
    </XStack>
  )
});

export default ZixInput;
