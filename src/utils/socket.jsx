import io from 'socket.io-client';
import BASE_URL from './constansts';

export const connectionRequest = () => {
   const socket = io(BASE_URL, {
      withCredentials: true,
   });
   return socket;
}
