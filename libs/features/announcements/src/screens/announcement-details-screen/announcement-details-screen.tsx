import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AnnouncementService, AnnouncementTransformer } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { UserContactActions } from '../../../../users/src/components/user-contact-actions/user-contact-actions';
import {
  ActionSheet,
  ActionSheetRef,
  UserAvatar,
  ZixButton,
} from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { memo, useCallback, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import {
  Button,
  H4,
  Separator,
  Text,
  Theme,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { Image } from 'expo-image';
import moment from 'moment';
import { MoreHorizontal } from '@tamagui/lucide-icons';
import { ChevronDown, ChevronUp, ChevronLeft } from '@tamagui/lucide-icons';

const { useParam } = createParam<{ announcement?: string }>();

export const AnnouncementDetailsScreen = () => {
  useMixpanel('Announcement Details Screen view');
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const router = useRouter();
  const { user } = useAuth();
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const toast = useToastController();
  const [announcementId] = useParam('announcement');
  const [selectedItem, setSelectedItem] =
    useState<AnnouncementTransformer | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const { data: announcementData } = useQuery({
    queryFn: () =>
      AnnouncementService.retrieveAnnouncement({
        announcement: announcementId || '',
      }),
    queryKey: ['AnnouncementService.retrieveAnnouncement', announcementId],
    enabled: !!announcementId,
  });

  const announcement = announcementData?.data;

  // Fetch similar announcements (by category, excluding current)
  const { data: similarData } = useQuery({
    queryFn: () =>
      AnnouncementService.listAnnouncements({
        perPage: 10,
        categoryId: announcement?.category_id,
      }),
    queryKey: [
      'AnnouncementService.listAnnouncements',
      'similar',
      announcement?.category_id,
    ],
    enabled: !!announcement?.category_id,
  });
  const similarAnnouncements = (similarData?.data || []).filter(
    (a: AnnouncementTransformer) => a.id !== announcement?.id,
  );

  // // on Contact button press
  // const onContactPress = useCallback(() => {
  //   const phoneNumber = announcement?.user?.phone_number;
  //   if (!phoneNumber) return;
  //   Linking.openURL(
  //     `tel:${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`,
  //   );
  // }, [announcement]);

  // // WhatsApp button
  // const onWhatsAppPress = useCallback(() => {
  //   const phoneNumber = announcement?.user?.phone_number;
  //   if (!phoneNumber) return;
  //   const url = `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}`;
  //   Linking.openURL(url);
  // }, [announcement]);

  // // Placeholder for chat
  // const onChatPress = useCallback(() => {
  //   toast.show('ميزة المحادثة قادمة قريباً');
  // }, [toast]);

  const { mutate } = useMutation({
    mutationFn: () =>
      AnnouncementService.deleteAnnouncement({
        announcement: announcementId || '',
      }),
    onSuccess: () => {
      router.back();
      toast.show(t('common:announcement-removed-successfully'));
    },
    onError: () => {
      toast.show(t('common:failed-to-remove-announcement'));
    },
  });

  const handleMorePress = useCallback(() => {
    if (announcement) {
      setSelectedItem(announcement);
      actionSheetManagerRef.current?.open();
    }
  }, [announcement]);

  // ActionSheet actions
  const actionSheetActions = [
    {
      name: t('common:edit'),
      icon: <CustomIcon name="edit" size="$1" color="$color10" />,
      onPress: () => {
        actionSheetManagerRef.current?.close();
        router.push(`/app/announcements/${announcementId}/edit`);
      },
    },
    {
      theme: 'error',
      name: t('common:delete'),
      icon: <CustomIcon name="delete" size="$1" color="$color10" />,
      onPress: () => {
        Alert.alert(t('common:delete'), t('common:confirm-delete'), [
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
        ]);
      },
    },
  ];

  if (!announcement) {
    return (
      <ScreenLayout>
        <AppHeader showBackButton title={t('common:market')} />
        <View flex={1} alignItems="center" justifyContent="center">
          <CustomIcon name="empty_data" size="$18" color="$color5" />
          <H4>{t('common:announcement-not-found')}</H4>
        </View>
      </ScreenLayout>
    );
  }

  // Images array
  const images = Array.isArray(announcement.images) ? announcement.images : [];

  return (
    <ScreenLayout>
      <AppHeader showBackButton title={t('common:market')} />
      {/* Action buttons for owner */}
      {user?.id === announcement?.user?.id && (
        <XStack gap="$1" padding="$3" justifyContent="space-between">
          <Button
            backgroundColor="#FFEEEE"
            size="$2"
            textProps={{
              fontSize: 8,
              fontWeight: '500',
            }}
            color="#FF3B30"
            iconAfter={<CustomIcon name="delete" size={13} color="#FF3B30" />}
            onPress={() => {
              Alert.alert(t('common:delete'), t('common:confirm-delete'), [
                {
                  text: t('common:cancel'),
                  style: 'cancel',
                },
                {
                  text: t('common:remove'),
                  style: 'destructive',
                  onPress: () => mutate(),
                },
              ]);
            }}
          >
            {t('common:delete-announcement')}
          </Button>
          <XStack gap="$3">
            <Button
              backgroundColor="$color3"
              borderRadius={10}
              size="$2"
              textProps={{
                fontSize: 8,
                fontWeight: '500',
              }}
              color="#34C759"
              iconAfter={
                <CustomIcon name="check-circle" size={13} color="#34C759" />
              }
              disabled
            >
              حالة الإعلان: شغال
            </Button>
            <Button
              backgroundColor="$color3"
              borderRadius={10}
              size="$2"
              textProps={{
                fontSize: 8,
                fontWeight: '500',
              }}
              color="#222"
              iconAfter={<CustomIcon name="edit" size={13} color="#222" />}
              onPress={() =>
                router.push(`/app/announcements/${announcementId}/edit`)
              }
            >
              {t('common:edit-announcement')}
            </Button>
          </XStack>
        </XStack>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack flex={1} gap="$4" padding="$3">
          {/* Image Carousel */}
          {images.length > 0 && (
            <YStack>
              <Image
                source={{
                  uri: images[selectedImageIndex]?.url || images[0]?.url,
                }}
                style={{ width: '100%', height: 177, borderRadius: 12 }}
                contentFit="cover"
              />
              <FlatList
                data={images}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, idx) => `${item.id ?? idx}`}
                style={{ marginTop: 8 }}
                contentContainerStyle={{ gap: 8 }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        width: 75,
                        height: 75,
                        borderRadius: 8,
                        borderWidth: selectedImageIndex === index ? 2 : 0,
                        borderColor:
                          selectedImageIndex === index
                            ? '#FF9325'
                            : 'transparent',
                      }}
                      contentFit="cover"
                    />
                  </TouchableOpacity>
                )}
              />
            </YStack>
          )}

          {/* Info Card */}
          <YStack
            backgroundColor="$color2"
            borderRadius={10}
            padding={16}
            shadowColor="#000"
            shadowOpacity={0.05}
            shadowRadius={8}
            gap="$3"
          >
            <Text fontSize={'$3'} fontWeight="700" textAlign="left">
              {announcement.title}
            </Text>
            <XStack alignItems="center" gap={'$2'}>
              <Text fontWeight={'700'} fontSize={'$3'}>
                {announcement?.price || '0'}
              </Text>
              <CustomIcon
                name="saudi-riyal-symbol"
                size={'$1'}
                color="$color12"
              />
            </XStack>
            <XStack
              alignItems="center"
              gap="$3"
              justifyContent="center"
              theme="accent"
            >
              <XStack flex={1} alignItems="center" gap="$2">
                <UserAvatar user={announcement?.user} size={10} />
                <Text color="$color12" fontSize={10} numberOfLines={1}>
                  {announcement?.user?.name || announcement?.user?.username}
                </Text>
              </XStack>
              {!!announcement?.city && (
                <XStack flex={1} alignItems="center" gap="$2">
                  <CustomIcon name="location" size={10} color="$color8" />
                  <Text color="$color12" fontSize={10} numberOfLines={1}>
                    {announcement?.city}
                  </Text>
                </XStack>
              )}
              <XStack flex={1} alignItems="center" gap="$2">
                <CustomIcon name="time" size={10} color="$color8" />
                <Text fontSize={10} color="$color12">
                  {moment(announcement?.created_at).fromNow()}
                </Text>
              </XStack>
            </XStack>
            <UserContactActions user={announcement.user!} />
          </YStack>
          <Separator marginVertical="$2" />

          {/* Description Section */}
          {!!announcement?.description && (
            <YStack gap="$3">
              <TouchableOpacity onPress={() => setIsDescriptionOpen((v) => !v)}>
                <XStack
                  alignItems="center"
                  gap={8}
                  justifyContent="space-between"
                >
                  <Text fontWeight="bold" fontSize={16} textAlign="left">
                    وصف الإعلان
                  </Text>

                  {isDescriptionOpen ? (
                    <ChevronUp size={18} color="#222" />
                  ) : (
                    <ChevronDown size={18} color="#222" />
                  )}
                </XStack>
              </TouchableOpacity>
              {isDescriptionOpen && (
                <YStack>
                  <Text textAlign="left" fontSize={13} color="$color12">
                    {announcement?.description || ''}
                  </Text>
                </YStack>
              )}
              <YStack
                justifyContent="space-between"
                gap="$3"
                backgroundColor="$color2"
                borderRadius={16}
                padding="$4"
              >
                <XStack alignItems="center" gap="$5">
                  <CustomIcon name="hash" size={16} color="#888" />
                  <Text color="$color10" fontSize={13}>
                    رقم إعلان:
                  </Text>
                  <Text color="$color12" fontSize={13}>
                    222222
                  </Text>
                </XStack>
                <XStack alignItems="center" gap="$3">
                  <CustomIcon name="eye" size={16} color="#888" />
                  <Text color="$color10" fontSize={13}>
                    عدد المشاهدات:
                  </Text>
                  <Text color="$color12" fontSize={13}>
                    0
                  </Text>
                </XStack>

                <Button
                  size="$2"
                  textProps={{
                    fontSize: 10,
                    fontWeight: '500',
                  }}
                >
                  المزيد من الاحصائيات
                </Button>
              </YStack>
            </YStack>
          )}
          <Separator borderColor="$color4" borderWidth={0.25} />
          {/* Similar Announcements */}
          {similarAnnouncements.length > 0 && (
            <YStack gap="$2" marginTop={16}>
              <XStack alignItems="center" justifyContent="space-between" marginBottom={8}>
                <Text fontWeight="bold" fontSize={16} textAlign="left">
                  إعلانات مشابهة
                </Text>
                <TouchableOpacity onPress={() => router.push('/app/announcements')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text fontSize={13} color="$color12" marginLeft={4}>
                    تصفح المزيد
                  </Text>
                  <ChevronLeft size={16} color="$color12"/>
                </TouchableOpacity>
              </XStack>
              <FlatList
                data={similarAnnouncements}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, idx) => `${item.id ?? idx}`}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ width: 180 }}
                    onPress={() => router.push(`/app/announcements/${item.id}`)}
                  >
                    <YStack
                      backgroundColor="$color2"
                      borderRadius={12}
                     
                      gap={6}
                    >
                      <Image
                        source={{
                          uri:
                            Array.isArray(item.images) && item.images[0]?.url,
                        }}
                        style={{ width: '100%', height: 90, borderRadius: 8 }}
                        contentFit="cover"
                      />
                      <YStack
                       backgroundColor="$color2"
                       borderRadius={12}
                       padding={8}
                       gap={6}>
                      <Text
                        fontWeight="bold"
                        fontSize={10}
                        numberOfLines={1}
                        textAlign="left"
                      >
                        {item.title}
                      </Text>
                      <XStack alignItems="center" gap={4}>
                      <UserAvatar user={item?.user} size={10} />
                        <Text color="#888" fontSize={12}>
                          {item.user?.name}
                        </Text>
                      </XStack>
                      <XStack alignItems="center" gap={8}>
                        <Text fontWeight="bold" fontSize={14}>
                          {item.price || '0'}
                        </Text>
                        <CustomIcon
                          name="saudi-riyal-symbol"
                          size={14}
                          color="#888"
                        />
                      </XStack>
                      </YStack>
                   
                    </YStack>
                  </TouchableOpacity>
                )}
              />
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </ScreenLayout>
  );
};

export default AnnouncementDetailsScreen;
