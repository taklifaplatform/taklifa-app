import { z } from 'zod';

import React from 'react';

import { View, Text, Button, Separator, YStack } from 'tamagui';
import { MediaPickerFieldSchema } from '../media-picker-field/media-picker-field';
import { BaseFormFieldContainerProps } from '../../common';
import { useFieldInfo, useTsController } from '@ts-react/form';
import { DebugObject } from '@zix/ui/common';
import { MinusSquare, PlusSquare } from '@tamagui/lucide-icons';
import { ShipmentItem } from './shipment-item';

export const ShipmentItemsSchema = z.array(z.object({
  medias: z.array(MediaPickerFieldSchema),
  notes: z.string(),

  dim_height: z.any().optional(),
  dim_width: z.any().optional(),
  dim_length: z.any().optional(),

  content: z.string().optional(),
}))


export type ShipmentItemsFieldProps = {
  containerProps?: BaseFormFieldContainerProps;
}


export const ShipmentItemsField: React.FC<ShipmentItemsFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const { field: { onChange, value }, error } = useTsController<z.infer<typeof ShipmentItemsSchema>>();
  const { placeholder } = useFieldInfo()


  const renderAddItemButton = () => (
    <Button
      marginTop='$4'
      icon={PlusSquare}
      onPress={() => {
        onChange([
          ...(value || []),
          {
            images: [],
            notes: '',
            dim_height: '',
            dim_width: '',
            dim_length: '',
            content: '',
          }
        ])
      }}
    >
      Add Box
    </Button>
  )

  const renderRemoveItemButton = (itemIndex: number) => (
    <Button
      theme='error'
      marginTop='$4'
      icon={MinusSquare}
      onPress={() => {
        onChange(value?.filter((_, i) => i !== itemIndex))
      }}
    >
      Remove Box
    </Button>
  )

  return (
    <View>
      {
        value?.map((item, index) => (
          <YStack key={`item-${index}`}>
            <ShipmentItem
              index={index}
              value={item}
              onChange={(newValue) => {
                onChange(value.map((v, i) => i === index ? newValue : v))
              }}
              error={error?.[index] || {}}
            />
            {renderRemoveItemButton(index)}
          </YStack>
        ))
      }
      <DebugObject object={value} />

      <Separator marginTop='$4' />
      {renderAddItemButton()}
    </View>
  );
}


export default ShipmentItemsField;
