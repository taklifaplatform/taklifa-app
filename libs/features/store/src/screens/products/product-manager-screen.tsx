import { CheckCircle, Trash2 } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductsService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import {
  DeleteProduct,
  FullScreenSpinner,
  ZixAlertActions,
  ZixButton,
} from '@zix/ui/common';
import {
  formFields,
  handleFormErrors,
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  ZixSelectField,
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'expo-router';
import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { Text, XStack, YStack } from 'tamagui';
import { z } from 'zod';

const { useParam } = createParam<{ product: string }>();

const UpdateProductFormSchema = z.object({
  images: formFields.medias.describe('الصورة').optional(),
  name: formFields.text.min(2).max(150).describe('اسم المنتج'),
  // short_description: formFields.textarea.describe('الوصف المختصر').optional(),
  description: formFields.textarea.describe('الوصف'),

  variant: z.object({
    price: formFields.text.describe('السعر'),
    stock: formFields.number.describe('المخزون (اختياري)').optional(),
    type_unit: formFields.select.describe('').optional(),
  }),
  is_available: formFields.select_radio_group.describe('الحالة').optional(),
});

export const ProductManagerScreen = () => {
  const [productId] = useParam('product');
  const queryClient = useQueryClient();
  const { user, getUrlPrefix } = useAuth();

  const unitTypes = [
    { name: 'م', id: 'm' },
    { name: 'سم', id: 'cm' },
    { name: 'مم', id: 'mm' },
    { name: 'إنش', id: 'in' },
    { name: 'م²', id: 'm2' },
    { name: 'قدم²', id: 'ft2' },
    { name: 'سم³', id: 'oz' },
    { name: 'م³', id: 'm3' },
    { name: 'لتر', id: 'ltr' },
    { name: 'مل', id: 'ml' },
    { name: 'طن', id: 'ton' },
    { name: 'كجم', id: 'kg' },
    { name: 'جم', id: 'g' },
    { name: 'م.ط', id: 'm4' },
    { name: 'قدم', id: 'ft' },
    { name: 'باوند', id: 'lb' },
  ];
  const { data, isLoading, isFetching } = useQuery({
    enabled: !!productId,
    queryKey: ['ProductsService.retrieveProduct', productId],
    queryFn: () =>
      ProductsService.retrieveProduct({
        product: productId as string,
      }),
  });
  const form = useForm<z.infer<typeof UpdateProductFormSchema>>();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const toast = useToastController();

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody: z.infer<typeof UpdateProductFormSchema>) => {
      if (productId) {
        return ProductsService.updateProduct({
          product: productId as string,
          requestBody,
        });
      } else {
        return ProductsService.storeProduct({
          requestBody,
        });
      }
    },
    onSuccess(response) {
      toast.show(productId ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['ProductsService.fetchAllProduct'],
      });
      setOpen(true);
    },
    onError(error: any) {
      toast.show('حدث خطأ ما', {
        message: error.message,
      });
      handleFormErrors(form, error);
    },
  });

  const { mutateAsync: deleteProduct } = useMutation({
    mutationFn: (productId: string) => {
      return ProductsService.deleteProduct({
        product: productId,
      });
    },
    onSuccess() {
      toast.show('تم حذف المنتج بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['ProductsService.fetchAllProduct', user?.active_company?.id],
      });
      router.back();
    },
    onError(error: any) {
      toast.show('حدث خطأ ما', {
        message: error.message,
      });
    },
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
        router.replace(`${getUrlPrefix}/(tabs)/store`);
      }, 1000);
    }
  }, [open]);

  const renderForm = () =>
    !productId || (productId && data?.data?.id && !isFetching) ? (
      <SchemaForm
        form={form}
        schema={UpdateProductFormSchema}
        defaultValues={
          data?.data?.id
            ? {
                ...data?.data,
                is_available: data?.data?.is_available ? 1 : 0,
              }
            : {
                variant: {
                  type_unit: 'kg',
                  type_value: 0,
                },
                is_available: 1,
              }
        }
        props={{
          is_available: {
            options: [
              { name: 'متوفر', id: 1 },
              { name: 'غير متوفر', id: 0 },
            ],
            width: '50%',
            colorSelected: '#EFFEF6',
            colorIndicator: '#0F5837',
          },
        }}
        onSubmit={mutateAsync}
        renderAfter={({ submit }) => {
          return (
            <YStack gap="$4" marginBottom={'$4'}>
              <SubmitButton
                theme={'accent'}
                color="$color2"
                backgroundColor="$color1"
                disabledStyle={{
                  opacity: 0.5,
                }}
                onPress={() => {
                  const values = form.getValues();
                  const requiredFielKeys = [
                    'name',
                    'description',
                    'variant.price',
                    'variant.type_unit',
                  ];
                  let hasError = false;
                  requiredFielKeys.forEach((key) => {
                    if (key.includes('.')) {
                      const [parentKey, childKey] = key.split('.');
                      if (!values[parentKey]?.[childKey]) {
                        form.setError(key, {
                          type: 'custom',
                          message: 'هذا الحقل مطلوب',
                        });
                        hasError = true;
                      }
                    } else {
                      if (!values[key]) {
                        form.setError(key, {
                          type: 'custom',
                          message: 'هذا الحقل مطلوب',
                        });
                        hasError = true;
                      }
                    }
                  });
                  if (!hasError) {
                    submit();
                  }
                  submit();
                }}
              >
                {productId ? 'حفظ التغييرات' : 'إضافة المنتج'}
              </SubmitButton>
              <SubmitButton
                theme={'accent'}
                pressStyle={{
                  backgroundColor: 'transparent',
                }}
                backgroundColor="transparent"
                borderWidth={1}
                borderColor="$color0"
                color="$color0"
                onPress={() => {
                  router.back();
                }}
              >
                إلغاء
              </SubmitButton>
            </YStack>
          );
        }}
      >
        {({ is_available, variant: { type_unit, ...variant }, ...fields }) => (
          <YStack gap="$4">
            {Object.values(fields)}
            <ZixFieldContainer label="نوع المتغير" isOptional={true}>
              <YStack gap="$4">
                <XStack gap="$4" width="100%">
                  <ZixSelectField
                    selectTriggerProps={{
                      size: '$3',
                      height: '$4',
                      flex: undefined,
                      width: '100%',
                      padding: 10,
                    }}
                    selectTriggerTextProps={{
                      fontSize: 12,
                    }}
                    size="$3"
                    options={unitTypes}
                    // value={type_unit}
                    value={
                      form.getValues('variant.type_unit') ||
                      data?.data?.variant?.type_unit
                    }
                    onChange={(value) => {
                      form.setValue('variant.type_unit', value.toString());
                    }}
                  />
                  <Text>{type_unit}</Text>
                </XStack>
              </YStack>
            </ZixFieldContainer>
            <YStack gap="$4">{Object.values(variant)}</YStack>
            {is_available}
          </YStack>
        )}
      </SchemaForm>
    ) : (
      <FullScreenSpinner />
    );

  return (
    <ScreenLayout>
      <AppHeader
        title={productId ? 'تعديل المنتج' : 'إضافة منتج'}
        showBackButton
        deleteButton={() =>
          productId && (
            <DeleteProduct
              title="تأكيد الحذف"
              open={openDeleteDialog}
              setIsOpen={setOpenDeleteDialog}
              trigger={
                <ZixButton
                  theme={'error'}
                  width={'100%'}
                  height={'$3'}
                  backgroundColor="#FFF2F1"
                  icon={<Trash2 size={20} color="#FF6369" />}
                  borderWidth={1}
                  borderColor="#FF6369"
                >
                  <Text fontWeight="500" fontSize={'$3'} color="#FF6369">
                    حذف
                  </Text>
                </ZixButton>
              }
              onDelete={() => {
                deleteProduct(productId as string);
              }}
            />
          )
        }
      />
      <YStack flex={1}>{renderForm()}</YStack>
      <ZixAlertActions
        title={productId ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح'}
        description={
          productId ? 'تم حفظ التغييرات على المنتج' : 'تم إضافة المنتج بنجاح'
        }
        icon={<CheckCircle size={20} color="green" />}
        closeButton={open}
      />
    </ScreenLayout>
  );
};

export default ProductManagerScreen;
