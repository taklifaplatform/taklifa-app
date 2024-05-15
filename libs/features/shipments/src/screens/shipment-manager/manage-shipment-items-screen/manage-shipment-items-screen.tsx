import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';
import ShipmentManagerHeader from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../configs';
import { t } from 'i18next';

const { useParam } = createParam<{ shipment: string }>();

const SendFromSchema = z.object({
  items_type: formFields.text.describe('Shipment Type // Enter the type of the shipment'),
  items: formFields.shipment_items.describe('Items // Enter the items details'),
})

export const ManageShipmentItemsScreen: React.FC = () => {
  const form = useForm<z.infer<typeof SendFromSchema>>()
  const router = useRouter()
  const { getUrlPrefix } = useAuth()
  const [shipmentId] = useParam('shipment');
  const toast = useToastController()

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

  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof SendFromSchema>) {
      if (!shipmentId) {
        throw new Error('Shipment ID is required')
      }
      return ShipmentService.updateShipment({
        shipment: shipmentId,
        requestBody
      })
    },
    onSuccess(data, variables, context) {
      toast.show('Shipment items updated successfully', { preset: 'success' })
      if (data?.data?.selected_driver_id || data?.data?.selected_company_id) {
        router.push(`${getUrlPrefix}/shipment-manager/${shipmentId}/summary`)
      } else {
        router.push(`${getUrlPrefix}/shipment-manager/${shipmentId}/assign-driver`)
      }

      //
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  })


  const renderLoading = () => shipmentId && !data?.data && (
    <FullScreenSpinner />
  )

  const renderForm = () => data?.data?.id && (
    <SchemaForm
      form={form}
      schema={SendFromSchema}
      props={{
        to_location: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
        deliver_date: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
        deliver_time: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
      }}
      defaultValues={{
        ...data.data,
        items: data?.data?.items?.length ? data.data.items : [{ content: '' }]
      }}
      onSubmit={mutateAsync}
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>Confirm</SubmitButton>
        </Theme>
      )}
    >
      {({ ...fields }) => (
        <>
          <ShipmentManagerHeader
            activeStep={2}
            shipment={data?.data}
            title='يرجى تحديد ما تقوم بشحنه'
          />

          {Object.values(fields)}
        </>
      )}
    </SchemaForm>
  )

  return (
    <ScreenLayout>
      <AppHeader title='Shipment Details' showBackButton />
      {renderForm()}
      {renderLoading()}
    </ScreenLayout>
  )
}

export default ManageShipmentItemsScreen;
