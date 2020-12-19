<template>
  <div>
    <div class="status-icon sa-success animate" v-if="type === 'success'">
        <span class="sa-line sa-tip animateSuccessTip"></span>
        <span class="sa-line sa-long animateSuccessLong"></span>

        <div class="sa-placeholder"></div>
        <div class="sa-fix"></div>
      </div>

    <div class="status-icon sa-warning pulseWarning" v-else-if="type === 'warn'">
      <span class="sa-body pulseWarningIns"></span>
      <span class="sa-dot pulseWarningIns"></span>
    </div>

    <div class="status-icon sa-error animateErrorIcon" v-else-if="type === 'error'">
      <span class="sa-x-mark animateXMark">
        <span class="sa-line sa-left"></span>
        <span class="sa-line sa-right"></span>
      </span>
    </div>

    <div class="status-icon sa-info" v-else></div>
    <h2>{{msg}}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Message',

  props: {
    msg: String,
    type: { type: String }
  },

  setup (props) {
    // with JSX
    return {}
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  color: #575757;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  text-transform: none;
  position: relative;
  margin: 25px 0;
  padding: 0;
  line-height: 40px;
  display: block;
}
.status-icon {
  width: 80px;
  height: 80px;
  border: 4px solid gray;
  border-radius: 50%;
  margin: 20px auto;
  padding: 0;
  position: relative;
  box-sizing: content-box;
}

// error
.status-icon.sa-error {
  border-color: #f27474;
}
.status-icon.sa-error .sa-x-mark {
  position: relative;
  display: block;
}
.status-icon.sa-error .sa-line {
  position: absolute;
  height: 5px;
  width: 47px;
  background-color: #f27474;
  display: block;
  top: 37px;
  border-radius: 2px;
}
.status-icon.sa-error .sa-line.sa-left {
  transform: rotate(45deg);
  left: 17px;
}
.status-icon.sa-error .sa-line.sa-right {
  transform: rotate(-45deg);
  right: 16px;
}
.status-icon.sa-error.animateErrorIcon {
  animation: animateErrorIcon 0.5s;
}

// warn
.status-icon.sa-warning {
  border-color: #f8bb86;
}
.status-icon.sa-warning .sa-body {
  position: absolute;
  width: 5px;
  height: 47px;
  left: 50%;
  top: 10px;
  border-radius: 2px;
  margin-left: -2px;
  background-color: #f8bb86;
}
.status-icon.sa-warning .sa-dot {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-left: -3px;
  left: 50%;
  bottom: 10px;
  background-color: #f8bb86;
}
.status-icon.sa-warning.pulseWarning {
  animation: pulseWarning 0.75s infinite alternate;
}
.status-icon.sa-warning .pulseWarningIns {
  animation: pulseWarningIns 0.75s infinite alternate;
}

//info
.status-icon.sa-info {
  border-color: #c9dae1;
}
.status-icon.sa-info::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 29px;
  left: 50%;
  bottom: 17px;
  border-radius: 2px;
  margin-left: -2px;
  background-color: #c9dae1;
}
.status-icon.sa-info::after {
  content: "";
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-left: -3px;
  top: 19px;
  background-color: #c9dae1;
  left: 50%;
}

// success
.status-icon.sa-success {
  border-color: #a5dc86;
}
.status-icon.sa-success::before,
.status-icon.sa-success::after {
  content: "";
  -webkit-border-radius: 40px;
  border-radius: 50%;
  position: absolute;
  width: 60px;
  height: 120px;
  background: white;
  transform: rotate(45deg);
}
.status-icon.sa-success::before {
  border-radius: 120px 0 0 120px;
  top: -7px;
  left: -33px;
  transform: rotate(-45deg);

  transform-origin: 60px 60px;
}
.status-icon.sa-success::after {
  border-radius: 0 120px 120px 0;
  top: -11px;
  left: 30px;

  transform: rotate(-45deg);
  transform-origin: 0px 60px;
}
.status-icon.sa-success.animate::after {
  animation: rotatePlaceholder 4.25s ease-in;
}
.status-icon.sa-success .sa-placeholder {
  width: 80px;
  height: 80px;
  border: 4px solid rgba(165, 220, 134, 0.2);
  -webkit-border-radius: 40px;
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  left: -4px;
  top: -4px;
  z-index: 2;
}
.status-icon.sa-success .sa-line {
  height: 5px;
  background-color: #a5dc86;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 2;
}
.status-icon.sa-success .sa-line.sa-tip {
  width: 25px;
  left: 14px;
  top: 46px;
  transform: rotate(45deg);
}
.status-icon.sa-success .sa-line.sa-long {
  width: 47px;
  right: 8px;
  top: 38px;

  transform: rotate(-45deg);
}
.status-icon.sa-success .sa-line.animateSuccessTip {
  animation: animateSuccessTip 0.75s;
}
.status-icon.sa-success .sa-line.animateSuccessLong {
  animation: animateSuccessLong 0.75s;
}

@keyframes rotatePlaceholder {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}
.status-icon.sa-success .sa-fix {
  width: 5px;
  height: 90px;
  background-color: white;
  position: absolute;
  left: 28px;
  top: 8px;
  z-index: 1;
  transform: rotate(-45deg);
}

@keyframes animateSuccessTip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes animateSuccessLong {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}

@keyframes animateErrorIcon {
  0% {
    transform: rotateX(100deg);

    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);

    opacity: 1;
  }
}

@keyframes pulseWarning {
  0% {
    border-color: #f8d486;
  }
  100% {
    border-color: #f8bb86;
  }
}

@keyframes pulseWarningIns {
  0% {
    background-color: #f8d486;
  }
  100% {
    background-color: #f8bb86;
  }
}
</style>
