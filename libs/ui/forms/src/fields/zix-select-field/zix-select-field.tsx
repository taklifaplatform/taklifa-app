import React, { useMemo } from 'react';

import { LinearGradient } from '@tamagui/linear-gradient';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import {
  Adapt,
  Select,
  SelectProps,
  Sheet,
  Theme,
  YStack,
  useThemeName
} from 'tamagui';
import { SHARED_FIELDS_STYLE } from '../fields-config';
import ZixInput from '../zix-input/zix-input';

export type BaseSelectFieldItem = {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
}
export type ZixSelectFieldProps = {
  options: BaseSelectFieldItem[]
  onChange?: (value: string) => void
  value?: string
  placeholder?: string
  prependPlaceHolder?: React.ReactNode
  appendPlaceHolder?: React.ReactNode

  disabled?: boolean
  hasError?: boolean
  selectTriggerProps?: SelectProps
  width?: number | string

  search?: string
  onSearch?: (value: string) => void

}

export const ZixSelectField: React.FC<ZixSelectFieldProps> = ({
  options,
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
  const themeName = useThemeName()

  const renderSearchBar = () => onSearch && (
    <YStack width='100%' padding='$4' marginVertical='$4'>
      <ZixInput
        placeholder={t('common:search')}
        value={search}
        onChangeText={onSearch}
        height='$4'
        rightIcon={(props) => <CustomIcon name='search' {...props} />}
      />
    </YStack>
  );

  return (
    <Theme name={hasError ? 'red' : themeName} forceClassName>
      <Select {...props} value={`${value}`} onValueChange={onChange} >
        <Select.Trigger
          width={width}
          iconAfter={ChevronDown}
          {...SHARED_FIELDS_STYLE}
          {...selectTriggerProps}
        >
          {prependPlaceHolder}
          <Select.Value flex={1} fontSize="$1" placeholder={placeholder} />
          {appendPlaceHolder}
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet native modal dismissOnSnapToBottom>
            <Sheet.Frame>
              {renderSearchBar()}
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
            <Select.Group disabled={disabled}>
              {useMemo(
                () => options.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={`${item.id}-${i}`}
                      value={`${item.id}`}
                      padding="$4"
                      borderBottomWidth={1}
                      borderColor='$gray5'
                      width="100%"
                    >
                      <Select.ItemText>
                        {item.icon}
                        {item?.icon && '  '}
                        {item.name}
                      </Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <CustomIcon name='radio_button_checked' color='$color5' />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
                [options,]
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
