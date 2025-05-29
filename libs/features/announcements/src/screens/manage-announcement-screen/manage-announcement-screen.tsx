
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnnouncementService } from '@zix/api';
import { useMixpanel } from '@zix/services/auth';
import { formFields, handleFormErrors, SchemaForm, SubmitButton, ZixFieldContainer } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme } from 'tamagui';
import { z } from 'zod';

const ManageAnnouncementFormSchema = z
  .object({
    images: formFields.medias.describe(t('forms:announcement-images')),
    category_id: formFields.autocomplete.describe(t('forms:announcement-category')),
    sub_category_id: formFields.autocomplete.describe(t('forms:announcement-sub-category')),
    metadata: z.object({
      model_year: formFields.number.describe(t('forms:announcement-year-model')).optional().nullable(),
    }),
    city: formFields.text.describe(t('forms:announcement-city')).optional().nullable(),
    title: formFields.text.describe(t('forms:announcement-name')),
    description: formFields.text.describe(t('forms:announcement-description')).max(100),
    price: formFields.number.describe(t('forms:price')).optional().nullable(),
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

  const categoryId = form.watch('category_id');
  const subCategoryId = form.watch('sub_category_id');

  const { data: categories } = useQuery({
    queryFn: () => AnnouncementService.listAnnouncementCategories({}),
    queryKey: ['AnnouncementService.listAnnouncementCategories'],
  })

  const selectedCategory = useMemo(() => categories?.data?.find((category) => category.id === categoryId), [categories, categoryId]);

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
          disabled: !selectedCategory?.sub_categories?.length,
          query: {
            category_id: categoryId,
          }
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
      {({ metadata, ...fields }) => (
        <ZixFieldContainer
          label={t('common:service-information')}
          labelBold
          collapsible
        >
          {Object.values(fields)}
          {!!selectedCategory?.metadata_fields?.length && (
            <ZixFieldContainer
              label={t('common:service-information')}
              labelBold
              collapsible
            >
              {Object.values(metadata)}
            </ZixFieldContainer>
          )}
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
