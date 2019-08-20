<template>
  <div class="d-flex bd-highlight">
    <div class="img_cont">
      <img :src="avatarUrl" class="rounded-circle user_img">
      <span :class="{'offline': offline}" class="online_icon"></span>
    </div>
    <div class="user_info">
      <span>{{username}}</span>
      <p>{{desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    id: String,
    username: String,
    status: Boolean,
    avatar: String,
    desc: String,
  },
  computed: {
    avatarUrl() { return `img/${this.avatar}`; },
    offline() { return this.status === true; },
  },
};
</script>

<style scoped>
  .user_img{
    height: 70px;
    width: 70px;
    border:1.5px solid #f5f6fa;
  }
  .img_cont{
    position: relative;
    height: 70px;
    width: 70px;
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
  .offline{
    background-color: #c23616 !important;
  }
  @media(max-width: 576px){
    .contacts_card{
      margin-bottom: 15px !important;
    }
  }
</style>
