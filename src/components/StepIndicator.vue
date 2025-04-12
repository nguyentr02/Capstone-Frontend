<template>
  <div class="step-indicator">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="step"
      :class="{ active: index === currentStep }"
      @click="onStepClick(index)"
    >
      <span class="step-number">{{ index + 1 }}</span>
      <span class="step-label">{{ step }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["step-clicked"]);

/**
 * Sends an event to the parent component when a step is clicked
 * @param {Number} index Index of clicked steps
 */
const onStepClick = (index) => {
  emit("step-clicked", index);
};
</script>

<style scoped>
.step-indicator {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px 0;
  background-color: #f8f9fa;
}

.step {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border-radius: 20px;
  background-color: #ddd;
  cursor: pointer;
}

.step.active {
  background-color: #ffc107;
  font-weight: bold;
}

.step-number {
  font-size: 14px;
  font-weight: bold;
}

.step-label {
  font-size: 14px;
}
</style>
