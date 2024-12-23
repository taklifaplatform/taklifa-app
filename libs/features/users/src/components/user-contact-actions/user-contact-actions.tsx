import { IconProps } from '@tamagui/helpers-icon';
import { useMutation } from '@tanstack/react-query';
import { ChatService, DriverTransformer } from '@zix/api';
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
};

export const UserContactActions: React.FC<UserContactActionsProps> = ({
  user,
  actionButtonSize = '$2.5',
  onServiceRequestPress,
  ...props
}) => {
  const { user: authUser, getUrlPrefix, isServiceProvider } = useAuth()
  const { width } = Dimensions.get('window');
  const router = useRouter()

  const sharedButtonStyle = {
    size: actionButtonSize,
    fontSize: '$1',
    scaleIcon: 1.2
  }

  function onCallPress() {
    Linking.openURL(`tel:${user.phone_number}`);
  }

  function _onServiceRequestPress() {
    if (onServiceRequestPress) {
      return onServiceRequestPress()
    }
    //
    router.push(`${getUrlPrefix}/create-shipment?selected_driver_id=${user.id}`)
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
        !isServiceProvider(authUser, true) && (
          <Button
            theme='accent'
            flex={1}
            icon={(props: IconProps) => <CustomIcon {...props} name="followed" color='$color12' />}
            onPress={_onServiceRequestPress}
            {...sharedButtonStyle}
          >
            {t('shipment:request-service')}
          </Button>
        )
      }
      <ZixButton
        flex={ width > 400 ? 0.5 : 0.2}
        backgroundColor='$gray7'
        icon={(props: IconProps) => <CustomIcon {...props} name="chat" color='$color12' />}
        disabled={isPending}
        loading={isPending}
        onPress={() => startChat()}
        {...sharedButtonStyle}
      >
        {width > 400 ? t('shipment:chat') : null}
      </ZixButton>
      <Button
        flex={ width > 400 ? 0.5 : 0.2}
        backgroundColor='$gray7'
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
