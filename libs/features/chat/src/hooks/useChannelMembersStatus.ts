import { useEffect, useState } from 'react';

import { getUserActivityStatus } from '../utils/getUserActivityStatus';

import { useAuth } from '@zix/utils';
import type { Channel } from 'stream-chat';

export const useChannelMembersStatus = (channel: Channel) => {
  const { user } = useAuth();
  const watchersCount = channel.state.watcher_count || 1;
  const memberCount = channel?.data?.member_count || 1;

  const getStatus = () => {
    let newStatus = '';
    const isOneOnOneConversation =
      memberCount === 2 && channel.id?.indexOf('!members-') === 0;

    if (isOneOnOneConversation) {
      const result = Object.values({ ...channel.state.members }).find(
        (member) => member.user?.id !== user?.id,
      );

      return (newStatus = getUserActivityStatus(result?.user));
    } else {
      const memberCountText = `${memberCount} Members`;
      const onlineCountText =
        watchersCount > 0 ? `${watchersCount} Online` : '';

      newStatus = `${[memberCountText, onlineCountText].join(', ')}`;

      return newStatus;
    }
  };

  const [status, setStatus] = useState(getStatus());

  useEffect(() => {
    setStatus(getStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchersCount, memberCount]);

  return status;
};
