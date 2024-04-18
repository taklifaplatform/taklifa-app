import { Check } from '@tamagui/lucide-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { SchemaForm, SubmitButton, formFields } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
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

const { useParam } = createParam<{ shipment: string }>();
const CancelShipmentSchema = z.object({
  raison: formFields.autocomplete.describe(t('forms:reason-for-cancel')),
  message: formFields.textarea.describe(t('forms:message-to-customer')),
});

export const CancelShipmentScreen = () => {
  const [shipmentId] = useParam('shipment');
  const { data } = useQuery({
    queryKey: ['ShipmentService.retrieveShipment', { id: shipmentId }],
    queryFn: () =>
      ShipmentService.retrieveShipment({
        shipment: shipmentId || '',
      }),
  });
  const shipment = data?.data;

  const form = useForm<z.infer<typeof CancelShipmentSchema>>();
  const { mutateAsync } = useMutation({});
  // mutationFn: (requestBody: z.infer<typeof CancelShipmentSchema>) =>
  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={CancelShipmentSchema}
        defaultValues={{
          email: '',
          message: '',
        }}
        onSubmit={mutateAsync}
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
  );
};

export default CancelShipmentScreen;
