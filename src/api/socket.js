// eslint-disable-next-line import/no-extraneous-dependencies
import SocketIO from 'socket.io-client';

/**
 * @desc initialize socket to remote server
 * @return {Promise<any>}
 */
export const getSocket = () => {
  return new Promise((resolve, reject) => {
    const socket = SocketIO.connect(`${process.env.VUE_APP_API}?token=flex`);
    resolve(socket);
  });
};
