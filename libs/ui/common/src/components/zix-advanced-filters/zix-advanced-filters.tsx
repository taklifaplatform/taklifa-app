
import { SlidersHorizontal } from '@tamagui/lucide-icons';
import React, { useMemo, useState } from 'react';
import { Dimensions } from 'react-native';

import { CustomIcon } from '@zix/ui/icons';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Text, Theme, XStack, YStack } from 'tamagui';
import { ZixDialog } from '../zix-dialog/zix-dialog';

export type IFilterOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  activeValue?: React.ReactNode;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  isDefault?: boolean;
}

export type IFilter = {
  key: string,
  label: string;
  icon?: React.ReactNode;
  options: IFilterOption[];
}

export type ZixAdvancedFiltersProps = {
  filters?: IFilter[];
  values?: Record<string, string>;
  onChange?: (values: Record<string, string>) => void;
  urgencyMode?: boolean;
}


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const ZixAdvancedFilters: React.FC<ZixAdvancedFiltersProps> = ({
  filters = [],
  values = {},
  onChange = (v) => console.log('ZixAdvancedFilters::onChange', v),
  urgencyMode = false
}) => {
  const maxVisibleFilters = SCREEN_WIDTH > 600 ? 4 : 2;

  const visibleFilters = useMemo(() => {
    return filters.filter((f) => f.options.length > 1).slice(0, maxVisibleFilters);
  }, [filters, maxVisibleFilters])

  const hasMoreFilters = useMemo(() => {
    return filters.length > maxVisibleFilters;
  }, [filters, maxVisibleFilters])

  const renderMoreFilters = () => hasMoreFilters && (
    <Button icon={SlidersHorizontal} scaleIcon={1.5} />
  )

  if (!visibleFilters.length) return null;

  return (
    <XStack padding='$2' gap='$2'>
      {
        visibleFilters.map((filter, index) => (
          <ZixFilter key={filter.key}
            filter={filter}
            value={values[filter.key] ?? undefined}
            onChange={(v) => onChange({
              ...values,
              [filter.key]: v,
            })}
            urgencyMode={urgencyMode}
          />
        ))
      }
      {renderMoreFilters()}
    </XStack>
  );
}
///////////////

export type ZixFiltersProps = {
  filter: IFilter;
  value?: string;
  onChange?: (value: string) => void;
  urgencyMode?: boolean;
}
export const ZixFilter: React.FC<ZixFiltersProps> = ({
  filter,
  value,
  onChange = (v) => console.log('ZixFilter::onChange', v),
  urgencyMode = false
}) => {
  const [isOpen, setIsOpen] = useState(false)


  const activeValue = useMemo(() => {
    return filter.options.find((o) => o.value === value);
  }, [filter, value])

  const renderItem = (item: IFilterOption, isSelected = false) => (
    <XStack
      onPress={() => {
        setIsOpen(false)
        onChange(item.value);
      }}
      hoverStyle={{ backgroundColor: '$color5' }}
      pressStyle={{ opacity: 0.5 }}
      backgroundColor='$color1'
      themeShallow
      paddingHorizontal='$4'
      height='$6'
      borderBottomWidth={1}
      borderColor='$color5'
      alignItems='center'
      justifyContent='space-between'
    >
      <XStack gap='$4' alignItems='center' flex={1}>
        {item.icon}
        <YStack gap='$2'>
          <Text fontWeight='700'>{item.label}</Text>
        </YStack>
      </XStack>
      <YStack>
        {
          isSelected && (
            <Theme name="accent">
              <CustomIcon
                name="radio_button_checked"
                color='$color1'
              />
            </Theme>
          )
        }
      </YStack>
    </XStack>
  )

  return (
    <ZixDialog
      title={filter.label}
      open={isOpen}
      onOpenChange={setIsOpen}
      contentPadding='$4'
      disableRemoveScroll
      trigger={(
        <XStack
          theme={urgencyMode ? "error" : "accent"}
          key={filter.key}
          backgroundColor='$color2'
          borderWidth={1}
          borderColor={urgencyMode ? '#FF3B30' : '$color1'}
          borderRadius='$4'
          alignItems='center'
          paddingHorizontal='$2'
          height='$3'
        >
          <Text fontWeight='700' fontSize='$1'>
            {activeValue ? activeValue?.label : filter.label}
          </Text>
          {activeValue?.activeValue && (
            <Text fontSize='$1'>{activeValue?.activeValue}</Text>
          )}
        </XStack>
      )}
    >
      <FlatList
        style={{ flex: 1 }}
        data={filter.options}
        renderItem={({ item }) => renderItem(item, item.value === value)}
      />
    </ZixDialog>
  )
}


export default ZixAdvancedFilters;
