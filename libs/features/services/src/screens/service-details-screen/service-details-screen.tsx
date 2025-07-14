import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  X
} from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  // AnalyticsService,
  // AnnouncementService,
  // AnnouncementTransformer,
  ServiceTransformer,
} from '@zix/api';
import { ZixMediasListWidget } from '@zix/ui/widgets';

import { Sheet } from '@tamagui/sheet';
import { UserContactActions } from '@zix/features/users';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { UserAvatar } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { Image } from 'expo-image';
import { t } from 'i18next';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { Button, H4, Separator, Text, View, XStack, YStack } from 'tamagui';

const { useParam } = createParam<{ announcement?: string }>();

type InfoCardProps = {
  service: ServiceTransformer;
};

type DescriptionSectionProps = {
  description: string;
};

type SimilarservicesProps = {
  services: ServiceTransformer[];
};

type OwnerActionsProps = {
  service: ServiceTransformer;
  onDelete: () => void;
  onEdit: () => void;
  status: string;
  onStatusChange: (status: string) => void;
};


const InfoCard = ({ service }: InfoCardProps) => (
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
      {service.title}
    </Text>
    <XStack alignItems="center" gap={'$2'}>
      <Text fontWeight={'700'} fontSize={'$3'}>
        {service?.price || '0'}
      </Text>
      <CustomIcon name="saudi-riyal-symbol" size={'$1'} color="$color12" />
    </XStack>
    <XStack alignItems="center" gap="$3" justifyContent="center" theme="accent">
      <XStack flex={1} alignItems="center" gap="$2">
        <UserAvatar user={service?.user} size={10} />
        <Text color="$color12" fontSize={10} numberOfLines={1}>
          {service?.user?.name || service?.user?.username}
        </Text>
      </XStack>
      {!!service?.city && (
        <XStack flex={1} alignItems="center" gap="$2">
          <CustomIcon name="location" size={10} color="$color8" />
          <Text color="$color12" fontSize={10} numberOfLines={1}>
            {service?.city}
          </Text>
        </XStack>
      )}
      <XStack flex={1} alignItems="center" gap="$2">
        <CustomIcon name="time" size={10} color="$color8" />
        <Text fontSize={10} color="$color12">
          {moment(service?.created_at).fromNow()}
        </Text>
      </XStack>
    </XStack>
    {/* <UserContactActions
      user={service.user!}
      onContractPressAnalytic={() => {
        AnalyticsService.storeserviceAnalytic({
          service: service.id?.toString() || '',
          requestBody: {
            action_type: 'call_press',
          },
        });
      }}
    /> */}
  </YStack>
);

const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);

  if (!description?.length) return null;

  return (
    <YStack gap="$3">
      <TouchableOpacity onPress={() => setIsDescriptionOpen((v) => !v)}>
        <XStack alignItems="center" gap={8} justifyContent="space-between">
          <Text fontWeight="bold" fontSize={16} textAlign="left">
            {t('common:description-service')}
          </Text>
          {isDescriptionOpen ? (
            <ChevronUp size={18} color="#222" />
          ) : (
            <ChevronDown size={18} color="#222" />
          )}
        </XStack>
      </TouchableOpacity>
      {
        isDescriptionOpen && (
          <Text textAlign="left" fontSize={14} color="$color12" marginBottom={16}>
            {description}
          </Text>
        )
      }
    </YStack>
  );
};

// const Similarservices = ({ services }: SimilarservicesProps) => {
//   const router = useRouter();
//   if (services.length === 0) return null;

//   return (
//     <YStack gap="$2" marginTop={16}>
//       <XStack
//         alignItems="center"
//         justifyContent="space-between"
//         marginBottom={8}
//       >
//         <Text fontWeight="bold" fontSize={16} textAlign="left">
//           {t('common:similar-services')}
//         </Text>
//         <TouchableOpacity
//           onPress={() => router.push('/app/services')}
//           style={{ flexDirection: 'row', alignItems: 'center' }}
//         >
//           <Text fontSize={13} color="$color12" marginLeft={4}>
//             {t('common:view-more')}
//           </Text>
//           <ChevronLeft size={16} color="$color12" />
//         </TouchableOpacity>
//       </XStack>
//       <FlatList
//         data={services}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item, idx) => `${item.id ?? idx}`}
//         contentContainerStyle={{ gap: 12 }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={{ width: 180 }}
//             onPress={() => {
//               AnalyticsService.storeserviceAnalytic({
//                 service: item.id?.toString() || '',
//                 requestBody: {
//                   action_type: 'view',
//                 },
//               }).then((res) => {
//                 console.log('service analytic stored', res);
//               });
//               router.push(`/app/services/${item.id}`);
//             }}
//             key={item.id}
//           >
//             <YStack backgroundColor="$color2" borderRadius={12} gap={6}>
//               {item.images && item.images.length > 0 ? (
//                 <Image
//                   source={{
//                     uri: Array.isArray(item.images) && item.images[0]?.url,
//                   }}
//                   style={{ width: '100%', height: 90, borderRadius: 8 }}
//                   contentFit="cover"
//                 />
//               ) : (
//                 <View
//                   style={{ width: '100%', height: 90, borderRadius: 8 }}
//                   overflow="hidden"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <CustomIcon name="image-blank" size={90} color="$color2" />
//                 </View>
//               )}
//               <YStack
//                 backgroundColor="$color2"
//                 borderRadius={12}
//                 padding={8}
//                 gap={6}
//               >
//                 <Text
//                   fontWeight="bold"
//                   fontSize={10}
//                   numberOfLines={1}
//                   textAlign="left"
//                 >
//                   {item.title}
//                 </Text>
//                 <XStack alignItems="center" gap={4}>
//                   <UserAvatar user={item?.user} size={10} />
//                   <Text color="#888" fontSize={12}>
//                     {item.user?.name}
//                   </Text>
//                 </XStack>
//                 <XStack alignItems="center" gap={8}>
//                   <Text fontWeight="bold" fontSize={14}>
//                     {item.price || '0'}
//                   </Text>
//                   <CustomIcon
//                     name="saudi-riyal-symbol"
//                     size={14}
//                     color="#888"
//                   />
//                 </XStack>
//               </YStack>
//             </YStack>
//           </TouchableOpacity>
//         )}
//       />
//     </YStack>
//   );
// };

