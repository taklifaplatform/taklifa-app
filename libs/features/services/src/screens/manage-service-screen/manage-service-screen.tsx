
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ServiceService } from '@zix/api';
import { useMixpanel } from '@zix/services/auth';
import { ZixButton } from '@zix/ui/common';
import { formFields, handleFormErrors, SchemaForm, SubmitButton, ZixFieldContainer } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList } from 'react-native';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Text, Theme, YStack } from 'tamagui';
import { z } from 'zod';

const ManageServiceFormSchema = z
  .object({
    images: formFields.medias.describe(t('forms:announcement-images')),
    category_id: formFields.text.describe(t('forms:announcement-category')),
    sub_category_id: formFields.text.describe(t('forms:announcement-sub-category')),
    metadata: z.object({
      model_year: formFields.number.describe(t('forms:announcement-year-model')).optional().nullable(),
    }),
    city: formFields.text.describe(t('forms:announcement-city')).optional().nullable(),
    title: formFields.text.describe(t('forms:announcement-name')),
    description: formFields.text.describe(t('forms:announcement-description')).max(100),
    price: formFields.number.describe(t('forms:price')).optional().nullable(),
  });

/* eslint-disable-next-line */
export interface ManageServiceScreenProps {
}

const { useParam } = createParam<{ service?: string }>();

export function ManageServiceScreen(props: ManageServiceScreenProps) {
  useMixpanel('Manage services Screen view')
  const form = useForm<z.infer<typeof ManageServiceFormSchema>>();
  const toast = useToastController();
  const [serviceId] = useParam('service');
  const router = useRouter();
  const queryClient = useQueryClient();

  const categoryId = form.watch('category_id');
  const subCategoryId = form.watch('sub_category_id');

  const { data: categoriesData } = useQuery({
    queryFn: () => ServiceService.listServiceCategories({}),
    queryKey: ['ServiceService.listServiceCategories'],
  })

  const selectedCategory = useMemo(() => categoriesData?.data?.find((category) => category.id === categoryId), [categoriesData, categoryId]);

  const { data, refetch } = useQuery({
    queryFn: () =>
      ServiceService.retrieveService({
        service: serviceId,
      }),
    enabled: !!serviceId,
    queryKey: ['ServicesService.retrieveService', serviceId],
  })

  const { mutateAsync, isPending } = useMutation({
    async mutationFn(requestBody: z.infer<typeof ManageServiceFormSchema>) {
      if (serviceId) {
        return ServiceService.updateService({
          service: serviceId,
          requestBody,
        });
      }

      return ServiceService.createService({
        requestBody,
      });
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['ServiceService.listServices'],
      })
      if (serviceId) {
        refetch();
      }

      form.reset();
      router.replace(`/app/services`);
      console.log('onSuccess::')
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  const renderMainCategorySelector = () => (
    <FlatList
      data={categoriesData?.data || []}
      renderItem={({ item }) => (
        <ZixButton
          themeInverse={selectedCategory?.id === item.id}
          key={item.id}
          size='$4'
          style={{ marginRight: 10 }}
          onPress={() => {
            if (selectedCategory?.id === item.id) {
              form.setValue('category_id', undefined);
              form.setValue('sub_category_id', undefined);
            } else {
              form.setValue('category_id', item.id);
              form.setValue('sub_category_id', undefined);
            }
          }}
        >
          <Text>{item.name}</Text>
        </ZixButton>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index): string => `${item.id ?? index}`}

    />
  )

  const renderSubCategorySelector = () => (
    <FlatList
      data={selectedCategory?.sub_categories || []}
      renderItem={({ item }) => (
        <ZixButton
          themeInverse={subCategoryId === item.id}
          key={item.id}
          size='$2'
          style={{ marginRight: 10 }}
          onPress={() => {
            form.setValue('sub_category_id', item.id);
          }}
        >
          <Text>{item.name}</Text>
        </ZixButton>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index): string => `${item.id ?? index}`}
    />
  )

  const renderForm = () => (!serviceId || data?.data?.id) && (
    <SchemaForm
      form={form}
      schema={ManageServiceFormSchema}
      props={{
        description: {
          isMultiline: true,
        },
      }}
      defaultValues={data?.data || {}}
      onSubmit={mutateAsync}
      renderAfter={({ submit }) => {
        return (
          <Theme inverse>
            <SubmitButton loading={isPending} onPress={() => {
              const formData = form.getValues();
              return mutateAsync(formData);
            }}>
              {t('common:next')}
            </SubmitButton>
          </Theme>
        );
      }}
    >
      {({ metadata, images, category_id, sub_category_id, ...fields }) => (
        <YStack
          gap='$2'
        >
          {images}
          <ZixFieldContainer
            label={t('forms:announcement-category')}
            labelBold
            collapsible
            error={!!form?.formState?.errors?.category_id}
            errorMessage={form?.formState?.errors?.category_id?.message}
          >
            <YStack
              gap='$3'
            >
              {renderMainCategorySelector()}
              {renderSubCategorySelector()}
            </YStack>
          </ZixFieldContainer>
          {Object.values(fields)}
          {!!selectedCategory?.metadata_fields?.length && (
            <YStack
              gap='$2'
            >
              {Object.values(metadata)}
            </YStack>
          )}
        </YStack>
      )}
    </SchemaForm>
  );

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader
        showBackButton
        title={serviceId ? 'تعديل الخدمة' : 'انشاء الخدمة'}
      />
      {renderForm()}
      {/* <DebugObject object={data} /> */}
    </ScreenLayout>
  )
}


export default ManageServiceScreen;
