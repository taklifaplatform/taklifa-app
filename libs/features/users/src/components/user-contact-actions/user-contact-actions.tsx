import { IconProps } from '@tamagui/helpers-icon';
import { useMutation } from '@tanstack/react-query';
import { ChatService, DriverTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { ZixButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { Linking, Platform } from 'react-native';
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
  const { user: authUser, getUrlPrefix } = useAuth()
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
        user: `${user.id}`
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
    <XStack justifyContent="space-between" gap="$2" {...props}>
      <Button
        theme='accent'
        flex={1.5}
        icon={(props: IconProps) => <CustomIcon {...props} name="followed" color='$color12' />}
        onPress={_onServiceRequestPress}
        {...sharedButtonStyle}
      >
        ارسال الدعوة
      </Button>
      <ZixButton
        flex={1}
        backgroundColor='$gray7'
        icon={(props: IconProps) => <CustomIcon {...props} name="chat" color='$color12' />}
        disabled={isPending}
        loading={isPending}
        onPress={() => startChat()}
        {...sharedButtonStyle}
      >
        محادثة
      </ZixButton>
      <Button
        flex={1}
        backgroundColor='$gray7'
        icon={(props: IconProps) => <CustomIcon {...props} name="call" color='$color12' />}
        onPress={onCallPress}
        {...sharedButtonStyle}
      >
        اتصل
      </Button>
    </XStack>
  );
};

export default UserContactActions;
