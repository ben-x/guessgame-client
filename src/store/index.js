import Vue from 'vue';
import Vuex from 'vuex';
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
  chats: [],
  currentChatId: null,
  messages: [],
  games: [],
  socket: null,
  isLoggedIn: false,
  loading: false,
  loggedInPlayer: {},
  error: {
    message: null,
    code: null,
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()],
});
