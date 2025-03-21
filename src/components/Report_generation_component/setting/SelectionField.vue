<template>
  <section class="selection-field">
    <label class="selection-label">{{ label }}</label>
    <div class="selection-container">
      <span class="selection-value">{{ value }}</span>
      <button class="selection-button" type="button" @click="$emit('click')">
        <PlusIcon />
      </button>
    </div>
  </section>
</template>

<script>
import PlusIcon from "./PlusIcon.vue";

export default {
  name: "SelectionField",
  components: {
    PlusIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.selection-field {
  display: flex;
  flex-direction: column;
  gap: 21.8px;
}

.selection-label {
  width: 215px;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #281dc0;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: #261bc3;
  font-weight: 400;
  background-color: #fff;
}

.selection-container {
  display: flex;
  align-items: center;
  height: 57px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  background-color: #f3f3f3;
}

.selection-value {
  flex: 1;
  padding: 0 27px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #302d27;
}

.selection-button {
  width: 49px;
  height: 52px;
  border-radius: 0 12px 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c2c2c2;
  border: none;
  cursor: pointer;
}

@media (max-width: 991px) {
  .selection-container {
    height: 50px;
  }
}

@media (max-width: 640px) {
  .selection-label {
    width: 100%;
  }

  .selection-value {
    padding: 0 15px;
    font-size: 14px;
  }

  .selection-button {
    width: 40px;
    height: 45px;
  }
}
</style>
