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
  ZixSelectField
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { Text, XStack, YStack } from 'tamagui';
import { z } from 'zod';

const { useParam } = createParam<{ product: string }>();

const UpdateProductFormSchema = z.object({
  images: formFields.medias.describe('الصورة').optional(),
  name: formFields.text.min(2).max(150).describe('اسم المنتج'),
  description: formFields.textarea.describe('الوصف').optional(),

  variant: z.object({
    price: formFields.text.describe('السعر (اختياري)').optional(),
    stock: formFields.number.describe('المخزون (اختياري)').optional(),
    type_unit: formFields.select.describe(''),
  }),
  is_available: formFields.select_radio_group.describe('الحالة'),
});

export const ProductManagerScreen = () => {
  const [productId] = useParam('product');
  const queryClient = useQueryClient();
  const { user } = useAuth();

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
      setOpen(true);

      queryClient.invalidateQueries({
        queryKey: ['ProductsService.fetchAllProduct', user?.active_company?.id],
      });
      router.back();
    },
    onError(error: any) {
      alert(error.message);
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
      <YStack flex={1}>
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
                  router.back()
              }}
            >
              إلغاء
            </SubmitButton>
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
                value={form.getValues('variant.type_unit') || product?.data?.variant?.type_unit|| 'm'}
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
      </YStack>
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
