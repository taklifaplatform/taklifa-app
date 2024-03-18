import { Check } from '@tamagui/lucide-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DriverShipmentsService } from '@zix/api';
import { UserAvatar } from '@zix/ui/common';
import { SchemaForm, SubmitButton, formFields } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import moment from 'moment';
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
  variant: 'shipments' | 'jobs';
};

const { useParam } = createParam<{ shipment: string }>();
const CancelShipmentSchema = z.object({
  raison: formFields.autocomplete.describe(t('forms:reason-for-cancel')),
  message: formFields.textarea.describe(t('forms:message-to-customer')),
});

export const ShipmentRejectScreen: React.FC<ShipmentRejectScreenProps> = (
  props,
) => {
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
            raison: '',
            message: '',
          }}
          onSubmit={mutate}
          renderBefore={() => (
            <YStack >
              <Stack
                flexDirection="column"
                alignItems="center"
                paddingVertical="$4"
                gap="$4"
                $gtSm={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  padding: '$4',
                  backgroundColor: '$red3',
                  borderRadius: '$4',
                }}
              >
                <CustomIcon name="alert_cercle" size={'$12'} />

                <YStack gap="$4">
                  <Text fontSize={18} fontWeight={'400'}>
                    SWDKSA
                    {shipment?.id?.toString().substring(0, 8).toUpperCase()}
                  </Text>
                  <Text fontSize={18} fontWeight={'600'} color={'$red9'}>
                    {t('forms:cancel-service')} {t('job:job-demand')}{' '}
                    {t('shipment:type:' + shipment?.items_type)}
                  </Text>
                  <XStack
                    alignItems="center"
                    gap="$6"
                    marginBottom="$3"
                    $sm={{ display: 'none' }}
                  >
                    <XStack gap="$2" alignItems="center">
                      {/* TODO change to UserAvatar */}

                      <UserAvatar size={'$1'} user={shipment?.user} />
                      <Text
                        fontSize={12}
                        fontWeight={'600'}
                        color={'$gray9'}
                        $sm={{
                          fontSize: 12,
                          fontWeight: '600',
                        }}
                      >
                        {shipment?.user?.name}
                      </Text>
                    </XStack>
                    <XStack gap="$2" alignItems="center">
                      <CustomIcon
                        name="chronic"
                        size="$1"
                        $sm={{
                          display: 'none',
                        }}
                      />
                      <Text
                        fontSize={12}
                        fontWeight={'600'}
                        color={'$gray9'}
                        $sm={{
                          fontSize: 9,
                          fontWeight: '600',
                        }}
                      >
                        {t('job:job-published')}{' '}
                        {moment(shipment?.created_at).fromNow()}
                      </Text>
                    </XStack>
                  </XStack>
                </YStack>
              </Stack>
              <Separator
                borderColor={'$gray7'}
                width={'100%'}
                $gtSm={{ display: 'none' }}
              />
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
        >
          {(fields) => (
            <YStack
              gap="$4"
              padding="$4"
              backgroundColor={'$color1'}
              borderRadius={'$4'}
              $sm={{ backgroundColor: 'transparent' }}
            >
              {Object.values(fields)}
            </YStack>
          )}
        </SchemaForm>
      </FormProvider>
    </>
  );
};

export default ShipmentRejectScreen;
