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
        scaleStartValue: 0,
        currentValue: 7,
        scaleStep: 33.25,
        scaleRange: 8,
        animationTime: 1,
        ifRpm: 1,
      },
      customValuesSpeed: {
        size: 400,
        currentValue: 120,
        animationTime: 0.5,
        ifSpeed: 1,
      },
    };
  }
}
</script>

