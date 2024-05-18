
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LocationService } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import {
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  ZixMapLocationPickerField,
  formFields,
  handleFormErrors
} from '@zix/ui/forms';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Separator, Theme, XStack, YStack } from 'tamagui';
import { z } from 'zod';

const { useParam } = createParam<{ location: string }>();


const LocationManagerSchema = z
  .object({
    latitude: z.number(),
    longitude: z.number(),
    address: formFields.textarea.describe(
      `${t('app:forms.labels.address')} // ${t('app:forms.placeholders.address')}`
    ),
    building_name: formFields.text.describe(
      `${t('app:forms.labels.building-name')} // ${t('app:forms.placeholders.building-name')}`
    ).optional().nullable(),
    floor_number: formFields.text.describe(
      `${t('app:forms.labels.floor-number')} // ${t('app:forms.placeholders.floor-number')}`
    ).optional().nullable(),
    house_number: formFields.text.describe(
      `${t('app:forms.labels.house-number')} // ${t('app:forms.placeholders.house-number')}`
    ).optional().nullable(),

    country_id: formFields.country.describe(
      `${t('app:forms.labels.country')} // ${t('app:forms.placeholders.country')}`
    ),
    state_id: formFields.autocomplete.describe(
      `${t('app:forms.labels.state')} // ${t('app:forms.placeholders.state')}`
    ).optional().nullable(),
    city_id: formFields.autocomplete.describe(
      `${t('app:forms.labels.city')} // ${t('app:forms.placeholders.city')}`
    ).optional().nullable(),
    notes: formFields.textarea.describe(
      `${t('app:forms.labels.notes')} // ${t('app:forms.placeholders.notes')}`
    ).optional().nullable(),

  });

export function LocationManagerScreen() {
  const [locationId] = useParam('location');

  const form = useForm<z.infer<typeof LocationManagerSchema>>();
  const toast = useToastController();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () => LocationService.retrieve({
      location: locationId,
    }),
    queryKey: ['LocationService.retrieve', locationId],
  })

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody) => LocationService.update({
      location: locationId,
      requestBody,
    }),
    onSuccess({ data }) {
      toast.show(t('app:success.updated'))
      queryClient.refetchQueries({
        queryKey: ['LocationService.retrieve', locationId],
      });
      router.back()
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' })
      handleFormErrors(form, error?.body?.errors);
    },
  })

  const renderForm = () => !!data?.data && (
    <SchemaForm
      form={form}
      schema={LocationManagerSchema}
      defaultValues={data?.data}
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
          <ZixMapLocationPickerField
            value={data?.data} onChange={(val) => {
              console.log("location manager screen: location ob:: ", val)
              Object.keys(val).forEach(key => {
                form.setValue(key, val[key])
              })
            }}
          />
          <Separator marginTop="$4" />

          <ZixFieldContainer
            label={t('common:address-information')}
            labelBold
            collapsible
          >
            <YStack gap="$4">
              {address}
              {building_name}
              <XStack alignItems="flex-start" gap="$4">
                {floor_number}
                {house_number}
              </XStack>
              {country_id}
              <XStack alignItems="flex-start" gap="$4">
                {state_id}
                {city_id}
              </XStack>

            </YStack>

          </ZixFieldContainer>
          {notes}
        </YStack>
      )}
    </SchemaForm>
  )

  const renderLoadingScreen = () => !data?.data && (
    <FullScreenSpinner />
  )
  return (
    <>
      <AppHeader showBackButton title={t('app:common.location')} />
      {renderForm()}
      {renderLoadingScreen()}
    </>
  );
}



export default LocationManagerScreen;
