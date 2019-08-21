export const Mutations = {
  updateAllPlayers: 'updateAllPlayers',
  addPlayer: 'addPlayer',
  updateLoginStatus: 'updateLoginStatus',
  setLoggedInPlayer: 'setLoggedInPlayer',
  setError: 'setError',
  addChat: 'addChat',
  updateAllChats: 'updateAllChats',
  setCurrentChatId: 'setCurrentChatId',
  setSocket: 'setSocket',
  updateAllMessages: 'updateAllMessages',
  addGame: 'addGame',
  updateAllGames: 'updateAllGames',
  updateGame: 'updateGame',
  resetState: 'resetState',
  setLoginStatus: 'setLoginStatus',
};

export default {
  updateAllPlayers(state, {
    players, total, page, limit,
  }) {
    state.players.items = players;
    state.players.total = total;
    state.players.page = page;
    state.players.limit = limit;
  },
  addPlayer(state, player) {
    state.players.items = state.players.items.push(player);
    state.players.total += 1;
  },
  updateLoginStatus(state, status) {
    state.isLoggedIn = status;
  },
  setLoggedInPlayer(state, player) {
    state.loggedInPlayer = player;
  },
  setError(state, error) {
    state.error = error;
  },
  addChat(state, chat) {
    const newChat = Object.assign({ messages: [] }, chat);
    state.chats.push(newChat);
    state.loggedInPlayer.chats.push(newChat);
  },
  updateAllChats(state, chats) {
    state.chats = chats.map((i) => { i.messages = []; return i; });
  },
  setCurrentChatId(state, id) {
    state.currentChatId = id;
  },
  setSocket(state, socket) {
    state.socket = socket;
  },
  updateAllMessages(state, messages) {
    state.messages = [].concat(messages);
  },
  addGame(state, game) {
    state.games.push(game);
  },
  updateGame(state, game) {
    const idx = state.games.findIndex(i => i._id === game._id);
    const games = [].concat(state.games);
    games[idx] = game;
    state.games = games;
  },
  updateAllGames(state, games) {
    state.games = games;
  },
  resetState(state) {
    state.isLoggedIn = false;
    state = {};
  },
  setLoginStatus(state, status) {
    state.isLoggedIn = status;
  },
};
