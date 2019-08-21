import axios from 'axios';
import Exception, {
  NetworkException,
  AuthenticationException,
  BadRequestException,
  ServerException,
} from '../exception';

axios.defaults.withCredentials = true;

/**
 * @param username
 * @return {Promise<AxiosResponse<Player> | never>}
 */
export const login = username => axios({
  url: `${process.env.VUE_APP_API}/player/signin`,
  method: 'post',
  data: {
    username,
  },
  withCredentials: true,
}).then(response => response.data.payload).catch((error) => {
  if (error.message === 'Network Error') {
    throw new NetworkException('There seem to be a network issue at the moment');
  }
  const res = error.response;
  if (error.response.status === 400) {
    throw new BadRequestException(res.data.responseText);
  }
  throw new AuthenticationException(res.data.responseText, res.data.responseCode);
});

/**
 * @desc Logs out a user
 * @return {Promise<AxiosResponse<any> | never>}
 */
export const logout = () => axios({
  url: `${process.env.VUE_APP_API}/player/logout`,
  method: 'post',
  withCredentials: true,
}).then(() => true).catch((error) => {
  if (error.message === 'Network Error') {
    throw new NetworkException('There seem to be a network issue at the moment');
  }
  const res = error.response;
  if (error.response.status === 400) {
    throw new BadRequestException(res.data.responseText);
  }
  throw new AuthenticationException(res.data.responseText, res.data.responseCode);
});

/**
 * @param username
 * @param bio
 * @param avatar
 * @return {Promise<AxiosResponse<Player> | never>}
 */
export const signUp = ({ username, bio, avatar }) => axios({
  url: `${process.env.VUE_APP_API}/player/register`,
  method: 'post',
  data: {
    username,
    bio,
    avatar,
  },
}).then(response => response.data.payload).catch((error) => {
  if (error.message === 'Network Error') {
    throw new NetworkException('There seem to be a network issue at the moment');
  }
  const res = error.response;
  if (error.response.status === 400) {
    throw new BadRequestException(res.data.responseText);
  }
  if (error.response.status === 500) {
    throw new ServerException('Server is currently unable to process this request');
  }
});

/**
 * @desc get the details of the current player
 * @param includeChats
 * @return {Promise<AxiosResponse<T> | never>}
 */
export const getPlayer = ({ includeChats }) => {
  const params = {};
  if (includeChats) {
    params.includeChats = true;
  }
  return axios.get(`${process.env.VUE_APP_API}/player/get`, {
    params,
  }).then(response => response.data.payload).catch((error) => {
    if (error.message === 'Network Error') {
      throw new NetworkException('There seem to be a network issue at the moment');
    }
    const res = error.response;
    if (error.response.status === 400) {
      throw new BadRequestException(res.data.responseText);
    }
    throw new Exception('An unknown error has occurred');
  });
};

export const getAllPlayer = ({ page, limit, includeChats }) => {
  const params = {
    page,
    limit,
  };
  if (includeChats) {
    params.includeChats = true;
  }
  return axios.get(`${process.env.VUE_APP_API}/player/get-all`, {
    params,
  }).then((response) => {
    const { payload } = response.data;
    return {
      players: payload.players,
      total: payload.total,
    };
  }).catch((error) => {
    if (error.message === 'Network Error') {
      throw new NetworkException('There seem to be a network issue at the moment');
    }
    const res = error.response;
    if (error.response.status === 400) {
      throw new BadRequestException(res.data.responseText);
    }
    throw new Exception('An unknown error has occurred');
  });
};

/**
 * @param playerId
 * @return {Promise<AxiosResponse<Chat> | never>}
 */
export const startChat = playerId => axios({
  url: `${process.env.VUE_APP_API}/player/start-chat`,
  method: 'post',
  data: {
    playerId,
  },
}).then(response => response.data.payload).catch((error) => {
  if (error.message === 'Network Error') {
    throw new NetworkException('There seem to be a network issue at the moment');
  }
  const res = error.response;
  if (error.response.status === 400) {
    throw new BadRequestException(res.data.responseText);
  }
});

/**
 * @desc creates a new player
 * @param {String} username
 * @param {String} bio
 * @param {String} avatar
 * @return {Promise<AxiosResponse<Chat> | never>}
 */
export const registerPlayer = ({ username, bio, avatar }) => axios({
  url: `${process.env.VUE_APP_API}/player/register`,
  method: 'post',
  data: {
    username,
    bio,
    avatar,
  },
}).then(response => response.data.payload).catch((error) => {
  if (error.message === 'Network Error') {
    throw new NetworkException('There seem to be a network issue at the moment');
  }
  const res = error.response;
  if (error.response.status === 400) {
    throw new BadRequestException(res.data.responseText);
  }
});
