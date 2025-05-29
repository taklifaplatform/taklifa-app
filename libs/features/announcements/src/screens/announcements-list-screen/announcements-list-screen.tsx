import { MoreHorizontal, Pencil, Plus, Trash2 } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnnouncementService, AnnouncementTransformer, ServicesService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ActionSheet, ActionSheetRef, UserAvatar, ZixButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import { t } from 'i18next';
import { useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, Linking } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, H4, Image, Text, View, XStack, YStack } from 'tamagui';

export interface AnnouncementsListScreenProps {
  showHeader: boolean;
  driver: boolean;
  edit: boolean;
  search: string;
}

export const AnnouncementsListScreen: React.FC<AnnouncementsListScreenProps> = ({
  showHeader = true,
  driver = false,
  edit = false,
  search,
}) => {
  useMixpanel('Announcements List Screen view')
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const router = useRouter();
  const { user, getUrlPrefix, isLoggedIn } = useAuth();
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const queryClient = useQueryClient();
  const toast = useToastController();

  const { data: categoriesData } =
    useQuery({
      queryFn: () =>
        AnnouncementService.listAnnouncementCategories({}),
      queryKey: ['AnnouncementService.listAnnouncementCategories'],
    })
  const { data, refetch, isLoading } =
    useQuery({
      queryFn: () =>
        AnnouncementService.listAnnouncements({
          search
        }),
      queryKey: ['AnnouncementService.listAnnouncements', `-${search}`,],
    })



  // on Contact button press
  const onContactPress = (item: AnnouncementTransformer) => {
    const phoneNumber = item?.user?.phone_number
    if (!phoneNumber) return;
    Linking.openURL(`tel:${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`);
  }


  const [selectedItem, setSelectedItem] = useState(null);

  const { mutate } = useMutation({
    mutationFn() {
      return AnnouncementService.deleteAnnouncement({
        announcement: selectedItem?.id || '',
      });
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['AnnouncementService.listAnnouncements', user?.id],
      })
      toast.show('Announcement Removed Successfully!');
    },
    onError(error) {
      toast.show('Failed to remove announcement');
    }
  })

  const renderCategoriesCards = () => {
    return categoriesData?.data?.map((category) => (
      <View key={category.id}>
        <Text>{category.name}</Text>
      </View>
    ))
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
        gap="$10"
        onPress={() => item?.company?.id ? router.push(`/app/companies/${item.company.id}`) : router.push(`/app/users/${item?.driver?.id}`)}
        justifyContent='space-between' alignItems='center' padding={"$4"}
      >
        <XStack alignItems="center" gap="$2">
          <UserAvatar user={item?.driver?.avatar ? item?.driver : item?.company} size="$5" />
          <Text color='$color12' fontWeight="bold">
            {item?.driver?.name || item?.company?.name}
          </Text>
        </XStack>
        <XStack
          gap="$4"
          alignItems='center'
        // justifyContent='space-between'
        >
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
          >{item?.title || ''}</Text>
          <XStack
            alignItems='center'
          >
            <Text
              fontWeight={'bold'}
              fontSize={'$3'}
            >{item?.price?.value || ''}</Text>
            <Text
              fontWeight={'bold'}
              fontSize={'$3'}
            > {item?.price?.currency?.code || ''}</Text>
          </XStack>

        </XStack>

        <Text
          numberOfLines={3}
        >{item?.description || ''}</Text>
        {
          item?.images && <ZixMediasListWidget medias={item?.images || []} paddingHorizontal={5} />
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
      {showHeader && <AppHeader title={t('common:market')} />}
      <YStack flex={1} paddingTop={15}>
        {renderCategoriesCards()}
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
              <H4>
                {t('common:no_services_found')}
              </H4>
            </View>
          }
        />
        <XStack padding="$4" position='absolute' bottom={0} left={0} right={0}>
          <ZixButton
            theme='accent'
            icon={<Plus size="$1" color="$color12" />}
            onPress={() => {
              if (isLoggedIn) {
                router.push(`${getUrlPrefix}/company/services/create`)
              } else {
                router.push(`/auth/login`)
              }
            }}
          >
            أضف اعلان
          </ZixButton>
        </XStack>
      </YStack>
    </ScreenLayout>
  );
}



export default AnnouncementsListScreen;
