import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { FormProvider, Theme } from 'tamagui';
import { z } from 'zod';
import { ShipmentManagerHeader } from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../configs';
import moment from 'moment';

const { useParam } = createParam<{
  shipment?: string,
  selected_driver_id?: string,
  selected_company_id?: string,
}>();

const CreateShipmentSchema = z.object({
  from_location_id: formFields.advanced_location.describe(
    `${t('app:forms.labels.shipping-from')} // ${t('app:forms.placeholders.shipping-from')}`
  ),
  pick_date: formFields.row_date_picker.describe(
    `${t('app:forms.labels.date')} // ${t('app:forms.placeholders.date')}`
  ),
  pick_time: formFields.row_time_range_picker.describe(
    `${t('app:forms.labels.time')} // ${t('app:forms.placeholders.time')}`
  ).optional(),
})

export function ManageShipmentSenderScreen() {
  const form = useForm<z.infer<typeof CreateShipmentSchema>>()
  const router = useRouter()
  const toast = useToastController()
  const { getUrlPrefix } = useAuth()
  const [shipmentId] = useParam('shipment');
  const [selectedDriverId] = useParam('selected_driver_id');
  const [selectedCompanyId] = useParam('selected_company_id');

  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof CreateShipmentSchema>) {
      if (shipmentId) {
        return ShipmentService.updateShipment({
          shipment: shipmentId,
          requestBody
        })
      }
      const invitations = []
      if (selectedDriverId) {
        invitations.push({ driver_id: selectedDriverId })
      }
      if (selectedCompanyId) {
        invitations.push({ company_id: selectedCompanyId })
      }
      return ShipmentService.storeShipment({
        requestBody: {
          ...requestBody,
          invitations,
          selected_driver_id: selectedDriverId,
          selected_company_id: selectedCompanyId,
        }
      })
    },
    onSuccess(data, variables, context) {
      if (!data.data?.id) {
        toast.show(t('app:errors.something-went-wrong'), { preset: 'error' })
        return
      }

      if (shipmentId) {
        router.push(`${getUrlPrefix}/shipment-manager/${data.data.id}`)
      }
      router.push(`${getUrlPrefix}/shipment-manager/${data.data.id}/recipient`)
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' })
      handleFormErrors(form, error?.body?.errors);
    },
  })

  const { data } = useQuery({
    queryFn() {
      if (!shipmentId) {
        return { data: {} };
      }

      return ShipmentService.retrieveShipment({
        shipment: shipmentId,
      });
    },
    queryKey: ['ShipmentService.retrieveShipment', `-${shipmentId}`],
  })

  const shipment = useMemo(() => ({
    selected_driver_id: selectedDriverId,
    selected_company_id: selectedCompanyId,
    ...(data?.data || {
      pick_date: moment().toDate(),
      drop_date: moment().toDate(),
    }),
  }), [data?.data, selectedDriverId, selectedCompanyId])


  if (shipmentId && !data?.data) {
    return <FullScreenSpinner />
  }

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader title={t('app:shipment-manager.sender.title')} showBackButton />
      <FormProvider {...form}>
        <SchemaForm
          form={form}
          schema={CreateShipmentSchema}
          props={{
            from_location: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
            pick_date: {
              ...SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
              min_date: moment().toDate()
            },
            pick_time: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
          }}
          defaultValues={shipment}
          onSubmit={mutateAsync}
          renderAfter={({ submit }) => (
            <Theme inverse>
              <SubmitButton onPress={() => submit()}>
                {t('common:next')}
              </SubmitButton>
            </Theme>
          )}
        >
          {(fields) => (
            <>
              <ShipmentManagerHeader
                activeStep={1}
                shipment={shipment}
                title={t('app:shipment-manager.sender.description')}
              />
              {Object.values(fields)}
            </>
          )}
        </SchemaForm>
      </FormProvider>
    </ScreenLayout>
  )
}

export default ManageShipmentSenderScreen;
