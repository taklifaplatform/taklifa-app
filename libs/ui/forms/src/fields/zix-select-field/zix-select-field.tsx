import React, { useMemo } from 'react';

import { LinearGradient } from '@tamagui/linear-gradient';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { NativeValue } from '@tamagui/toast/types/ToastImperative';
import { RecursiveErrorType } from '@ts-react/form/lib/src/zodObjectErrors';
import {
  Adapt,
  Select,
  SelectProps,
  Sheet,
  Theme,
  YStack,
  getFontSize,
  isWeb,
  useThemeName
} from 'tamagui';
export type BaseSelectFieldItem = {
  id: string
  name: string
}
/* eslint-disable-next-line */
export type ZixSelectFieldProps = {
  options: BaseSelectFieldItem[]
  native?: NativeValue<'web'>
  onChange?: (value: string) => void
  value?: string
  placeholder?: string
  prependPlaceHolder?: React.ReactNode
  appendPlaceHolder?: React.ReactNode
  isSubmitting?: boolean
  error?: RecursiveErrorType<any>
  id?: string
  selectTriggerProps?: SelectProps
  width?: number | string
} & Pick<SelectProps, 'size' | 'native'>

export const ZixSelectField: React.FC<ZixSelectFieldProps> = ({
  options,
  native = true,
  onChange,
  value,
  placeholder,
  prependPlaceHolder,
  appendPlaceHolder,
  isSubmitting,
  error,
  id,
  selectTriggerProps = {},
  width = '100%',
  ...props
}) => {
  const themeName = useThemeName()

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Select native={native} id={id} value={`${value}`} onValueChange={onChange} {...props}>
        <Select.Trigger
          width={width}
          borderRadius="$6"
          iconAfter={ChevronDown}
          {...selectTriggerProps}
        >
          {prependPlaceHolder}
          <Select.Value fontSize="$1" placeholder={placeholder} />
          {appendPlaceHolder}
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet native modal dismissOnSnapToBottom>
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', '$backgroundTransparent']}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <Select.Group disabled={isSubmitting} space="$0">
              {useMemo(
                () => options.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={`${item.id}`} m="$2">
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size="$2" color="$color11" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
                [options]
              )}
            </Select.Group>
            {/* special icon treatment for native */}
            {native && isWeb && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={'$4'}
                pointerEvents="none"
              >
                <ChevronDown size={getFontSize((props.size ?? '$true') as number)} />
              </YStack>
            )}
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$backgroundTransparent', '$background']}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </Theme>
  )
}

export default ZixSelectField;
