<template>
  <div id="app">
    <VueSpeed :customValues="customValuesSpeed" />
    <VueRpm :customValues="customValuesRpm" />
  </div>
</template>

<script>
import VueSpeed from "../components/VueSpeedMeasurements.vue";
import VueRpm from "../components/VueSpeedMeasurements.vue";

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

