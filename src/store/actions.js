import * as api from '../api';
import { Mutations } from './mutations';

export const getAllMessages = ({ commit }) => {
  api.getMessages().then((messages) => {
    commit(Mutations.updateAllMessages, messages);
  });
};

export const getAllPlayers = ({ commit, state }, { page = 1, limit = 50, includeChats = true }) => {
  api.getAllPlayer({
    page, limit, includeChats,
  }).then(({ players, total }) => {
    const plys = players.filter(i => i._id !== state.loggedInPlayer._id);
    commit(Mutations.updateAllPlayers, {
      players: plys, total, page, limit,
    });
  }).catch((error) => {
    console.log(error);
  });
};

export const sendMessage = ({ commit, store }, payload) => {
  store.socket.emit('new-message', payload, () => {
    commit('receiveMessage');
  });
};

export const switchChat = ({ commit }, payload) => {
  commit('switchChat', payload);
};

export const login = ({ commit }, username) => {
  return new Promise((resolve, reject) => {
    api.login(username).then((player) => {
      commit(Mutations.updateLoginStatus, true);
      commit(Mutations.setLoggedInPlayer, player);
      resolve(true);
    }).catch((error) => {
      commit(Mutations.setError, error);
      reject(error);
    });
  });
};

export const startChat = ({ commit }, playerId) => {
  return new Promise((resolve, reject) => {
    api.startChat(playerId).then((newChat) => {
      commit(Mutations.addChat, newChat);
      resolve(newChat);
    }).catch((error) => {
      commit(Mutations.setError, error);
      reject(error);
    });
  });
};

export const getAllChats = ({ commit }) => {
  return new Promise((resolve, reject) => {
    api.getChats().then((chats) => {
      commit(Mutations.updateAllChats, chats);
      resolve(true);
    }).catch((error) => {
      commit(Mutations.setError, error);
      reject(error);
    });
  });
};

export const initSocket = ({ commit, dispatch, state }) => {
  return new Promise((resolve, reject) => {
    api.getSocket().then((socket) => {
      socket.on('new-message-logged', (data) => {
        dispatch('getAllMessages');
      });
      socket.on('save-message-error', (data) => {
        console.log('save-message-error', data);
      });
      socket.on('player-connected', () => {
        dispatch('getAllPlayers');
      });
      socket.on('game-started', ({ chat, gameId }) => {
        // only load games if the chat is associated with the current user
        if (state.chats.find(i => i._id === chat)) {
          dispatch('getAllGames', { page: 1, limit: 50 });
        }
      });
      socket.on('question-asked', ({chat, gameId}) => {
        // only load games if the chat is associated with the current user
        if (state.chats.find(i => i._id === chat)) {
          dispatch('getAllGames', { page: 1, limit: 50 });
        }
      });
      resolve(socket);
    }).catch((error) => {
      commit(Mutations.setError, error);
      reject(error);
    });
  });
};

export const startGame = ({ commit }, { player2, word, chat }) => {
  return new Promise((resolve, reject) => {
    api.startGame({ player2, word, chat }).then((newGame) => {
      commit(Mutations.addGame, newGame);
      resolve(true);
    }).catch((error) => {
      commit(Mutations.setError, error);
      reject(error);
    });
  });
};

export const guessWord = ({ commit }, { gameId, word }) => {
  return new Promise((resolve, reject) => {
    api.guessWord({ gameId, word }).then((updatedGame) => {
      commit(Mutations.updateGame, updatedGame);
      resolve(updatedGame);
    }).catch((error) => {
      commit(Mutations.setError, error);
      reject(error);
    });
  });
};

export const getAllGames = ({ commit }, { page, limit }) => {
  return new Promise((resolve, reject) => {
    api.getGames({ page, limit }).then((games) => {
      commit(Mutations.updateAllGames, games);
      resolve(games);
    }).catch((error) => {
      commit(Mutations.setError, error);
      reject(error);
    });
  });
};

export const logout = ({ commit, dispatch }) => {
  return new Promise((resolve, reject) => {
    api.logout().then((success) => {
      commit(Mutations.resetState);
      resolve(success);

      // disconnect socket
      dispatch('initSocket').then(socket => socket.disconnect());
    }).catch((error) => {
      commit(Mutations.setError, error);
      reject(error);
    });
  });
};
