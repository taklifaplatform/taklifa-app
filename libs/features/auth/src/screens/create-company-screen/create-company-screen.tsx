import { useMutation } from '@tanstack/react-query';

import React, { useEffect, useState } from 'react';

import { useToastController } from '@tamagui/toast';
import { CompanyAdminService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import {
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  ZixInput,
  ZixMediaPickerField,
  formFields,
  handleFormErrors,
} from '@zix/ui/forms';
import { ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'solito/router';
import { Avatar, Image, Text, Theme, XStack, YStack } from 'tamagui';
import { z } from 'zod';
import { AuthHeader } from '../../components/auth-header/auth-header';
import { UserAvatar, ZixButton } from '@zix/ui/common';
import { CirclePlus, ImagePlus, Upload } from '@tamagui/lucide-icons';
const CreateCompanyFormSchema = z
  .object({
    logo: formFields.image.optional().describe(t('forms:company_logo')),
    name: formFields.text.min(2).max(150).describe(t('forms:company_name')),
    about: formFields.text
      .min(2)
      .max(150)
      .describe(' نشاط الشركة //  نشاط الشركة'),
    legal_documents: formFields.files
      .describe('وثائق الشركة / المؤسسة // أرفق الملفات (سجل تجاري...)')
      .optional(),

    location_id: formFields.location.describe(t('forms:company_location')),
    accept_terms: formFields.accept_terms.describe(t('forms:accept_terms')),
  })
  .required({
    name: true,
    accept_terms: true,
  });

export const CreateCompanyScreen: React.FC = () => {
  useMixpanel('Create Company Page view');
  const form = useForm<z.infer<typeof CreateCompanyFormSchema>>();
  const { refetchUser, registerSteps } = useAuth();
  const toast = useToastController();
  const router = useRouter();
  const [logo, setLogo] = useState('');

  const { mutateAsync } = useMutation({
    mutationFn(requestBody: z.infer<typeof CreateCompanyFormSchema>) {
      return CompanyAdminService.create({
        requestBody,
      });
    },
    onSuccess() {
      toast.show(t('common:company-created-successfully'));
      refetchUser();
      router.push('/auth/register/success');
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  return (
    <ScreenLayout safeAreaBottom>
      <FormProvider {...form}>
        <SchemaForm
          schema={CreateCompanyFormSchema}
          defaultValues={{
            name: '',
          }}
          props={{
            location_id: {
              height: '$5',
            },
          }}
          onSubmit={mutateAsync}
          renderAfter={({ submit }) => {
            return (
              <Theme name="accent">
                <SubmitButton onPress={() => submit()} color="$color2">
                  {t('common:next')}
                </SubmitButton>
              </Theme>
            );
          }}
        >
          {(fields) => (
            <>
              <AuthHeader
                showIcon={false}
                activeStep={3}
                totalSteps={registerSteps || 1}
                title="قم انشاء شركة"
              />
              <XStack
                flex={1}
                justifyContent="center"
                alignItems="center"
                marginTop="$6"
              >
                {logo !== '' ? (
                  <Avatar
                    size={'$8'}
                    circular
                    borderWidth="$0.75"
                    backgroundColor="white"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      source={{ uri: logo }}
                      width={100}
                      height={100}
                      resizeMode="contain"
                    />
                  </Avatar>
                ) : (
                  <YStack
                    width={100}
                    height={100}
                    padding="$4"
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="#F1F2F4"
                    borderRadius="$14"
                  >
                    <ImagePlus size={50} color="green" />
                  </YStack>
                )}
              </XStack>
              <ZixFieldContainer label="">
                <ZixMediaPickerField
                  type="image"
                  onChange={(value) => {
                    form.setValue('logo', {
                      url: value?.original_url,
                      uuid: value?.uuid,
                    });
                    setLogo(value.original_url);
                  }}
                  showCustomImagePicker={true}
                  trigger={
                    <ZixButton
                      theme={'accent'}
                      width={'$15'}
                      height={'$4'}
                      borderRadius={'$4'}
                      backgroundColor="$color11"
                      alignSelf="center"
                      margin="$4"
                    >
                      <Upload size={20} color="#FFFFFF" />
                      <Text fontWeight="bold" fontSize="$1" color="#FFFFFF">
                        {' '}
                        رفع الشعار
                      </Text>
                    </ZixButton>
                  }
                />
              </ZixFieldContainer>
              {fields.name}
              {fields.about}
              <ZixFieldContainer label="وثائق الشركة / المؤسسة*">
                <ZixInput
                  placeholder="أرفق الملفات (سجل تجاري...)"
                  keyboardType="numeric"
                  value={form.getValues('legal_documents')}
                  disabled={true}
                  backgroundColor="#FFFFFF"
                />
                <ZixMediaPickerField
                  type="files"
                  onChange={(value) => {
                    form.setValue('legal_documents', value as any);
                  }}
                  value={form.getValues('legal_documents')}
                  showCustomImagePicker={true}
                  trigger={
                    <ZixButton
                      theme={'accent'}
                      position="absolute"
                      right={10}
                      top={10}
                      unstyled
                    >
                      <CirclePlus size={30} color="#000000" />
                    </ZixButton>
                  }
                />
              </ZixFieldContainer>
              {fields.location_id}
              {fields.accept_terms}
            </>
          )}
        </SchemaForm>
      </FormProvider>
    </ScreenLayout>
  );
};

export default CreateCompanyScreen;
