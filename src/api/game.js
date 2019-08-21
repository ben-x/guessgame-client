import axios from 'axios';
import {
  NetworkException,
  BadRequestException,
  AuthorizationException,
  ServerException,
} from '../exception';

axios.defaults.withCredentials = true;

/**
 * @desc starts a new game between the current logged in player and another player
 * @param player2
 * @param word
 * @param chat
 * @return {Promise<AxiosResponse<Game> | never>}
 */
export const startGame = ({ player2, word, chat }) => axios({
  url: `${process.env.VUE_APP_API}/game/start`,
  method: 'post',
  data: {
    player2,
    word,
    chat,
  },
}).then(response => response.data.payload).catch((error) => {
  if (error.message === 'Network Error') {
    throw new NetworkException('There seem to be a network issue at the moment');
  }
  const res = error.response;
  if (error.response.status === 403) {
    throw new AuthorizationException('Please sign in');
  }
  if (error.response.status === 400) {
    throw new BadRequestException(res.data.responseText);
  }
});

export const guessWord = ({ gameId, word }) => axios({
  url: `${process.env.VUE_APP_API}/game/guess`,
  method: 'post',
  data: {
    gameId,
    word,
  },
}).then(response => response.data.payload).catch((error) => {
  if (error.message === 'Network Error') {
    throw new NetworkException('There seem to be a network issue at the moment');
  }
  const res = error.response;
  if (error.response.status === 403) {
    throw new AuthorizationException('Please sign in');
  }
  if (error.response.status === 400) {
    throw new BadRequestException(res.data.responseText);
  }
  if (error.response.status === 500) {
    throw new ServerException('Server is currently unable to process this request');
  }
});

export const getGames = ({ page, limit }) => axios({
  url: `${process.env.VUE_APP_API}/game/get`,
  method: 'get',
  params: {
    page,
    limit,
  },
}).then(response => response.data.payload).catch((error) => {
  if (error.message === 'Network Error') {
    throw new NetworkException('There seem to be a network issue at the moment');
  }
  const res = error.response;
  if (error.response.status === 403) {
    throw new AuthorizationException('Please sign in');
  }
  if (error.response.status === 400) {
    throw new BadRequestException(res.data.responseText);
  }
  if (error.response.status === 500) {
    throw new ServerException('Server is currently unable to process this request');
  }
});
