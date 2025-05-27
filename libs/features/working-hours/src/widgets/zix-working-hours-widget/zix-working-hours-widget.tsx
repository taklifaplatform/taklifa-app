
import { useQuery } from '@tanstack/react-query';
import { WorkingHoursService } from '@zix/api';
import moment from 'moment';
import React from 'react';

import { Button, Text, View, XStack, YStack } from 'tamagui';
import { Pencil } from '@tamagui/lucide-icons';
import { t } from 'i18next';
import { ZixWidgetContainer } from '@zix/ui/widgets';
import { useRouter } from 'solito/router';
import { useAuth } from '@zix/services/auth';
import { Platform } from 'react-native';

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export type ZixWorkingHoursWidgetProps = {
  workingHourId: string;
  canEdit?: boolean;
}

export const ZixWorkingHoursWidget: React.FC<ZixWorkingHoursWidgetProps> = ({
  workingHourId,
  canEdit
}) => {

  const router = useRouter()
  const { getUrlPrefix } = useAuth()

  const { data, isLoading } = useQuery({
    queryFn: () => WorkingHoursService.retrieve({
      workingHour: workingHourId,
    }),
    queryKey: ['WorkingHoursService.retrieve', workingHourId],
  })

  const workingHours = data?.data

  const renderWorkingHours = (day) => {

    if (!workingHours[day]) {
      return (
        <Text fontSize={'$2'}>
          {t('app:working-hours.closed')}
        </Text>
      )
    }

    return (
      <Text fontSize={'$2'}>
        {moment(workingHours[`${day}_start`], 'HH:mm').format('HH:mm A')} - {moment(workingHours[`${day}_end`], 'hh:mm').format('hh:mm A')}
      </Text>
    )
  }

  const renderEditButton = () => canEdit ? (
    <Button icon={Pencil} size='$2' onPress={() => {
      router.push(`${getUrlPrefix}/working-hours/${workingHourId}/edit`)
    }}>
      {t('common:edit')}
    </Button>
  ) : null

  if (isLoading || !workingHours) {
    return (
      <View
        backgroundColor="$gray4"
        height='$4'
      />
    )
  }

  return (
    <ZixWidgetContainer label={t('common:working-hours')} labelPrepend={renderEditButton()}>
      <YStack gap="$2" flexDirection={Platform.OS === 'web' ? 'row' : 'column'} >
        {days.map((day, index) => (
          <XStack
            key={index}
            theme={workingHours[day] ? undefined : 'error'}
            backgroundColor="$color2"
            padding="$2"
            borderRadius="$1"
            gap="$4"
            flexWrap="wrap"
            flexShrink={1}
          >
            <Text fontSize="$2" fontWeight="bold" paddingRight="$2" width={100}>
              {t(`app:days.${day}`)}
            </Text>
            {renderWorkingHours(day)}
          </XStack>
        ))}
      </YStack>

    </ZixWidgetContainer>
  );
}


export default ZixWorkingHoursWidget;
