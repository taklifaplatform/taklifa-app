
import { useToastController } from '@tamagui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LocationService, LocationTransformer } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import {
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  ZixMapLocationPickerField,
  formFields,
  handleFormErrors
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Separator, Theme, YStack } from 'tamagui';
import { z } from 'zod';



const LocationManagerSchema = z
  .object({
    latitude: z.number(),
    longitude: z.number(),
    address: formFields?.textarea?.describe(
      `${t('app:forms.labels.address')} // ${t('app:forms.placeholders.address')}`
    ),
    // building_name: formFields?.text?.describe(
    //   `${t('app:forms.labels.building-name')} // ${t('app:forms.placeholders.building-name')}`
    // ).optional().nullable(),
    // floor_number: formFields?.text?.describe(
    //   `${t('app:forms.labels.floor-number')} // ${t('app:forms.placeholders.floor-number')}`
    // ).optional().nullable(),
    // house_number: formFields?.text?.describe(
    //   `${t('app:forms.labels.house-number')} // ${t('app:forms.placeholders.house-number')}`
    // ).optional().nullable(),

    country_id: formFields?.country?.describe(
      `${t('app:forms.labels.country')} // ${t('app:forms.placeholders.country')}`
    ),
    // city_id: formFields?.autocomplete?.describe(
    //   `${t('app:forms.labels.city')} // ${t('app:forms.placeholders.city')}`
    // ).optional().nullable(),
    // notes: formFields?.textarea?.describe(
    //   `${t('app:forms.labels.notes')} // ${t('app:forms.placeholders.notes')}`
    // ).optional().nullable(),

  });

export type LocationManagerProps = {
  location: LocationTransformer,
  onComplete?: () => void;
}
// extract
export const LocationManager: React.FC<LocationManagerProps> = ({
  location,
  onComplete
}) => {

  const form = useForm<z.infer<typeof LocationManagerSchema>>();
  const toast = useToastController();
  const queryClient = useQueryClient();

  function onGoBack() {
    onComplete?.()
  }

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody) => LocationService.update({
      location: location.id,
      requestBody,
    }),
    onSuccess({ data }) {
      toast.show(t('app:success.updated'))
      queryClient.refetchQueries({
        queryKey: ['LocationService.retrieve', location.id],
      });
      console.log("location manager screen: data:: ", data)
      onGoBack()
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' })
      handleFormErrors(form, error?.body?.errors);
    },
  })

  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowMap(true)
    }
      , 3000)
  }, [location])

  const renderForm = () => !!location && (
    <SchemaForm
      form={form}
      schema={LocationManagerSchema}
      defaultValues={location}
      props={{
        notes: {
          containerProps: {
            labelBold: true,
            collapsible: true,
          }
        },
        state_id: {
          api: 'geography/states',
        },
        city_id: {
          api: 'geography/cities',
        }
      }}
      onSubmit={mutateAsync}
      renderAfter={({ submit }) => {
        return (
          <Theme inverse>
            <SubmitButton
              onPress={() => submit()}
            >
              {t('common:confirm')}
            </SubmitButton>
          </Theme>
        );
      }}
    >
      {({ address, building_name, floor_number, house_number, country_id, state_id, city_id, notes }) => (
        <YStack gap="$2">
          {showMap ? <ZixMapLocationPickerField
            value={location} onChange={(val) => {
              Object.keys(val).forEach(key => {
                form.setValue(key, val[key])
              })
            }}
          /> : null}
          <Separator marginTop="$4" />

          <ZixFieldContainer
            label={t('common:address-information')}
            labelBold
            collapsible
          >
            <YStack gap="$4">
              {address}
              {country_id}
              {/* {building_name}
              <XStack alignItems="flex-start" gap="$4">
                {floor_number}
                {house_number}
              </XStack>
              
              <XStack alignItems="flex-start" gap="$4">
                {state_id}
              </XStack> */}

            </YStack>

          </ZixFieldContainer>
          {/* {notes} */}
        </YStack>
      )}
    </SchemaForm>
  )

  const renderLoadingScreen = () => !location && (
    <FullScreenSpinner />
  )
  return (

    <ScreenLayout>
      <AppHeader showBackButton goBack={onGoBack} title={t('app:common.location')} />
      {renderForm()}
      {renderLoadingScreen()}
    </ScreenLayout>
  );
}



export default LocationManager;
