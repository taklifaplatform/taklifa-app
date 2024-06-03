
import { Bell } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { NotificationService } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { useEcho } from '@zix/services/laravel-echo';
import { useEffect } from 'react';
import { useRouter } from 'solito/router';

import { Button, Stack, Text, View } from 'tamagui';
// tmp


export const ZixNotificationHeaderButton = () => {
  const router = useRouter()
  const echo = useEcho()
  const { user } = useAuth()
  const { data, refetch } = useQuery({
    queryFn: () => NotificationService.getUnreadNotificationCount(),
    queryKey: ['NotificationService.getUnreadNotificationCount'],
  })

  useEffect(() => {

    echo.private(`notifications.${user?.id}`)
      .notification((data) => {
        console.log('data notification received::', data)
        refetch()
      })
    return () => {
      // channel.uns()
    }
  }, [])

  const renderBellCount = () => !!data?.data?.count && (
    <View
      position='absolute'
      right='$-3'
      top='$-2'
      theme='error'
      backgroundColor='$color10'
      paddingHorizontal='$2'
      paddingVertical='$1'
      borderRadius='$4'
    >

      <Text color='$color1'>
        {data?.data?.count || 0}
      </Text>
    </View>
  )

  return (
    <Button
      unstyled
      size="$2"
      onPress={() => router.push(`/app/notifications`)}
    >
      <Stack position='relative'>

        <Bell size="$1" fill="#000" />

        {renderBellCount()}
      </Stack>
    </Button>
  );
}


export default ZixNotificationHeaderButton;
