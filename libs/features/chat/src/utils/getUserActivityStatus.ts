import { UserTransformer } from '@zix/api';
import Dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';



Dayjs.extend(relativeTime);

export const getUserActivityStatus = (
  user?: UserTransformer,
) => {
  if (!user) return '';

  if (Dayjs(user.latest_activity).isBefore(Dayjs())) {
    return `Last seen ${Dayjs(user?.latest_activity).fromNow()}`;
  }

  return '';
};
