import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import { useToastController } from '@tamagui/toast';
import { VehiclesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import {
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

const ManageVehicleFormSchema = z
  .object({
    image: formFields.image.describe(t('forms:vehicle-image')),
    images: formFields.medias.describe(t('forms:images')),
    internal_id: formFields.text.describe(t('forms:vehicle-internal-id')).optional().nullable(),
    color: formFields.text.describe(t('forms:color')),
    plate_number: formFields.text.describe(t('forms:plate-number')),
    vin_number: formFields.text.describe(t('forms:vin-number')).optional().nullable(),
    // TODO: missing model
    year: formFields.number.describe(t('forms:vehicle-year')),

    information: z.object({
      body_type: formFields.text.describe(t('forms:body-type')).optional().nullable(),
      steering_wheel: formFields.text.describe(t('forms:steering-wheel')).optional().nullable(),
      doors_count: formFields.number.describe(t('forms:doors-count')).optional().nullable(),
      seats_count: formFields.number.describe(t('forms:seats-count')).optional().nullable(),
      top_speed: formFields.number.describe(t('forms:top-speed')).optional().nullable(),
    }),

    fuel_information: z.object({
      fuel_type: formFields.text.describe(t('forms:fuel-type')).optional().nullable(),
      fuel_capacity: formFields.number.describe(t('forms:fuel-capacity')).optional().nullable(),
      liter_per_km_in_city: formFields.number.describe(t('forms:liter-per-km-in-city')).optional().nullable(),
      liter_per_km_in_highway: formFields.number.describe(t('forms:liter-per-km-in-highway')).optional().nullable(),
      liter_per_km_mixed: formFields.number.describe(t('forms:liter-per-km-in-combined')).optional().nullable(),
    }),

    capacity_dimensions: z.object({
      width: formFields.number.describe(t('forms:vehicle-width')).optional().nullable(),
      height: formFields.number.describe(t('forms:vehicle-height')).optional().nullable(),
      length: formFields.number.describe(t('forms:vehicle-length')).optional().nullable(),
      unit: formFields.text.describe(t('forms:unit')).optional().nullable(),
    }),
    capacity_weight: z.object({
      weight: formFields.number.describe(t('forms:vehicle-capacity-weight')).optional().nullable(),
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

  const { data } = useQuery({
    queryFn: () => VehiclesService.retrieveVehicle({
      vehicle: vehicleId || '',
    }),
    queryKey: ['VehiclesService.retrieveVehicle', `-${vehicleId}`]
  })

  const { mutate } = useMutation({
    async mutationFn(requestBody: z.infer<typeof ManageVehicleFormSchema>) {
      console.log('============')
      console.log('mutationFn::', JSON.stringify(requestBody, null, 2))
      console.log('============')
      if (vehicleId) {
        return VehiclesService.updateVehicle({
          vehicle: vehicleId,
          requestBody,
        });
      }

      return VehiclesService.createVehicle({
        requestBody,
      });
    },
    onSuccess() {
      refetchUser();
      toast.show('Company Updated Successfully!');
      router.back();
    },
    onError(error: any) {
      console.log('============')
      console.log('onError::', JSON.stringify(error, null, 2))
      console.log('============')
      toast.show(error?.body?.message || 'Failed to update company');
      handleFormErrors(form, error?.body?.errors);
    },
  });

  const renderLoading = () => (!data?.data?.id && vehicleId) && (
    <FullScreenSpinner />
  )

  const renderForm = () => (!!data?.data?.id || !vehicleId) && (
    <SchemaForm
      form={form}
      schema={ManageVehicleFormSchema}
      defaultValues={data?.data || {}}
      onSubmit={mutate}
      renderAfter={({ submit }) => {
        return (
          <Theme inverse>
            <SubmitButton onPress={() => submit()}>
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

          <ZixFieldContainer
            label={t('common:fuel-information')}
            labelBold
            collapsible
            isOptional
          >
            {Object.values(fuel_information)}
          </ZixFieldContainer>

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
  );

  return (
    <>
      <AppHeader
        showBackButton
        title={vehicleId ? t('common:edit-vehicle') :  t('common:add-vehicle')}
      />
      {renderForm()}
      {renderLoading()}
    </>
  )
};

export default ManageVehicleScreen;
