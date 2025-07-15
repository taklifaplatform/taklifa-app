import { CheckCircle } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ProductsService } from '@zix/api';
import { FullScreenSpinner, ZixAlertActions } from '@zix/ui/common';
import {
  formFields,
  handleFormErrors,
  SchemaForm,
  SubmitButton,
  ZixFieldContainer
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { FormProvider, XStack, YStack } from 'tamagui';
import { z } from 'zod';

const { useParam } = createParam<{ product: string }>();

const UpdateProductFormSchema = z
  .object({
    images: formFields.medias.describe('الصورة').optional(),
    name: formFields.text.min(2).max(150).describe('اسم المنتج'),
    description: formFields.textarea.describe('الوصف').optional(),
    
    variant: z.object({
      price: formFields.text.describe('السعر (اختياري)').optional(),
      stock: formFields.number.describe('المخزون (اختياري)').optional(),
      type: formFields.select.describe(''),
      type_unit: formFields.select.describe(''),
      type_value: formFields.text.describe(''),
    }),
    is_available: formFields.select_radio_group.describe('الحالة'),
  });

export const ProductManagerScreen = () => {
  const [productId] = useParam('product');
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () =>
      ProductsService.retrieveProduct({
        product: productId as string,
      }),
  });
  const form = useForm<z.infer<typeof UpdateProductFormSchema>>();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toast = useToastController();

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody: z.infer<typeof UpdateProductFormSchema>) =>
      ProductsService.updateProduct({
        product: productId as string,
        requestBody,
      }),
    onSuccess() {
      toast.show('تم تحديث المنتج بنجاح');
      setOpen(true);
    },
    onError(error: any) {
      toast.show('حدث خطأ ما');
      handleFormErrors(form, error);
    },
  });


  useEffect(() => { 
    if (open) {
      setTimeout(() => {
       setOpen(false);
        router.back();
      }, 3000);
    }
  }, [open]);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  const renderForm = () => (
    <FormProvider {...form}>
      <SchemaForm
        schema={UpdateProductFormSchema}
        defaultValues={product?.data ?? {}}
        props={{
          is_available: {
            options: [
              { name: 'متوفر', id: 'available' },
              { name: 'غير متوفر', id: 'unavailable' },
            ],
            width: '50%',
            colorSelected: '#EFFEF6',
            colorIndicator: '#0F5837',
          },
            variant: {
              type: {
                options: [
                  { name: 'كغ', id: 'kg' },
                  { name: 'طن', id: 'ton' },
                ]
            },
            type_unit: {
              options: [
                { name: 'كغ', id: 'kg' },
                { name: 'طن', id: 'ton' },
              ],
            },
          }
          
        }}
        onSubmit={mutateAsync}
        renderAfter={({ submit }) => {
          return (
            <YStack gap="$4" marginBottom={'$4'}>
              <SubmitButton
                theme={'accent'}
                backgroundColor="$color1"
                color="white"
                onPress={() => submit()}
              >
                حفظ التغييرات
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
                onPress={() => router.back()}
              >
                إلغاء
              </SubmitButton>
            </YStack>
          );
        }}
      >
        {({ variant: { type, type_unit, type_value, ...variant }, ...fields }) => (
          <YStack gap="$4">
            {Object.values(fields)}
            <ZixFieldContainer label="نوع المتغير">
              <YStack gap="$4">
                <XStack gap="$4">
                {type}
                {type_unit}
                
              </XStack>
              {type_value}
              </YStack>
              
            </ZixFieldContainer>
            <YStack gap="$4">{Object.values(variant)}</YStack>
          </YStack>
        )}
      </SchemaForm>
    </FormProvider>
  );

  return (
    <ScreenLayout>
      <AppHeader title="تعديل المنتج" showBackButton />
      <YStack flex={1}>{renderForm()}</YStack>
      <ZixAlertActions
        title="تم تحديث المنتج بنجاح"
        description="تم حفظ التغييرات على المنتج"
        icon={<CheckCircle size={20} color="green" />}
        closeButton={open}
      />
    </ScreenLayout>
  );
};

export default ProductManagerScreen;
