import { IconProps } from '@tamagui/helpers-icon';
import { useMultiLang } from '@zix/i18n';
import React, { Ref, forwardRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData
} from 'react-native';
import { Input, InputProps, Stack, TextArea, XStack } from 'tamagui';
import { SHARED_FIELDS_STYLE } from '../fields-config';

export type ZixInputProps = InputProps & {
  isMultiline?: boolean;
  hasError?: boolean;

  leftIcon?: React.FC<IconProps>;
  onLeftIconPress?: () => void;
  rightIcon?: React.FC<IconProps>;
  onRightIconPress?: () => void;
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
    ...rest
  }: ZixInputProps,
  ref: Ref<TextInput> | undefined
) {
  const [focus, setFocus] = useState<boolean>(false);
  const { isRtl } = useMultiLang();

  const currentInputProps = {
    ...SHARED_FIELDS_STYLE,
    textAlign: isRtl ? 'right' : 'left',
    ...(leftIcon
      ? {
        paddingLeft: '$8',
      }
      : {}),
    ...(rightIcon
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
    <Input {...currentInputProps} autoCapitalize="none" ref={ref} />
  )

  return (
    <XStack alignItems="center" flex={1}>
      {renderInput()}
      {leftIcon && (
        <Stack
          position="absolute"
          left='$3'
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
          right='$3'
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
