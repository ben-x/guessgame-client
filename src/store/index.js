import Vue from 'vue';
import Vuex from 'vuex';
// import * as Cookies from 'js-cookie';
import createPersistedState from 'vuex-persistedstate';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  players: {
    items: [],
    page: 1,
    limit: 50,
    total: 0,
  },
  chats: [{
    id: null,
    type: null,
    active: null,
    players: [],
    messages: [],
  }],
  currentChatId: null,
  messages: [{
    sender: null,
    chat: null,
    type: null,
    text: '',
    sentAt: '',
    loggedAt: '',
    meta: {},
  }],
  games: [],
  socket: null,
  isLoggedIn: false,
  loading: false,
  loggedInPlayer: {
    username: null,
    bio: null,
    avatar: null,
    won: 0,
    lost: 0,
    points: 0,
    chats: [],
  },
  error: {
    message: null,
    code: null,
  },
};

// const persistStorage = {
//   getItem: key => Cookies.getJSON(key),
//   setItem: (key, value) => Cookies.set(key, value, { expires: , secure: false }),
//   removeItem: key => Cookies.remove(key),
// };

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()],
});
