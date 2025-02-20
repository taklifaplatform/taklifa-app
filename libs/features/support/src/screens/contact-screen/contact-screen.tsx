import { SendHorizontal } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation } from '@tanstack/react-query';
import { SupportService } from '@zix/api';
import {
  SchemaForm,
  SubmitButton,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { FormProvider, Text, Theme, View, XStack, YStack } from 'tamagui';
import { z } from 'zod';

const ContactUsSchema = z.object({
  //support_category_id: formFields.autocomplete.describe('Support Category // دعم'),
  email: formFields.text.describe(t('forms:email')),
  phone_number: formFields.phone.describe(t('forms:phone_number')),
  subject: formFields.text.describe(
    `${t('forms:subject')} // ${t('forms:subject')}`,
  ),
  message: formFields.textarea.describe(
    `${t('forms:message')} // ${t('forms:message')}`,
  ),
});

export const ContactScreen = () => {
  const toast = useToastController();
  const router = useRouter();
  const form = useForm<z.infer<typeof ContactUsSchema>>();
  const { mutateAsync } = useMutation({
    mutationFn: (requestBody: z.infer<typeof ContactUsSchema>) =>
      SupportService.storeSupportRequest({
        requestBody,
      }),
    onSuccess() {
      setTimeout(() => {
        router.push('/');
      }, 2000);
      toast.show(t('forms:contact-us-success'));
    },
    onError(error: any) {
      toast.show(t('common:unknown_error'));
      handleFormErrors(form, error);
    },
  });

  return (
    <ScreenLayout safeAreaBottom>
      <YStack
        justifyContent="center"
        alignItems="center"
        paddingVertical="$8"
        gap="$2"
      >
        <Text
          fontSize={25}
          fontWeight="bold"
          textAlign="center"
          $sm={{ fontSize: 18 }}
        >
          {t('web-home:contact-welcome')}
        </Text>
        <Text fontSize={18} fontWeight="bold" $sm={{ fontSize: 15 }}>
          {t('web-home:contact-question')}
        </Text>
        <View
          width={'70%'}
          $sm={{ width: '100%' }}
          backgroundColor={'$color1'}
          borderRadius={'$4'}
          paddingVertical={'$4'}
          marginTop={'$6'}
        >
          <FormProvider {...form}>
            <SchemaForm
              form={form}
              schema={ContactUsSchema}
              defaultValues={{
                username: '',
                name: '',
                phone_number: '+966',
                subject: '',
                message: '',
              }}
              // props={{
              //   support_category_id: {
              //     api: 'geography/cities',
              //   }
              // }}
              onSubmit={mutateAsync}
              renderBefore={() => (
                <View width={'100%'} paddingHorizontal="$4">
                  <XStack justifyContent="space-between">
                    <YStack
                      gap="$2"
                      justifyContent="center"
                      alignItems="center"
                      backgroundColor={'$color3'}
                      borderRadius={'$4'}
                      width="30%"
                      paddingVertical="$2"
                    >
                      <CustomIcon name="call" size={'$1'} color={'$color5'} />
                      <Text fontSize={12} $sm={{ fontSize: 8 }}>
                        +966655 55 55
                      </Text>
                    </YStack>
                    <YStack
                      gap="$2"
                      justifyContent="center"
                      alignItems="center"
                      backgroundColor={'$color3'}
                      borderRadius={'$4'}
                      width="30%"
                      paddingVertical="$2"
                    >
                      <CustomIcon
                        name="location"
                        size={'$1'}
                        color={'$color5'}
                      />
                      <Text fontSize={12} $sm={{ fontSize: 8 }}>
                        Saudi Arabi
                      </Text>
                    </YStack>
                    <YStack
                      gap="$2"
                      justifyContent="center"
                      alignItems="center"
                      backgroundColor={'$color3'}
                      borderRadius={'$4'}
                      width="30%"
                      paddingVertical="$2"
                    >
                      <CustomIcon name="mail" size={'$1'} color={'$color5'} />
                      <Text fontSize={12} $sm={{ fontSize: 8 }}>
                        +966655 55 55
                      </Text>
                    </YStack>
                  </XStack>
                </View>
              )}
              renderAfter={({ submit }) => (
                <Theme>
                  <SubmitButton
                    onPress={() => submit()}
                    borderRadius="$10"
                    icon={<SendHorizontal size={'$1'} />}
                  >
                    {t('forms:send-message')}
                  </SubmitButton>
                </Theme>
              )}
            />
          </FormProvider>
        </View>
      </YStack>
    </ScreenLayout>
  );
};

export default ContactScreen;
