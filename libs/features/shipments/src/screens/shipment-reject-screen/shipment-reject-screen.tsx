import { Check } from '@tamagui/lucide-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { useMixpanel } from '@zix/services/auth';
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
  Text,
  Theme,
  XStack,
  YStack
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
  useMixpanel('Shipment Reject Screen view')
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
  const { mutateAsync } = useMutation({
    mutationFn: () => {
      alert('UNDER DEV')
      return undefined;
    }
  });
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
          onSubmit={mutateAsync}
          renderAfter={({ submit }) => (
            <Theme name='error'>
              <SubmitButton
                onPress={() => submit()}
                themeInverse
                backgroundColor='$color10'
                icon={<Check size={'$1'} />}
              >
                {t('forms:confirmation')}
              </SubmitButton>
            </Theme>
          )}
        >

          {(fields) => (
            <YStack >
              <XStack justifyContent='space-around'>
                <CustomIcon name="alert_cercle" size={'$12'} />
              </XStack>
              <YStack gap="$4">
                <Text fontSize='$1'>
                  {shipment?.code}
                </Text>
                <Text theme='error' color="$color10">
                  {t('forms:cancel-service')} {t('job:job-demand')}{' '}
                  {t('shipment:type:' + shipment?.items_type)}
                </Text>
                <XStack
                  gap="$6"
                  alignItems="center"
                  marginBottom="$3"
                >
                  <XStack gap="$2" alignItems="center">
                    <UserAvatar size={'$1'} user={shipment?.user} />
                    <Text
                      fontSize={12}
                      fontWeight={'600'}
                      color={'$color9'}
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
                      color={'$color9'}
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
              <Separator
                borderColor={'$gray7'}
                width={'100%'}
                $gtSm={{ display: 'none' }}
              />
              <YStack>
                {Object.values(fields)}
              </YStack>
            </YStack>

          )}
        </SchemaForm>
      </FormProvider>
    </>
  );
};

export default ShipmentRejectScreen;
