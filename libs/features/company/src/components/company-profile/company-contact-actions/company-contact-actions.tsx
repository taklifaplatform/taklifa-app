import { IconProps } from '@tamagui/helpers-icon';
import { useToastController } from '@tamagui/toast';
import { useMutation } from '@tanstack/react-query';
import { AnalyticsService, ChatService, CompanyTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { ZixButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { Compass, Phone } from '@tamagui/lucide-icons';
import { t } from 'i18next';
import { Linking, Platform } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, SizeTokens, ThemeableStackProps, XStack } from 'tamagui';

export type CompanyContactActionsProps = ThemeableStackProps & {
  company: CompanyTransformer;
  actionButtonSize?: SizeTokens;
  onServiceRequestPress?: () => void;
};

export const CompanyContactActions: React.FC<CompanyContactActionsProps> = ({
  company,
  actionButtonSize = '$2.5',
  onServiceRequestPress,
  ...props
}) => {
  const { getUrlPrefix } = useAuth();
  const router = useRouter();
  const toast = useToastController();

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
        }
      })
    // }
  }

  function _onWhatsappPress() {
    trackContractPress('whatsapp') 
    const phoneNumber = company?.phone_number || ""
    Linking.openURL(`https://wa.me/${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`);
  }

  return (
    <XStack justifyContent="space-between" gap="$2" {...props}>
      <ZixButton
        theme="accent"
        flex={1}
        backgroundColor="$color0"
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
      <Button
        theme="success"
        backgroundColor="$color9"
        flex={1}
        icon={(props: IconProps) => (
          <CustomIcon {...props} name="whatsapp-contact" />
        )}
        onPress={_onWhatsappPress}
        {...sharedButtonStyle}
      >
        {t('common:contact-whatsapp')}
      </Button>
      <Button
        flex={1}
        backgroundColor={'transparent'}
        borderWidth={1}
        borderColor={'$color0'}
        onPress={onCallPress}
        {...sharedButtonStyle}
      >
        {t('shipment:details')}
      </Button>
    </XStack>
  );
};

export default CompanyContactActions;
