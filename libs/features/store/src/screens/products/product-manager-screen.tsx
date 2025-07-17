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
  ZixFieldContainer,
  ZixInput,
  ZixSelectField,
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { FormProvider, Text, XStack, YStack } from 'tamagui';
import { z } from 'zod';

const { useParam } = createParam<{ product: string }>();

const UpdateProductFormSchema = z.object({
  images: formFields.medias.describe('الصورة').optional(),
  name: formFields.text.min(2).max(150).describe('اسم المنتج'),
  description: formFields.textarea.describe('الوصف').optional(),

  variant: z.object({
    price: formFields.text.describe('السعر (اختياري)').optional(),
    stock: formFields.number.describe('المخزون (اختياري)').optional(),
    type: formFields.select.describe(''),
    type_unit: formFields.select.describe(''),
    type_value: formFields.number.describe(''),
  }),
  is_available: formFields.select_radio_group.describe('الحالة'),
});

export const ProductManagerScreen = () => {
  const [productId] = useParam('product');
  const { data, isLoading } = useQuery({
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

  const toast = useToastController();
  const unitTypes = [
    { name: 'كغ', id: 'kg' },
    { name: 'غ', id: 'g' },
    { name: 'باوند', id: 'lb' },
    { name: 'أوقية', id: 'oc' },
    { name: 'متر', id: 'm' },
    { name: 'سم', id: 'cm' },
    { name: 'بوصة', id: 'in' },
    { name: 'قدم', id: 'ft' },
  ];

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody: z.infer<typeof UpdateProductFormSchema>) => {
      if (productId) {
        
        return ProductsService.updateProduct({
          product: productId as string,
          requestBody,
        });
      }
      return ProductsService.storeProduct({
        requestBody,
      });
      
    },
    onSuccess() {
      toast.show(productId ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح');
      setOpen(true);
    },
    onError(error: any) {
      toast.show('حدث خطأ ما', {
        message: error.message,
      });
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

  useEffect(() => {
    console.log(
      "form.watch('variant.type_value')",
      form.watch('variant.type_value'),
    );
  }, [
    form.watch('variant.type'),
    form.watch('variant.type_unit'),
    form.watch('variant.type_value'),
  ]);

  const product = useMemo(() => {
    return (
      data ?? {
        variant: {
          type: 'weight',
          type_unit: 'kg',
          type_value: 0,
        },
      }
    );
  }, [data?.data]);

  if (isLoading) {
    return <FullScreenSpinner />;
  }
  const renderForm = () => (
    <SchemaForm
      form={form}
      schema={UpdateProductFormSchema}
      defaultValues={product?.data}
      props={{
        is_available: {
          options: [
            { name: 'متوفر', id: '1' },
            { name: 'غير متوفر', id: '0' },
          ],
          width: '50%',
          colorSelected: '#EFFEF6',
          colorIndicator: '#0F5837',
        },
      }}
      onSubmit={(data) => {
        // mutateAsync(data);
      }}
      renderAfter={({ submit }) => {
        return (
          <YStack gap="$4" marginBottom={'$4'}>
            <SubmitButton
              theme={'accent'}
              backgroundColor="$color1"
              color="white"
              onPress={() => {
                const values = form.getValues();
                console.log('values::', JSON.stringify(values, null, 2));
                mutateAsync(values);
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
              onPress={() => router.back()}
            >
              إلغاء
            </SubmitButton>
          </YStack>
        );
      }}
    >
      {({
        variant: { type_value, type, type_unit, ...variant },
        ...fields
      }) => (
        <YStack gap="$4">
          {Object.values(fields)}
          <ZixFieldContainer label="نوع المتغير">
            <YStack gap="$4">
              <XStack gap="$4" width="100%">
                <ZixSelectField
                  options={[
                    { name: 'الوزن', id: 'weight' },
                    { name: 'العدد', id: 'count' },
                    { name: 'الحجم', id: 'size' },
                  ]}
                  value={
                    form.getValues('variant.type') ||
                    product?.data?.variant?.type
                  }
                  onChange={(value) => {
                    form.setValue('variant.type', value);
                  }}
                />
                {form.getValues('variant.type') !== 'count' && (
                  <ZixSelectField
                    options={
                      form.getValues('variant.type') === 'weight'
                        ? [
                            { name: 'كغ', id: 'kg' },
                            { name: 'غ', id: 'g' },
                            { name: 'باوند', id: 'lb' },
                            { name: 'أوقية', id: 'oc' },
                          ]
                        : [
                            { name: 'متر', id: 'm' },
                            { name: 'سم', id: 'cm' },
                            { name: 'بوصة', id: 'in' },
                            { name: 'قدم', id: 'ft' },
                          ]
                    }
                    value={
                      form.getValues('variant.type_unit') ||
                      product?.data?.variant?.type_unit
                    }
                    onChange={(value) => {
                      form.setValue('variant.type_unit', value);
                    }}
                  />
                )}
              </XStack>

              <ZixInput
                leftIcon={() => (
                  <Text>
                    {
                      unitTypes.find(
                        (unit) =>
                          unit.id === form.getValues('variant.type_unit') ||
                          product?.data?.variant?.type_unit,
                      )?.name
                    }
                  </Text>
                )}
                keyboardType="numeric"
                value={
                  form.getValues('variant.type_value') ||
                  product?.data?.variant?.type_value
                }
                onChangeText={(value) => {
                  form.setValue('variant.type_value', Number(value));
                }}
              />
            </YStack>
          </ZixFieldContainer>
          <YStack gap="$4">{Object.values(variant)}</YStack>
        </YStack>
      )}
    </SchemaForm>
  );

  return (
    <ScreenLayout>
      <AppHeader
        title={productId ? 'تعديل المنتج' : 'إضافة منتج'}
        showBackButton
      />
      <YStack flex={1}>{renderForm()}</YStack>
      <ZixAlertActions
        title={productId ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح'}
        description={productId ? 'تم حفظ التغييرات على المنتج' : 'تم إضافة المنتج بنجاح'}
        icon={<CheckCircle size={20} color="green" />}
        closeButton={open}
      />
    </ScreenLayout>
  );
};

export default ProductManagerScreen;
