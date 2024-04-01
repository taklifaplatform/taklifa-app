

import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { ChannelList } from 'stream-chat-react';


export function ChannelsListScreen() {
  return (
    <>
      <AppHeader title={t('common:chat')} />
      <ChannelList />
    </>
  );
}

export default ChannelsListScreen;
