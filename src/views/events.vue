<template>
  <navbar />
  <div style="background-color: #edece8">
    <div>
      <h4 style="font-family: 'Font'" class="fw-bold pt-5 ms-5">
        Looking for your upcoming perfect event
      </h4>

      <div class="input-group row ps-5 mt-4">
        <div class="col-4" style="padding-left: 2%">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div class="col-4"></div>
      </div>
    </div>

    <div class="container-md">
      <h4 style="font-family: 'Font'" class="fw-bold pt-5 ms-5">Past event</h4>

      <!-- <div class="event-cards">
        <div
          class="event-card"
          v-for="event in myEvents"
          :key="event.id"
          @click="goToEventDetails(event.id)"
        >
          <h3>{{ event.name }}</h3>
          <p>{{ event.description }}</p>
        </div>
      </div> -->

      <div class="row justify-content-center">
        <div
          class="card col-4 m-3"
          style="width: 18rem"
          v-for="event in myEvents"
        >
          <a href="/eventDetail"
            ><img
              src="https://stevent-wattle.s3.ap-southeast-4.amazonaws.com/event/01JNYJ0YW43Z2JGRBK3FF66RTG/banner/01JNYJ0YW5E0M5GE2TZZ5M7WW6.webp"
              class="card-img-top"
              alt="img"
          /></a>
          <div class="card-body">
            <a
              href="/eventDetail"
              class="link-warning link-offset-2 link-underline link-underline-opacity-0"
              ><h5 class="card-title">{{ event.name }}</h5></a
            >
            <p class="card-text">
              {{ event.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import { ref, computed, watch, reactive } from "vue";

var numberOfEvents = 12;

const myEvents = ref([
  {
    id: 5,
    name: "Event 1",
    description: "Description of Event 1",
    activity: "Sport",
    price: 120,
  },
  {
    id: 6,
    name: "Event 2",
    description: "Description of Event 2",
    activity: "Music",
    price: 90,
  },
  {
    id: 7,
    name: "Event 3",
    description: "Description of Event 3",
    activity: "Art",
    price: 130,
  },
  {
    id: 8,
    name: "Event 4",
    description: "Description of Event 4",
    activity: "Food",
    price: 60,
  },
  {
    id: 9,
    name: "Event 5",
    description: "Description of Event 5",
    activity: "Sport",
    price: 150,
  },
  {
    id: 10,
    name: "Event 6",
    description: "Description of Event 6",
    activity: "Music",
    price: 200,
  },
  {
    id: 11,
    name: "Event 7",
    description: "Description of Event 7",
    activity: "Art",
    price: 80,
  },
  {
    id: 12,
    name: "Event 8",
    description: "Description of Event 8",
    activity: "Food",
    price: 100,
  },
  {
    id: 13,
    name: "Event 9",
    description: "Description of Event 9",
    activity: "Sport",
    price: 120,
  },
  {
    id: 14,
    name: "Event 10",
    description: "Description of Event 10",
    activity: "Music",
    price: 180,
  },
  {
    id: 15,
    name: "Event 11",
    description: "Description of Event 11",
    activity: "Art",
    price: 250,
  },
  {
    id: 16,
    name: "Event 12",
    description: "Description of Event 12",
    activity: "Food",
    price: 30,
  },
]);

// export default {
//   components: {
//     navbar,
//     Footer,
//   },
// };
</script>

<style scoped>
h.p {
  font-family: "Font";
}
</style>
