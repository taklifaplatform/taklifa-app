
import { useFieldInfo, useTsController } from '@ts-react/form';
import { z } from "zod";

import { Pen, Plus } from '@tamagui/lucide-icons';
import { CountryTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { Dimensions } from 'react-native';
import { Button, Separator, Text, Theme, View, XStack, YStack } from 'tamagui';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import ZixFieldContainer from '../../common/zix-field-container/zix-field-container';
import { ZixAutoCompleteField, ZixInput } from '../../fields';
import ZixMapPointerField from '../../fields/zix-map-pointer-field/zix-map-pointer-field';
import { GroupFieldsSheet } from '../../wrappers';
import { MapLocationPicker } from './map-location-picker';
import { DebugObject } from '@zix/ui/common';

export type AdvancedAddressFieldProps = {
  containerProps?: BaseFormFieldContainerProps;
}

const SCREEN_HEIGHT = Dimensions.get('screen').width;

export const AdvancedAddressSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  address: z.string(),
  address_complement: z.string().optional().nullable(),


  building_name: z.string().optional().nullable(),
  floor_number: z.string().optional().nullable(),
  house_number: z.string().optional().nullable(),
  postcode: z.string().optional().nullable(),

  notes: z.string().optional().nullable(),

  country_id: z.number(),
  state_id: z.number().optional().nullable(),
  city_id: z.number().optional().nullable(),
  phone_number: z.string(),
  is_primary: z.boolean().optional().nullable(),

  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
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

  const renderFormContent = () => (
    <YStack gap='$2'>
      <MapLocationPicker value={value} onChange={(val) => onChange({
        ...value,
        ...val
      })} />


      <ZixFieldContainer
        label='Position on Map'
        error={error?.latitude || error?.longitude}
      >
        <View height='$15'>
          <ZixMapPointerField
            value={value}
          />
        </View>
      </ZixFieldContainer>

      <Separator marginTop='$4' />

      <ZixFieldContainer
        label='Additional Information'
        labelBold
        collapsible
      >
        <YStack gap='$4'>
          <ZixFieldContainer
            label='Address'
            error={error?.address}
          >
            <ZixInput
              placeholder='Address'
              value={value?.address}
              onChangeText={address => onChange({
                ...value,
                address
              })}
            />
          </ZixFieldContainer>

          <ZixFieldContainer
            label='Building Name'
            isOptional
            error={error?.building_name}
          >
            <ZixInput
              placeholder='Enter Building Name...'
              value={value?.building_name}
              onChangeText={building_name => onChange({
                ...value,
                building_name
              })}
            />
          </ZixFieldContainer>

          <XStack alignItems='flex-start' gap='$4'>
            <ZixFieldContainer
              label='Floor Number'
              isOptional
              error={error?.floor_number}
            >
              <ZixInput
                placeholder='Enter Floor Number...'
                value={value?.floor_number}
                onChangeText={floor_number => onChange({
                  ...value,
                  floor_number
                })}
              />
            </ZixFieldContainer>

            <ZixFieldContainer
              label='House Number'
              isOptional
              error={error?.house_number}
            >
              <ZixInput
                placeholder='Enter House Number...'
                value={value?.house_number}
                onChangeText={house_number => onChange({
                  ...value,
                  house_number
                })}
              />
            </ZixFieldContainer>

          </XStack>
          <ZixFieldContainer
            label='Country'
            error={error?.country_id}
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

          <XStack alignItems='flex-start' gap='$4'>
            <ZixFieldContainer
              label='State'
              isOptional
              error={error?.state_id}
            >
              <ZixAutoCompleteField
                api="geography/states"
                query={{
                  country_id: value?.country_id
                }}
                value={value?.state_id}
                onChange={state_id => onChange({
                  ...value,
                  state_id
                })}
              />
            </ZixFieldContainer>

            <ZixFieldContainer
              label='City'
              isOptional
              error={error?.city_id}
            >
              <ZixAutoCompleteField
                api="geography/cities"
                query={{
                  country_id: value?.country_id
                }}
                value={value?.city_id}
                onChange={city_id => onChange({
                  ...value,
                  city_id
                })}
              />
            </ZixFieldContainer>
          </XStack>

        </YStack>
      </ZixFieldContainer>


      <Separator marginTop='$4' />

      <ZixFieldContainer
        label='Notes'
        labelBold
        collapsible
        error={error?.notes}
      >
        <ZixInput
          placeholder='Write any additional notes here...'
          isMultiline
          value={value?.notes}
          onChangeText={notes => onChange({
            ...value,
            notes
          })}
        />
      </ZixFieldContainer>
    </YStack>
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
          {renderFormContent()}
        </GroupFieldsSheet>

        {renderAddressMap()}

        <DebugObject object={error} />
      </YStack>
    </FormFieldContainer>
  );
}


export default AdvancedAddressField;
