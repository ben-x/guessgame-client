<template>
  <div class="card shadow-lg p-1 mb-3 bg-white rounded">
    <p class="text-right">
      <span v-if="status" class="badge badge-pill badge-success">Online</span>
      <span v-if="!status" class="badge badge-pill badge-danger">Offline</span>
    </p>
    <img class="card-img-top avatar mx-auto" :src="avatarUrl" alt="User Image">
    <div class="card-body">
      <h4 class="card-title text-center">{{name}}</h4>
      <p class="card-text text-center">
        {{desc}}
      </p>
<!--      <p class="card-text"><small class="text-muted">Last seen 3 mins ago</small></p>-->
    </div>
    <div class="card-footer">
      <button class="btn btn-secondary btn-block" @click="challenge">Challenge</button>
    </div>
    <div class="modal fade"
         id="modal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="mx-auto" style="margin-top: 50%">
          <Spinner :size="150" ref="spinner"></Spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import { mapActions } from 'vuex';
import Spinner from '@/components/Spinner.vue';
import ActionTypes from '../store/action-types';
import {Mutations} from '../store/mutations';

export default {
  name: 'Player',
  components: { Spinner },
  data() {
    return {
      modalObj: jQuery('#modal').modal({
        backdrop: true,
        keyboard: false,
        focus: true,
        show: false,
      }),
    };
  },
  props: {
    id: String,
    name: String,
    desc: String,
    status: Boolean,
    avatar: String,
  },
  methods: {
    ...mapActions([
      ActionTypes.startChat,
    ]),
    challenge() {
      this.modalObj.modal('show');
      this.startChat(this.id).then((chat) => {
        this.modalObj.modal('hide');
        this.$store.commit(Mutations.setCurrentChatId, chat._id);
        setTimeout(() => { this.$router.push('board'); }, 1000);
      }).catch((error) => {
        this.modalObj.modal('hide');
        this.$toasted.show(error.message);
      });
    },
  },
  computed: {
    avatarUrl() { return `img/${this.avatar || 'avatar-1.png'}`; },
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
