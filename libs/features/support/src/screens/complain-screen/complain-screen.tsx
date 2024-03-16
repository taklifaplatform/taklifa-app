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
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'solito/router';
import { Theme, XStack, YStack, Text, View } from 'tamagui';
import { z } from 'zod';

const ComplainSchema = z.object({
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
export const ComplainScreen = () => {
  const toast = useToastController();
  const router = useRouter();
  const form = useForm<z.infer<typeof ComplainSchema>>();
  const { mutate } = useMutation({
    mutationFn: (requestBody: z.infer<typeof ComplainSchema>) =>
      SupportService.storeSupportRequest({
        requestBody,
      }),
    onSuccess() {
      router.push('/');
      toast.show(t('forms:contact-us-success'));
    },
    onError(error: any) {
      toast.show(t('common:unknown_error'));
      handleFormErrors(form, error);
    },
  });

  return (
    <YStack
      justifyContent="center"
      alignItems="center"
      paddingVertical="$8"
      gap="$2"
    >
      <CustomIcon name="alert" size={'$9'} color={'$red9'} />
      <Text
        fontSize={25}
        fontWeight={'bold'}
        textAlign="center"
        color={'$red9'}
        $sm={{ fontSize: 18 }}
      >
        {t('web-home:complain-text')}
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
            schema={ComplainSchema}
            defaultValues={{
              username: '',
              name: '',
              phone_number: '+966',
              subject: '',
              message: '',
            }}
            onSubmit={mutate}
            renderBefore={() => (
              <View width={'100%'} paddingHorizontal="$4">
                <XStack justifyContent="space-between">
                  <YStack
                    gap="$2"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={'$red3'}
                    borderRadius={'$4'}
                    width="30%"
                    paddingVertical="$2"
                  >
                    <CustomIcon name="call" size={'$1'} color={'$red9'} />
                    <Text fontSize={12} $sm={{ fontSize: 8 }} color={'$red9'}>
                      +966655 55 55
                    </Text>
                  </YStack>
                  <YStack
                    gap="$2"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={'$red3'}
                    borderRadius={'$4'}
                    width="30%"
                    paddingVertical="$2"
                  >
                    <CustomIcon name="location" size={'$1'} color={'$red9'} />
                    <Text fontSize={12} $sm={{ fontSize: 8 }} color={'$red9'}>
                      Saudi Arabi
                    </Text>
                  </YStack>
                  <YStack
                    gap="$2"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={'$red3'}
                    borderRadius={'$4'}
                    width="30%"
                    paddingVertical="$2"
                  >
                    <CustomIcon name="mail" size={'$1'} color={'$red9'} />
                    <Text fontSize={12} $sm={{ fontSize: 8 }} color={'$red9'}>
                      +966655 55 55
                    </Text>
                  </YStack>
                </XStack>
              </View>
            )}
            renderAfter={({ submit }) => (
              <Theme>
                <SubmitButton
                  backgroundColor={'$red9'}
                  color={'$color1'}
                  onPress={() => submit()}
                  borderRadius="$10"
                  icon={<SendHorizontal size={'$1'} />}
                >
                  {t('forms:complain-send')}
                </SubmitButton>
              </Theme>
            )}
          />
        </FormProvider>
      </View>
    </YStack>
  );
};

export default ComplainScreen;
