import React, { useEffect, useMemo, useState } from 'react';

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
  Text,
  Theme,
  YStack,
  useThemeName
} from 'tamagui';
import { SHARED_FIELDS_STYLE } from '../fields-config';
import ZixInput from '../zix-input/zix-input';
import { useMultiLang } from '@zix/i18n';

export type BaseSelectFieldItem = {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
}
export type ZixSelectFieldProps = SelectProps & {
  options: BaseSelectFieldItem[]
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
  const { isRtl } = useMultiLang()


  console.log(JSON.stringify(disabled, null, 2))

//  const [selectedPhone, setSelectedPhone] = useState({})
//  const [searchFocus, setSearchFocus] = useState(false)

/*  useEffect(() => {
    if (searchFocus) return; // Avoid running the function if searchFocus is true
      if (value) {
        onSearch?.(value); // Call the onSearch function with the current value
        setSelectedPhone(options[0]); // Set the first option as the selected phone
      } else {
        setSelectedPhone({}); // Reset selected phone if no value
      }
  }, [searchFocus, value, options]);
*/
  const renderSearchBar = () => onSearch && (
    <YStack width='100%' padding='$4' marginVertical='$4'>
      <ZixInput
        placeholder={t('common:search')}
        value={search}
        onChangeText={onSearch}
      //  onFocus={() => setSearchFocus(true)}
      //  onBlur={() => setSearchFocus(false)}
        rightIcon={(props) => <CustomIcon name='search' {...props} />}
      />
    </YStack>
  );

  return (
    <Theme name={hasError ? 'red' : 'themeName'} forceClassName>
      <Select {...props} value={`${value}`} onValueChange={val => {
        console.log('====:: val', val)
        onChange?.(String(val))
      }} >
        <Select.Trigger
          width={width}
          iconAfter={ChevronDown}
          {...SHARED_FIELDS_STYLE}
          {...selectTriggerProps}
        >
          {prependPlaceHolder}

          {/* <Text>{(selectedPhone?.icon || "") + " " + (selectedPhone?.name || "")}</Text> */}
          <Select.Value flex={1} fontSize="$1" placeholder={placeholder} {...props} />
          {appendPlaceHolder}
        </Select.Trigger>

        <Adapt platform="touch">
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
                      borderColor='$color5'
                      width="100%"
                      justifyContent='space-between'
                    >
                      <Select.ItemText>
                        {(!isRtl && item.icon) && `${item.icon} `}
                        {item.name}
                        {(isRtl && item.icon) && ` ${item.icon}`}
                      </Select.ItemText>
                      <Select.ItemIndicator marginLeft="$4" theme='accent'>
                        <CustomIcon name='radio_button_checked' color='$color9' />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
                [options, isRtl]
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
