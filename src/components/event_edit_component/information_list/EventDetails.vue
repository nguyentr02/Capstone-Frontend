<template>
  <h2 class="h2">Event Information Edit</h2>
  <main class="event-details">
    <EventField 
      v-for="(field, index) in fields" 
      :key="index" 
      :label="field.label" 
      :value="field.value" 
      @update:label="val => { field.label = val; updateLocalStorage(); }"
      @update:value="val => { field.value = val; updateLocalStorage(); }"
    />
    <AddFieldButton @add-field="handleAddField" />
  </main>
</template>

<script>
import EventField from "./EventField.vue";
import AddFieldButton from "./AddFieldButton.vue";

export default {
  name: "EventDetails",
  components: {
    EventField,
    AddFieldButton,
  },
  data() {
    return {
      fields: [
        { label: "Event Label", value: "Concert" },
        { label: "Location", value: "Sydney, Australia / Beijing, China / New York" },
        { label: "Topic", value: "The 30th 'Autumn of Rongcheng' Che ..." },
        { label: "Date", value: "Saturday, August 28th, 2024" },
      ],
    };
  },
  methods: {
    handleAddField(event) {
    console.log("Button clicked!");
    this.fields.push({ label: "New Field", value: "Enter value" });
    this.updateLocalStorage();
    },
    updateLocalStorage() {
    localStorage.setItem("fields", JSON.stringify(this.fields));
    }
  },
};
</script>

<style scoped>
.event-details {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 851px;
  gap: 50px;
  padding: 20px;
  font-family: Poppins, sans-serif;
}

.h2 {
  width: 100%;
  gap: 50px;
  padding: 20px;
  font-family: Poppins, sans-serif;
}
</style>
