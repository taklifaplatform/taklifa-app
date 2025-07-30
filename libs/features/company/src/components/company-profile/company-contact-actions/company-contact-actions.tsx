import { IconProps } from '@tamagui/helpers-icon';
import {
  CircleEllipsis,
  Compass,
  MapPin,
  Phone,
  Star
} from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { AnalyticsService, CompanyTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { TextInfo, ZixButton, ZixDialog } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useState } from 'react';
import { Linking } from 'react-native';
import { useRouter } from 'solito/router';
import {
  Button,
  Paragraph,
  Separator,
  SizeTokens,
  Text,
  Theme,
  ThemeableStackProps,
  XStack,
  YStack,
} from 'tamagui';

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

  function onDetailsPress() {
    router.push(`${getUrlPrefix}/companies/${company.id}`);
  }

  function trackContractPress(type: 'call' | 'whatsapp') {
    // if (onContractPressAnalytic) {
    //   onContractPressAnalytic(type)
    // } else {
    // AnalyticsService.storeUserAnalytic({
    //   user: company.id?.toString() || '',
    //   requestBody: {
    //     action_type: 'call_press',
    //   },
    // });
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
      <TextInfo
        icon={<MapPin size={20} color="$color0" />}
        title={company?.location?.address}
      />
    );
    const renderContactInfo = () =>
      !!company?.location?.id && (
        <TextInfo
          icon={<Phone size={20} color="$color0" />}
          title={company?.contact_number}
        />
      );

  const renderRatingsInfo = () =>
    !!company.rating_stats?.count && (
      <TextInfo
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
        <Text fontWeight="bold" fontSize="$2" color="$color12">
          تواصل معنا
        </Text>
        <YStack gap="$2">
          {renderLocationInfo()}
          {renderContactInfo()}
          {renderRatingsInfo()}
        </YStack>

        <XStack justifyContent="space-between" gap="$2">
          <ZixButton
            theme="accent"
            unstyled
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            flex={1}
            backgroundColor="$color"
            icon={(props: IconProps) => (
              <Compass {...props} size={20} color="$color2" />
            )}
            color="$color2"
            fontWeight="600"
           
            onPress={() => {}}
            {...sharedButtonStyle}
          >
            {t('shipment:destination')}
          </ZixButton>
          <ZixButton
            theme="success"
            unstyled
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
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
          </ZixButton>
        </XStack>
        <Separator borderWidth={0.5} borderColor="$color9" width="100%" />
        <YStack gap="$4" alignItems="flex-start" justifyContent="flex-start">
          <Text fontWeight="bold" fontSize="$2" color="$color12">
            من نحن
          </Text>
          <Paragraph color="$color12" fontSize="$2" fontWeight="400">
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
            <ZixButton
              theme="accent"
              unstyled
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              flex={1}
              backgroundColor="$color"
              icon={(props: IconProps) => (
                <CircleEllipsis {...props} size={20} color="$color2" />
              )}
              color="$color2"
              fontWeight="600"
              {...sharedButtonStyle}
            >
              معلومات عنا
            </ZixButton>
          }
        >
          {renderAboutUs()}
        </ZixDialog>
      )}
      {!useShowButton && (
        <ZixButton
          theme="accent"
          unstyled
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          flex={1}
          backgroundColor="$color"
          icon={(props: IconProps) => (
            <Compass {...props} size={20} color="$color2" />
          )}
          color="$color2"
          fontWeight="600"
          onPress={() => {}}
          {...sharedButtonStyle}
        >
          {t('shipment:destination')}
        </ZixButton>
      )}
      <Theme name="accent">
      <ZixButton
        unstyled
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
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
      </ZixButton>
      </Theme>
      {!useShowButton && (
        <Theme name="accent">
          <ZixButton
            flex={1}
            unstyled
            justifyContent="center"
            alignItems="center"
            backgroundColor={'transparent'}
            borderWidth={1}
            borderColor='$color11'
            color="$color11"
            onPress={onDetailsPress}
            {...sharedButtonStyle}
          >
            {t('shipment:details')}
          </ZixButton>
        </Theme>
      )}
    </XStack>
  );
};

export default CompanyContactActions;
