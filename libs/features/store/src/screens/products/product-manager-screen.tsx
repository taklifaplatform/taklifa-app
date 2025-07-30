import { CheckCircle, Trash2 } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ProductsService,
  UpdateProductRequest,
  ImagesUpdateProductRequest,
} from '@zix/api';
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
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { Text, XStack, YStack } from 'tamagui';
import { z } from 'zod';

const { useParam } = createParam<{ product: string }>();

// Define the form schema with proper types
const UpdateProductFormSchema = z.object({
  images: formFields.medias.describe('الصورة').optional(),
  name: formFields.text.min(2).max(150).describe('اسم المنتج'),
  description: formFields.textarea.describe('الوصف'),
  variant: z.object({
    price: formFields.number.describe('السعر'), // Changed to number to match API
    stock: formFields.number.describe('المخزون (اختياري)').optional(),
    type_unit: formFields.select.describe('نوع الوحدة').optional(),
  }),
  is_available: formFields.select_radio_group.describe('الحالة'),
});

type FormData = z.infer<typeof UpdateProductFormSchema>;

// Unit types for the select field
const unitTypes = [
  { name: 'عدد', id: 'count' },
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

export const ProductManagerScreen = () => {
  const [productId] = useParam('product');
  const queryClient = useQueryClient();
  const { user, getUrlPrefix } = useAuth();
  const router = useRouter();
  const toast = useToastController();

  // State management
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Form setup
  const form = useForm<FormData>();

  // Fetch product data
  const { data, isLoading, isFetching } = useQuery({
    enabled: !!productId,
    queryKey: ['ProductsService.retrieveProduct', productId],
    queryFn: () =>
      ProductsService.retrieveProduct({
        product: productId as string,
      }),
  });

  // Transform form data to API format
  const transformFormData = useCallback(
    (formData: FormData): UpdateProductRequest => {
      // Transform images to the correct format
      const transformedImages: ImagesUpdateProductRequest[] | undefined =
        formData.images?.map((img) => ({
          id: img.id,
          uuid: img.uuid || undefined,
        }));

      return {
        name: formData.name,
        description: formData.description,
        variant: {
          price: formData.variant.price,
          stock: formData.variant.stock,
          type_unit: formData.variant.type_unit || undefined,
        },
        is_available: formData.is_available === 1,
        images: transformedImages,
      };
    },
    [],
  );

  // Update/Create product mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const requestBody = transformFormData(formData);

      if (productId) {
        return ProductsService.updateProduct({
          product: productId,
          requestBody,
        });
      } else {
        return ProductsService.storeProduct({
          requestBody,
        });
      }
    },
    onSuccess: (response) => {
      toast.show(productId ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['ProductsService.fetchAllProduct'],
      });
      setOpen(true);
    },
    onError: (error: any) => {
      toast.show('حدث خطأ ما', {
        message: error.message,
      });
      handleFormErrors(form, error);
    },
  });

  // Delete product mutation
  const { mutateAsync: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (productId: string) => {
      return ProductsService.deleteProduct({
        product: productId,
      });
    },
    onSuccess: () => {
      toast.show('تم حذف المنتج بنجاح');
      queryClient.invalidateQueries({
        queryKey: ['ProductsService.fetchAllProduct', user?.active_company?.id],
      });
      router.back();
    },
    onError: (error: any) => {
      toast.show('حدث خطأ ما', {
        message: error.message,
      });
    },
  });

  // Handle form submission
  const handleSubmit = useCallback(
    async (formData: FormData) => {
      await mutateAsync(formData);
    },
    [mutateAsync],
  );

  // Handle success alert close
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
        router.replace(`${getUrlPrefix}/(tabs)/store`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [open, router, getUrlPrefix]);

  // Get default values for form
  const getDefaultValues = useCallback(() => {
    if (data?.data?.id) {
      return {
        ...data.data,
        is_available: data.data.is_available ? 1 : 0,
        variant: {
          price: data.data.variant?.price || 0,
          stock: data.data.variant?.stock,
          type_unit: data.data.variant?.type_unit || undefined,
        },
      };
    }
    return {
      variant: {
        price: 0,
        stock: undefined,
        type_unit: undefined,
      },
      is_available: 1,
    };
  }, [data]);

  // Validate required fields
  const validateRequiredFields = useCallback(() => {
    const values = form.getValues();
    const requiredFields = [
      'name',
      'description',
      'variant.price',
      'variant.type_unit',
    ] as const;

    let hasError = false;

    requiredFields.forEach((field) => {
      if (field.includes('.')) {
        const [parentKey, childKey] = field.split('.') as [
          keyof FormData,
          string,
        ];
        const parentValue = values[parentKey] as Record<string, any>;

        if (!parentValue?.[childKey]) {
          form.setError(field as any, {
            type: 'custom',
            message: 'هذا الحقل مطلوب',
          });
          hasError = true;
        }
      } else {
        const fieldKey = field as keyof FormData;
        if (!values[fieldKey]) {
          form.setError(fieldKey as any, {
            type: 'custom',
            message: 'هذا الحقل مطلوب',
          });
          hasError = true;
        }
      }
    });

    return !hasError;
  }, [form]);

  // Handle custom submit
  const handleCustomSubmit = useCallback(() => {
    if (validateRequiredFields()) {
      form.handleSubmit(handleSubmit)();
    }
  }, [form, validateRequiredFields, handleSubmit]);

  // Render delete button
  const renderDeleteButton = useCallback(() => {
    if (!productId) return null;

    return (
      <DeleteProduct
        title="تأكيد الحذف"
        open={openDeleteDialog}
        setIsOpen={setOpenDeleteDialog}
        trigger={
          <ZixButton
            theme="error"
            width="100%"
            height="$3"
            backgroundColor="#FFF2F1"
            icon={<Trash2 size={20} color="#FF6369" />}
            borderWidth={1}
            borderColor="#FF6369"
            disabled={isDeleting}
          >
            <Text fontWeight="500" fontSize="$3" color="#FF6369">
              حذف
            </Text>
          </ZixButton>
        }
        onDelete={() => {
          deleteProduct(productId as string);
        }}
      />
    );
  }, [
    productId,
    openDeleteDialog,
    setOpenDeleteDialog,
    isDeleting,
    deleteProduct,
  ]);

  // Render form
  const renderForm = () => {
    if (isLoading || (productId && !data?.data?.id && isFetching)) {
      return <FullScreenSpinner />;
    }

    return (
      <SchemaForm
        form={form}
        schema={UpdateProductFormSchema}
        defaultValues={getDefaultValues()}
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
        onSubmit={handleSubmit}
        renderAfter={({ submit }) => (
          <YStack gap="$4" marginBottom="$4">
            <SubmitButton
              theme="accent"
              color="$color2"
              backgroundColor="$color1"
              disabledStyle={{ opacity: 0.5 }}
              onPress={handleCustomSubmit}
              disabled={isPending}
            >
              {productId ? 'حفظ التغييرات' : 'إضافة المنتج'}
            </SubmitButton>
            <SubmitButton
              theme="accent"
              pressStyle={{ backgroundColor: 'transparent' }}
              backgroundColor="transparent"
              borderWidth={1}
              borderColor="$color0"
              color="$color0"
              onPress={() => router.back()}
              disabled={isPending}
            >
              إلغاء
            </SubmitButton>
          </YStack>
        )}
      >
        {({ is_available, variant, ...fields }) => (
          <YStack gap="$4">
            {Object.values(fields)}

            {/* Custom type_unit field */}
            <ZixFieldContainer label="نوع الوحدة" isOptional={true}>
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
                    value={
                      form.watch('variant.type_unit') ||
                      data?.data?.variant?.type_unit ||
                      undefined
                    }
                    onChange={(value) => {
                      form.setValue('variant.type_unit', value as any);
                    }}
                    placeholder="اختر نوع الوحدة"
                  />
                </XStack>
              </YStack>
            </ZixFieldContainer>

            {/* Variant fields */}
            <YStack gap="$4">
              {variant.price}
              {variant.stock}
            </YStack>

            {is_available}
          </YStack>
        )}
      </SchemaForm>
    );
  };

  return (
    <ScreenLayout>
      <AppHeader
        title={productId ? 'تعديل المنتج' : 'إضافة منتج'}
        showBackButton
        deleteButton={renderDeleteButton}
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
