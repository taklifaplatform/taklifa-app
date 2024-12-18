
import { useQuery } from '@tanstack/react-query';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { H4, View, YStack, Image, XStack, Text, Button, Theme } from 'tamagui';
import { ServicesService } from '@zix/api';
import { Dimensions, FlatList, Linking } from 'react-native';
import { CustomIcon } from '@zix/ui/icons';
import { UserAvatar } from '@zix/ui/common';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import { useRouter } from 'solito/router';
import { useAuth } from '@zix/services/auth';
export interface ServicesListScreenProps {
  showHeader: boolean;
  driver: boolean;
}

export const ServicesListScreen: React.FC<ServicesListScreenProps> = ({
  showHeader = true,
  driver = false
}) => {

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const router = useRouter();
  const { user } = useAuth();

  console.log('user', JSON.stringify(user, null, 2));
  const { data, refetch, isLoading } =
    driver ?
      useQuery({
        queryFn: () =>
          ServicesService.listDriverServices({
            driver: user?.id,
          }),
        queryKey: ['ServicesService.listDriverServices', user?.id],
      })
      :
      user?.active_company ? useQuery({
        queryFn: () =>
          ServicesService.listCompanyServices({
            company: user?.active_company?.id,
          }),
        queryKey: ['ServicesService.listCompanyServices', user?.active_company?.id],
      }) : useQuery({
        queryFn: () =>
          ServicesService.listServices({}),
        queryKey: ['ServicesService.listServices',],
      });

  // on Contact button press
  const onContactPress = (item: any) => {
    Linking.openURL(`tel:${item?.driver?.phone_number}`);
  }

  const renderItem = ({ item, index }) => (
    <YStack
      backgroundColor='$color2'
      borderRadius={5}
      key={index}
      marginBottom={10}
      marginHorizontal={showHeader && '$4'}
      paddingBottom={'$4'}
    >
      <XStack
        onPress={() => item?.company?.id ? router.push(`/app/companies/${item.company.id}`) : router.push(`/app/users/${item?.driver?.id}`)}
        justifyContent='space-between' alignItems='center' padding={"$4"}>
        <XStack alignItems="center" gap="$2">
          <UserAvatar user={item?.driver?.avatar ? item?.driver : item?.company} size="$5" />
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
    <ScreenLayout>
      {showHeader && <AppHeader title="Services" />}
      <YStack flex={1} paddingTop={15}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={refetch}
          style={{ flex: 1 }}
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
    </ScreenLayout>
  );
}


export default ServicesListScreen;
