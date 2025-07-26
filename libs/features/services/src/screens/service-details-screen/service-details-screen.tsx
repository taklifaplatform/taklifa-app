import {
  ChevronDown,
  ChevronUp,
  Circle,
  CircleCheck,
  Trash2,
} from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ServiceService, ServiceTransformer } from '@zix/api';
import { ZixMediasListWidget } from '@zix/ui/widgets';

import { useAuth, useMixpanel } from '@zix/services/auth';
import { DeleteProduct, UserAvatar, ZixDialog } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import moment from 'moment';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
      {isDescriptionOpen && (
        <Text textAlign="left" fontSize={14} color="$color12" marginBottom={16}>
          {description}
        </Text>
      )}
    </YStack>
  );
};

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
        <ZixDialog
          open={statusSheetOpen}
          onOpenChange={setStatusSheetOpen}
          title={t('common:service-status')}
          description={t('common:service-status-description')}
          snapPoints={[40]}
          contentPadding="$1"
          trigger={
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
              <Text
                fontWeight="700"
                color={status === 'active' ? 'green' : 'red'}
              >
                {STATUS_OPTIONS.find((opt) => opt.value === status)?.label}
              </Text>
            </Button>
          }
        >
          <YStack gap="$4" padding="$4">
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
                  color={status === opt.value ? '$color1' : '$color12'}
                >
                  {opt.label}
                </Text>
                {status === opt.value ? (
                  <CircleCheck size={20} color="$color1" />
                ) : (
                  <Circle size={20} color="$color0" />
                )}
              </XStack>
            ))}
          </YStack>
        </ZixDialog>
      </XStack>
      {/*delete button */}
      <DeleteProduct
        title="تأكيد الحذف"
        open={deleteSheetOpen}
        setIsOpen={setDeleteSheetOpen}
        trigger={
          <TouchableOpacity
            style={{
              backgroundColor: '#FEECEE',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderRadius: 10,
              padding: 5,
            }}
            onPress={() => {
              setDeleteSheetOpen(true);
            }}
          >
            <Text color="#FF3B30">حذف</Text>
            <Trash2 size={20} color="red" />
          </TouchableOpacity>
        }
        onDelete={onDelete}
      />
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

  const { mutate } = useMutation({
    mutationFn: () =>
      ServiceService.deleteService({
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
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <H4>{t('common:announcement-not-found')}</H4>
          )}
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
          <ZixMediasListWidget
            medias={service?.images || []}
            imageWidth={100}
            imageHeight={100}
          />
          <InfoCard service={service} />
          <Separator marginVertical="$2" />
          <DescriptionSection description={service.description || ''} />

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
              <Text color="$color12" fontSize={12} textTransform="uppercase">
                {service?.id?.toString().substring(0, 8)}-
                {service?.id?.toString().substring(9, 12)}
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$3">
              <CustomIcon name="eye" size={16} color="#888" />
              <Text color="$color10" fontSize={13}>
                عدد المشاهدات:
              </Text>
              <Text color="$color12" fontSize={13}>
                {service?.views_count}
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
        </YStack>
      </ScrollView>
    </ScreenLayout>
  );
};

export default ServiceDetailsScreen;
