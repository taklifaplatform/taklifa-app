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
  formFields
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { Text, YStack } from 'tamagui';
import { z } from 'zod';
import { ProductManagerComponent } from '../../components/product-manager-component/product-manager-component';

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
        router.back();
      }, 3000);
    }
  }, [open]);


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
              open={open}
              setIsOpen={setOpen}
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
        <ProductManagerComponent productId={productId as string} />
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
