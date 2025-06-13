import { ChevronDown, ChevronLeft, ChevronUp } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AnalyticsService, AnnouncementService, AnnouncementTransformer } from '@zix/api';
import { UserContactActions } from '@zix/features/users';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { UserAvatar, ZixDialog } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { Image } from 'expo-image';
import { t } from 'i18next';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import {
  Button,
  H4,
  Separator,
  Text,
  View,
  XStack,
  YStack
} from 'tamagui';

const { useParam } = createParam<{ announcement?: string }>();

// Types
type ImageCarouselProps = {
  images: Array<{ url: string; id?: string }>;
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
};

type InfoCardProps = {
  announcement: AnnouncementTransformer;
};

type DescriptionSectionProps = {
  description: string;
};

type SimilarAnnouncementsProps = {
  announcements: AnnouncementTransformer[];
};

type OwnerActionsProps = {
  announcement: AnnouncementTransformer;
  onDelete: () => void;
  onEdit: () => void;
  status: string;
  onStatusChange: (status: string) => void;
};

// Components
const ImageCarousel = ({
  images,
  selectedImageIndex,
  onImageSelect,
}: ImageCarouselProps) => {
  if (images.length === 0) return null;

  return (
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
          <TouchableOpacity onPress={() => onImageSelect(index)}>
            <Image
              source={{ uri: item.url }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 8,
                borderWidth: selectedImageIndex === index ? 2 : 0,
                borderColor:
                  selectedImageIndex === index ? '#FF9325' : 'transparent',
              }}
              contentFit="cover"
            />
          </TouchableOpacity>
        )}
      />
    </YStack>
  );
};

const InfoCard = ({ announcement }: InfoCardProps) => (
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
      <CustomIcon name="saudi-riyal-symbol" size={'$1'} color="$color12" />
    </XStack>
    <XStack alignItems="center" gap="$3" justifyContent="center" theme="accent">
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
    <UserContactActions
      user={announcement.user!}
      onContractPressAnalytic={() => {
        AnalyticsService.storeAnnouncementAnalytic({
          announcement: announcement.id?.toString() || '',
          requestBody: {
            action_type: 'call_press',
          }
        })
      }}

    />
  </YStack>
);

const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);

  if (!description) return null;

  return (
    <YStack gap="$3">
      <TouchableOpacity onPress={() => setIsDescriptionOpen((v) => !v)}>
        <XStack alignItems="center" gap={8} justifyContent="space-between">
          <Text fontWeight="bold" fontSize={16} textAlign="left">
            {t('common:description-announcement')}
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
            {description}
          </Text>
        </YStack>
      )}
      {/* <YStack
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
      </YStack> */}
    </YStack>
  );
};

const SimilarAnnouncements = ({
  announcements,
}: SimilarAnnouncementsProps) => {
  const router = useRouter();
  if (announcements.length === 0) return null;

  return (
    <YStack gap="$2" marginTop={16}>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        marginBottom={8}
      >
        <Text fontWeight="bold" fontSize={16} textAlign="left">
          {t('common:similar-announcements')}
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/app/announcements')}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text fontSize={13} color="$color12" marginLeft={4}>
            {t('common:view-more')}
          </Text>
          <ChevronLeft size={16} color="$color12" />
        </TouchableOpacity>
      </XStack>
      <FlatList
        data={announcements}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, idx) => `${item.id ?? idx}`}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: 180 }}
            onPress={() => {
              AnalyticsService.storeAnnouncementAnalytic({
                announcement: item.id?.toString() || '',
                requestBody: {
                  action_type: 'view',
                }
              }).then((res) => {
                console.log('Announcement analytic stored', res)
              })
              router.push(`/app/announcements/${item.id}`)
            }}
            key={item.id}
          >
            <YStack backgroundColor="$color2" borderRadius={12} gap={6}>
              {item.images && item.images.length > 0 ? (
                <Image
                  source={{
                    uri: Array.isArray(item.images) && item.images[0]?.url,
                  }}
                  style={{ width: '100%', height: 90, borderRadius: 8 }}
                  contentFit="cover"
                />
              ) : (
                <View
                  style={{ width: '100%', height: 90, borderRadius: 8 }}
                  overflow="hidden"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CustomIcon name="image-blank" size={90} color="$color2" />
                </View>
              )}
              <YStack
                backgroundColor="$color2"
                borderRadius={12}
                padding={8}
                gap={6}
              >
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
  );
};

