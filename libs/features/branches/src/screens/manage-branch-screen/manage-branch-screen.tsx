
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CompanyBranchAdminService, ServicesService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { DebugObject } from '@zix/ui/common';
import { formFields, handleFormErrors, SchemaForm, SubmitButton, ZixFieldContainer } from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Text, Theme } from 'tamagui';
import { z } from 'zod';

const ManageServiceFormSchema = z
  .object({
    name: formFields.text.describe(t('common:branch-name')),
    description: formFields.textarea.describe(t('common:branch-description')),
    contact_number: formFields.phone.describe(t('common:branch-contact-number')),
    location_id: formFields.location.describe(t('common:branch-location')),
  });


const { useParam } = createParam<{ branch?: string }>();

export function ManageBranchScreen() {
  useMixpanel('Manage Branch Screen view')
  const form = useForm<z.infer<typeof ManageServiceFormSchema>>();
  const toast = useToastController();
  const [branchId] = useParam('branch');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data } = useQuery({
    queryFn: () =>
      CompanyBranchAdminService.retrieve({
        company: user?.active_company?.id || '',
        companyBranch: branchId,
      }),
    queryKey: ['CompanyBranchAdminService.retrieve', branchId],
  })
  /* useEffect(() => {
     if (serviceId) {
       Object.keys(data?.data || {}).forEach((key) => {
         form.setValue(key, data?.data[key]);
       });
     }
   }, [data?.data])*/

  const { mutateAsync } = useMutation({
    async mutationFn(requestBody: z.infer<typeof ManageServiceFormSchema>) {
      if (branchId) {
        return CompanyBranchAdminService.update({
          company: data?.data?.company_id || '',
          companyBranch: branchId,
          requestBody,
        });
      }

      return CompanyBranchAdminService.create({
        company: user?.active_company?.id || '',
        requestBody,
      });
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['CompanyBranchAdminService.list'],
      })
      queryClient.refetchQueries({
        queryKey: ['CompanyBranchAdminService.list', user?.id],
      })
      queryClient.refetchQueries({
        queryKey: ['CompanyBranchAdminService.list', user?.active_company?.id],
      })
      toast.show(t('common:company-updated-successfully'));
      form.reset();
      router.replace(`/app/company`);

      console.log('onSuccess::')
    },
    onError(error: any) {
      console.log('============')
      console.log('onError::', JSON.stringify(error, null, 2))
      console.log('============')
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
      handleFormErrors(form, error?.body?.errors);
    },
  });

  const renderForm = () => (!branchId || data?.data?.id) && (
    <SchemaForm
      form={form}
      schema={ManageServiceFormSchema}
      props={{
        cover: {
          notAvatar: true
        }
      }}
      defaultValues={data?.data || {}}
      onSubmit={mutateAsync}
      renderAfter={({ submit }) => {
        return (
          <Theme inverse>
            <SubmitButton onPress={() => submit()}>
              {t('common:next')}
            </SubmitButton>
          </Theme>
        );
      }}
    />

  );

  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader
        showBackButton
        title={branchId ? t('common:update-branch') : t('common:create-branch')}
      />
      {renderForm()}
    </ScreenLayout>
  )
}


export default ManageBranchScreen;
