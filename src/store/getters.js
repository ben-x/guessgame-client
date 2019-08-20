import Cookie from 'js-cookie';

export const getChats = (state) => {
  return state.chats;
};

export const currentChat = (state) => {
  return state.currentChatId ? state.chats.find(i => i._id === state.currentChatId) : {};
};

export const currentMessages = (state) => {
  return state.messages
    ? state.messages.filter(msg => msg.chat === state.currentChatId).map((msg) => {
      msg.mine = msg.sender === state.loggedInPlayer._id;
      return msg;
    })
    : [];
};

export const sortedMessages = (state, getters) => {
  const messages = getters.currentMessages;
  return messages.slice().sort((a, b) => a.sentAt - b.sentAt);
};

export const getChatPlayers = (state) => {
  const { chats, loggedInPlayer } = state;
  return chats.map((chat) => {
    chat.other = chat.players.find(i => i._id !== loggedInPlayer._id);
    return chat;
  });
};

export const getCurrentChat = (state) => {
  const { chats, currentChatId } = state;
  return chats.find(i => i._id === currentChatId) || {};
};

export const currentActiveGame = (state) => {
  const { games, currentChatId } = state;
  return games.find((game) => { return game && game.chat === currentChatId && game.status === 'active'; });
};

export const isUserLoggedIn = (state) => typeof Cookie.get('ASID') === 'string';
