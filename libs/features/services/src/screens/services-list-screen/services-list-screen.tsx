
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { H4, View, YStack, Image, XStack, Text, Button, Theme } from 'tamagui';
import { ChatService, ServicesService } from '@zix/api';
import { Alert, Dimensions, FlatList, Linking, Platform } from 'react-native';
import { CustomIcon } from '@zix/ui/icons';
import { ActionSheet, ActionSheetRef, UserAvatar, ZixButton } from '@zix/ui/common';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import { useRouter } from 'solito/router';
import { useAuth } from '@zix/services/auth';
import { Eye, MoreHorizontal, Pencil, Trash2 } from '@tamagui/lucide-icons';
import { t } from 'i18next';
import { useRef, useState } from 'react';
import toast from 'libs/providers/src/lib/providers/toast/toast';
export interface ServicesListScreenProps {
  showHeader: boolean;
  driver: boolean;
  edit: boolean;
  search: string;
}

export const ServicesListScreen: React.FC<ServicesListScreenProps> = ({
  showHeader = true,
  driver = false,
  edit = false,
  search,
}) => {

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const router = useRouter();
  const { user, getUrlPrefix } = useAuth();
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const queryClient = useQueryClient();

  const { data, refetch, isLoading } =
    driver ?
      useQuery({
        queryFn: () =>
          ServicesService.listDriverServices({
            driver: user?.id,
            search
          }),
        queryKey: ['ServicesService.listDriverServices', user?.id, `-${search}`,],
      })
      :
      user?.active_company ? useQuery({
        queryFn: () =>
          ServicesService.listCompanyServices({
            company: user?.active_company?.id,
            search
          }),
        queryKey: ['ServicesService.listCompanyServices', user?.active_company?.id, `-${search}`,],
      }) : useQuery({
        queryFn: () =>
          ServicesService.listServices({
            search
          }),
        queryKey: ['ServicesService.listServices', `-${search}`,],
      });


  // start chat

  const { mutate: startChat, isPending } = useMutation({
    mutationFn() {
      return ChatService.startChat({
        user: `${user.id}`
      })
    },
    onSuccess(data) {
      if (Platform.OS === 'web') {
        router.push(`${getUrlPrefix}/chat?channel=${data.data?.id}`)
        return
      }
      router.push(`${getUrlPrefix}/chat/channels/${data.data?.id}`)
    },
  })


  // on Contact button press
  const onContactPress = (item: any) => {
    Linking.openURL(`tel:${item?.driver?.phone_number}`);
  }


  const [selectedItem, setSelectedItem] = useState(null);
  const { mutate } = useMutation({
    mutationFn() {
      return ServicesService.deleteService({
        service: selectedItem?.id || '',
      });
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['ServicesService.listDriverServices', user?.id],
      })
      queryClient.refetchQueries({
        queryKey: ['ServicesService.listCompanyServices', user?.active_company?.id],
      })
      toast.show('Service Removed Successfully!');
    },
    onError(error) {
      toast.show('Failed to remove vehicle');
    }
  })

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
          <XStack
            gap="$4"
            alignItems='center'
            justifyContent='flex-end'
          >
            {/* <ZixButton
              flex={0.1}
              backgroundColor='$gray7'
              loading={isPending}
              icon={() => <CustomIcon name="chat" color='$color12' size={"$1"} />}
              onPress={startChat}
            />*/}
            {item?.driver?.phone_number && <Button
              flex={0.1}
              backgroundColor='$gray7'
              icon={() => <CustomIcon name="call" color='$color12' size={'$1'} />}
              onPress={() => onContactPress(item)}
            />
            }
            {!showHeader && !driver && <Button
              iconAfter={<MoreHorizontal />}
              onPress={() => {
                setSelectedItem(item);
                actionSheetManagerRef.current?.open();
              }}
            />}
          </XStack>
        </XStack>
        <Text
          numberOfLines={3}
        >{item.description}</Text>
        {
          item.images && <ZixMediasListWidget medias={item.images || []} paddingHorizontal={5} />
        }
      </YStack>
      {
        edit && <XStack
          right={0}
          bottom={0}
          position='absolute'
        >

          <ActionSheet
            snapPoints={[33, 25]}
            ref={actionSheetManagerRef}
            title={t('common:settings')}
            actions={[
              {
                name: t('common:edit'),
                icon: <Pencil size="$1" color="$color10" />,
                onPress: () => {
                  actionSheetManagerRef.current?.close();
                  router.push(`${getUrlPrefix}/company/services/${selectedItem?.id}/edit`)
                },
              },
              {
                theme: 'error',
                name: t('common:delete'),
                icon: <Trash2 size="$1" color="$color10" />,
                onPress: () => {
                  Alert.alert(
                    t('common:delete'),
                    t('common:confirm-delete'),
                    [
                      {
                        text: t('common:cancel'),
                        onPress: () => actionSheetManagerRef.current?.close(),
                        style: 'cancel',
                      },
                      {
                        text: t('common:remove'),
                        style: 'destructive',
                        onPress: () => {
                          actionSheetManagerRef.current?.close();
                          mutate();
                        },
                      },
                    ],
                  );
                },
              },
            ]}
          />
        </XStack>
      }
    </YStack>
  )

  return (
    <ScreenLayout>
      {showHeader && <AppHeader title={t('common:services')} />}
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
