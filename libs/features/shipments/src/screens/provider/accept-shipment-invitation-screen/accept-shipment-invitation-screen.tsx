import { Check } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentInvitationService, ShipmentProposalService, ShipmentService } from '@zix/api';
import { SchemaForm, SubmitButton, ZixFieldContainer, formFields, handleFormErrors } from '@zix/ui/forms';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import {
  FormProvider,
  Theme,
  YStack
} from 'tamagui';
import { z } from 'zod';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../../shipment-manager/configs';

const { useParam } = createParam<{ shipment: string, invitation?: string, proposal?: string }>();

const AcceptShipmentInvitationSchema = z.object({
  ship_date: formFields.row_date_picker.describe(
    `${t('app:forms.labels.date')} // ${t('app:forms.placeholders.date')}`
  ),
  ship_time: formFields.row_time_range_picker.describe(
    `${t('app:forms.labels.time')} // ${t('app:forms.placeholders.time')}`
  ).optional(),

  cost: formFields.money.describe('Cost'),
  fee: formFields.money.describe('Fee'),

  message: formFields.textarea.describe('Notes'),
});

export function AcceptShipmentInvitationScreen() {
  const [shipmentId] = useParam('shipment');
  const [invitationId] = useParam('invitation');
  const [proposalId] = useParam('proposal');

  const toast = useToastController();
  const { data } = useQuery({
    queryKey: ['ShipmentService.retrieveShipment', { id: shipmentId }],
    queryFn: () =>
      ShipmentService.retrieveShipment({
        shipment: shipmentId || '',
      }),
  });
  const proposalQuery = useQuery({
    queryKey: ['ShipmentProposalService.retrieveShipmentProposal', proposalId, shipmentId],
    queryFn: () =>
      proposalId ? ShipmentProposalService.retrieveShipmentProposal({
        shipment: shipmentId || '',
        shipmentProposal: proposalId || '',
      }) : null,
  });
  const shipment = data?.data;

  const form = useForm<z.infer<typeof AcceptShipmentInvitationSchema>>();
  const { mutateAsync } = useMutation({
    mutationFn: (requestBody) => ShipmentInvitationService.acceptShipmentInvitation({
      shipment: shipmentId || '',
      shipmentInvitation: invitationId || proposalQuery?.data?.data?.shipment_id || '',
      requestBody
    }),
    onSuccess() {
      toast.show(t('app:messages.invitation-accepted'), {
        preset: 'success',
      });
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  const renderForm = () => (!proposalId || proposalId && proposalQuery.data?.data?.id) && (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={AcceptShipmentInvitationSchema}
        defaultValues={{
          cost: {
            currency_id: 117
          },
          fee: {
            currency_id: 117
          },
          ...(proposalQuery.data?.data || {})
        }}
        onSubmit={mutateAsync}
        renderAfter={({ submit }) => (
          <Theme name='accent'>
            <SubmitButton
              onPress={() => submit()}
              themeInverse
              icon={<Check size={'$1'} />}
            >
              {t('forms:confirmation')}
            </SubmitButton>
          </Theme>
        )}
      >

        {({ ship_date, ship_time, cost, fee, ...fields }) => (
          <YStack >
            <ZixFieldContainer
              label={'Pickup Date & Time'}
              {...SHARED_SHIPMENT_MANAGER_FIELD_PROPS.containerProps}
            >
              {ship_date}
              {ship_time}
            </ZixFieldContainer>
            <ZixFieldContainer
              label={'Delivery Cost'}
              {...SHARED_SHIPMENT_MANAGER_FIELD_PROPS.containerProps}
            >
              {cost}
              {fee}
            </ZixFieldContainer>
            {Object.values(fields)}
          </YStack>
        )}
      </SchemaForm>
    </FormProvider>
  )



  return (
    <>
      <AppHeader showBackButton title={proposalId ? "Edit Proposal" : "Accept Invitation"} />
      {renderForm()}
    </>
  );
}

export default AcceptShipmentInvitationScreen;
