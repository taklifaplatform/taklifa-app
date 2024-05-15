import { DriverTransformer, UserTransformer } from '@zix/api';
import { t } from 'i18next';
import moment from 'moment';

export interface UserActivityStatus {
  color: string;
  text: string;
}

export function getLastActivityStatus(
  user: UserTransformer | DriverTransformer | null,
): UserActivityStatus {
  if (!user) {
    return { color: '#afafaf', text: 'N/A' };
  }

  if (moment(user.latest_activity).isBefore(moment().subtract(1, 'day'))) {
    return {
      color: '#ffeeb2',
      text: t('app:common.offline'),
    };
  }

  if (moment(user.latest_activity).isBefore(moment().subtract(2, 'hours'))) {
    return {
      color: '#feca16',
      text: `${t('app:common.last-seen')} ${moment(user.latest_activity).fromNow()}`,
    };
  }

  return {
    color: '#34c759',
    text: t('app:common.online'),
  };
}
