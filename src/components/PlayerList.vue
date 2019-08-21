<template>
  <div class="card mb-sm-3 mb-md-0 contacts_card">
    <div class="card-header">
      <div class="input-group">
        <input type="text" placeholder="Search..." name="" class="form-control search">
        <div class="input-group-prepend">
          <span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
        </div>
      </div>
    </div>
    <div class="card-body contacts_body">
      <ul class="contacts" v-for="(chat, index) in chats" v-bind:key="index">
        <li
          :class="{'active': currentChatId === chat._id}"
          :key="chat._id"
          @click="updateCurrentChat(chat._id)">
          <Contact
            :id="chat.other._id"
            :username="chat.other.username"
            :desc="chat.other.bio"
            :status="chat.other.status"
            :avatar="chat.other.avatar"></Contact>
        </li>
      </ul>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ActionTypes from '../store/action-types';
import { Mutations } from '../store/mutations';
import Contact from './Contact.vue';

export default {
  name: 'PlayerList',
  components: { Contact },
  computed: {
    ...mapState({
      chats: state => state.chats,
      currentChatId: state => state.currentChatId,
    }),
    ...mapGetters({
      chats: 'getChatPlayers',
    }),
  },
  methods: {
    ...mapActions([
      ActionTypes.getAllChats,
    ]),
    updateCurrentChat(chatId) {
      this.$store.commit(Mutations.setCurrentChatId, chatId);
    },
  },
  mounted() {
    this.getAllChats();
  },
};
</script>

<style scoped>
  .card{
    height: 550px;
    border-radius: 15px !important;
    background-color: rgba(0,0,0,0.4) !important;
  }
  .contacts_body{
    padding:  0.75rem 0 !important;
    overflow-y: auto;
    white-space: nowrap;
  }
  .card-header{
    border-radius: 15px 15px 0 0 !important;
    border-bottom: 0 !important;
  }
  .card-footer{
    border-radius: 0 0 15px 15px !important;
    border-top: 0 !important;
  }
  .search{
    border-radius: 15px 0 0 15px !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color:white !important;
  }
  .search:focus{
    box-shadow:none !important;
    outline:0px !important;
  }
  .search_btn{
    border-radius: 0 15px 15px 0 !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
  }
  .contacts{
    list-style: none;
    padding: 0;
  }
  .contacts li{
    width: 100% !important;
    padding: 5px 10px;
    margin-bottom: 15px !important;
  }
  .active{
    background-color: rgba(0,0,0,0.3);
  }
</style>
