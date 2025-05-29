
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnnouncementService } from '@zix/api';
import { useMixpanel } from '@zix/services/auth';
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
    images: formFields.medias.describe(t('forms:announcement-images')),
    category_id: formFields.autocomplete.describe(t('forms:announcement-category')),
    year_model: formFields.number.describe(t('forms:announcement-year-model')).optional().nullable(),
    city: formFields.text.describe(t('forms:announcement-city')).optional().nullable(),
    title: formFields.text.describe(t('forms:announcement-name')),
    description: formFields.text.describe(t('forms:announcement-description')).max(100),
    price: formFields.text.describe(t('forms:price')).optional().nullable(),
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

  const { data, refetch } = useQuery({
    queryFn: () =>
      AnnouncementService.retrieveAnnouncement({
        announcement: announcementId,
      }),
    enabled: !!announcementId,
    queryKey: ['AnnouncementService.retrieveAnnouncement', announcementId],
  })

  const { mutateAsync } = useMutation({
    async mutationFn(requestBody: z.infer<typeof ManageAnnouncementFormSchema>) {
      if (announcementId) {
        return AnnouncementService.updateAnnouncement({
          announcement: announcementId,
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
      if (announcementId) {
        refetch();
      }

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
        description: {
          isMultiline: true,
        },
        category_id: {
          api: 'announcement-categories',
        },
        sub_category_id: {
          api: 'announcement-categories',
          // disabled: !selectedCategory,
          // query: {
          //   category_id: selectedCategory,
          // }
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
        title={announcementId ? t('common:update-announcement') : t('common:create-announcement')}
      />
      {renderForm()}
      {/* <DebugObject object={data} /> */}
    </ScreenLayout>
  )
}


export default ManageAnnouncementScreen;
