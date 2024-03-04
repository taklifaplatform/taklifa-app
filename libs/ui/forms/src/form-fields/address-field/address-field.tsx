
import { useFieldInfo, useTsController } from '@ts-react/form';
import { z } from "zod";

import { LocateFixed } from '@tamagui/lucide-icons';
import { CountryTransformer } from '@zix/api';
import { FormFieldContainer } from '../../common';
import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';
import { ZixAutoCompleteField, ZixInput } from '../../fields';
import ZixMapPointerField from '../../fields/zix-map-pointer-field/zix-map-pointer-field';
import { GroupFieldsSheet } from '../../wrappers';
import { View, YStack } from 'tamagui';

/* eslint-disable-next-line */
export interface AddressFieldProps {
}

export const AddressSchema = z.object({
  address: z.string(),
  country_id: z.string(),
  // city_id: z.string(),
  // state_id: z.string(),
  // address_complement: z.string(),
  // postcode: z.string(),
  // latitude: z.number(),
  // longitude: z.number(),
})

export function AddressField(props: AddressFieldProps) {
  const { field: { onChange, value }, error } = useTsController<z.infer<typeof AddressSchema>>();
  const { placeholder } = useFieldInfo()

  return (
    <FormFieldContainer>
      <GroupFieldsSheet
        title='Address Information'
        activator={
          <ZixInput
            rightIcon={(props) => <LocateFixed {...props} />}
            placeholder={placeholder}
            value={value?.address}
          />
        }
      >
        <YStack gap='$2'>
          <ZixFieldContainer
            label='Please Enter your detailed Address'
          >
            <ZixInput
              rightIcon={(props) => <LocateFixed {...props} />}
              placeholder={placeholder}
              value={value?.address}
              onChangeText={address => onChange({
                ...value,
                address
              })}
            />
          </ZixFieldContainer>

          <ZixFieldContainer
            label='Position on Map'
          >
            <View height='$15'>
              <ZixMapPointerField
                value={value}
                onChange={location => onChange({
                  ...value,
                  ...location
                })}
              />
            </View>
          </ZixFieldContainer>

          <ZixFieldContainer
            label='Country'
          >
            <ZixAutoCompleteField
              api="geography/countries"
              value={value?.country_id}
              dataMapper={(item: CountryTransformer) => ({
                id: `${item.id}`,
                name: item.name,
                icon: item.flag,
              })}
              onChange={country_id => onChange({
                ...value,
                country_id
              })}
            />
          </ZixFieldContainer>
        </YStack>
      </GroupFieldsSheet>
    </FormFieldContainer>
  );
}


export default AddressField;
