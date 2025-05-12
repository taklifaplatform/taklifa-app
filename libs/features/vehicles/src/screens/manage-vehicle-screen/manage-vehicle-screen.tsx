import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useToastController } from '@tamagui/toast';
import { VehicleModelTransformer, VehiclesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import {
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Image, Theme } from 'tamagui';
import { z } from 'zod';

const ManageVehicleFormSchema = z
  .object({
    // image: formFields.image.describe(t('forms:vehicle-image')),
    images: formFields.medias.describe(t('forms:images')),
    model_id: formFields.autocomplete.describe(t('forms:vehicle-model')),
    // internal_id: formFields.text.describe(t('forms:vehicle-internal-id')).optional().nullable(),
    color: formFields.text.describe(t('forms:color')),
    plate_number: formFields.text.describe(t('forms:plate-number')),
    year: formFields.number.describe(t('forms:vehicle-year')),
    vin_number: formFields.text.describe(t('forms:vin-number')).optional().nullable(),
    // TODO: missing model

    information: z.object({
      // body_type: formFields.text.describe(t('forms:body-type')).optional().nullable(),
      // steering_wheel: formFields.text.describe(t('forms:steering-wheel')).optional().nullable(),
      doors_count: formFields.number.describe(t('forms:doors-count')).optional().nullable(),
      seats_count: formFields.number.describe(t('forms:seats-count')).optional().nullable(),
      top_speed: formFields.number.describe(t('forms:top-speed')).optional().nullable(),
    }),

    // // fuel_information: z.object({
    // //   fuel_type: formFields.text.describe(t('forms:fuel-type')).optional().nullable(),
    // //   fuel_capacity: formFields.float.describe(t('forms:fuel-capacity')).optional().nullable(),
    // //   liter_per_km_in_city: formFields.float.describe(t('forms:liter-per-km-in-city')).optional().nullable(),
    // //   liter_per_km_in_highway: formFields.float.describe(t('forms:liter-per-km-in-highway')).optional().nullable(),
    // //   liter_per_km_mixed: formFields.float.describe(t('forms:liter-per-km-in-combined')).optional().nullable(),
    // // }),

    capacity_dimensions: z.object({
      width: formFields.float.describe(t('forms:vehicle-width')).optional().nullable(),
      height: formFields.float.describe(t('forms:vehicle-height')).optional().nullable(),
      length: formFields.float.describe(t('forms:vehicle-length')).optional().nullable(),
      unit: formFields.text.describe(t('forms:unit')).optional().nullable(),
    }),
    capacity_weight: z.object({
      weight: formFields.float.describe(t('forms:vehicle-capacity-weight')).optional().nullable(),
      unit: formFields.text.describe(t('forms:unit')).optional().nullable(),
    }),
  });

const { useParam } = createParam<{ vehicle?: string }>();


export const ManageVehicleScreen: React.FC = () => {
  const [vehicleId] = useParam('vehicle');
  const form = useForm<z.infer<typeof ManageVehicleFormSchema>>();
  const { user, refetchUser } = useAuth();
  const toast = useToastController();

  const router = useRouter();

  // useEffect(() => {
  //   console.log('form.getValues::', form.getValues('color'))
  // }, [form])

  const { data } = useQuery({
    queryFn: () => VehiclesService.retrieveVehicle({
      vehicle: vehicleId || '',
    }),
    queryKey: ['VehiclesService.retrieveVehicle', `-${vehicleId}`]
  })

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (requestBody: z.infer<typeof ManageVehicleFormSchema>) => {
      // console.log('requestBody::', JSON.stringify(requestBody, null, 2))
      // console.log('form.getValues::', form.getValues())
      // console.log('form.getValues->model_id::', form.getValues('model_id'))
      // if (!requestBody.model_id) {
      //   throw new Error('Model is required');
      //   return;
      // }

      if (vehicleId) {
        return await VehiclesService.updateVehicle({
          vehicle: vehicleId,
          requestBody,
        });
      }

      return await VehiclesService.createVehicle({
        requestBody,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['CompanyVehiclesService.list', user?.active_company?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['VehiclesService.fetchAllVehicles', user?.active_role?.id, user?.active_company?.id],
      });
      // refresh after 5 seconds
      queryClient.invalidateQueries({
        queryKey: ['DriversService.fetchAllDrivers'],
      })
      // reset form
      toast.show('Vehicle Updated Successfully!');
      form.reset();
      refetchUser();
      router.replace('/app');
    },
    onError(error: any) {
      console.log('============')
      console.log('onError::', JSON.stringify(error, null, 2))
      console.log('============')
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  const renderLoading = () => (!data?.data?.id && vehicleId) && (
    <FullScreenSpinner />
  )

  const renderForm = () => (!!data?.data?.id || !vehicleId) && (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={ManageVehicleFormSchema}
        defaultValues={data?.data || {}}
        props={{
          model_id: {
            api: 'vehicle-models',
            dataMapper: (item: VehicleModelTransformer) => ({
              id: item.id,
              name: item.name,
              icon: item?.map_icon ? (
                <Image
                  source={{ uri: item.map_icon.url }}
                  resizeMode='contain'
                  style={{ width: 30, height: 25 }}
                />
              ) : null
            }),
          },
        }}
        onSubmit={async (variables) => {
          console.log('variables::', JSON.stringify(variables, null, 2));
          await mutateAsync(variables);
        }}
        renderAfter={({ submit }) => {
          return (
            <Theme inverse>
              <SubmitButton loading={isPending} onPress={() => {
                console.log('submit::')
                // return submit()
                mutateAsync(form.getValues())
                // submit()
              }}>
                {t('common:next')}
              </SubmitButton>
            </Theme>
          );
        }}
      >
        {({ information, fuel_information, capacity_dimensions, capacity_weight, ...fields }) => (
          <>
            <ZixFieldContainer
              label={t('common:vehicle-information')}
              labelBold
              collapsible
            >
              {Object.values(fields)}
            </ZixFieldContainer>
            <ZixFieldContainer
              label={t('common:vehicle-type')}
              labelBold
              collapsible
              isOptional
            >
              {Object.values(information)}
            </ZixFieldContainer>

            {/* <ZixFieldContainer
            label={t('common:fuel-information')}
            labelBold
            collapsible
            isOptional
          >
            {Object.values(fuel_information)}
          </ZixFieldContainer> */}

            <ZixFieldContainer
              label={t('common:dimensions')}
              labelBold
              collapsible
              isOptional
            >
              {Object.values(capacity_dimensions)}
            </ZixFieldContainer>

            <ZixFieldContainer
              label={t('common:capacity-weight')}
              labelBold
              collapsible
              isOptional
            >
              {Object.values(capacity_weight)}
            </ZixFieldContainer>

          </>
        )}
      </SchemaForm>
    </FormProvider>
  );

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader
        showBackButton
        title={vehicleId ? t('common:edit-vehicle') : t('common:add-vehicle')}
      />
      {/* <DebugObject object={data?.data} /> */}
      {renderForm()}
      {renderLoading()}
    </ScreenLayout>
  )
};

export default ManageVehicleScreen;
