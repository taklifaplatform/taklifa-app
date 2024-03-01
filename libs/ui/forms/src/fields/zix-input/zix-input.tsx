import { Input, InputProps, Stack, TextArea, XStack } from 'tamagui';
import { IconProps } from '@tamagui/helpers-icon';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import FieldContainer, {
  FieldContainerProps,
} from '../../common/field-container/field-container';
import React, { Ref, forwardRef, useId, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';
import { useMultiLang } from '@zix/i18n';

export type ZixInputProps = InputProps &
  FieldContainerProps & {
    multiline?: boolean;
    isPassword?: boolean;
    fullWidth?: boolean;
    passwordIconProps?: IconProps;
    leftIcon?: React.FC<IconProps>;
    onLeftIconPress?: () => void;
    rightIcon?: React.FC<IconProps>;
    onRightIconPress?: () => void;
  };

/**
 * ZixInput component is a custom input field component.
 *
 * @component
 * @example
 * // Usage:
 * <ZixInput
 *   required
 *   error={false}
 *   helperText="Please enter your name"
 *   label="Name"
 *   labelInline
 *   multiline={false}
 *   containerProps={{ className: 'container' }}
 *   isPassword={false}
 *   passwordIconProps={{ className: 'password-icon' }}
 *   fullWidth
 *   id="input-1"
 *   size="medium"
 *   minHeight="100px"
 *   placeholderTextColor="#999"
 *   secureTextEntry={false}
 *   onBlur={(e) => console.log('Blur event:', e)}
 * />
 *
 * @param {ZixInputProps} props - The props for the ZixInput component.
 * @param {boolean} props.required - Indicates if the input is required.
 * @param {boolean} props.error - Indicates if there is an error with the input.
 * @param {string} props.helperText - The helper text to display below the input.
 * @param {object} props.helperTextProps - Additional props for the helper text component.
 * @param {string} props.label - The label for the input.
 * @param {object} props.labelProps - Additional props for the label component.
 * @param {boolean} props.labelInline - Indicates if the label should be displayed inline.
 * @param {boolean} props.multiline - Indicates if the input should support multiple lines.
 * @param {object} props.containerProps - Additional props for the container component.
 * @param {boolean} props.isPassword - Indicates if the input is a password field.
 * @param {object} props.passwordIconProps - Additional props for the password icon component.
 * @param {boolean} props.fullWidth - Indicates if the input should take up the full width.
 * @param {string} props.id - The ID of the input element.
 * @param {string} props.size - The size of the input.
 * @param {string} props.minHeight - The minimum height of the input.
 * @param {string} props.placeholderTextColor - The color of the placeholder text.
 * @param {boolean} props.secureTextEntry - Indicates if the input should be a secure text entry.
 * @param {function} props.onBlur - The event handler for the blur event.
 * @param {Ref<TextInput>} ref - The ref for the input element.
 * @returns {JSX.Element} The rendered ZixInput component.
 */
export const ZixInput = forwardRef(function ZixInputEl(
  {
    required,
    error,
    helperText,
    helperTextProps,
    label,
    labelProps,
    labelInline,
    multiline,
    containerProps,
    isPassword,
    passwordIconProps,
    fullWidth,
    leftIcon,
    rightIcon,
    onLeftIconPress,
    onRightIconPress,
    ...rest
  }: ZixInputProps,
  ref: Ref<TextInput> | undefined
) {
  const genId = useId();
  const [show, setShow] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const { isRtl } = useMultiLang();

  const id = rest.id || genId;
  const currentInputProps = {
    bc: '$color2', // TODO: change to $inputColor
    borderColor: '$color10',
    borderWidth: '$0.25',
    focusStyle: {
      borderColor: '$color6',
    },
    onFocus: () => {
      setFocus(true);
    },
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      rest.onBlur?.(e);
      setFocus(false);
    },
    textAlign: isRtl ? 'right' : 'left',
    ...((leftIcon && !isRtl || isRtl && rightIcon)
      ? {
          paddingLeft: '$8',
        }
      : {}),
    ...((rightIcon && !isRtl || isRtl && leftIcon)
      ? {
          paddingRight: '$8',
        }
      : {}),
    ...rest,
  };
  const currentPasswordIconProps = {
    color: error ? '$red8' : focus ? '$color6' : '$color10',
    ...passwordIconProps,
  };

  if (!multiline) {
    currentInputProps.height = '$5';
  }

  if (error) {
    currentInputProps.theme = 'red';
    currentInputProps.borderColor = '$red8';
  }
  if (fullWidth) {
    currentInputProps.minWidth = '100%';
  }

  const secureTextEntry = !!(rest.secureTextEntry || isPassword);

  return (
    <FieldContainer
      id={id}
      error={error}
      errorMessage={rest.errorMessage}
      required={required}
      labelProps={labelProps}
      label={label}
      fullWidth={fullWidth}
      size={rest.size}
      labelInline={labelInline}
      helperText={helperText}
      helperTextProps={helperTextProps}
      {...containerProps}
    >
      {multiline ? (
        <TextArea
          {...currentInputProps}
          minHeight={rest.minHeight || '$10'}
          placeholderTextColor={rest.placeholderTextColor}
          ref={ref}
        />
      ) : secureTextEntry ? (
        <Stack
          position={'relative'}
          width={fullWidth ? '100%' : currentInputProps?.width}
        >
          <Input
            {...currentInputProps}
            ref={ref}
            secureTextEntry={!show}
            autoCapitalize="none"
            placeholderTextColor={
              rest.placeholderTextColor as InputProps['placeholderTextColor']
            }
          />
          <Pressable
            style={{
              position: 'absolute',
              top: '50%',
              transform: [{ translateY: -0.5 * 20 }],
              height: 20,
              ...(isRtl
                ? {
                    left: 15,
                  }
                : {
                    right: 15,
                  }),
            }}
            onPress={() => {
              setShow((state) => !state);
            }}
          >
            {show ? (
              <EyeOff {...currentPasswordIconProps} />
            ) : (
              <Eye {...currentPasswordIconProps} />
            )}
          </Pressable>
        </Stack>
      ) : (
        <XStack alignItems="center">
          {leftIcon && (
            <Stack
              position="absolute"
              left={isRtl ? 'auto' : '$3'}
              right={isRtl ? '$3' : 'auto'}
              onPress={() => {
                onLeftIconPress?.();
              }}
            >
              {leftIcon?.({
                ...currentPasswordIconProps,
                size: '$1.5',
              })}
            </Stack>
          )}
          <Input {...currentInputProps} autoCapitalize="none" ref={ref} />

          {rightIcon && (
            <Stack
              position="absolute"
              left={isRtl ? '$3' : 'auto'}
              right={isRtl ? 'auto' : '$3'}
              onPress={() => {
                onRightIconPress?.();
              }}
            >
              {rightIcon?.({
                ...currentPasswordIconProps,
                size: '$1.5',
              })}
            </Stack>
          )}
        </XStack>
      )}
    </FieldContainer>
  );
});

export default ZixInput;
