<template>
  <div id="app">
    <VueSpeedMeter :customProps="customVals" />
  </div>
</template>

<script>
import VueSpeedMeter from "../components/VueSpeedMeter.vue";

export default {
  name: 'App',
  components: {VueSpeedMeter},
  data: function() {
    return {
      customVals: {
      }
    }
  }
}
</script>

