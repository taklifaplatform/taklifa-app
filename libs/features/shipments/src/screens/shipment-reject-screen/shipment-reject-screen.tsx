import { Check } from '@tamagui/lucide-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DriverShipmentsService } from '@zix/api';
import { SchemaForm, SubmitButton, formFields } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import {
  FormProvider,
  Separator,
  Stack,
  Text,
  Theme,
  XStack,
  YStack,
} from 'tamagui';
import { z } from 'zod';

export type ShipmentRejectScreenProps = {
  variant: 'shipments' | 'jobs'
}

const { useParam } = createParam<{ shipment: string }>();
const CancelShipmentSchema = z.object({
  raison: formFields.autocomplete.describe(t('forms:reason-for-cancel')),
  message: formFields.textarea.describe(t('forms:message-to-customer')),
});


export const ShipmentRejectScreen: React.FC<ShipmentRejectScreenProps> = (props) => {
  const [shipmentId] = useParam('shipment');
  const { data } = useQuery({
    queryKey: ['DriverShipmentsService.retrieveShipment', { id: shipmentId }],
    queryFn: () =>
      DriverShipmentsService.retrieveShipment({
        shipment: shipmentId || '',
      }),
  });
  const shipment = data?.data;

  const form = useForm<z.infer<typeof CancelShipmentSchema>>();
  const { mutate } = useMutation({});
  return (
    <>
      <AppHeader showBackButton title="Cancellation Details " />
      <FormProvider {...form}>
        <SchemaForm
          form={form}
          schema={CancelShipmentSchema}
          defaultValues={{
            email: '',
            message: '',
          }}
          onSubmit={mutate}
          renderBefore={() => (
            <YStack gap="$6" paddingHorizontal="$5">
              <Stack alignItems="center" paddingVertical="$4">
                <CustomIcon name="alert_cercle" size={'$12'} />
              </Stack>
              <XStack justifyContent="space-between" alignItems="flex-end">
                <YStack gap="$2" alignItems="flex-start">
                  <Text fontSize={18} fontWeight={'600'} color={'$red9'}>
                    {t('forms:cancel-service')}{' '}
                  </Text>
                  <Text fontSize={18} fontWeight={'400'} color={'$color'}>
                    {t('job:job-demand')}{' '}
                    {t('shipment:type:' + shipment?.items_type)}
                  </Text>
                </YStack>
                <Text
                  fontSize={18}
                  fontWeight={'400'}
                  color={'$color'}
                  width={100}
                  numberOfLines={1}
                >
                  {shipment?.id}
                </Text>
              </XStack>
              <Separator borderColor={'$gray7'} width={'100%'} />
            </YStack>
          )}
          renderAfter={({ submit }) => (
            <Theme>
              <SubmitButton
                backgroundColor={'$red9'}
                color={'$color1'}
                onPress={() => submit()}
                borderRadius="$10"
                icon={<Check size={'$1'} />}
              >
                {t('forms:confirmation')}
              </SubmitButton>
            </Theme>
          )}
        />
      </FormProvider>
    </>

  );
}


export default ShipmentRejectScreen;
