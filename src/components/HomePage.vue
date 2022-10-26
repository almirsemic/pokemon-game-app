<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="d-flex justify-content-center align-items-center">
        <img src="@/assets/Kodi-logo.jpg" class="kodi position-absolute">
        <img src="@/assets/kodimon-1.png" class="position-fixed">
      </div>
      <div>
        <router-link to="/game">
          <b-button pill variant="primary position-absolute px-5 shadow-none" class="button" @click="clearLocalStorage()">New Game</b-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  methods:{
    clearLocalStorage(){
      localStorage.clear()
    }
  }
}
</script>
<style scoped>
.kodi{
  margin-top: -135px;
  transform: rotate(-25deg);
  width: 200px;
  height: 200px;
}
.button{
  margin-top: 230px;
  margin-left: -100px;
  border: 4px solid #73B9E5;
}
</style>

