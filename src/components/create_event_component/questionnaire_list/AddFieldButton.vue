<template>
  <button class="add-field-button">
    <div class="button-content">
      <span>Add another field</span>
      <svg
        width="28"
        height="25"
        viewBox="0 0 28 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="plus-icon"
      >
        <path
          d="M13.8873 5.14307V19.5436M5.78638 12.3434H21.9883"
          stroke="#261BC3"
          stroke-opacity="0.42"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </button>
</template>

<script>
export default {
  name: "AddFieldButton",
};
</script>

<style scoped>
.add-field-button {
  width: 240px;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #281dc0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.button-content {
  color: #261bc3;
  font-size: 16px;
  font-weight: 500;
  font-family: Poppins;
  display: flex;
  align-items: center;
  gap: 12px;
}

.plus-icon {
  width: 28px;
  height: 25px;
}
</style>
