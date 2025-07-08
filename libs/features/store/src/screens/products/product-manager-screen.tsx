import { CheckCircle } from '@tamagui/lucide-icons';
import {
  formFields,
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  ZixInput,
  ZixSelectField,
} from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'expo-router';
import { ZixAlertActions } from '@zix/ui/common';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { FormProvider, RadioGroup, Text, XStack, YStack } from 'tamagui';
import { z } from 'zod';

const { useParam } = createParam<{ product: string }>();

const UpdateProductFormSchema = z
  .object({
    image: formFields.image.describe('الصورة').optional(),
    title: formFields.text.min(2).max(150).describe('اسم المنتج').optional(),
    description: formFields.textarea.describe('الوصف'),
    category: formFields.text.describe(''),
    type_of_variable: formFields.select.describe(' '),
    unit: formFields.select.describe(''),
    price: formFields.text.describe('السعر (اختياري)').optional(),
    stock: formFields.number.describe('المخزون (اختياري)').optional(),
    status: formFields.boolean_switch.describe('الحالة'),
  })
  .required({
    title: true,
    description: true,
  });

export const ProductManagerScreen = () => {
  const [productId] = useParam('product');
  const form = useForm<z.infer<typeof UpdateProductFormSchema>>();
  const router = useRouter();
  const [typeOfVariable, setTypeOfVariable] = useState<string>('weight');
  const [unit, setUnit] = useState<string>('kg');
  const [unitArabic, setUnitArabic] = useState<string>('كغ');
  const [open, setOpen] = useState(false);
  const unitOptions = {
    weight: [
      { name: 'كغ', id: 'kg' },
      { name: 'طن', id: 'ton' },
    ],
    volume: [
      { name: 'متر مكعب', id: 'm3' },
      { name: 'لتر', id: 'l' },
      { name: 'مليلتر', id: 'ml' },
      { name: 'مليمتر مكعب', id: 'mm3' },
    ],
    length: [{ name: 'متر', id: 'm' }],
    width: [{ name: 'متر', id: 'm' }],
    height: [{ name: 'متر', id: 'm' }],
    area: [{ name: 'متر مربع', id: 'm2' }],
  };

  const handleSubmit = () => {
    console.log(form.getValues());
    if (form.formState.isValid) {
      setOpen(true);
    }
    setTimeout(() => {
      setOpen(false);
      router.back();
    }, 3000);
  };
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
        router.back();
      }, 3000);
    }
  }, [open]);

  return (
    <ScreenLayout>
      <AppHeader title="تعديل المنتج" showBackButton />
      <YStack flex={1}>
        <FormProvider {...form}>
          <SchemaForm
            schema={UpdateProductFormSchema}
            props={{
              title: {
                backgroundColor: '#FFFFFF',
              },
              description: {
                backgroundColor: '#FFFFFF',
              },
            }}
            onSubmit={handleSubmit}
            renderAfter={({ submit }) => {
              return (
                <YStack gap="$4" marginBottom={'$4'}>
                  <SubmitButton
                    theme={'accent'}
                    backgroundColor="$color1"
                    color="white"
                    onPress={() => {
                      submit();
                      setOpen(true);
                    }}
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
            {(fields) => (
              <YStack gap="$4">
                {fields.image}
                {fields.title}
                {fields.description}
                <ZixFieldContainer label="نوع المتغير">
                  <YStack gap="$4">
                    <XStack gap="$4">
                      <ZixSelectField
                        options={[
                          { name: 'الوزن', id: 'weight' },
                          { name: 'الحجم', id: 'volume' },
                          { name: 'الطول', id: 'length' },
                          { name: 'العرض', id: 'width' },
                          { name: 'الارتفاع', id: 'height' },
                          { name: 'المساحة', id: 'area' },
                        ]}
                        value={typeOfVariable}
                        onChange={(value) => setTypeOfVariable(value)}
                        selectTriggerProps={{
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      <ZixSelectField
                        options={
                          unitOptions[
                            typeOfVariable as keyof typeof unitOptions
                          ]
                        }
                        value={unit}
                        onChange={(value) => {
                          setUnit(value);
                          setUnitArabic(
                            unitOptions[
                              typeOfVariable as keyof typeof unitOptions
                            ].find((unit) => unit.id === value)?.name || '',
                          );
                        }}
                        selectTriggerProps={{
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                    </XStack>
                    <ZixInput
                      leftIcon={() => <Text>{unitArabic}</Text>}
                      onChangeText={(value) =>
                        form.setValue('stock', Number(value))
                      }
                      backgroundColor="#FFFFFF"
                    />
                  </YStack>
                </ZixFieldContainer>
                <ZixFieldContainer label="السعر">
                  <ZixInput
                    placeholder="السعر"
                    leftIcon={() => (
                      <CustomIcon name="riyal" size={'$2'} color="$color0" />
                    )}
                    onChangeText={(value) => form.setValue('price', value)}
                    backgroundColor="#FFFFFF"
                  />
                </ZixFieldContainer>
                <ZixFieldContainer label="المخزون (اختياري)">
                  <ZixInput
                    placeholder="1"
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      form.setValue('stock', Number(value))
                    }
                    backgroundColor="#FFFFFF"
                  />
                </ZixFieldContainer>
                <ZixFieldContainer label="الحالة">
                  <XStack gap="$4">
                    <RadioGroup
                      value={form.watch('status') ? 'active' : 'noactive'}
                      onValueChange={(value) =>
                        form.setValue(
                          'status',
                          value === 'active' ? true : false,
                        )
                      }
                      width="100%"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      paddingHorizontal={'$6'}
                    >
                      <XStack
                        width="50%"
                        gap="$6"
                        alignItems="center"
                        backgroundColor={
                          form.watch('status') ? '#EFFEF6' : 'transparent'
                        }
                        borderRadius={'$2'}
                        padding={'$2'}
                      >
                        <RadioGroup.Item value="active">
                          <RadioGroup.Indicator />
                        </RadioGroup.Item>
                        <Text>متوفر</Text>
                      </XStack>

                      <XStack
                        width="50%"
                        gap="$6"
                        alignItems="center"
                        backgroundColor={
                          !form.watch('status') ? '#EFFEF6' : 'transparent'
                        }
                        borderRadius={'$2'}
                        padding={'$2'}
                      >
                        <RadioGroup.Item value="noactive">
                          <RadioGroup.Indicator
                            accentColor={
                              !form.watch('status') ? '#0F5837' : '#000000'
                            }
                          />
                        </RadioGroup.Item>
                        <Text>غير متوفر</Text>
                      </XStack>
                    </RadioGroup>
                  </XStack>
                </ZixFieldContainer>
              </YStack>
            )}
          </SchemaForm>
        </FormProvider>
      </YStack>
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
