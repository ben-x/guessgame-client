<template>
  <div class="board container-fluid">
    <div class="row justify-content-center h-100" style="margin-top: 50px">
      <div class="col-md-4 col-xl-3 chat">
        <PlayerList></PlayerList>
      </div>
      <div class="col-md-8 col-xl-6 chat">
        <GamePanel :socket="socket"></GamePanel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ActionTypes from '../store/action-types';
import PlayerList from '@/components/PlayerList.vue';
import GamePanel from '@/components/GamePanel.vue';

export default {
  name: 'Board',
  components: { PlayerList, GamePanel },
  data() {
    return {
      socket: null,
    };
  },
  methods: {
    ...mapActions([
      ActionTypes.initSocket,
      ActionTypes.getAllMessages,
      ActionTypes.getAllGames,
    ]),
  },
  created() {
    this.initSocket().then((socket) => {
      this.socket = socket;
    });
    this.getAllMessages();
    this.getAllGames({ page: 1, limit: 50, });
  },
};
</script>

<style scoped>
  .chat{
    margin-top: auto;
    margin-bottom: auto;
  }
</style>
