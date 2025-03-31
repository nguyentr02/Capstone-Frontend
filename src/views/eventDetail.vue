<template>
  <navbar />
  <div class="container mt-3 mb-5">
    <div class="row">
      <div class="col-7">
        <img
          src="https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp"
          alt="img"
          class="img-fluid"
        />
        <h4 class="fw-semibold mt-4">Description</h4>
        <p class="mt-3">
          Come along to our weeding and planting event at the Melbourne Girls'
          College native Myrnong planting site beside the Birrarung (Yarra
          River). This is the perfect opportunity to meet fellow volunteers and
          contribute to a greener future!
        </p>
        <h5>📅 Date & Time:</h5>
        <ul>
          <li>
            <strong>When:</strong>
            15th March, 9:00am - 11:15am
          </li>
          <li>
            <strong>Where:</strong> The embankment running up from the Yarra
            Path, 300 metres south of the Hawthorn Bridge, just past the
            Melbourne Girls College Boat shed.
          </li>
        </ul>
      </div>
      <div class="col-5 text-start align-item-center">
        <h1 class="fw-bold">Event Name (March)</h1>
        <p class="text-warning fw-semibold">9:00am - 11:15am, 15 Mar 2025</p>
        <h3 class="fw-bold">Location</h3>
        <p class="text-secondary" style="margin-top: -2%">Offline</p>
        <p class="fw-semibold" style="margin-top: -1%">
          Melbourne Girls College, 55 Yarra Blvd (Gate 2), Richmond, VIC, 3121
        </p>
        <div class="mapouter">
          <div class="gmap_canvas">
            <iframe
              width="400"
              height="400"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=swinburne&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe
            ><a href="https://embedgooglemap.net/124/">spiral 2021 123movies</a
            ><br /><a href="https://www.embedgooglemap.net"></a>
          </div>
        </div>
        <div class="align-item-center mt-5">
          <router-link to="/registerEvent">
            <button class="btn btn-outline-warning fw-semibold">
              Register now
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import { ref, computed, watch, reactive } from "vue";

// export default {
//   components: {
//     navbar,
//     Footer,
//   },
// };
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
