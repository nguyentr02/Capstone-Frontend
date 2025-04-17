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
  <div>
    <!-- Event Name -->
    <div class="mb-3">
      <label class="form-label">
        Event Name <span class="text-danger">*</span>
      </label>
      <input
        :value="eventForm.name"
        @input="updateField('name', $event.target.value)"
        type="text"
        placeholder="Enter event name"
        class="form-control"
        :class="{ 'is-invalid': errors.name }"
      />
      <p v-if="errors.name" class="text-danger small">{{ errors.name }}</p>
    </div>

    <!-- Event Description -->
    <div class="mb-3">
      <label class="form-label">Description</label>
      <textarea
        :value="eventForm.description"
        @input="updateField('description', $event.target.value)"
        placeholder="Describe your event"
        rows="4"
        class="form-control"
      ></textarea>
    </div>

    <!-- Date and Time -->
    <div class="row g-3 mb-3">
      <div class="col-12 col-md-4">
        <label class="form-label">
          Date <span class="text-danger">*</span>
        </label>
        <input
          :value="eventForm.date"
          @input="updateField('date', $event.target.value)"
          type="date"
          class="form-control"
          :class="{ 'is-invalid': errors.date }"
        />
        <p v-if="errors.date" class="text-danger small">{{ errors.date }}</p>
      </div>

      <div class="col-12 col-md-4">
        <label class="form-label">Start Time</label>
        <input
          :value="eventForm.startTime"
          @input="updateField('startTime', $event.target.value)"
          type="time"
          class="form-control"
        />
      </div>

      <div class="col-12 col-md-4">
        <label class="form-label">End Time</label>
        <input
          :value="eventForm.endTime"
          @input="updateField('endTime', $event.target.value)"
          type="time"
          class="form-control"
        />
      </div>
    </div>

    <!-- Status and Capacity -->
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <label class="form-label">Status</label>
        <select
          :value="eventForm.status"
          @change="updateField('status', $event.target.value)"
          class="form-select"
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div class="col-12 col-md-6">
        <label class="form-label">
          Capacity <span class="text-danger">*</span>
        </label>
        <input
          :value="eventForm.capacity"
          @input="updateField('capacity', Number($event.target.value))"
          type="number"
          min="1"
          class="form-control"
          :class="{ 'is-invalid': errors.capacity }"
        />
        <p v-if="errors.capacity" class="text-danger small">{{ errors.capacity }}</p>
      </div>
    </div>
  </div>
</template>

