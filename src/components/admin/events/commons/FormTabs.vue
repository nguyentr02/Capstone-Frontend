<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
  icons: {
    type: Object,
    default: () => ({}),
  },
})

defineEmits(['update:activeTab'])
</script>

<template>
  <div class="bg-white rounded shadow-sm mb-4">
    <div class="d-flex border-bottom overflow-auto">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="$emit('update:activeTab', tab.value)"
        class="px-3 py-2 fs-6 text-nowrap"
        :class="activeTab === tab.value ? 'border-bottom border-2 border-primary text-primary' : 'text-secondary'"
      >
        <i v-if="icons[tab.value]" :class="`pi ${icons[tab.value]} me-1`"></i>
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

