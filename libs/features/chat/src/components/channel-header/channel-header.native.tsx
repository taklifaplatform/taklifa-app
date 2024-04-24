
import { AppHeader, AppHeaderProps } from "@zix/ui/layouts";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'solito/router';

import { ChannelAvatar, useAttachmentPickerContext, useChannelContext, useChannelPreviewDisplayName } from 'stream-chat-expo';
import { H4, Text, YStack } from 'tamagui';
import { useChannelMembersStatus } from '../../hooks/useChannelMembersStatus';
import { useAuth } from "@zix/services/auth";


export const ChannelHeader: React.FC<AppHeaderProps> = (props) => {
  const router = useRouter();
  const { getUrlPrefix } = useAuth();
  const { channel } = useChannelContext();
  const displayName = useChannelPreviewDisplayName(channel, 30);
  const { closePicker } = useAttachmentPickerContext();
  const membersStatus = useChannelMembersStatus(channel);

  return (
    <AppHeader
      headerTitle={() => (
        <YStack alignItems='center'>
          <H4 fontSize='$2' numberOfLines={1}>
            {displayName}
          </H4>
          <Text fontSize='$1' numberOfLines={1}>
            {membersStatus}
          </Text>
        </YStack>
      )}
      showBackButton
      headerRight={() => (
        <TouchableOpacity onPress={() => {
          closePicker();
          router.push(`${getUrlPrefix}/chat/channels/${channel.id}/details`);
        }}>
          <ChannelAvatar channel={channel} />
        </TouchableOpacity>
      )}
      {...props}
    />
  );
}


export default ChannelHeader;
