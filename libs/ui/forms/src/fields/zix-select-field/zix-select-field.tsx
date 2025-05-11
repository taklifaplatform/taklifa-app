import React, { useMemo } from 'react';

import { LinearGradient } from '@tamagui/linear-gradient';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import {
  Adapt,
  Select,
  SelectProps,
  SelectTriggerProps,
  Sheet,
  Spinner,
  Text,
  Theme,
  View,
  XStack,
  YStack
} from 'tamagui';
import { SHARED_FIELDS_STYLE } from '../fields-config';
import ZixInput from '../zix-input/zix-input';

export type BaseSelectFieldItem = {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
}
export type ZixSelectFieldProps = SelectProps & {
  options: BaseSelectFieldItem[]
  isOptionsLoading?: boolean
  onChange?: (value: string) => void
  value?: string
  placeholder?: string
  prependPlaceHolder?: React.ReactNode
  appendPlaceHolder?: React.ReactNode

  disabled?: boolean
  hasError?: boolean
  selectTriggerProps?: SelectTriggerProps
  width?: number | string

  search?: string
  onSearch?: (value: string) => void

}

export const ZixSelectField: React.FC<ZixSelectFieldProps> = ({
  options = [],
  isOptionsLoading,
  onChange,
  value,
  placeholder,
  prependPlaceHolder,
  appendPlaceHolder,
  disabled,
  hasError,
  selectTriggerProps = {},
  width = '100%',
  search,
  onSearch,
  ...props
}) => {

  const renderSearchBar = () => onSearch && (
    <YStack width='100%' padding='$4' marginVertical='$4'>
      <ZixInput
        placeholder={t('common:search')}
        value={search}
        onChangeText={onSearch}
        rightIcon={(props) => <CustomIcon name='search' {...props} />}
      />
    </YStack>
  );

  const renderItemContent = (item: BaseSelectFieldItem) => (
    <XStack alignItems='center' gap='$2' flex={1} overflow='hidden'>
      <Text fontSize='$4'>{item.icon}</Text>
      <Text numberOfLines={1} fontSize='$4'>{item.name}</Text>
    </XStack>
  )

  const renderSelectedItem = (_value: string | undefined, placeholder: string | undefined) => {
    const item = options.find(item => item.id === _value)
    return item ? renderItemContent(item) : (
      <XStack alignItems='center' gap='$2' flex={1} overflow='hidden'>
        <Text numberOfLines={1} fontSize='$4'>
          {value ?? placeholder}
        </Text>
      </XStack>
    )
  }

  if (!search && !options.length && value) {
    return (
      <View
        {...SHARED_FIELDS_STYLE}
        paddingHorizontal='$4'
        alignItems='flex-start'
        justifyContent='center'
      >
        <Spinner />
      </View>
    )
  }

  return (
    <Theme name={hasError ? 'red' : 'themeName'} forceClassName>
      <Select {...props} value={`${value}`} defaultValue={`${value}`} onValueChange={val => {
        console.log('====:: val', val)
        onChange?.(String(val))
      }} >
        <Select.Trigger
          disabled={disabled}
          width={width}
          iconAfter={ChevronDown}
          {...SHARED_FIELDS_STYLE}
          {...selectTriggerProps}
        >
          {renderSelectedItem(value, placeholder)}
          {/* <Select.Value fontSize="$1" placeholder={placeholder} /> */}
          {appendPlaceHolder}
        </Select.Trigger>

        <Adapt platform="touch">
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

          <Select.Viewport minWidth={200} minHeight={400}>
            <Select.Group disabled={disabled}>
              {renderSearchBar()}
              {useMemo(
                () => options.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={`${item.id}-${i}`}
                      value={`${item.id}`}
                      padding="$4"
                      borderBottomWidth={1}
                      borderColor='$color5'
                      width="100%"
                      justifyContent='space-between'
                    >
                      <Select.ItemText>
                        {renderItemContent(item)}
                      </Select.ItemText>
                      <Select.ItemIndicator marginLeft="$4" theme='accent'>
                        <CustomIcon name='radio_button_checked' color='$color9' />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
                [options]
              )}
            </Select.Group>
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
    </Theme >
  )
}

export default ZixSelectField;
