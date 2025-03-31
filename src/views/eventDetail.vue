<template>
  <navbar />
  <div class="container mt-3 mb-5">
    <div class="row">
      <div class="col-7">
        <img :src="eventDetail.banner" alt="img" class="img-fluid" />
        <h4 class="fw-semibold mt-4">Description</h4>
        <p class="mt-3">
          {{ eventDetail.description }}
        </p>
        <h5>📅 Date & Time:</h5>
        <ul>
          <li>
            <strong>When:</strong>
            {{ eventDetail.when }}
          </li>
          <li>
            <strong>Where:</strong> {{ eventDetail.where }}
          </li>
        </ul>
      </div>
      <div class="col-5 text-start align-item-center">
        <h1 class="fw-bold">{{ eventDetail.name }}</h1>
        <p class="text-warning fw-semibold">{{ eventDetail.timeAndDate }}</p>
        <h3 class="fw-bold">Location</h3>
        <p class="text-secondary" style="margin-top: -2%">{{ eventDetail.mode }}</p>
        <p class="fw-semibold" style="margin-top: -1%">{{ eventDetail.address }}</p>
        <div class="mapouter">
          <div class="gmap_canvas">
            <iframe
              width="400"
              height="400"
              :src="eventDetail.mapSrc"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </div>
        </div>
        <div class="align-item-center mt-5">
          <!-- Change registration link to /select-category -->
          <router-link to="/select-category">
            <button class="btn btn-outline-warning fw-semibold">
              Register now
            </button>
          </router-link>
        </div>
        <div class="align-item-center mt-3">
          <!-- Back to events list -->
          <router-link to="/events">
            <button class="btn btn-secondary">
              Back to events
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import navbar from "@/components/navbar.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Footer from "@/components/footer.vue";

const route = useRoute();
const eventId = route.params.id;

// Simulated event data; in production, fetch via an API
const events = [
  {
    id: "5",
    name: "Event Name (March)",
    banner:
      "https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp",
    description:
      "Come along to our wedding and planting event at the Melbourne Girls' College native Myrnong planting site beside the Birrarung (Yarra River). This is the perfect opportunity to meet fellow volunteers and contribute to a greener future!",
    when: "15th March, 9:00am - 11:15am",
    where:
      "The embankment running up from the Yarra Path, 300 metres south of the Hawthorn Bridge, just past the Melbourne Girls College Boat shed.",
    timeAndDate: "9:00am - 11:15am, 15 Mar 2025",
    mode: "Offline",
    address:
      "Melbourne Girls College, 55 Yarra Blvd (Gate 2), Richmond, VIC, 3121",
    mapSrc:
      "https://maps.google.com/maps?q=swinburne&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
  // Additional event data can be added here
];

const eventDetail = ref({});

onMounted(() => {
  // Select the event based on the route id; default to first event if not found
  const found = events.find((e) => e.id === eventId) || events[0];
  eventDetail.value = found;
});
</script>

<style scoped>
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 400px;
  width: 400px;
}
p {
  font-family: "Font";
}
h4 {
  font-family: "Font";
}
li {
  font-family: "Font";
}
h1 {
  font-family: "Font";
}
</style>
