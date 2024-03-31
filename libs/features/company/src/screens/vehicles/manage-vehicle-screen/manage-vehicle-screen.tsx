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
    image: formFields.image.describe('Image // Add Vehicle Main Images'),
    images: formFields.medias.describe('Images // Add Vehicle Images'),
    internal_id: formFields.text.describe('Internal ID // Enter Vehicle Internal ID').optional().nullable(),
    color: formFields.text.describe('Color // Enter Vehicle Color'),
    plate_number: formFields.text.describe('Plate Number // Enter Vehicle Plate Number'),
    vin_number: formFields.text.describe('VIN Number // Enter Vehicle VIN Number').optional().nullable(),
    // TODO: missing model
    year: formFields.text.describe('Year // Enter Vehicle Year'),

    information: z.object({
      body_type: formFields.text.describe('Body Type // Enter Vehicle Body Type').optional().nullable(),
      steering_wheel: formFields.text.describe('Steering Wheel // Enter Vehicle Steering Wheel').optional().nullable(),
      doors_count: formFields.text.describe('Doors Count // Enter Vehicle Doors Count').optional().nullable(),
      seats_count: formFields.text.describe('Seats Count // Enter Vehicle Seats Count').optional().nullable(),
      top_speed: formFields.text.describe('Top Speed // Enter Vehicle Top Speed').optional().nullable(),
    }),

    fuel_information: z.object({
      fuel_type: formFields.text.describe('Fuel Type // Enter Vehicle Fuel Type').optional().nullable(),
      fuel_capacity: formFields.text.describe('Fuel Capacity // Enter Vehicle Fuel Capacity').optional().nullable(),
      liter_per_km_in_city: formFields.text.describe('Liter Per KM In City // Enter Vehicle Liter Per KM In City').optional().nullable(),
      liter_per_km_in_highway: formFields.text.describe('Liter Per KM In Highway // Enter Vehicle Liter Per KM In Highway').optional().nullable(),
      liter_per_km_mixed: formFields.text.describe('Liter Per KM Mixed // Enter Vehicle Liter Per KM Mixed').optional().nullable(),
    }),

    capacity_dimensions: z.object({
      width: formFields.text.describe('Width // Enter Vehicle Width').optional().nullable(),
      height: formFields.text.describe('Height // Enter Vehicle Height').optional().nullable(),
      length: formFields.text.describe('Length // Enter Vehicle Length').optional().nullable(),
      unit: formFields.text.describe('Unit // Enter Vehicle Unit').optional().nullable(),
    }),
    capacity_weight: z.object({
      weight: formFields.text.describe('Weight // Enter Vehicle Weight').optional().nullable(),
      unit: formFields.text.describe('Unit // Enter Vehicle Unit').optional().nullable(),
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
            label='Vehicle Information'
            labelBold
            collapsible
          >
            {Object.values(fields)}
          </ZixFieldContainer>
          <ZixFieldContainer
            label='Vehicle Type'
            labelBold
            collapsible
            isOptional
          >
            {Object.values(information)}
          </ZixFieldContainer>

          <ZixFieldContainer
            label='Fuel Information'
            labelBold
            collapsible
            isOptional
          >
            {Object.values(fuel_information)}
          </ZixFieldContainer>

          <ZixFieldContainer
            label='Dimensions'
            labelBold
            collapsible
            isOptional
          >
            {Object.values(capacity_dimensions)}
          </ZixFieldContainer>

          <ZixFieldContainer
            label='Capacity Weight'
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
        title={vehicleId ? 'Edit Vehicle' : 'Add Vehicle'}
      />
      {renderForm()}
      {renderLoading()}
    </>
  )
};

export default ManageVehicleScreen;
