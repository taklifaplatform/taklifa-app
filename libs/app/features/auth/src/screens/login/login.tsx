import { Theme, Button } from '@zix/app/ui/core';
import { SchemaForm, formFields } from '@zix/app/ui/forms';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { z } from 'zod';

const { useParams, useUpdateParams } = createParam<{ phone?: string }>();

const LoginSchema = z
  .object({
    // phone: formFields.phone.describe(t('forms:phone_number').toString()),
    username: formFields.text
      .nullish()
      .describe('Username // Enter your password'),
    password: formFields.text.min(8).describe('Password // Enter your password')
    // accept_terms: formFields.boolean_checkbox.describe(t('forms:accept_terms')),
  })
  .required({
    phone: true,
    password: true,
    accept_terms: true
  });

export const LoginScreen: React.FC = () => {
  const form = useForm<z.infer<typeof LoginSchema>>();
  const updateParams = useUpdateParams();
  const { params } = useParams();

  useEffect(() => {
    // remove the persisted email from the url, mostly to not leak user's email in case they share it
    if (params?.phone) {
      updateParams({ phone: undefined }, { web: { replace: true } });
    }
  }, [params?.phone, updateParams]);

  async function onSubmit({ phone, password }: z.infer<typeof LoginSchema>) {
    // const { error, data } = await supabase.auth.signInWithPassword({
    //   phone: phone,
    //   password: password,
    // })
    // if (error) {
    //   const errorMessage = error?.message.toLowerCase()
    //   if (errorMessage.includes('phone')) {
    //     form.setError('phone', { type: 'custom', message: errorMessage })
    //   } else if (errorMessage.includes('password')) {
    //     form.setError('password', { type: 'custom', message: errorMessage })
    //   } else {
    //     form.setError('password', { type: 'custom', message: errorMessage })
    //   }
    // } else {
    //   redirectUser(data?.user)
    // }
  }
  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={LoginSchema}
        defaultValues={{
          phone: params?.phone || '+966',
          password: ''
        }}
        onSubmit={onSubmit}
        props={
          {
            // password: {
            //   afterElement: <ForgotPasswordLink />,
            //   secureTextEntry: true
            // },
            // accept_terms: {
            //   prepend: <AcceptTermsLink />
            // }
          }
        }
        renderAfter={({ submit }) => {
          return (
            <Theme inverse>
              <Button onPress={() => submit()} >Submit</Button>
            </Theme>
          );
          // return (
          //   <Stack gap="$4">
          //     <Theme inverse>
          //       <SubmitButton onPress={() => submit()} borderRadius="$10">
          //         {t('auth:sign_in')}
          //       </SubmitButton>
          //     </Theme>
          //     <SignUpLink />
          //   </Stack>
          // );
        }}
      >
        {(fields) => <>{Object.values(fields)}</>}
      </SchemaForm>
    </FormProvider>
  );
};

export default LoginScreen;
