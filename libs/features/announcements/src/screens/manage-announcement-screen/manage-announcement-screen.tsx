
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnnouncementService, ServicesService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { formFields, handleFormErrors, SchemaForm, SubmitButton, ZixFieldContainer } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

const ManageAnnouncementFormSchema = z
  .object({
    images: formFields.medias.describe(t('forms:images')),
    title: formFields.text.describe(t('common:service-title')),
    description: formFields.textarea.describe(t('common:service-description')),
    price: formFields.number.describe(t('common:price')),
  });

/* eslint-disable-next-line */
export interface ManageAnnouncementScreenProps {
}

const { useParam } = createParam<{ announcement?: string }>();

export function ManageAnnouncementScreen(props: ManageAnnouncementScreenProps) {
  useMixpanel('Manage Announcement Screen view')
  const form = useForm<z.infer<typeof ManageAnnouncementFormSchema>>();
  const toast = useToastController();
  const [announcementId] = useParam('announcement');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data } = useQuery({
    queryFn: () =>
      AnnouncementService.retrieveAnnouncement({
        announcement: announcementId,
      }),
    queryKey: ['AnnouncementService.retrieveAnnouncement', announcementId],
  })

  const { mutateAsync } = useMutation({
    async mutationFn(requestBody: z.infer<typeof ManageAnnouncementFormSchema>) {
      if (announcementId) {
        return AnnouncementService.updateAnnouncement({
          service: announcementId,
          requestBody,
        });
      }

      return AnnouncementService.createAnnouncement({
        requestBody,
      });
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['AnnouncementService.listAnnouncements'],
      })

      form.reset();
      router.replace(`/app/stores`);
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

  const renderForm = () => (!announcementId || data?.data?.id) && (
    <SchemaForm
      form={form}
      schema={ManageAnnouncementFormSchema}
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
        title={announcementId ? t('common:update-service') : t('common:create-service')}
      />
      {renderForm()}
    </ScreenLayout>
  )
}


export default ManageAnnouncementScreen;
