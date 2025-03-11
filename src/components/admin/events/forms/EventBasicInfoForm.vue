<script setup>
const props = defineProps({
  eventForm: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:eventForm'])

const updateField = (field, value) => {
  emit('update:eventForm', {
    ...props.eventForm,
    [field]: value,
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Event Name -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Event Name <span class="text-red-500">*</span>
      </label>
      <input
        :value="eventForm.name"
        @input="updateField('name', $event.target.value)"
        type="text"
        placeholder="Enter event name"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
    </div>

    <!-- Event Description -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"> Description </label>
      <textarea
        :value="eventForm.description"
        @input="updateField('description', $event.target.value)"
        placeholder="Describe your event"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>

    <!-- Date and Time -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Date <span class="text-red-500">*</span>
        </label>
        <input
          :value="eventForm.date"
          @input="updateField('date', $event.target.value)"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.date }"
        />
        <p v-if="errors.date" class="mt-1 text-xs text-red-500">{{ errors.date }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"> Start Time </label>
        <input
          :value="eventForm.startTime"
          @input="updateField('startTime', $event.target.value)"
          type="time"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"> End Time </label>
        <input
          :value="eventForm.endTime"
          @input="updateField('endTime', $event.target.value)"
          type="time"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Status and Capacity -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"> Status </label>
        <select
          :value="eventForm.status"
          @change="updateField('status', $event.target.value)"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Capacity <span class="text-red-500">*</span>
        </label>
        <input
          :value="eventForm.capacity"
          @input="updateField('capacity', Number($event.target.value))"
          type="number"
          min="1"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.capacity }"
        />
        <p v-if="errors.capacity" class="mt-1 text-xs text-red-500">{{ errors.capacity }}</p>
      </div>
    </div>
  </div>
</template>
