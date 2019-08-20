<template>
  <div class="container pt-5">
    <div class="shadow p-3 mb-5 bg-white rounded mx-auto" style="width: auto; max-width: 500px">
      <h2 class="card-title mb-4">Player Profile Setup</h2>
      <form>
        <div class="form-group">
<!--            <label for="username">Username:</label>-->
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Choose a username"
              required>
            <div class="valid-feedback">
              Looks good!
            </div>
        </div>
        <div class="form-group">
          <textarea
            v-model="bio"
            class="form-control"
            placeholder="One fun thing about you"
            rows="4">
          </textarea>
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn "
            @click="join"
            :disabled="username.length < 3">
            Join Game
          </button>
          <span class="text-danger d-block" v-if="errorMsg">{{errorMsg}} - [{{errorCode}}]</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  components: {},
  data() {
    return {
      username: '',
      bio: '',
      errorMsg: null,
      errorCode: null,
    };
  },
  methods: {
    join(evt) {
      evt.preventDefault();
      axios({
        url: `${process.env.VUE_APP_API}/player/register`,
        method: 'post',
        data: {
          username: this.username,
          bio: this.bio,
          avatar: `avatar-${Math.floor((Math.random() * 5) + 1)}`,
        },
      }).then((response) => {
        this.$toasted.success('Registration Successful', { duration: 1000 });
        setTimeout(() => { this.$router.push('/'); }, 1100);
      }).catch((error) => {
        const res = error.response;
        this.errorMsg = res.data.responseText;
        this.errorCode = res.data.responseCode;
      });
    },
  },
};
</script>

<style scoped>
  .btn{
    background-color: yellowgreen !important;
    color: #fff !important;
  }
</style>
