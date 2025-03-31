<template>
  <navbar />
  <div class="card text-bg-light">
    <img
      src="../assets/img1Home.jpg"
      alt="img"
      class="card-img"
      style="object-fit: fill; height: 40vh"
    />
    <div class="card-img-overlay ms-5">
      <h2
        class="card-title text-light fs-1 fw-bold ms-5"
        style="font-family: 'Font'"
      >
        Hello folks!<br />
        Welcome to Teket!
      </h2>
      
      <p class="card-text text-light fs-4 ms-5" style="font-family: 'Font'">
        Tickets are available here<br />
        for anyone with supper low price!
      </p>
      <br />
      <router-link to="/events">
        <button
          type="button"
          class="btn btn-warning ms-5 fs-4 mb-2"
          style="font-family: 'Font'"
        >
          Let's start
        </button>
      </router-link>
    </div>
  </div>
  <div>
    <h4 style="font-family: 'Font'" class="fw-bold pt-5 ms-5">
      Explore Our Latest Event
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

    <h5
      style="font-family: 'Font'"
      class="fw-bold mt-5 ps-5 text-body-tertiary"
    >
      No upcoming events
    </h5>
    <div class="container text-center">
      <router-link to="/events">
        <button
          type="button"
          class="btn fw-semibold btn-lg align-self-center"
          style="font-family: 'Font'; background-color: #edece8"
        >
          See all events
        </button>
      </router-link>
    </div>
  </div>
  <section
    class="d-flex align-items-center mt-4"
    style="background-color: #ffe071"
  >
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 text-center text-lg-start">
          <h1 class="fw-semibold">
            Teket is for <strong>anyone</strong> who wants to make a difference!
          </h1>
          <p>
            No matter your age or experience, we’re here to find your perfect
            events.
          </p>
          <a href="#" class="btn btn-light btn-lg" style="font-family: 'Font';">Start your journey now</a>
        </div>
        <div class="col-lg-6">
          <img
            src="../assets/img2Home.jpg"
            alt="Volunteers in action"
            class="img-fluid hero-image pt-4 pb-4"
          />
        </div>
      </div>
    </div>
  </section>
  <section class="d-flex align-items-center" style="background-color: #ffe071">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 text-center text-lg-start">
          <img
            src="../assets/img1Home.jpg"
            alt="Volunteers in action"
            class="img-fluid hero-image pt-4 pb-4 rounded"
          />
        </div>
        <div class="col-lg-6">
          <h1 class="fw-semibold">Join and start enjoying our offers</h1>
          <p>Let Teket take care of your boring days.</p>
          <a href="#" class="btn btn-light btn-lg" style="font-family: 'Font';">Create an account</a>
        </div>
      </div>
    </div>
  </section>

  <div class="align-item-center pt-4 text-center">
    <h1>For organisations</h1>
    <h5 class="text-muted">
      Teket is an event retail platform. Get in touch to find out more.
    </h5>
    <div
      style="display: flex"
      class="mt-4 justify-content-center align-items-center"
    >
      <img alt="ava" src="../assets/avatar.jpg" />
      <div class="text-start">
        <h3 class="fw-bold text-warning">Mason Mount</h3>
        <h5 class="text-muted mb-4">Co-founder</h5>
        <div style="display: flex" class="mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-mail h-5 w-5"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <p class="ms-2">abcd@gmail.com</p>
        </div>
        <div style="display: flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-phone h-5 w-5"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            ></path>
          </svg>
          <p class="ms-2">0433990388</p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";

export default {
  components: {
    navbar,
    Footer
  },
};
</script>

<style scoped>
h.p {
  font-family: "Font";
}
</style>
