
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnnouncementService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { DebugObject } from '@zix/ui/common';
import { formFields, handleFormErrors, SchemaForm, SubmitButton, ZixAutoCompleteField, ZixFieldContainer, ZixInput, ZixMediaPickerField } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme, YStack } from 'tamagui';
import { z } from 'zod';

const ManageAnnouncementFormSchema = z
  .object({
    images: formFields.medias.describe(t('forms:images')),
    category_id: formFields.autocomplete.describe(t('common:category')),
    sub_category_id: formFields.autocomplete.describe(t('common:sub-category')),
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
  const [announcement, setAnnouncement] = useState<AnnouncementTransformer>();

  // const selectedCategory = form.watch('category_id');

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
      router.replace(`/app/announcement`);
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
      <YStack padding="$4" flex={1} gap="$4">
        <YStack minHeight={80}>
          <ZixFieldContainer
            label={t('forms:category')}
            labelBold
            error={form.formState.errors.category_id}
            errorMessage={form.formState.errors.title?.category_id}
          >
            <ZixAutoCompleteField
              api='announcement-categories'
              itemKey='id'
              itemValue='name'
              placeholder={t('common:category')}
              value={announcement?.category_id || ''}
              onChange={(value) => {
                console.log('onChange::', value)

                setAnnouncement({ ...announcement, category_id: value })
              }}
            />
          </ZixFieldContainer>
        </YStack>
        {/* {
          announcement?.category_id && (
            <YStack minHeight={80}>
              <ZixFieldContainer
                label={t('forms:sub-category')}
                labelBold
                error={form.formState.errors.sub_category_id}
                errorMessage={form.formState.errors.title?.sub_category_id}
              >
                <ZixAutoCompleteField
                  api='announcement-categories'
                  identifier={`sub-category-${announcement?.category_id}`}
                  query={{
                    category_id: announcement?.category_id,
                  }}
                  placeholder={t('common:sub-category')}
                  value={announcement?.sub_category_id || ''}
                  onChange={(value) => setAnnouncement({ ...announcement, sub_category_id: value })}
                />
              </ZixFieldContainer>
            </YStack>
          )
        } */}
        <ZixFieldContainer
          label={t('forms:title')}
          labelBold
          error={form.formState.errors.title}
          errorMessage={form.formState.errors.title?.message}
        >
          <ZixInput
            placeholder={t('common:title')}
            value={announcement?.title || ''}
            onChange={(value) => setAnnouncement({ ...announcement, title: value })}
          />
        </ZixFieldContainer>

        <ZixFieldContainer
          label={t('forms:description')}
          labelBold
          isOptional
          error={form.formState.errors.description}
          errorMessage={form.formState.errors.description?.message}
        >
          <ZixInput
            isMultiline
            placeholder={t('common:description')}
            value={announcement?.description || ''}
            onChange={(value) => setAnnouncement({ ...announcement, description: value })}
          />
        </ZixFieldContainer>

        <ZixFieldContainer
          label={t('common:price')}
          labelBold
          error={form.formState.errors.price}
          errorMessage={form.formState.errors.price?.message}
        >
          <ZixInput
            placeholder={t('common:price')}
            value={announcement?.price || ''}
            onChange={(value) => setAnnouncement({ ...announcement, price: value })}
          />
        </ZixFieldContainer>

        <ZixFieldContainer
          label={t('common:images')}
          labelBold
          isOptional
          error={form.formState.errors.images}
          errorMessage={form.formState.errors.images?.message}
        >
          <ZixMediaPickerField
            placeholder={t('common:images')}
            isMultiple
            value={announcement?.images || []}
            onChange={(value) => setAnnouncement({ ...announcement, images: value })}
          />
        </ZixFieldContainer>

        <SubmitButton onPress={() => form.handleSubmit(mutateAsync)()}>
          {t('common:save')}
        </SubmitButton>
      </YStack>
    </ScreenLayout>
  )
}


export default ManageAnnouncementScreen;
