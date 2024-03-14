import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

global.Pusher = Pusher;
const echo = new Echo({
  broadcaster: 'reverb',
  key: 'connect',
  wsHost: 'sawaeed.test',
  wsPort: 8080,
  wssPort: 443,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
})

echo.channel('chat')
  .listen('.message.new', (e) => {
    console.log('ChatMessage::', e);
  });
export class EchoChat {
  constructor() {
    console.log("=========");
    console.log("EchoChat::constructor");
    console.log("=========");
  }

  setClient(client) {
    console.log("=========");
    console.log("setClient::", client);
    console.log("=========");
  }
}
