import { useEffect, useState } from 'react';

import { getUserActivityStatus } from '../utils/getUserActivityStatus';

import type { Channel } from 'stream-chat';

import { useChatContext } from 'stream-chat-expo';
import type { StreamChatGenerics } from '../types';

export const useChannelMembersStatus = (
  channel: Channel<StreamChatGenerics>,
) => {
  const watchersCount = channel.state.watcher_count || 1;
  const memberCount = channel?.data?.member_count || 1;

  const getStatus = () => {
    let newStatus = '';
    const isOneOnOneConversation =
      memberCount === 2 && channel.id?.indexOf('!members-') === 0;

    if (isOneOnOneConversation) {
      const result = Object.values({ ...channel.state.members }).find(
        (member) => member.user?.id !== client?.user?.id,
      );

      return (newStatus = getUserActivityStatus(result?.user));
    } else {
      const memberCountText = `${memberCount} Members`;
      const onlineCountText =
        watchersCount > 0 ? `${watchersCount} Online` : '';

      newStatus = `${[memberCountText, onlineCountText].join(',')}`;

      return newStatus;
    }
  };

  const [status, setStatus] = useState(getStatus());
  const { client } = useChatContext();

  useEffect(() => {
    setStatus(getStatus());
  }, [watchersCount, memberCount, client]);

  return status;
};
