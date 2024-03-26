
import { useFieldInfo, useTsController } from '@ts-react/form';
import { z } from "zod";

import { LocateFixed, Pen, Plus } from '@tamagui/lucide-icons';
import { CountryTransformer, GeographyService, UserLocationsService } from '@zix/api';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';
import { ZixAutoCompleteField, ZixInput } from '../../fields';
import ZixMapPointerField from '../../fields/zix-map-pointer-field/zix-map-pointer-field';
import { GroupFieldsSheet } from '../../wrappers';
import { View, XStack, YStack, Text, Theme, Button } from 'tamagui';
import { DebugObject } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useQuery } from '@tanstack/react-query';

export type AdvancedAddressFieldProps = {
  containerProps?: BaseFormFieldContainerProps;
}

export const AdvancedAddressSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string(),
  country_id: z.string(),
  phone_number: z.string(),
  is_primary: z.boolean(),
  // city_id: z.string(),
  // state_id: z.string(),
  // address_complement: z.string(),
  // postcode: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export const AdvancedAddressField: React.FC<AdvancedAddressFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const { field: { onChange, value }, error } = useTsController<z.infer<typeof AdvancedAddressSchema>>();
  const { placeholder } = useFieldInfo()


  const renderAddressCard = () => value?.id && (
    <YStack
      borderWidth='$0.5'
      borderColor='$color8'
      borderRadius='$4'
      padding='$2'
      gap='$2'
      height='$10'
      flex={1}
    >
      <XStack justifyContent='space-between' alignItems='center'>
        <XStack alignItems='center' gap='$2'>
          <Theme name='accent'>
            <CustomIcon name='location' size='$1' color='$color9' />
          </Theme>
          <Text fontWeight='700'>{value?.name ?? 'Home'}</Text>
        </XStack>

        <XStack alignItems='center' gap='$2'>
          <View
            theme={value?.is_primary ? 'accent' : undefined}
            backgroundColor='$color4'
            paddingHorizontal='$4'
            paddingVertical='$2'
            borderRadius='$3'
          >
            <Text fontWeight='700'>
              {value?.is_primary ? 'Primary' : 'Secondary'}
            </Text>
          </View>
          <Button
            size='$2'
            icon={Pen}
          />
        </XStack>

      </XStack>
      {
        value?.address && (
          <Text>
            {value?.address}
          </Text>
        )
      }

      {
        value?.phone_number && (
          <Text>
            {value?.phone_number}
          </Text>
        )
      }

      {/* <DebugObject object={value} /> */}
    </YStack>
  )

  const renderAddressMap = () => value?.latitude && value?.longitude && (
    <View height='$12'>
      <ZixMapPointerField
        value={value}
      />
    </View>
  )

  const renderAddButton = () => !value?.id && (
    <Button
      icon={Plus}
    >
      Add Address
    </Button>
  )

  return (
    <FormFieldContainer {...containerProps}>
      <YStack gap='$2'>
        <GroupFieldsSheet
          title='Address Information'
          activator={(
            <>
              {renderAddressCard()}
              {renderAddButton()}
            </>
          )}
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

        {renderAddressMap()}

        {/* <DebugObject object={value} /> */}
      </YStack>
    </FormFieldContainer>
  );
}


export default AdvancedAddressField;
