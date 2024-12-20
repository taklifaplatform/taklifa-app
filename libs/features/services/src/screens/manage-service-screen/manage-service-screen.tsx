
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ServicesService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { formFields, handleFormErrors, SchemaForm, SubmitButton, ZixFieldContainer } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

const ManageServiceFormSchema = z
  .object({
    cover: formFields.image.describe(t('forms:service-image')),
    title: formFields.text.describe(t('common:service-title')),
    description: formFields.textarea.describe(t('common:service-description')),
    price: formFields.money.describe(t('common:price')),
    images: formFields.medias.describe(t('forms:images')),
  });

/* eslint-disable-next-line */
export interface ManageServiceScreenProps {
}

const { useParam } = createParam<{ service?: string }>();

export function ManageServiceScreen(props: ManageServiceScreenProps) {
  const form = useForm<z.infer<typeof ManageServiceFormSchema>>();
  const toast = useToastController();
  const [serviceId] = useParam('service');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data } = useQuery({
    queryFn: () =>
      ServicesService.retrieveZoneService({
        service: serviceId,
      }),
    queryKey: ['ServicesService.retrieveZoneService', serviceId],
  })
  /* useEffect(() => {
     if (serviceId) {
       Object.keys(data?.data || {}).forEach((key) => {
         form.setValue(key, data?.data[key]);
       });
     }
   }, [data?.data])*/

  const { mutateAsync } = useMutation({
    async mutationFn(requestBody: z.infer<typeof ManageServiceFormSchema>) {
      if (serviceId) {
        return ServicesService.updateService({
          service: serviceId,
          requestBody,
        });
      }

      return ServicesService.createService({
        requestBody,
      });
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['ServicesService.listDriverServices', user?.id],
      })
      queryClient.refetchQueries({
        queryKey: ['ServicesService.listCompanyServices', user?.active_company?.id],
      })
      toast.show('Company Updated Successfully!');
      router.back();
      console.log('onSuccess::')
    },
    onError(error: any) {
      console.log('============')
      console.log('onError::', JSON.stringify(error, null, 2))
      console.log('============')
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  const renderForm = () => (!serviceId || data?.data?.id) && (
    <SchemaForm
      form={form}
      schema={ManageServiceFormSchema}
      props={{
        cover: {
          notAvatar: true
        }
      }}
      defaultValues={data?.data || {}}
      onSubmit={mutateAsync}
      renderAfter={({ submit }) => {
        return (
          <Theme inverse>
            <SubmitButton onPress={() => submit()}>
              {t('common:next')}
            </SubmitButton>
          </Theme>
        );
      }}
    >
      {({ ...fields }) => (
        <ZixFieldContainer
          label={t('common:service-information')}
          labelBold
          collapsible
        >
          {Object.values(fields)}
        </ZixFieldContainer>
      )}
    </SchemaForm>
  );

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader
        showBackButton
        title={serviceId ? t('common:update-service') : t('common:create-service')}
      />
      {renderForm()}
    </ScreenLayout>
  )
}


export default ManageServiceScreen;
