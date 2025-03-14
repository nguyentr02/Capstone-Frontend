<template>
  <div class="event-page">

    <button class="back-button" @click="router.go(-1)">←</button>

    <div class="event-left">
      <img class="event-image" :src="eventData?.image" alt="Event Image" />

      <div class="description">
        <h3>Description</h3>
        <p>{{ eventData?.description }}</p>
      </div>
    </div>

    <div class="event-right">
      <h1>{{ eventData?.name }}</h1>
      <button class="register-button" @click="goToTicketSelection">Register Now</button>

      <div class="event-info">
        <p><strong>When</strong><br>{{ eventData?.date }}</p>
        <p><strong>Location</strong><br>{{ eventData?.location }}</p>
        <p><strong>Visit organizer's website:</strong> <a :href="eventData?.website" target="_blank">{{ eventData?.website }}</a></p>
      </div>

      <!-- Using the part of the map that comes with VSCode -->
      <div class="event-map">
        <iframe
          :src="eventData?.mapUrl"
          width="100%"
          height="200"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div class="share-link">
        <p><strong>Share:</strong></p>
        <input type="text" readonly :value="eventData?.shareLink" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const events = ref([
  {
    id: 1,
    name: 'Melbourne Cricket Ground Event',
    description:
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc sociosqu a hac semper nullam lectus laoreet. Vestibulum aenean condimentum ornare a ex ridiculus lacinia tellus per.',
    date: 'October 13, 2024, Sunday',
    location: 'Melbourne Cricket Ground (MCG), Hawthorn',
    website: 'https://example.com',
    mapUrl: 'https://maps.google.com/maps?q=Melbourne%20Cricket%20Ground&t=&z=13&ie=UTF8&iwloc=&output=embed',
    image: new URL('../assets/images/Melbourne-Cricket-Ground.png', import.meta.url).href,
    shareLink: 'https://link.to.event1.com',
  },
  {
    id: 2,
    name: 'Event 2',
    description: 'Detailed description for Event 2.',
    date: 'October 14, 2024, Monday',
    location: 'Sydney Opera House, Sydney',
    mapUrl: 'https://maps.google.com/maps?q=Sydney%20Opera%20House&t=&z=13&ie=UTF8&iwloc=&output=embed',
    image: new URL('../assets/images/Melbourne-Cricket-Ground.png', import.meta.url).href,
    shareLink: 'https://link.to.event2.com',
  },
])

const eventData = ref(null)

const loadEventDetails = (id) => {
  eventData.value = events.value.find(event => event.id === parseInt(id, 10))
}

const goToTicketSelection = () => {
  router.push('/ticket-selection')
}

onMounted(() => {
  const eventId = route.params.id
  loadEventDetails(eventId)
})
</script>

<style scoped>
.event-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
  position: relative;
}

.back-button {
  position: absolute;
  left: 30px;
  top: 30px;
  background-color: #f5f5f5;
  border: none;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.event-left {
  width: 60%;
}

.event-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.description {
  margin-top: 20px;
}

.event-right {
  width: 35%;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.register-button {
  background-color: #00d200;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.register-button:hover {
  background-color: #00a300;
}

.event-info p {
  margin: 10px 0;
}

.event-map {
  margin-top: 20px;
}

.share-link {
  margin-top: 20px;
  width: 100%;
}

.share-link input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
</style>
