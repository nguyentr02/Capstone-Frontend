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
  <div class="bg-white rounded-lg shadow-sm mb-6">
    <div class="flex border-b overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="$emit('update:activeTab', tab.value)"
        class="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
        :class="
          activeTab === tab.value
            ? 'border-b-2 border-blue-500 text-blue-600'
            : 'text-gray-600 hover:text-gray-800'
        "
      >
        <i v-if="icons[tab.value]" :class="`pi ${icons[tab.value]} mr-1`"></i>
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>
