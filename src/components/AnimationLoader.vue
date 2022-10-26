<template>
  <div>
    <div class="loaded-wrapper" v-if="loadingSpinner">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <small class="fw-bold">Please wait a few seconds, fighters are getting ready !</small>
    </div>
    <div v-if="failQuery" class="loaded-wrapper">
      <div class="lds-hourglass"></div>
      <strong class="ms-5 ">Wrong URL ! &nbsp;&nbsp;&nbsp; Back to home <router-link to="/">
          <b-button variant="danger ms-2" style="pointer-events: none;">Home</b-button>
        </router-link> </strong>
    </div>
  </div>
</template>
<script>
export default {
  props: ['loadingSpinner', 'failQuery']
}
</script>
<style scoped>
.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-hourglass 1.2s infinite;
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  100% {
    transform: rotate(1800deg);
  }
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

.loaded-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #6d83a2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>