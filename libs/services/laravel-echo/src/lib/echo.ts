import { OpenAPI, request } from '@zix/api';
import Echo from 'laravel-echo';

export const echo = new Echo({
  broadcaster: 'reverb',
  key: 'connect',
  wsHost: `${process.env.NEXT_PUBLIC_WS_URL}`,
  wsPort: 8080,
  wssPort: 443,
  forceTLS: false,
  enabledTransports: ['ws'],
  // enabledTransports: ['ws', 'wss'],
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        request(OpenAPI, {
          url: '/api/broadcasting/auth',
          method: 'POST',
          body: {
            socket_id: socketId,
            channel_name: channel.name,
          },
        })
          .then((response) => {
            callback(false, response);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});
