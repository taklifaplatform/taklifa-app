
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkingHoursService } from '@zix/api';
import { useMixpanel } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import {
  SchemaForm,
  SubmitButton,
  ZixFieldContainer,
  formFields,
  handleFormErrors
} from '@zix/ui/forms';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Theme, XStack, YStack } from 'tamagui';
import { z } from 'zod';

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const { useParam } = createParam<{ working: string }>();


const WorkingHoursManagerSchema = z
  .object({
    monday: formFields.boolean_checkbox.describe(t('app:common.working-day')),
    monday_start: formFields.time_picker.describe(t('app:common.from')),
    monday_end: formFields.time_picker.describe(t('app:common.to')),

    tuesday: formFields.boolean_checkbox.describe(t('app:common.working-day')),
    tuesday_start: formFields.time_picker.describe(t('app:common.from')),
    tuesday_end: formFields.time_picker.describe(t('app:common.to')),

    wednesday: formFields.boolean_checkbox.describe(t('app:common.working-day')),
    wednesday_start: formFields.time_picker.describe(t('app:common.from')),
    wednesday_end: formFields.time_picker.describe(t('app:common.to')),

    thursday: formFields.boolean_checkbox.describe(t('app:common.working-day')),
    thursday_start: formFields.time_picker.describe(t('app:common.from')),
    thursday_end: formFields.time_picker.describe(t('app:common.to')),

    friday: formFields.boolean_checkbox.describe(t('app:common.working-day')),
    friday_start: formFields.time_picker.describe(t('app:common.from')),
    friday_end: formFields.time_picker.describe(t('app:common.to')),

    saturday: formFields.boolean_checkbox.describe(t('app:common.working-day')),
    saturday_start: formFields.time_picker.describe(t('app:common.from')),
    saturday_end: formFields.time_picker.describe(t('app:common.to')),

    sunday: formFields.boolean_checkbox.describe(t('app:common.working-day')),
    sunday_start: formFields.time_picker.describe(t('app:common.from')),
    sunday_end: formFields.time_picker.describe(t('app:common.to')),
  });

export function WorkingHoursManagerScreen() {
  useMixpanel('Working Hours Manager Screen view')
  const [workingHourId] = useParam('working');

  const form = useForm<z.infer<typeof WorkingHoursManagerSchema>>();
  const toast = useToastController();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () => WorkingHoursService.retrieve({
      workingHour: workingHourId,
    }),
    queryKey: ['WorkingHoursService.retrieve', workingHourId],
  })

  const { mutateAsync } = useMutation({
    mutationFn: (requestBody) => WorkingHoursService.update({
      workingHour: workingHourId,
      requestBody,
    }),
    onSuccess({ data }) {
      toast.show(t('app:success.updated'))
      queryClient.refetchQueries({
        queryKey: ['WorkingHoursService.retrieve', workingHourId],
      });
      router.back()
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' })
      handleFormErrors(form, error?.body?.errors);
    },
  })

  const renderForm = () => data?.data && (
    <SchemaForm
      form={form}
      schema={WorkingHoursManagerSchema}
      defaultValues={data?.data}
      onSubmit={mutateAsync}
      renderAfter={({ submit }) => {
        return (
          <Theme inverse>
            <SubmitButton
              onPress={() => submit()}
            >
              {t('common:confirm')}
            </SubmitButton>
          </Theme>
        );
      }}
    >
      {(fields) => (
        <YStack>
          {
            days.map((day) => (
              <ZixFieldContainer key={day} label={t(`app:days.${day}`)} labelBold collapsible>
                <YStack>
                  {fields[day]}
                  <XStack alignItems='flex-start' gap='$2'>
                    {fields[`${day}_start`]}
                    {fields[`${day}_end`]}
                  </XStack>
                </YStack>
              </ZixFieldContainer>
            ))
          }
        </YStack>
      )}
    </SchemaForm>
  )

  const renderLoadingScreen = () => !data?.data && (
    <FullScreenSpinner />
  )
  return (
    <ScreenLayout safeAreaBottom authProtected>
      <AppHeader showBackButton title={t('app:common.business-hours')} />
      {renderForm()}
      {renderLoadingScreen()}
    </ScreenLayout>
  );
}


export default WorkingHoursManagerScreen;
