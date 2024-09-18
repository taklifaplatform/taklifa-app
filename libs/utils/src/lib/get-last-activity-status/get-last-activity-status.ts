import { DriverTransformer, UserTransformer } from '@zix/api';
import moment from 'moment';
import { t } from 'i18next';

export interface UserActivityStatus {
  color: string;
  text: string;
}

export function getLastActivityStatus(
  user: UserTransformer | DriverTransformer | null,
): UserActivityStatus {
  if (!user || !user.latest_activity) {
    return { color: '#afafaf', text: 'N/A' };
  }

  const lastActivityDate = moment(user.latest_activity);
  const now = moment();
  const oneDayAgo = now.clone().subtract(1, 'day');
  const twoHoursAgo = now.clone().subtract(2, 'hours');

 /* console.log('Last Activity Date:', lastActivityDate.format());
  console.log('Current Date:', now.format());
  console.log('Date One Day Ago:', oneDayAgo.format());
  console.log('Date Two Hours Ago:', twoHoursAgo.format());

  // Additional debug logs
  console.log('Is lastActivityDate before oneDayAgo?', lastActivityDate.isBefore(oneDayAgo));
  console.log('Is lastActivityDate before twoHoursAgo?', lastActivityDate.isBefore(twoHoursAgo));
*/
  if (lastActivityDate.isBefore(oneDayAgo)) {
    return {
      color: '#afafaf',
      text: t('app:common.offline'),
    };
  }

  if (lastActivityDate.isBefore(twoHoursAgo)) {
    return {
      color: '#feca16',
      text: `${t('app:common.last-seen')} ${lastActivityDate.fromNow()}`,
    };
  }

  return {
    color: '#34c759',
    text: t('app:common.online'),
  };
}