const OwnerActions = ({
  announcement,
  onDelete,
  onEdit,
  status,
  onStatusChange,
}: OwnerActionsProps) => {
  const [statusSheetOpen, setStatusSheetOpen] = useState(false);
  const STATUS_OPTIONS = [
    { value: 'active', label: 'شغال' },
    { value: 'inactive', label: 'متوقف' },
  ];

  return (
    <XStack gap="$1" padding="$2" justifyContent="space-between">
      <Button
        backgroundColor="#FFEEEE"
        size="$2"
        textProps={{
          fontSize: 10,
          fontWeight: '500',
        }}
        color="#FF3B30"
        iconAfter={<CustomIcon name="delete" size={13} color="#FF3B30" />}
        onPress={onDelete}
      >
        {t('forms:delete-announcement')}
      </Button>
      <XStack gap="$2">
        <ZixDialog
          title={t('common:announcement-status')}
          open={statusSheetOpen}
          onOpenChange={setStatusSheetOpen}
          contentPadding="$4"
          trigger={
            <Button
              backgroundColor="$color3"
              borderRadius={10}
              size="$2"
              textProps={{
                fontSize: 10,
                fontWeight: '500',
              }}
              color="#222"
              onPress={() => setStatusSheetOpen(true)}
              iconAfter={
                <CustomIcon
                  name="radio_button_checked"
                  color={status === 'active' ? 'green' : 'red'}
                />
              }
            >
              {t('forms:announcement-status')}
              <Text
                fontWeight="700"
                color={status === 'active' ? 'green' : 'red'}
              >
                {STATUS_OPTIONS.find((opt) => opt.value === status)?.label}
              </Text>
            </Button>
          }
        >
          <YStack>
            {STATUS_OPTIONS.map((opt) => (
              <XStack
                theme="accent"
                key={opt.value}
                alignItems="center"
                justifyContent="space-between"
                gap="$2"
                paddingVertical="$2"
                cursor="pointer"
                onPress={() => {
                  onStatusChange(opt.value);
                  setStatusSheetOpen(false);
                }}
              >
                <Text fontWeight={status === opt.value ? 'bold' : 'normal'}>
                  {opt.label}
                </Text>
                <CustomIcon
                  name="radio_button_checked"
                  color={status === opt.value ? '$color9' : 'gray'}
                />
              </XStack>
            ))}
          </YStack>
        </ZixDialog>
        <Button
          backgroundColor="$color3"
          borderRadius={10}
          size="$2"
          textProps={{
            fontSize: 10,
            fontWeight: '500',
          }}
          color="#222"
          iconAfter={<CustomIcon name="edit" size={13} color="#222" />}
          onPress={onEdit}
        >
          {t('forms:edit-announcement')}
        </Button>
      </XStack>
    </XStack>
  );
};

// Main Component
export const AnnouncementDetailsScreen = () => {
  useMixpanel('Announcement Details Screen view');
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToastController();
  const [announcementId] = useParam('announcement');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [status, setStatus] = useState('active');

  const { data: announcementData } = useQuery({
    queryFn: () =>
      AnnouncementService.retrieveAnnouncement({
        announcement: announcementId || '',
      }),
    queryKey: ['AnnouncementService.retrieveAnnouncement', announcementId],
    enabled: !!announcementId,
  });

  const announcement = announcementData?.data;

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

  const handleDelete = useCallback(() => {
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
  }, [mutate]);

  const handleEdit = useCallback(() => {
    router.push(`/app/announcements/${announcementId}/edit`);
  }, [announcementId, router]);

  const handleStatusChange = useCallback((newStatus: string) => {
    setStatus(newStatus);
    // TODO: Implement status update API call
  }, []);

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

  const images = Array.isArray(announcement.images) ? announcement.images : [];

  return (
    <ScreenLayout>
      <AppHeader showBackButton title={t('common:market')} />
      {user?.id === announcement?.user?.id && (
        <OwnerActions
          announcement={announcement}
          onDelete={handleDelete}
          onEdit={handleEdit}
          status={status}
          onStatusChange={handleStatusChange}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack flex={1} gap="$4" padding="$3">
          <ImageCarousel
            images={images}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
          />
          <InfoCard announcement={announcement} />
          <Separator marginVertical="$2" />
          <DescriptionSection description={announcement.description || ''} />
          <Separator borderColor="$color4" borderWidth={0.25} />
          <SimilarAnnouncements
            announcements={similarAnnouncements}
          />
        </YStack>
      </ScrollView>
    </ScreenLayout>
  );
};

export default AnnouncementDetailsScreen;
