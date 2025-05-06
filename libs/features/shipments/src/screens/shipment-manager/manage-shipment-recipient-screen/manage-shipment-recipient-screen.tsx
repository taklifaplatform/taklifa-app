import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShipmentService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import {
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';
import ShipmentManagerHeader from '../../../components/shipment-manager/shipment-manager-header/shipment-manager-header';
import { SHARED_SHIPMENT_MANAGER_FIELD_PROPS } from '../configs';

const { useParam } = createParam<{ shipment: string }>();

const SendFromSchema = z.object({
  // to_location_id: formFields.advanced_location.describe(
  //   `${t('app:forms.labels.shipping-to')} // ${t('app:forms.placeholders.shipping-to')}`,
  // ),
  recipient_name: formFields.text.describe(
    `${t('app:forms.labels.recipient-name')} // ${t('app:forms.placeholders.recipient-name')}`,
  ),
  should_notify_customer: formFields.boolean_checkbox.describe(
    `${t('common:notify-customer')}`,
  ),
  recipient_phone: formFields.phone.describe(
    `${t('app:forms.labels.recipient-phone')} // ${t('app:forms.placeholders.recipient-phone')}`,
  ),
  deliver_date: formFields.row_date_picker.describe(
    `${t('app:forms.labels.date')} // ${t('app:forms.placeholders.date')}`,
  ),
  deliver_time: formFields.row_time_range_picker.describe(
    `${t('app:forms.labels.time')} // ${t('app:forms.placeholders.time')}`,
  ),
});

export const ManageShipmentRecipientScreen: React.FC = () => {
  const form = useForm<z.infer<typeof SendFromSchema>>();
  const router = useRouter();
  const { getUrlPrefix } = useAuth();
  const [shipmentId] = useParam('shipment');
  const toast = useToastController();

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
  });

  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof SendFromSchema>) {
      if (!shipmentId) {
        throw new Error('Shipment ID is required');
      }
      return ShipmentService.updateShipment({
        shipment: shipmentId,
        requestBody,
      });
    },
    onSuccess(data, variables, context) {
      router.push(`${getUrlPrefix}/shipment-manager/${shipmentId}/items`);
      //
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  const renderForm = () => !!data?.data && (
    <SchemaForm
      form={form}
      schema={SendFromSchema}
      props={{
        // to_location: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
        deliver_date: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
        deliver_time: SHARED_SHIPMENT_MANAGER_FIELD_PROPS,
      }}
      defaultValues={data.data}
      onSubmit={mutateAsync}
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>
            {t('common:next')}
          </SubmitButton>
        </Theme>
      )}
    >
      {({ to_location, recipient_name, recipient_phone, should_notify_customer, ...fields }) => (
        <>
          <ShipmentManagerHeader
            activeStep={2}
            shipment={data?.data}
            title={t('app:shipment-manager.recipient.description')}
          />

          {to_location}

          <ZixFieldContainer
            label={t('app:forms.labels.recipient-info')}
            {...SHARED_SHIPMENT_MANAGER_FIELD_PROPS.containerProps}
          >
            {recipient_name}
            {recipient_phone}
            {should_notify_customer}
          </ZixFieldContainer>

          {Object.values(fields)}
        </>
      )}
    </SchemaForm>
  )

  const renderLoading = () => (shipmentId && !data?.data) && <FullScreenSpinner />;

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader
        title={t('app:shipment-manager.recipient.title')}
        showBackButton
      />
      {renderLoading()}
      {renderForm()}
    </ScreenLayout>
  );
};

export default ManageShipmentRecipientScreen;
