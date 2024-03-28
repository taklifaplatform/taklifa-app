import { PlusSquare } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CustomerShipmentsService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { SchemaForm, SubmitButton, ZixFieldContainer, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader } from '@zix/ui/layouts';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Button, FormProvider, Separator, Theme, XStack, YStack } from 'tamagui';
import { z } from 'zod';
import ShipmentBoxDimension from '../../../components/shipment-manager/shipment-box-dimension/shipment-box-dimension';
import ShipmentManagerHeader from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../configs';

const { useParam } = createParam<{ shipment: string }>();

const SendFromSchema = z.object({
  items_type: formFields.text.describe('Shipment Type // Enter the type of the shipment'),
  items: z.array(z.object({
    images: formFields.medias.describe('Images // Upload images of the item'),
    notes: formFields.textarea.describe('Notes // Enter the notes of the item'),

    dim_height: formFields.text.describe('Height // Enter the height of the item').optional(),
    dim_width: formFields.text.describe('Width // Enter the width of the item').optional(),
    dim_length: formFields.text.describe('Length // Enter the length of the item').optional(),

    content: formFields.text.describe('Content // Enter the content of the item').optional(),
  })).describe('Items // Enter the items details'),

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

      return CustomerShipmentsService.retrieveShipment({
        shipment: shipmentId,
      });
    },
    queryKey: ['CustomerShipmentsService.retrieveShipment', `-${shipmentId}`],
  })

  const { mutate } = useMutation({
    mutationFn(requestBody: z.infer<typeof SendFromSchema>) {
      if (!shipmentId) {
        throw new Error('Shipment ID is required')
      }
      return CustomerShipmentsService.updateShipment({
        shipment: shipmentId,
        requestBody
      })
    },
    onSuccess(data, variables, context) {
      router.push(`${getUrlPrefix}/shipment-manager/${shipmentId}/items`)
      //
    },
    onError(error: any) {
      toast.show(error?.body?.message || 'An error occurred', { preset: 'error' })
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
      onSubmit={mutate}

      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>Confirm</SubmitButton>
        </Theme>
      )}
    >
      {({ items = [], ...fields }) => (
        <>
          <ShipmentManagerHeader
            activeStep={2}
            shipment={data?.data}
            title='الرجاء تحديد  الوجهة'
          />

          {Object.values(fields)}
          {
            items.map(({ images, notes, dim_width, dim_height, dim_length, ...item }, index) => (
              <>
                <ZixFieldContainer
                  key={index}
                  label={`Shipment Information ${index + 1}`}
                  labelBold
                  collapsible
                >
                  <YStack gap='$2'>
                    {images}
                    {notes}
                    <ZixFieldContainer
                      label='Advanced Options'
                      labelBold
                      collapsible
                    >
                      <YStack gap='$3'>
                        <ShipmentBoxDimension />

                        <XStack alignItems='flex-start' gap='$3'>
                          {dim_width}
                          {dim_height}
                          {dim_length}
                        </XStack>
                      </YStack>
                    </ZixFieldContainer>
                    {Object.values(item)}
                  </YStack>

                </ZixFieldContainer>
                <Separator marginTop='$4' />
              </>
            ))
          }
          <Button
            marginTop='$4'
            icon={PlusSquare}
            onPress={() => {
              const itemValues = form.getValues().items
              console.log('=========')
              console.log('items::', itemValues)
              console.log('=========')
              form.setValue('items', [...itemValues, { content: '' }])
            }}
          >
            Add Box
          </Button>
        </>
      )}
    </SchemaForm>
  )

  return (
    <>
      <AppHeader title='Shipment Details' showBackButton />
      {renderForm()}
      {renderLoading()}
    </>
  )
}

export default ManageShipmentItemsScreen;
