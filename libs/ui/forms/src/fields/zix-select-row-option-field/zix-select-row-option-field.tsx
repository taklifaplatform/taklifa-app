import React from 'react';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import {
  SelectProps,
  XStack,
  YStack,
  Text,
} from 'tamagui';
import { BaseSelectFieldItem } from '../zix-select-field/zix-select-field';
import { StyleSheet, TouchableOpacity } from 'react-native';


export type ZixSelectRowOptionFieldProps = SelectProps & {
  options: BaseSelectFieldItem[]
  onChange?: (value: string) => void
  value?: string

}

export const ZixSelectRowOptionField: React.FC<ZixSelectRowOptionFieldProps> = ({
  options = [],
  onChange,
  value,
  ...props
}) => {

  return (
    <XStack>
      {
        options && options.map((item, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onChange?.(item.id)
              }}
              key={`${item.id}-${i}`}
              style={[styles.optionButton, { backgroundColor: value === item.id ? '#FECA16' : '#E0E0E0', }]}
            >
              <YStack
                alignItems='center'
                gap='$2'
                justifyContent='space-between'
              >
                {item.icon && <CustomIcon name={item?.icon} color={'$color0'} size={'$2.5'} />}
                <Text
                  fontSize={10}
                  color='$color0'
                  fontWeight={'bold'}
                >
                  {t(`common:${item.name}`)}
                </Text>
              </YStack>
            </TouchableOpacity>
          )
        })
      }
    </XStack>
  );
}

const styles = StyleSheet.create({
  optionButton: {
    width: 90,
    height: 80,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
})

export default ZixSelectRowOptionField;
