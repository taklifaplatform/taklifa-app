import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { Linking } from 'react-native';
import { Button, XStack } from 'tamagui';

export type DriverContactActionsProps = {
  driver: DriverTransformer;
};

export const DriverContactActions: React.FC<DriverContactActionsProps> = ({
  driver,
}) => {
  const onCallPress = () => {
    console.log('call');
    // call
    Linking.openURL('tel:1196546546');
  };

  return (
    <XStack
      justifyContent="space-between"
      padding="$2"
      backgroundColor="$color2"
      borderTopWidth={0.3}
      borderColor={'$gray8'}
    >
      <Button
        backgroundColor={'$color5'}
        size={'$3'}
        borderRadius={'$3'}
        fontWeight="400"
        icon={<CustomIcon name="followed" size="$1" />}
      >
        ارسال الدعوة
      </Button>
      <Button
        backgroundColor={'$gray7'}
        size={'$3'}
        borderRadius={'$3'}
        paddingVertical="$2"
        width="28%"
        fontWeight="400"
        icon={<CustomIcon name="chat" size="$1" />}
      >
        محادثة
      </Button>
      <Button
        backgroundColor={'$gray7'}
        size={'$3'}
        borderRadius={'$3'}
        width="28%"
        fontWeight="400"
        icon={<CustomIcon name="call" size="$1" />}
      >
        اتصل
      </Button>
    </XStack>
  );
};

export default DriverContactActions;
