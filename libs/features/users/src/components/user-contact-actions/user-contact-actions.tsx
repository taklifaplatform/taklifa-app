import { IconProps } from '@tamagui/helpers-icon';
import { ChatService, DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { useAuth } from '@zix/services/auth';
import { Linking, Platform } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, SizeTokens, ThemeableStackProps, XStack } from 'tamagui';
import { useMutation } from '@tanstack/react-query';

export type UserContactActionsProps = ThemeableStackProps & {
  user: DriverTransformer;
  actionButtonSize?: SizeTokens;
};

export const UserContactActions: React.FC<UserContactActionsProps> = ({
  user,
  actionButtonSize = '$2.5',
  ...props
}) => {
  const { user: authUser, currentUrlPrefix } = useAuth()
  const router = useRouter()

  const sharedButtonStyle = {
    size: actionButtonSize,
    fontSize: '$0.75',
    scaleIcon: 1.2
  }

  function onCallPress() {
    Linking.openURL(`tel:${user.phone_number}`);
  }

  function onServiceRequestPress() {
    router.push(`/customer/shipments?driverId=${user.id}`)
  }

  const { mutate: startChat } = useMutation({
    mutationFn() {
      return ChatService.startChat({
        user: `${user.id}`
      })
    },
    onSuccess(data) {
      if (Platform.OS === 'web') {
        router.push(`${currentUrlPrefix}/chat?channel=${data.data?.id}`)
        return
      }
      router.push(`/chat/channels/${data.data?.id}`)
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
        onPress={onServiceRequestPress}
        {...sharedButtonStyle}
      >
        ارسال الدعوة
      </Button>
      <Button
        flex={1}
        backgroundColor='$gray7'
        icon={(props: IconProps) => <CustomIcon {...props} name="chat" color='$color12' />}
        onPress={() => startChat()}
        {...sharedButtonStyle}
      >
        محادثة
      </Button>
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
