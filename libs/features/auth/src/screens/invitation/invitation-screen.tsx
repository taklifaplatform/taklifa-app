import { Stack, Theme, Text, YStack } from 'tamagui';

import {
  SchemaForm,
  SubmitButton,
  formFields
} from '@zix/ui/forms';
import { t } from 'i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const LoginSchema = z
  .object({
    text: formFields.text.describe('اسم المستخدم // اسم المستخدم'),
    // phone: formFields.phone.describe('Text'),
    secure_text: formFields.secure_text.describe('كلمة المرور'),
    secure_text2: formFields.secure_text.describe('تأكيد كلمة المرور'),
    boolean_checkbox: formFields.accept_terms.describe('الموافقة على الشروط والأحكام الخاصة بسواعد'),

    // text: formFields.text.describe('Text'),
    // text: formFields.text.describe('Text'),
    // text: formFields.text.describe('Text'),
  });

export const InvitationScreen: React.FC = () => {
  const form = useForm<z.infer<typeof LoginSchema>>();

  return (
    <SchemaForm
      form={form}
      schema={LoginSchema}
      defaultValues={{}}
      props={{}}
      renderAfter={({ submit }) => {
        return (
          <Stack gap="$4">
            <Theme inverse>
              <SubmitButton
                onPress={() => submit()}
                borderRadius="$10"
              >
                التالي
              </SubmitButton>
              <Text>ffff</Text>
            </Theme>
          </Stack>
        );
      }}
    >
      {(fields) => (
        <>
          <YStack
            justifyContent="center"
            alignItems="center"
            gap="$4"
            padding="$6"
          >
            <Text
              fontSize={30}
              fontWeight="800"
            >انضم إلى InstaPack</Text>
            <Text
              textAlign='center'
              fontSize={16}
              fontWeight="400"
              lineHeight={30}
            >  لقد تمت دعوتك للانضمام إلى InstaPack، يرجى تسجيل الدخول/التسجيل لقبول الدعوة</Text>
          </YStack>
          {Object.values(fields)}
        </>
      )}
    </SchemaForm>
  );
};
