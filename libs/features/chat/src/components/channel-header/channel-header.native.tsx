
import { AppHeader } from '@zix/ui/common';

import { useChannelContext, useChannelPreviewDisplayName } from 'stream-chat-expo';


export const ChannelHeader = () => {
  const { channel } = useChannelContext();
  const displayName = useChannelPreviewDisplayName(channel, 30);

  return (
    <AppHeader
      title={displayName}
      showBackButton
    />
  );
}


export default ChannelHeader;
