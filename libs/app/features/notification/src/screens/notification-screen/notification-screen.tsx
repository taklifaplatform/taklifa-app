
import { Text, YStack } from '@zix/app/ui/core';
import { useEffect, useState } from 'react';
import { SectionList, View } from 'react-native';
import NotificationCard from '../components/NotificationCard';
import SearchBar from '../components/SearchBar';

/* eslint-disable-next-line */
export interface NotificationScreenProps {
}
export function NotificationScreen(props: NotificationScreenProps) {

  const data = [
    {
      title: 'Today',
      data: [
        {
          id: 1,
          title: 'Shipment No. 23558 arrived to me from Abu So-and-so',
          time: 'Now',
          icon: 'notifications',
          avatar: null
        },
        {
          id: 2,
          title: 'Payment completed successfully! 125 riyals were paid from so-and-so',
          time: '1 hr ago',
          icon: 'wallet',
          avatar: null
        },
        {
          id: 3,
          title: 'John Doe Commented on your post',
          time: '2hr ago',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        {
          id: 4,
          title: 'John Doe Liked your post',
          time: 'Now',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
      ]
    },
    {
      title: 'Old',
      data: [
        {
          id: 5,
          title: 'Payment completed successfully! 125 riyals were paid from so-and-so',
          time: '1 hr ago',
          icon: 'wallet',
          avatar: null
        },
        {
          id: 6,
          title: 'Shipment No. 23558 arrived to me from Abu So-and-so',
          time: '1hr ago',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        {
          id: 7,
          title: 'Shipment No. 23558 arrived to me from Abu So-and-so',
          time: '2hr ago',
          avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        {
          id: 8,
          title: 'Payment completed successfully! 125 riyals were paid from so-and-so',
          time: '1 hr ago',
          icon: 'wallet',
          avatar: null
        },
      ]
    }
  ]
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])
  useEffect(() => {
    // search filter
    const _data: Section[] = data
      .map((section) => ({
        title: section.title,
        data: section.data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((section) => section.data.length > 0);

    setFilteredData(_data);
  }, [search]);

  return (
    <YStack
      flex={1}
      gap="$2"
      backgroundColor={'#FAFAFA'}
    >
      <SearchBar
        setSearch={setSearch}
        search={search}
      />

      <YStack
        padding="$4"
        flex={1}
      >
        <SectionList
          showsVerticalScrollIndicator={false}

          ListEmptyComponent={() => (
            <View style={{ height: 600, width: '100%' }}>
              <empty_notifications />
            </View>
          )}
          renderItem={({ item }) => (
            <NotificationCard item={item} />
          )}
          renderSectionHeader={({ section: { title } }) => {
            return (
              <Text
                fontWeight={'bold'}
                fontSize={'$3'}
                marginBottom='$4'
              >
                {title}
              </Text>
            );
          }}
          sections={filteredData}
          stickySectionHeadersEnabled
        />
      </YStack>

    </YStack>
  );
};


export default NotificationScreen;
