import { IconProps } from '@tamagui/helpers-icon';
import { Phone } from '@tamagui/lucide-icons';
import { useMutation } from '@tanstack/react-query';
import { AnalyticsService, ChatService, DriverTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { ZixButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Dimensions, Linking, Platform } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, SizeTokens, ThemeableStackProps, XStack } from 'tamagui';

export type UserContactActionsProps = ThemeableStackProps & {
  user: DriverTransformer;
  actionButtonSize?: SizeTokens;
  onServiceRequestPress?: () => void;
  onContractPressAnalytic?: (type: 'call' | 'whatsapp') => void;
};

export const UserContactActions: React.FC<UserContactActionsProps> = ({
  user,
  actionButtonSize = '$2.5',
  onServiceRequestPress,
  onContractPressAnalytic,
  ...props
}) => {
  const { user: authUser, isLoggedIn, getUrlPrefix, isServiceProvider, urgencyMode } = useAuth()
  const { width } = Dimensions.get('window');
  const router = useRouter()

  const sharedButtonStyle = {
    size: actionButtonSize,
    fontSize: '$1',
    scaleIcon: 1.2
  }

  function trackContractPress(type: 'call' | 'whatsapp') {
    if (onContractPressAnalytic) {
      onContractPressAnalytic(type)
    } else {
      AnalyticsService.storeUserAnalytic({
        user: user.id?.toString() || '',
        requestBody: {
          action_type: 'call_press',
        }
      })
    }
  }
  function onCallPress() {
    trackContractPress('call')
    const phoneNumber = user.phone_number
    Linking.openURL(`tel:${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`);
  }

  function _onServiceRequestPress() {
    if (!isLoggedIn) {
      router.push(`/auth/login`)
      return
    }
    if (onServiceRequestPress) {
      return onServiceRequestPress()
    }
    //
    router.push(`${getUrlPrefix}/create-shipment?selected_driver_id=${user.id}`)
  }

  function _onWhatsappPress() {
    trackContractPress('whatsapp')
    const phoneNumber = user.phone_number
    Linking.openURL(`https://wa.me/${phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`);
  }

  const { mutate: startChat, isPending } = useMutation({
    mutationFn() {
      return ChatService.startChat({
        model: `${user.id}`
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


  if (
    user.id === authUser?.id
  ) {
    return null;
  }


  return (
    <XStack justifyContent="space-between" gap="$2" paddingHorizontal='$3' {...props}>
      {
        !urgencyMode && (
          <Button
            theme='success'
            backgroundColor='$color10'
            flex={1}
            icon={(props: IconProps) => <CustomIcon {...props} name="whatsapp-contact" color='$color10' />}
            onPress={_onWhatsappPress}
            {...sharedButtonStyle}
          >
            {t('common:contact-whatsapp')}
          </Button>
        )
      }
      {
        !urgencyMode && (
          <ZixButton
            flex={width > 400 ? 0.5 : 0.2}
            backgroundColor='$gray7'
            icon={(props: IconProps) => <CustomIcon {...props} name="chat" color='$color12' />}
            disabled={isPending}
            loading={isPending}
            onPress={() => {
              if (isLoggedIn) {
                startChat()
              } else {
                router.push(`/auth/login`)
              }
            }}
            {...sharedButtonStyle}
          >
            {width > 400 ? t('shipment:chat') : null}
          </ZixButton>
        )
      }
      <Button
        flex={urgencyMode ? 1 : width > 400 ? 0.5 : 0.2}
        backgroundColor={urgencyMode ? "#FF3B30" : '$gray7'}
        icon={(props: IconProps) => <CustomIcon {...props} name="call" color='$color12' />}
        onPress={onCallPress}
        {...sharedButtonStyle}
      >
        {width > 400 ? t('shipment:call') : null}
      </Button>
    </XStack>
  );
};

export default UserContactActions;
