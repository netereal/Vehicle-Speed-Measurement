<template>
  <div class="main-container">
    <svg class="svg-container">

      <svgSpeedIcon v-if="ifSpeed"/>
      <svgRpmIcon v-if="ifRpm"/>
<!--      <SpeedSVG />-->
<!--      <circle
      class="outer-circle"
      :r="outerCircleRadius"
      :cx="centerPoint"
      :cy="centerPoint"
      />-->

      <polygon
        :key="customCurrentValue"
        class="speedometer-needle"
        :points="setNeedlePointer()"
        :transform="
          `rotate(${currentValueInDegrees} ${centerPoint} ${centerPoint})`
        "
      >
        <template v-if="needleAnimation">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            :from="`0 ${centerPoint} ${centerPoint}`"
            :to="`${currentValueInDegrees} ${centerPoint} ${centerPoint}`"
            :dur="`${this.animationTime}s`"
          />
        </template>
      </polygon>

      <circle
        class="needle-circle"
        :r="needleCircleRadius"
        :cx="centerPoint"
        :cy="centerPoint"
        fill="url(#linear)"
      />
    </svg>
  </div>
</template>

<script>
/*import SpeedSVG from '../src/assets/SPEED.svg';*/
import svgSpeedIcon from "./svg-speed-icon.vue";
import svgRpmIcon from "./svg-rpm-icon.vue";
export default {
  name: "VueSpeedMeter",
  props: {
    customValues: {
      type: Object,
      default: function () {
        return {};
      },
    },
    customCurrentValue: {
      type: Number,
      default: 0,
    },
    needleAnimation: {
      type: Boolean,
      default: true,
    },
/*    speedOrRpm:{
      type: Number,
      default: 1,
    },*/
  },
  data: function () {
    return {
      size: 400,
      currentValue: this.customValues.currentValue || 45,
      scaleStartValue: this.customValues.scaleStartValue || 0,
      scaleStep: this.customValues.scaleStep || 10,
      animationTime: this.customValues.animationTime || 1,
      ifSpeed: this.customValues.ifSpeed || 0,
      ifRpm: this.customValues.ifRpm || 0,
    };
  },
  components:{
    svgSpeedIcon,
    svgRpmIcon,
  },

  computed: {
    centerPoint() {
      return this.size / 2;
    },
    /*outerCircleRadius() {
      return this.size / 2 - this.size * 0.005; // 0.005 is a half of .outer-circle 'stroke-width' -> 0.5%
    },*/
    needleCircleRadius() {
      return this.size / 14;
    },
    scaleStartValue(){
      return this.scaleStartValue() || 0;
    },
    scaleStep(){
      return this.scaleStep() || 20;
    },
    scaleRange() {
      return this.scaleStartValue + this.scaleStep * 12 - this.scaleStartValue;
    },
    // Calculate current value in degrees for rotation the speed meter needle.
    currentValueInDegrees() {
      if (
        this.customCurrentValue >= this.scaleStartValue &&
        this.customCurrentValue <= this.scaleRange
      ) {
        return (270 * this.currentValue) / this.scaleRange;
      } else if (this.customCurrentValue > this.scaleRange) return 270;
      return 0;
    },
  },
  methods:{
    degreesToRadians: function(radius, angleInDegrees) {
      // Convert from Degrees to Radians
      const angleInRadians = angleInDegrees * (Math.PI / 180);
      const x = this.centerPoint + radius * Math.cos(angleInRadians);
      const y = this.centerPoint + radius * Math.sin(angleInRadians);
      return x + " " + y;
    },

    /**
     * Calculate coordinates for needle.
     */
    setNeedlePointer() {
      // Radius for bottom of the needle.
      const smallRadius = this.needleCircleRadius / 3.5;
      // Radius for top point of the needle.
      const topPointRadius = this.size / 2.4;
      return (
        this.degreesToRadians(smallRadius, 225) +
        ", " +
        this.degreesToRadians(smallRadius, 45) +
        ", " +
        this.degreesToRadians(topPointRadius, 135)
      );
    },
  }
}

</script>

<style scoped>

.main-container {
  height: 400px;
  width: 400px;
}
.svg-container {
  width: 400px;
  height: 400px;
}
/*.outer-circle {
  fill: #1C1C1E;
  stroke: #444446;
  stroke-width: 4px;
}*/
.needle-circle{
  fill: #14181B;
  stroke: #1E252C;
  stroke-width: 4px;
}
.speedometer-needle {
  fill: #FF453A;
  border-radius: 10px;
}
</style>
