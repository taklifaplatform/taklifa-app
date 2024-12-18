
import { useQuery } from '@tanstack/react-query';
import { AppHeader } from '@zix/ui/layouts';
import { H4, View, YStack, Image, XStack, Text, Button, Theme } from 'tamagui';
import { ServicesService } from '@zix/api';
import { Alert, Dimensions, FlatList, Linking } from 'react-native';
import { CustomIcon } from '@zix/ui/icons';
import { UserAvatar } from '@zix/ui/common';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import { useRouter } from 'solito/router';
import { useAuth } from '@zix/services/auth';
import { Plus } from '@tamagui/lucide-icons';
/* eslint-disable-next-line */
export interface ServicesListScreenProps {
}


export function ServicesListScreen(props: ServicesListScreenProps) {

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const router = useRouter();
  const { user } = useAuth();

  // console.log(JSON.stringify(user,null,2),"user======")


  const { data, refetch, isLoading } = useQuery({
    queryFn: () =>
      ServicesService.listServices({}),
    queryKey: ['ServicesService.listServices'],
  });

  console.log(JSON.stringify(data, null, 2), "data====//")

  // on Contact button press
  const onContactPress = (item: any) => {
    Linking.openURL(`tel:${item?.driver?.phone_number}`);
  }

  // Fab Button
  const renderFabButton = () => (
    <Theme name='accent'>
      <Button
        position="absolute"
        width="$5"
        height="$5"
        size="$5"
        bottom="$3"
        right="$3"
        icon={<Plus size="$2.5" />}
        borderRadius="$10"
        onPress={() => Alert.alert('Under Development')}
      />
    </Theme>
  )

  const renderItem = ({ item, index }) => (
    <YStack
      backgroundColor='$color2'
      borderRadius={5}
      key={index}
      marginBottom={10}
      marginHorizontal={'$4'}
      paddingBottom={'$4'}
    >
      <XStack
        onPress={() => item?.company?.id ? router.push(`/app/companies/${item.company.id }`) : router.push(`/app/users/${item?.driver?.id}`)}
        justifyContent='space-between' alignItems='center' padding={"$4"}>
        <XStack alignItems="center" gap="$2">
          <UserAvatar user={item?.driver.avatar ? item?.driver : item?.company} size="$5" />
          <Text color='$color12' fontWeight="bold">
            {item.driver?.name || item?.company.name}
          </Text>
        </XStack>
        <Image source={{ uri: item?.cover?.original_url || "" }}
          width={SCREEN_WIDTH / 2.5}
          height={SCREEN_WIDTH / 5}
          borderRadius={5}
        />
      </XStack>
      <YStack gap="$4" paddingHorizontal="$4">
        <XStack
          justifyContent='space-between'
          alignItems='center'
          borderBottomWidth={0.5}
          borderColor={'$color5'}
          paddingVertical={"$2"}
        >
          <Text
            fontWeight={'bold'}
            fontSize={'$3'}
          >{item.title}</Text>
          {item?.driver?.phone_number && <Button
            theme={'accent'}
            fontWeight={'600'}
            onPress={() => onContactPress(item)}
          >
            Contact
          </Button>}
        </XStack>
        <Text
          numberOfLines={3}
        >{item.description}</Text>
        {
          item.images && <ZixMediasListWidget medias={item.images || []} paddingHorizontal={5} />
        }
      </YStack>
    </YStack>
  )

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <AppHeader title="Services" />
      <YStack flex={1} paddingTop={15}>
        <FlatList
          refreshing={isLoading}
          onRefresh={refetch}
          style={{ flex: 1, backgroundColor: 'white' }}
          data={data?.data || []}
          renderItem={renderItem}
          ListEmptyComponent={
            <View flex={1} alignItems='center' gap="$8" paddingTop="$8">
              <CustomIcon name="empty_data" size="$18" color="$color5" />
              <H4>No Services Found</H4>
            </View>
          }
        />
      </YStack>
      {renderFabButton()}
    </View>
  );
}


export default ServicesListScreen;
