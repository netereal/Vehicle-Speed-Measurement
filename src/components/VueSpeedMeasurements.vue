/* eslint-disable */
<template>
  <div class="main-container" >
    <svg class="svg-container">
      <svgSpeedIcon v-if="ifSpeed"/>
      <svgRpmIcon v-if="ifRpm"/>
      <polygon v-if="ifSpeed"
        :key="customCurrentValue"
        class="speedometer-needle"
        id="speedAnimation"
        :points="setNeedlePointer()"
        :transform="
          `rotate(${currentValueInDegrees} ${centerPoint} ${centerPoint})`
        ">
<!--        <template v-if="needleAnimation" >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            :from="`0 ${centerPoint} ${centerPoint}`"
            :to="`${currentValueInDegrees} ${centerPoint} ${centerPoint}`"
            :dur="`${this.animationTime}s`"
          />
        </template>-->
      </polygon>

      <polygon v-if="ifRpm"
               id="rpmAnimation"
               :key="customCurrentValue"
               class="speedometer-needle"
               :points="setNeedlePointer()"
               :transform="
          `rotate(${currentValueInDegrees} ${centerPoint} ${centerPoint})`
        "
      >
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



import svgSpeedIcon from "./svg-speed-icon.vue";
import svgRpmIcon from "./svg-rpm-icon.vue";
export default {
  name: "VueSpeedMeasurements",
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

  },
  data: function () {
    return {
      size: 400,
      currentValue: this.customValues.currentValue || 0,
      scaleStartValue: this.customValues.scaleStartValue || 0,
      scaleStep: this.customValues.scaleStep || 20,
      scaleRange: this.customValues.scaleRange || 240,
      animationTime: this.customValues.animationTime || 1,
      ifSpeed: this.customValues.ifSpeed || 0,
      ifRpm: this.customValues.ifRpm || 0,
    };
  },
  components: {
    svgSpeedIcon,
    svgRpmIcon,
  },

  computed: {
    centerPoint() {
      return this.size / 2;
    },
    needleCircleRadius() {
      return this.size / 14;
    },
    scaleStartValue() {
      return this.scaleStartValue() || 0;
    },
    scaleStep() {
      return this.scaleStep() || 20;
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

  methods: {
    degreesToRadians: function (radius, angleInDegrees) {
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
  },
  mounted() {
    const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min

    $(document.querySelector('#rpmAnimation')).css('transform', 'rotate(' + 0 + 'deg)');

    // set timeout
    var tid = setTimeout(animateRpm, 2000);

    function animateRpm() {
      $(document.querySelector('#rpmAnimation')).css('transform', 'rotate(' + rand(0, 240) + 'deg)');
      tid = setTimeout(animateRpm, 200); // repeat myself
    }
    function abortTimer() { // to be called when stop the timer
      clearTimeout(tid);
    }
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
.needle-circle{
  fill: #14181B;
  stroke: #1E252C;
  stroke-width: 4px;
}
.speedometer-needle {
  fill: #FF453A;
  border-radius: 10px;
}

@keyframes customRotationSpeed {
  0% { transform: rotate(0deg); }
  28.57% { transform: rotate(145deg); }
  100% { transform: rotate(0deg); }
}
#speedAnimation {
  transform-origin: center center;
  animation: customRotationSpeed 7s infinite linear;
}
#rpmAnimation{
  transform-origin: center center;
  transition: all 0.6s ease-in-out;
}

</style>