const OwnerActions = ({
  service,
  onDelete,
  onEdit,
  status,
  onStatusChange,
}: OwnerActionsProps) => {
  const [statusSheetOpen, setStatusSheetOpen] = useState(false);
  const [deleteSheetOpen, setDeleteSheetOpen] = useState(false);
  const STATUS_OPTIONS = [
    { value: 'active', label: t('common:active') },
    { value: 'inactive', label: t('common:inactive') },
  ];

  return (
    <XStack gap="$1" padding="$4" justifyContent="space-between">
      <XStack gap="$2">
        {/*edit button */}
        <Button
          backgroundColor="$color3"
          borderRadius={10}
          size="$2"
          textProps={{
            fontSize: 12,
            fontWeight: '500',
          }}
          color="$color12"
          iconAfter={<CustomIcon name="edit" size={13} color="$color12" />}
          onPress={onEdit}
        >
          {t('forms:edit-service')}
        </Button>
        {/*status button */}
        <Button
          backgroundColor="$color3"
          borderRadius={10}
          size="$2"
          textProps={{
            fontSize: 12,
            fontWeight: '500',
          }}
          color="$color12"
          onPress={() => setStatusSheetOpen(true)}
          iconAfter={
            <CustomIcon
              name="radio_button_checked"
              color={status === 'active' ? 'green' : 'red'}
            />
          }
        >
          {t('common:service-status')}
          <Text fontWeight="700" color={status === 'active' ? 'green' : 'red'}>
            {STATUS_OPTIONS.find((opt) => opt.value === status)?.label}
          </Text>
        </Button>
        <Sheet
          open={statusSheetOpen}
          onOpenChange={setStatusSheetOpen}
          native
          modal
          snapPoints={[28]}
          dismissOnSnapToBottom
        >
          <Sheet.Overlay />
          <YStack
            gap="$2"
            padding="$4"
            backgroundColor="#FFF"
            borderRadius={20}
            height={220}
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold" fontSize={18} marginBottom={8}>
                {t('forms:service-status')}
              </Text>
              <TouchableOpacity onPress={() => setStatusSheetOpen(false)}>
                <X size={24} color="$color12" />
              </TouchableOpacity>
            </XStack>

            {STATUS_OPTIONS.map((opt) => (
              <XStack
                theme="accent"
                key={opt.value}
                alignItems="center"
                justifyContent="space-between"
                gap="$2"
                paddingVertical="$2"
                cursor="pointer"
                borderBottomWidth={0.25}
                borderBottomColor="gray"
                onPress={() => {
                  onStatusChange(opt.value);
                  setStatusSheetOpen(false);
                }}
              >
                <Text
                  fontWeight={status === opt.value ? 'bold' : 'normal'}
                  fontSize={16}
                  color={
                    opt.value === 'active' && status === 'active'
                      ? 'green'
                      : opt.value === 'inactive' && status === 'inactive'
                        ? '#FF9325'
                        : '$color12'
                  }
                >
                  {opt.label}
                </Text>
                <CustomIcon
                  name="radio_button_checked"
                  color={
                    opt.value === 'active' && status === 'active'
                      ? 'green'
                      : opt.value === 'inactive' && status === 'inactive'
                        ? '#FF9325'
                        : 'gray'
                  }
                />
              </XStack>
            ))}
          </YStack>
        </Sheet>
      </XStack>
      {/*delete button */}
      <Button
        backgroundColor="#FFEEEE"
        size="$2"
        textProps={{
          fontSize: 12,
          fontWeight: '500',
        }}
        color="#FF3B30"
        iconAfter={<CustomIcon name="delete" size={13} color="#FF3B30" />}
        onPress={() => setDeleteSheetOpen(true)}
      >
        {t('forms:delete-service')}
      </Button>
      <Sheet
        open={deleteSheetOpen}
        onOpenChange={setDeleteSheetOpen}
        native
        modal
        snapPoints={[38]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        {/* <Sheet.Handle /> */}
        <YStack
          gap="$4"
          padding="$4"
          backgroundColor="#FFF0F0"
          borderRadius={20}
        >
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold" fontSize={18} marginBottom={8}>
              {t('forms:delete-service')}
            </Text>
            <TouchableOpacity onPress={() => setDeleteSheetOpen(false)}>
              <X size={24} color="$color12" />
            </TouchableOpacity>
          </XStack>
          <View
            alignSelf="center"
            backgroundColor="#FFF0F0"
            borderRadius={50}
            width={80}
            height={80}
            alignItems="center"
            justifyContent="center"
            marginBottom={16}
          >
            <CustomIcon name="delted" size={150} color="#FF3B30" />
          </View>
          <Text fontSize={16} textAlign="center" color="#222" marginBottom={16}>
            {t('common:are-you-sure-delete')}
          </Text>
          <Button
            backgroundColor="#FF3B30"
            color="#fff"
            borderRadius={10}
            width="100%"
            marginTop={16}
            onPress={() => {
              setDeleteSheetOpen(false);
              onDelete();
            }}
            textProps={{
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            {t('common:yes-delete')}
          </Button>
        </YStack>
      </Sheet>
    </XStack>
  );
};

// Main Component
export const ServiceDetailsScreen = () => {
  useMixpanel('service Details Screen view');
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToastController();
  const [serviceId] = useParam('service');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [status, setStatus] = useState('active');

  const { data: serviceData, isLoading } = useQuery({
    queryFn: () =>
      ServiceService.retrieveService({
        service: serviceId || '',
      }),
    queryKey: ['AnnouncementService.retrieveAnnouncement', serviceId],
    enabled: !!serviceId,
  });

  const service = serviceData?.data;

  const { data: similarData } = useQuery({
    queryFn: () =>
      AnnouncementService.listAnnouncements({
        perPage: 10,
        categoryId: service?.category_id,
      }),
    queryKey: [
      'AnnouncementService.listAnnouncements',
      'similar',
      service?.category_id,
    ],
    enabled: !!service?.category_id,
  });

  const similarAnnouncements = (similarData?.data || []).filter(
    (a: AnnouncementTransformer) => a.id !== service?.id,
  );

  const { mutate } = useMutation({
    mutationFn: () =>
      AnnouncementService.deleteAnnouncement({
        service: serviceId || '',
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
    router.push(`/app/services/${serviceId}/edit`);
  }, [serviceId, router]);

  const handleStatusChange = useCallback((newStatus: string) => {
    setStatus(newStatus);
    // TODO: Implement status update API call
  }, []);

  if (!service?.id) {
    return (
      <ScreenLayout>
        <AppHeader showBackButton title={t('common:market')} />
        <View flex={1} alignItems="center" justifyContent="center">
          <CustomIcon name="empty_data" size="$18" color="$color5" />
          {
            isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <H4>{t('common:announcement-not-found')}</H4>
            )
          }
        </View>
      </ScreenLayout>
    );
  }


  return (
    <ScreenLayout>
      <AppHeader showBackButton title={t('common:market')} />
      {user?.id === service?.user?.id && (
        <OwnerActions
          service={service}
          onDelete={handleDelete}
          onEdit={handleEdit}
          status={status}
          onStatusChange={handleStatusChange}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack flex={1} gap="$4" padding="$3">
          {/* <ImageCarousel
            images={images}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
          /> */}

          <ZixMediasListWidget
            medias={announcement?.images || []}
            imageWidth={100}
            imageHeight={100}
          />
          <InfoCard announcement={announcement} />
          <Separator marginVertical="$2" />
          <DescriptionSection description={announcement.description} />

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
              <Text color="$color12" fontSize={12} textTransform='uppercase'>
                {announcement?.id?.toString().substring(0, 8)}-{announcement?.id?.toString().substring(9, 12)}
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$3">
              <CustomIcon name="eye" size={16} color="#888" />
              <Text color="$color10" fontSize={13}>
                عدد المشاهدات:
              </Text>
              <Text color="$color12" fontSize={13}>
                {announcement?.views_count}
              </Text>
            </XStack>
            {/* <Button
              size="$2"
              textProps={{
                fontSize: 10,
                fontWeight: '500',
              }}
            >
              المزيد من الاحصائيات
            </Button> */}
          </YStack>
          <Separator borderColor="$color4" borderWidth={0.25} />

          {/* <SimilarAnnouncements announcements={similarAnnouncements} /> */}
        </YStack>
      </ScrollView>
    </ScreenLayout>
  );
};

export default ServiceDetailsScreen;
