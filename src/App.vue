/* eslint-disable */
<template>
  <div id="app">
    <div class="container">
      <div>
        <VueSpeed :customValues="customValuesSpeed" />
      </div>
      <div>
        <VueRpm :customValues="customValuesRpm" />
      </div>
    </div>
  </div>
</template>

<script>

import VueSpeed from "../src/components/VueSpeedMeasurements.vue";
import VueRpm from "../src/components/VueSpeedMeasurements.vue";

export default {
  name: 'App',
  components: {
    VueSpeed,
    VueRpm,
  },
  props: {

  },
  methods:{
    randomNumber: function(min, max) {
      return ((Math.random() * (max - min)) + min).toFixed(2)
    },
  },
  data: function() {
    return {
      customValuesRpm: {
        size: 400,
        scaleStartValue: 0,

        currentValue: this.randomNumber(0,8),

        scaleStep: 33.75,
        scaleRange: 8,
        animationTime: 1,
        ifRpm: 1,
      },
      customValuesSpeed: {
        size: 400,

        currentValue: 130,

        animationTime: 0.5,
        ifSpeed: 1,
      },
    };
  },


}
</script>
<style>
html{
  background-color: #030406;
}
.container{
  margin: auto;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-template-rows: repeat(2, 400px);
}
.container > div{
  margin: auto;
}

@media only screen and (min-width: 900px) {
  .container{
    margin: auto;
    width: 900px;
    padding: 10px;
  }
  .container > div{
    margin: auto;
  }
}
</style>
