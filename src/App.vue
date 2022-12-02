<template>
  <div id="app">
    <VueSpeedMeter :customValues="customValuesSpeed" />
    <VueRpmMeter :customValues="customValuesRpm" />
  </div>
</template>

<script>
import VueSpeedMeter from "../components/VueSpeedMeter.vue";
import VueRpmMeter from "../components/VueSpeedMeter.vue";

export default {
  name: 'App',
  components: {
    VueSpeedMeter,
    VueRpmMeter
  },
  data: function() {
    return {
      customValuesRpm: {
        size: 400,
        currentValue: 0,
        scaleStartValue: -30,
        scaleStep: 5,
        animationTime: 3,
        ifRpm: 1,
      },
      customValuesSpeed: {
        size: 400,
        currentValue: 90,
        animationTime: 0.5,
        ifSpeed: 1,
      },
    };
  }
}
</script>

