<template>
  <div class="container-fluid pt-5">
    <div class="shadow p-3 mb-5 bg-white rounded mx-auto" style="width: auto; max-width: 400px">
      <h2 class="card-title mb-4">Sign In</h2>
      <form>
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter your username"
            required>
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn "
            @click="submit"
            :disabled="username.length < 3">Submit</button>
        </div>
        <div class="form-group">
          <router-link to="/register">Setup New Player</router-link>
<!--          <span class="text-danger d-block" v-if="errorMsg">{{errorMsg}} - [{{errorCode}}]</span>-->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ActionTypes from '../store/action-types';

export default {
  name: 'Home',
  data() {
    return {
      username: '',
    };
  },
  methods: {
    ...mapActions([
      ActionTypes.login,
    ]),
    submit(evt) {
      evt.preventDefault();
      this.login(this.username).then(() => {
        this.$router.push('players');
      }).catch((error) => {
        this.$toasted.error(error.message, { duration: 2000 });
      });
    },
  },
  computed: {
    ...mapState({
      errorMsg: state => state.error.message,
      errorCode: state => state.error.code,
    }),
  },
  created() {},
};
</script>

<style scoped>
  .btn{
    background-color: yellowgreen !important;
    color: #fff !important;
  }
</style>
