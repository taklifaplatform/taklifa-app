import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NotificationService, NotificationTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { SectionList, SectionListData, } from 'react-native';
import { H4, Text, View, XStack } from 'tamagui';
import { NotificationCard } from '../components/NotificationCard';
import { t } from 'i18next';

/* eslint-disable-next-line */
export interface NotificationScreenProps { }
export function NotificationScreen(props: NotificationScreenProps) {

  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data: apiData, ...notificationQuery } = useQuery({
    queryFn() {
      return NotificationService.listNotifications({ perPage: 50, search });
    },
    queryKey: ['NotificationService.listNotifications', search]
  });

  const { mutate: markAllNotificationsAsRead } = useMutation({
    mutationFn() {
      return NotificationService.markAllNotificationsAsRead();
    },
    onSuccess(data, variables, context) {
      queryClient.refetchQueries({
        queryKey: ['NotificationService.listNotifications', 'NotificationService.getUnreadNotificationCount']
      });
    },

  })

  useEffect(() => {
    markAllNotificationsAsRead();
  }, [])

  const listViewDateFormat = (date: string) => {
    return moment(date).calendar(null, {
      sameDay: '[Today]',
      nextDay: 'DD MMMM',
      nextWeek: '[Next] dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD MMMM'
    });
  }

  const sections = useMemo(() => {
    const _notifications: Record<string, {
      date: string;
      title: string;
      data: NotificationTransformer[];
    }> = {};

    apiData?.data?.forEach(notification => {
      const date = moment(notification.created_at).format('YYYY-MM-DD');

      if (_notifications[date]) {
        _notifications[date].data.push(notification);
      } else if (notification.created_at) {
        _notifications[date] = {
          date,
          title: listViewDateFormat(notification.created_at),
          data: [notification]
        };
      }
    });

    const finalData: SectionListData<NotificationTransformer>[] = [];
    Object.keys(_notifications).forEach(key => {
      finalData.push(_notifications[key])
    });

    return finalData;
  }, [apiData])



  return (
    <ScreenLayout authProtected>
      <AppHeader
        showBackButton
        title={t('common:notification')}
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch
        }}
      />
      <SectionList
        style={{ flex: 1 }}
        refreshing={notificationQuery?.isFetching}
        onRefresh={notificationQuery?.refetch}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View flex={1} alignItems='center' gap="$2">
            <CustomIcon name="empty_notification" size="$18" color="$color5" />
            <H4 color="#8590A2">{t('common:no-notification-found')}</H4>
          </View>
        )}
        renderItem={({ item, index }) => <NotificationCard key={`${item.id}-${index}`} notification={item} />}
        renderSectionHeader={({ section: { title, data } }) => {
          return (
            <XStack padding="$4" alignItems='center' justifyContent='space-between' backgroundColor="$background">
              <Text fontWeight={'bold'} fontSize={'$3'} >
                {title}
              </Text>

              <Text>({data?.length})</Text>
            </XStack>
          );
        }}
        sections={sections}
        stickySectionHeadersEnabled
      />
    </ScreenLayout>
  );
}

export default NotificationScreen;
