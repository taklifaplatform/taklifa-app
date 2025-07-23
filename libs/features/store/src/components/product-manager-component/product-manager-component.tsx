import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToastController } from '@tamagui/toast';
import { ProductsService, ProductTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import {
  formFields,
  handleFormErrors,
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  ZixInput,
  ZixSelectField,
  ZixSelectRadioGroupnField,
} from '@zix/ui/forms';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, XStack, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { z } from 'zod';

const UpdateProductFormSchema = z.object({
  images: formFields.medias.describe('الصورة').optional(),
  name: formFields.text.min(2).max(150).describe('اسم المنتج'),
  description: formFields.textarea.describe('الوصف').optional(),

  variant: z.object({
    price: formFields.text.describe('السعر (اختياري)').optional(),
    stock: formFields.number.describe('المخزون (اختياري)').optional(),
    // type: formFields.select.describe(''),
    type_unit: formFields.select.describe(''),
    // type_value: formFields.number.describe(''),
  }),
  is_available: formFields.select_radio_group.describe('الحالة'),
});

interface ProductManagerComponentProps {
  productId?: string;
  onUpdate?: (product: ProductTransformer) => void;
}
export const ProductManagerComponent = ({
  productId,
  onUpdate,
}: ProductManagerComponentProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
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
    { name: 'م', id: 'm' },
    { name: 'سم', id: 'cm' },
    { name: 'مم', id: 'mm' },
    { name: 'إنش', id: 'in' },
    { name: 'م²', id: 'm2' },
    { name: 'قدم²', id: 'ft2' },
    { name: 'م³', id: 'm3' },
    { name: 'لتر', id: 'ltr' },
    { name: 'مل', id: 'ml' },
    { name: 'طن', id: 'ton' },
    { name: 'كجم', id: 'kg' },
    { name: 'جم', id: 'g' },
    { name: 'م.ط', id: 'm4' },
  ];

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
      // toast.show(productId ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح');
      setOpen(true);

      queryClient.invalidateQueries({
        queryKey: ['ProductsService.fetchAllProduct', user?.active_company?.id],
      });
      onUpdate?.(response.data);
    },
    onError(error: any) {
      alert(error.message);
      // toast.show('حدث خطأ ما', {
      //   message: error.message,
      // });
      handleFormErrors(form, error);
    },
  });


  useEffect(() => {
    console.log(
      "form.watch('variant.type_value')",
      form.watch('variant.type_unit'),
    );
  }, [
    form.watch('variant.type_unit'),
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
  return (
    <SchemaForm
      form={form}
      schema={UpdateProductFormSchema}
      defaultValues={
        {
          ...product?.data,
          is_available: product?.data?.is_available?.toString(),
        }
      }
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
              onPress={() => {
                if (onUpdate) {
                  onUpdate(product?.data);
                } else {
                  router.back();
                }
              }}
            >
              إلغاء
            </SubmitButton>
            {/* <SubmitButton
              theme={'error'}
              pressStyle={{
                backgroundColor: 'transparent',
              }}
              backgroundColor="transparent"
              borderWidth={1}
              borderColor="$color0"
              color="$color0"
              onPress={() =>{ 
                if (setCloseDialog) {
                  setCloseDialog(false);
                } else {
                  router.back();
                }
              }}
            >
              حذف
            </SubmitButton> */}
          </YStack>
        );
      }}
    >
      {({
        variant: { type_unit, ...variant },
        ...fields
      }) => (
        <YStack gap="$4" >
          {Object.values(fields)}
          <ZixFieldContainer label="نوع المتغير">
            <YStack gap="$4">
              <XStack gap="$4" width="100%">
                  
                  <ZixSelectRadioGroupnField
                  colorSelected="#EFFEF6"
                  colorIndicator="#0F5837"
                    options={unitTypes}
                    value={
                      form.getValues('variant.type_unit') ||
                      product?.data?.variant?.type_unit|| 'm'
                    }
                    onChange={(value) => {
                      form.setValue('variant.type_unit', value.toString());
                    }}
                  />
                
              </XStack>

              
            </YStack>
          </ZixFieldContainer>
          <YStack gap="$4">{Object.values(variant)}</YStack>
        </YStack>
      )}
    </SchemaForm>
  );
};
