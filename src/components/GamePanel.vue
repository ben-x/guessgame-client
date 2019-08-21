<template>
  <div class="card shadow-lg bg-white rounded">
    <div class="card-header msg_head">
      <div class="d-flex bd-highlight" v-if="currentChatId">
        <div class="img_cont">
          <img :src="otherPlayerAvatarUrl" class="rounded-circle user_img">
          <span class="online_icon"></span>
        </div>
        <div class="user_info">
          <span>Chat with {{otherPlayer.username}}</span>
          <p v-if="game">{{questionsLeft}} questions left</p>
        </div>
        <div class="video_cam">
          <span><i class="fas fa-video"></i></span>
          <span><i class="fas fa-phone"></i></span>
        </div>
      </div>
      <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
      <div class="action_menu">
        <ul>
          <li><i class="fas fa-user-circle"></i> View profile </li>
          <!--
          <li><i class="fas fa-users"></i> Add to close friends</li>
          <li><i class="fas fa-plus"></i> Add to group</li>
          <li><i class="fas fa-ban"></i> Block</li>
          -->
        </ul>
      </div>
    </div>

    <div class="card-body msg_card_body" ref="messagepane">
      <div v-for="(message, index) in messages" :key="index">
        <div class="d-flex justify-content-end mb-4" v-if="message.mine">
          <div class="msg_container_send">
            {{message.text}}
            <span class="msg_time_send">{{message.sentAt | timeAgo}}</span>
          </div>
          <div class="img_cont_msg">
            <img :src="currentUserAvatarUrl" class="rounded-circle user_img_msg" alt="My Avatar">
          </div>
        </div>
        <div class="d-flex justify-content-start mb-4"
             v-if="!message.mine">
          <div class="img_cont_msg">
            <img
              :src="message.sender ? otherPlayerAvatarUrl : botAvatarUrl"
              class="rounded-circle user_img_msg" alt="Other Player Avatar">
          </div>
          <div class="msg_cotainer">
            {{message.text}}&nbsp;
            <span class="msg_time">{{message.sentAt | timeAgo}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="input-group">
        <div class="input-group-append">
          <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
        </div>
        <textarea
          v-model="text"
          @keyup.enter="handleMessage"
          class="form-control type_msg d-inline-block"
          placeholder="Type your message...">
        </textarea>
        <div class="input-group-append">
          <span class="input-group-text send_btn" @click="handleMessage">
            <i class="fas fa-location-arrow"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import moment from 'moment';
import { mapGetters, mapState, mapActions } from 'vuex';
import ActionTypes from '../store/action-types';

function getTextFromCmd(text) {
  return text.split(' ').slice(1).join(' ');
}

function messageHandler() {
  const text = this.text.trim();
  if (!text || text.length === 0) return;
  let gameId = null;
  if (this.game) {
    gameId = this.game._id.toString();
  }

  const split = text.split(' ');
  switch (split[0]) {
    case '/game':
      if (split.length < 2) {
        this.messages.push({
          text: 'Start a game with the command /game e.g /game Lion',
          sentAt: Date.now(),
          chat: this.currentChatId,
          meta: { bot: true },
        });
        break;
      }
      this.send({
        text: `${process.env.VUE_APP_BOT_NAME} is started a new game... ): `,
        chat: this.currentChatId,
        sentAt: Date.now(),
        meta: { bot: true },
      });
      this.startGame({
        player2: this.otherPlayer._id,
        word: getTextFromCmd(text),
        chat: this.currentChatId,
      });
      break;
    case '/guess':
      if (!this.game) {
        this.messages.push({
          text: 'No active game right now... Start a new game by typing \'/game word\'',
          sentAt: Date.now(),
          chat: this.currentChatId,
          meta: { bot: true },
        });
        break;
      }
      if (this.isPlayer1) {
        this.messages.push({
          text: 'Sorry, you cannot guess the answer to a game you started... ):',
          sentAt: Date.now(),
          chat: this.currentChatId,
          meta: { bot: true },
        });
        break;
      }
      if (split.length < 2) {
        this.messages.push({
          text: 'Start a game with the command /guess word e.g /guess Lion',
          sentAt: Date.now(),
          chat: this.currentChatId,
          meta: { bot: true },
        });
        break;
      }
      // save value because update after mutation affects status
      this.guessWord({
        word: getTextFromCmd(text),
        gameId,
      }).then((game) => {
        const msg = {
          sentAt: Date.now(),
          chat: this.currentChatId,
          meta: {
            bot: true,
            game: gameId,
          },
        };
        if (game.winner === this.loggedInPlayer._id) {
          msg.text = `${this.loggedInPlayer.username} wins!`;
        } else {
          msg.text = `${this.otherPlayer.username} wins! Actual word is ${game.actual_word}`;
        }
        this.send(msg);
      });
      break;
    case '/question':
      if (!this.game) {
        this.messages.push({
          text: 'No active game right now... Start a new game by typing \'/game word\'',
          sentAt: Date.now(),
          chat: this.currentChatId,
          meta: { bot: true },
        });
        break;
      }
      if (this.isPlayer1) {
        this.messages.push({
          text: 'Sorry, you cannot ask question on a game you started... ):',
          sentAt: Date.now(),
          avatar: './img/bot2.jpg',
          bot: true,
        });
        break;
      }
      if (split.length < 2) {
        this.messages.push({
          text: 'Ask a question with the command /question e.g /question Are you married?',
          sentAt: Date.now(),
          chat: this.currentChatId,
          meta: { bot: true },
        });
        break;
      }
      if (this.questionsLeft === 0) {
        this.messages.push({
          text: 'Sorry, maximum number of question exceeded!):',
          sentAt: Date.now(),
          avatar: './img/bot2.jpg',
          bot: true,
        });
        break;
      }
      if (this.hasPendingQuestion()) {
        this.messages.push({
          text: 'Sorry, you can only ask one question at a time... ):',
          sentAt: Date.now(),
          avatar: './img/bot2.jpg',
          bot: true,
        });
        break;
      }
      this.send({
        sender: this.loggedInPlayer._id,
        chat: this.currentChatId,
        text: `@question: ${getTextFromCmd(text)}`,
        sentAt: Date.now(),
        meta: {
          question: true,
          gameId,
        },
      });
      break;
    case '/answer':
      if (!this.game) {
        this.messages.push({
          text: 'No active game right now... Start a new game by typing \'/game word\'',
          sentAt: Date.now(),
          chat: this.currentChatId,
          meta: { bot: true },
        });
        break;
      }
      if (!this.isPlayer1) {
        this.messages.push({
          text: 'You cannot answer a question on a game you did not start... ):',
          sentAt: Date.now(),
          avatar: './img/bot2.jpg',
          bot: true,
        });
        break;
      }
      if (!this.hasPendingQuestion()) {
        this.messages.push({
          text: 'No pending question for you to answer',
          sentAt: Date.now(),
          avatar: './img/bot2.jpg',
          bot: true,
        });
        break;
      }
      if (split.length < 2) {
        this.messages.push({
          text: 'Answer a question with the command /answer e.g /answer Yes',
          sentAt: Date.now(),
          chat: this.currentChatId,
          meta: { bot: true },
        });
        break;
      }
      this.send({
        sender: this.loggedInPlayer._id,
        chat: this.currentChatId,
        text: `@answer: ${getTextFromCmd(text)}`,
        sentAt: Date.now(),
        meta: {
          answer: true,
          gameId,
          questionId: this.game.questions[this.game.questions.length - 1].question,
        },
      });
      break;
    case '/help':
      this.messages.push({
        text: 'type /game to start a new game\n, /guess to guess the word during a game, /help for this help',
        sentAt: Date.now(),
        avatar: './img/bot2.jpg',
        bot: true,
      });
      break;
    default:
      this.send({
        sender: this.loggedInPlayer._id,
        chat: this.currentChatId,
        text: text.toString(),
        sentAt: Date.now(),
      });
  }
  this.text = '';
}

export default {
  name: 'GamePanel',
  props: {
    socket: Object,
  },
  data() {
    return {
      text: '',
    };
  },
  computed: {
    ...mapState([
      'loggedInPlayer',
      'currentChatId',
    ]),
    ...mapGetters({
      currentChat: 'getCurrentChat',
      messages: 'sortedMessages',
      game: 'currentActiveGame',
    }),
    otherPlayer() {
      if (!this.currentChat.players) return {};
      return this.currentChat.players.find(i => i._id !== this.loggedInPlayer._id);
    },
    otherPlayerAvatarUrl() { return `img/${this.otherPlayer.avatar}`; },
    currentUserAvatarUrl() { return `img/${this.loggedInPlayer.avatar}`; },
    isPlayer1() {
      if (this.game) {
        return this.game.player1 === this.loggedInPlayer._id;
      }
      return null;
    },
    botAvatarUrl() { return 'img/bot2.jpg'; },
    questionsLeft() {
      if (this.game) {
        return 20 - this.game.questions.length;
      }
      return null;
    },
    lastMessage() {
      return this.messages[this.messages.length - 1];
    },
  },
  mounted() {
    jQuery('#action_menu_btn').click(() => {
      jQuery('.action_menu').toggle();
    });
  },
  methods: {
    ...mapActions([
      ActionTypes.initSocket,
      ActionTypes.startGame,
      ActionTypes.guessWord,
    ]),
    hasPendingQuestion() {
      if (this.game) {
        // if there are questions in the game and every question has an answer
        return !(this.game.questions.length > 0 && this.game.questions.every(i => i.answer));
      }
      return null;
    },
    handleMessage() {
      messageHandler.call(this);
    },
    send(msg) {
      this.socket.emit('new-message', msg);
    },
  },
  filters: {
    timeAgo(value) {
      if (!value) return '';
      return moment(value).fromNow();
    },
  },
  watch: {
    lastMessage() {
      this.$nextTick(() => {
        const div = this.$refs.messagepane;
        div.scrollTop = div.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
  .card{
    height: 550px;
    border-radius: 15px !important;
    background-color: rgba(0,0,0,0.4) !important;
  }
  .msg_card_body{
    overflow-y: auto;
    /*overflow-y: scroll;*/
  }
  .card-header{
    border-radius: 15px 15px 0 0 !important;
    border-bottom: 0 !important;
  }
  .card-footer{
    border-radius: 0 0 15px 15px !important;
    border-top: 0 !important;
  }
  .type_msg{
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color:white !important;
    height: 60px !important;
    overflow-y: auto;
  }
  .type_msg:focus{
    box-shadow:none !important;
    outline:0px !important;
  }
  .attach_btn{
    border-radius: 15px 0 0 15px !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
  }
  .send_btn{
    border-radius: 0 15px 15px 0 !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
  }
  .user_img{
    height: 70px;
    width: 70px;
    border:1.5px solid #f5f6fa;
  }
  .user_img_msg{
    height: 40px;
    width: 40px;
    border:1.5px solid #f5f6fa;

  }
  .img_cont{
    position: relative;
    height: 70px;
    width: 70px;
  }
  .img_cont_msg{
    height: 40px;
    width: 40px;
  }
  .online_icon{
    position: absolute;
    height: 15px;
    width:15px;
    background-color: #4cd137;
    border-radius: 50%;
    bottom: 0.2em;
    right: 0.4em;
    border:1.5px solid white;
  }
  .user_info{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 15px;
  }
  .user_info span{
    font-size: 20px;
    color: white;
  }
  .user_info p{
    font-size: 10px;
    color: rgba(255,255,255,0.6);
  }
  .video_cam{
    margin-left: 50px;
    margin-top: 5px;
  }
  .video_cam span{
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-right: 20px;
  }
  .msg_cotainer{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    border-radius: 25px;
    background-color: #82ccdd;
    padding: 10px;
    position: relative;
  }
  .msg_container_send{
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    border-radius: 25px;
    background-color: #78e08f;
    padding: 10px;
    position: relative;
  }
  .msg_time{
    position: absolute;
    left: 0;
    bottom: -15px;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
  }
  .msg_time_send{
    position: absolute;
    right:0;
    bottom: -15px;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
  }
  .msg_head{
    position: relative;
  }
  #action_menu_btn{
    position: absolute;
    right: 10px;
    top: 10px;
    color: white;
    cursor: pointer;
    font-size: 20px;
  }
  .action_menu{
    z-index: 1;
    position: absolute;
    padding: 15px 0;
    background-color: rgba(0,0,0,0.5);
    color: white;
    border-radius: 15px;
    top: 30px;
    right: 15px;
    display: none;
  }
  .action_menu ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .action_menu ul li{
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 5px;
  }
  .action_menu ul li i{
    padding-right: 10px;

  }
  .action_menu ul li:hover{
    cursor: pointer;
    background-color: rgba(0,0,0,0.2);
  }
</style>
