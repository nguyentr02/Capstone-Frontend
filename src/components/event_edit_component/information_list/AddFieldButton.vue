<template>
  <button class="add-field-button" @click="$emit('add-field', $event)">
    <span class="button-text">Add another field</span>
    <svg
      width="28"
      height="25"
      viewBox="0 0 28 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="plus-icon"
      aria-hidden="true"
    >
      <path
        d="M14.0506 5.20831V19.7916M6.03687 12.5H22.0644"
        stroke="#261BC3"
        stroke-opacity="0.42"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: "AddFieldButton",
};
</script>


<style scoped>
.add-field-button {
  width: 231px;
  height: 34px;
  position: relative;
  border-radius: 5px;
  border: 1px solid #281dc0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.button-text {
  color: #261bc3;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  font-family: Poppins, sans-serif;
}

.plus-icon {
  position: absolute;
  right: 13px;
  top: 4px;
  width: 27px;
  height: 25px;
}
</style>
