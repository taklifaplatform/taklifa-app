import { IconProps } from '@tamagui/helpers-icon';
import { useToastController } from '@tamagui/toast';
import { useMutation } from '@tanstack/react-query';
import { AnalyticsService, ChatService, CompanyTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { TitleInfo, ZixButton, ZixDialog } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import {
  ChevronUp,
  CircleEllipsis,
  Compass,
  MapPin,
  Phone,
  Star,
} from '@tamagui/lucide-icons';
import { t } from 'i18next';
import { Linking, Platform } from 'react-native';
import { useRouter } from 'solito/router';
import {
  Button,
  SizeTokens,
  ThemeableStackProps,
  XStack,
  Text,
  YStack,
  Theme,
  Separator,
  Paragraph,
} from 'tamagui';
import { useState } from 'react';

export type CompanyContactActionsProps = ThemeableStackProps & {
  company: CompanyTransformer;
  actionButtonSize?: SizeTokens;
  onServiceRequestPress?: () => void;
  useShowButton?: boolean;
};

export const CompanyContactActions: React.FC<CompanyContactActionsProps> = ({
  company,
  actionButtonSize = '$2.5',
  onServiceRequestPress,
  useShowButton = false,
  ...props
}) => {
  const { getUrlPrefix } = useAuth();
  const router = useRouter();
  const toast = useToastController();
  const [isOpen, setIsOpen] = useState(false);

  const sharedButtonStyle = {
    size: actionButtonSize,
    fontSize: '$1',
    scaleIcon: 1.2,
  };

  function onCallPress() {
    const phoneNumber = company?.contact_number;
    Linking.openURL(
      `tel:${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`,
    );
  }

  function _onServiceRequestPress() {
    if (onServiceRequestPress) {
      return onServiceRequestPress();
    }
    router.push(
      `${getUrlPrefix}/create-shipment?selected_company_id=${company.id}`,
    );
  }

  const { mutate: startChat, isPending } = useMutation({
    mutationFn() {
      return ChatService.startChat({
        model: `${company.id}`,
      });
    },
    onSuccess(data) {
      console.log('startChat', JSON.stringify(data, null, 2));
      if (Platform.OS === 'web') {
        router.push(`${getUrlPrefix}/chat?channel=${data.data?.id}`);
        return;
      }
      router.push(`${getUrlPrefix}/chat/channels/${data.data?.id}`);
    },
    onError(error) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), {
        preset: 'error',
      });
      console.log('startChat error', JSON.stringify(error, null, 2));
    },
  });

  function trackContractPress(type: 'call' | 'whatsapp') {
    // if (onContractPressAnalytic) {
    //   onContractPressAnalytic(type)
    // } else {
    AnalyticsService.storeUserAnalytic({
      user: company.id?.toString() || '',
      requestBody: {
        action_type: 'call_press',
      },
    });
    // }
  }

  function _onWhatsappPress() {
    trackContractPress('whatsapp');
    const phoneNumber = company?.phone_number || '';
    Linking.openURL(
      `https://wa.me/${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`,
    );
  }

  const renderLocationInfo = () =>
    !!company?.location?.id && (
      <TitleInfo
        icon={<MapPin size={20} color="$color0" />}
        title={company?.location?.country?.name}
      />
    );

  const renderRatingsInfo = () =>
    !!company.rating_stats?.count && (
      <TitleInfo
        icon={<Star size={20} color="$color0" />}
        title={`(${company.rating_stats?.count}) ${company.rating_stats?.score}`}
      />
    );
  const renderAboutUs = () => (
    <Theme name="accent">
    <YStack
      padding="$6"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="$6"
    >
      <Text fontWeight="bold" fontSize="$2">
        تواصل معنا
      </Text>
      <YStack gap="$2">
        {renderLocationInfo()}
        {renderRatingsInfo()}
      </YStack>

      <XStack justifyContent="space-between" gap="$2">
        <ZixButton
          theme="accent"
          flex={1}
          backgroundColor="$color"
          icon={(props: IconProps) => (
            <Compass {...props} size={20} color="$color0" />
          )}
          color="$color2"
          fontWeight="600"
          disabled={isPending}
          loading={isPending}
          onPress={() => {}}
          {...sharedButtonStyle}
        >
          {t('shipment:destination')}
        </ZixButton>
        <Button
        theme="success"
        backgroundColor="$color7"
        flex={1}
        icon={(props: IconProps) => (
          <CustomIcon {...props} name="whatsapp-contact" />
        )}
        onPress={_onWhatsappPress}
        fontWeight="600"
        color="$color2"
        {...sharedButtonStyle}
      >
        تواصل بنا مباشر
      </Button>
      </XStack>
      <Separator borderWidth={0.5} borderColor="$color9" width="100%" />
      <YStack gap="$4" alignItems="flex-start" justifyContent="flex-start">
        <Text fontWeight="bold" fontSize="$2">
          من نحن
        </Text>
        <Paragraph color="$color11" fontSize="$2" fontWeight="400">
          {company?.about}
        </Paragraph>
      </YStack>
    </YStack>
    </Theme>
  );

  return (
    <XStack justifyContent="space-between" gap="$2" {...props}>
      {useShowButton && (
        <ZixDialog
          title={company?.name || ''}
          open={isOpen}
          onOpenChange={setIsOpen}
          contentPadding="$1"
          snapPoints={[50, 75]}
          disableRemoveScroll
          trigger={
            <Button
              theme="accent"
              flex={1}
              backgroundColor="$color"
              icon={(props: IconProps) => (
                <CircleEllipsis {...props} size={20} color="$color2" />
              )}
              color="$color2"
              fontWeight="600"
              disabled={isPending}
              loading={isPending}
              {...sharedButtonStyle}
            >
              معلومات عنا
            </Button>
          }
        >
          {renderAboutUs()}
        </ZixDialog>
      )}
      {!useShowButton && (
        <ZixButton
          theme="accent"
          flex={1}
          backgroundColor="$color"
          icon={(props: IconProps) => (
            <Compass {...props} size={20} color="$color2" />
          )}
          color="$color2"
          fontWeight="600"
          disabled={isPending}
          loading={isPending}
          onPress={() => {}}
          {...sharedButtonStyle}
        >
          {t('shipment:destination')}
        </ZixButton>
      )}
      <Button
        theme="success"
        backgroundColor="$color7"
        flex={1}
        icon={(props: IconProps) => (
          <CustomIcon {...props} name="whatsapp-contact" />
        )}
        onPress={_onWhatsappPress}
        fontWeight="600"
        {...sharedButtonStyle}
      >
        تواصل بنا مباشر
      </Button>
      {!useShowButton && (
        <Theme name="accent">
          <Button
            flex={1}
            backgroundColor={'transparent'}
            borderWidth={1}
            borderColor={'$color0'}
            color="$color0"
            onPress={onCallPress}
            {...sharedButtonStyle}
          >
            {t('shipment:details')}
          </Button>
        </Theme>
      )}
    </XStack>
  );
};

export default CompanyContactActions;
