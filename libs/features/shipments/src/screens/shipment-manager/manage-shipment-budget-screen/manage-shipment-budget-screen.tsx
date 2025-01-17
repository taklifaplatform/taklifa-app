import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SchemaForm, SubmitButton, ZixFieldContainer, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Button, Theme, YStack } from 'tamagui';
import { z } from 'zod';
import ShipmentManagerHeader from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../configs';
import { t } from 'i18next';

const { useParam } = createParam<{ shipment: string }>();

const SendFromSchema = z.object({
  min_budget: formFields.money.describe(t('common:min-budget')),
  max_budget: formFields.money.describe(t('common:max-budget')),

})

export const ManageShipmentBudgetScreen: React.FC = () => {
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
      onGoNext()
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  })

  function onGoNext() {
    router.push(`${getUrlPrefix}/shipment-manager/${shipmentId}/summary`)
  }

  const renderLoadingSpinner = () => !data?.data && (
    <FullScreenSpinner />
  )

  const renderForm = () => data?.data?.id && (
    <SchemaForm
      form={form}
      schema={SendFromSchema}
      defaultValues={{
        min_budget: data?.data?.min_budget || 0,
        max_budget: data?.data?.max_budget || 0,
      }}
      placeholderValues={{
        min_budget: data?.data?.min_budget || 0,
        max_budget: data?.data?.max_budget || 0,
      }}
      onSubmit={mutateAsync}
      renderAfter={({ submit }) => (
        <YStack gap='$4'>
          <Theme inverse>
            <SubmitButton onPress={() => submit()}>
              {t('common:next')}
            </SubmitButton>
          </Theme>
          <Button onPress={() => onGoNext()}>
            {t('common:skip')}
          </Button>
        </YStack>
      )}
    >
      {(fields) => (
        <>
          <ShipmentManagerHeader
            activeStep={5}
            shipment={data?.data}
            title='يرجى تحديد السعر المناسب لك'
          />

          <ZixFieldContainer
            label={t('common:shipment-budget')}
            {...SHARED_SHIPMENT_MANAGER_FIELD_PROPS.containerProps}
          >
            {Object.values(fields)}
          </ZixFieldContainer>

        </>
      )}
    </SchemaForm>
  )

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader title={t('common:shipment-budget')} showBackButton />
      {renderForm()}
      {renderLoadingSpinner()}
    </ScreenLayout>
  )
}

export default ManageShipmentBudgetScreen;
