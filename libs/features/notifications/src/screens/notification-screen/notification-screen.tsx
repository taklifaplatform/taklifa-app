import { useQuery } from '@tanstack/react-query';
import { NotificationService, NotificationTransformer } from '@zix/api';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { SectionList, SectionListData, } from 'react-native';
import { Text, XStack, YStack, View, H4 } from 'tamagui';
import { NotificationCard } from '../components/NotificationCard';
import SearchBar from '../components/SearchBar';
import { CustomIcon } from '@zix/ui/icons';

/* eslint-disable-next-line */
export interface NotificationScreenProps { }
export function NotificationScreen(props: NotificationScreenProps) {

  const [search, setSearch] = useState('');


  const { data: apiData } = useQuery({
    queryFn() {
      return NotificationService.listNotifications({ perPage: 50, search });
    },
    queryKey: ['NotificationService.listNotifications', search]
  });

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
    <YStack flex={1} gap="$2" backgroundColor={'#FAFAFA'}>
      <SearchBar setSearch={setSearch} search={search} />

      {/* <DebugObject object={sections} /> */}
      <SectionList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View flex={1} alignItems='center' gap="$8">
            <CustomIcon name="empty_notification" size="$18" color="$color5" />
            <H4>No Notification Found!</H4>
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
    </YStack>
  );
}

export default NotificationScreen;
