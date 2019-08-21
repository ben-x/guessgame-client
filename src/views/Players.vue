<template>
  <div class="players container">
    <h2>Players({{players.total}})</h2>
    <div class="row">
      <div class="col col-xs-12 col-sm-12 col-md-3 pl-2 pt-2"
           v-for="(player, index) in players.items" v-bind:key="index">
        <Player
          :player="player">
        </Player>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ActionTypes from '../store/action-types';
import Player from '@/components/Player.vue';

export default {
  name: 'Players',
  components: { Player },
  computed: {
    ...mapState({
      players: state => state.players,
      errorMsg: state => state.error.message,
      errorCode: state => state.error.code,
    }),
  },
  methods: {
    ...mapActions([
      ActionTypes.getAllPlayers,
    ]),
  },
  data() {
    return {
    };
  },
  created() {
    this.getAllPlayers({ includeChats: false });
  },
};
</script>

<style scoped>
  .players {
    margin-top: 10px;
  }
</style>
