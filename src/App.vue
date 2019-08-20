<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg fixed-to navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">
        GuessGame
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse nav-pills justify-content-end" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
<!--            <router-link to="/" class="nav-link">-->
<!--              Home <span class="sr-only">(current)</span>-->
<!--            </router-link>-->
          </li>
          <li class="nav-item">
            <router-link to="/players" class="nav-link" v-if="isUserLoggedIn">Players</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/board" class="nav-link" v-if="isUserLoggedIn">Board</router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/register"
              class="nav-link"
              v-if="!isUserLoggedIn">
              Register
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#"
              class="nav-link"
              v-if="isUserLoggedIn" @click="signOut()">
                <i class="icon"></i>Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ActionTypes from './store/action-types';

export default {
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'isUserLoggedIn',
    }),
  },
  methods: {
    ...mapActions([
      ActionTypes.logout,
    ]),
    signOut() {
      this.logout().then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style>
  body,html{
    background: #7F7FD5;
    background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
    background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
  }
</style>
