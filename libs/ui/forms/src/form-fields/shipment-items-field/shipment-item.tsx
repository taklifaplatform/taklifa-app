import { ShipmentItemTransformer } from "@zix/api"
import { XStack, YStack } from 'tamagui'
import { ZixFieldContainer } from "../../common"
import { ZixInput, ZixMediaPickerField } from "../../fields"
import BoxDimension from "./box-dimension"
import { RecursiveErrorType } from "@ts-react/form/lib/src/zodObjectErrors"

export type ShipmentItemProps = {
  value: ShipmentItemTransformer
  onChange: (value: ShipmentItemTransformer) => void
  index: number
  error: Record<string, RecursiveErrorType<any>>
}

export const ShipmentItem: React.FC<ShipmentItemProps> = ({
  value,
  onChange,
  index,
  error = {}
}) => {

  return (
    <ZixFieldContainer
      label={`Shipment Information ${index + 1}`}
      labelBold
      collapsible
      error={false}
    >
      <YStack>
        <ZixFieldContainer label="Images" error={error.medias}>
          <ZixMediaPickerField
            type="medias"
            isMultiple
            value={value.medias || []}
            onChange={medias => onChange({ ...value, medias })}
          />
        </ZixFieldContainer>
        <ZixFieldContainer label="Notes" error={error.notes}>
          <ZixInput
            isMultiline
            value={value.notes}
            onChangeText={notes => onChange({ ...value, notes })}
            placeholder="Enter the notes of the item"
          />
        </ZixFieldContainer>

        <ZixFieldContainer
          label='Advanced Options'
          labelBold
          collapsible
        >
          <YStack gap='$3'>
            <BoxDimension item={value} />

            <XStack alignItems='flex-start' gap='$3'>
              <ZixFieldContainer label="Length (CM)" isOptional error={error.dim_length}>
                <ZixInput
                  keyboardType="numeric"
                  value={value.dim_length}
                  onChangeText={dim_length => onChange({ ...value, dim_length })}
                />
              </ZixFieldContainer>

              <ZixFieldContainer label="Width (CM)" isOptional error={error.dim_width}>
                <ZixInput
                  keyboardType="numeric"
                  value={value.dim_width}
                  onChangeText={dim_width => onChange({ ...value, dim_width })}
                />
              </ZixFieldContainer>

              <ZixFieldContainer label="Height (CM)" isOptional error={error.dim_height}>
                <ZixInput
                  keyboardType="numeric"
                  value={value.dim_height}
                  onChangeText={dim_height => onChange({ ...value, dim_height })}
                />
              </ZixFieldContainer>
            </XStack>

            <ZixFieldContainer label="Approx Weight  (KG)" isOptional error={error.cap_weight}>
              <ZixInput
                keyboardType="numeric"
                value={value.cap_weight}
                onChangeText={cap_weight => onChange({ ...value, cap_weight })}
              />
            </ZixFieldContainer>

            <ZixFieldContainer label="Content" isOptional error={error.content}>
              <ZixInput
                value={value.content}
                onChangeText={content => onChange({ ...value, content })}
              />
            </ZixFieldContainer>
          </YStack>

        </ZixFieldContainer>

      </YStack>
    </ZixFieldContainer>
  )
}
