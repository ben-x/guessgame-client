import axios from 'axios';
import Exception, {
  NetworkException,
  BadRequestException,
} from '../exception';

axios.defaults.withCredentials = true;

/**
 * @desc get all message of a particular player
 * @param chatId
 * @return {Promise<AxiosResponse<Messages> | never>}
 */
export const getMessages = (chatId = null) => {
  const params = {};
  if (chatId) {
    params.chat = chatId;
  }
  return axios.get(`${process.env.VUE_APP_API}/chat/messages`, {
    params,
  }).then((response) => {
    return response.data.payload;
  }).catch((error) => {
    if (error.message === 'Network Error') {
      throw new NetworkException('There seem to be a network issue at the moment');
    }
    const res = error.response;
    if (error.status === 400) {
      throw new BadRequestException(res.data.responseText);
    }
    throw new Exception('An unknown error has occurred');
  });
};

/**
 * @desc get all chats of a particular player
 * @return {Promise<AxiosResponse<Chat> | never>}
 */
export const getChats = () => {
  const params = {};
  return axios.get(`${process.env.VUE_APP_API}/chat/get`, {
    params,
  }).then((response) => {
    return response.data.payload;
  }).catch((error) => {
    if (error.message === 'Network Error') {
      throw new NetworkException('There seem to be a network issue at the moment');
    }
    const res = error.response;
    if (error.status === 400) {
      throw new BadRequestException(res.data.responseText);
    }
    throw new Exception('An unknown error has occurred');
  });
};
