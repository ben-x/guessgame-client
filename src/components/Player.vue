<template>
  <div class="card shadow-lg p-1 mb-3 bg-white rounded">
    <p class="text-right">
<!--      <span v-if="status" class="badge badge-pill badge-success">Online</span>-->
<!--      <span v-if="!status" class="badge badge-pill badge-danger">Offline</span>-->
    </p>
    <img class="card-img-top avatar mx-auto" :src="avatarUrl" alt="User Image">
    <div class="card-body">
      <h4 class="card-title text-center">{{player.username}}</h4>
      <p class="card-text text-center">
        {{player.bio}}
      </p>
      <p class="text-center">
        <span class="badge badge-pill badge-success mr-1">Won: {{player.won}}</span>
        <span class="badge badge-pill badge-danger mr-1">Lost: {{player.lost}}</span>
        <span class="badge badge-pill badge-dark">Pts: {{player.points}}</span>
      </p>
    </div>
    <div class="card-footer">
      <button class="btn btn-secondary btn-block" @click="challenge">Challenge</button>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import { mapActions } from 'vuex';
import ActionTypes from '../store/action-types';

export default {
  name: 'Player',
  components: { },
  data() {
    return {
      modalObj: () => jQuery('#spinner-modal').modal({
        backdrop: true,
        keyboard: false,
        focus: true,
        show: false,
      }),
    };
  },
  props: {
    player: Object,
  },
  methods: {
    ...mapActions([
      ActionTypes.startChat,
    ]),
    challenge() {
      this.modalObj().modal('show');
      this.startChat(this.player._id).then(() => {
        this.modalObj().modal('hide');
        this.$router.push('board');
        // setTimeout(() => { this.$router.push('board'); }, 1000);
      }).catch((error) => {
        this.modalObj().modal('hide');
        this.$toasted.show(error.message);
      });
    },
  },
  computed: {
    avatarUrl() { return `img/${this.player.avatar || 'avatar-1.png'}`; },
  },
};
</script>

<style scoped>
  .card {
    width: 16rem;
  }
  .avatar {
    width: 150px;
    height: 150px;
  }
</style>
