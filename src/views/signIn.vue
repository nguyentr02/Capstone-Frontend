<template>
  <navbar />
  <div class="h-90" style="background-color: #edece8">
    <div class="container text-center w-100" style="width: 100%">
      <div class="row align-items-center" style="height: 100vh">
        <div class="col-3"></div>
        <form
          action=""
          style="width: 50%; border-radius: 20px"
          class="bg-white col-6 pb-3"
        >
          <img src="../assets/logo.png" alt="logo" height="80" width="80" />
          <h1 style="font-family: 'Font'" class="text-warning">Log In</h1>
          <div class="mb-3 text-start">
            <label
              for="exampleInputEmail1"
              class="form-label"
              style="font-family: 'Font'"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
              style="font-family: 'Font'; background-color: #fcfcfa"
              required
            />
          </div>
          <div class="mb-3 text-start">
            <label
              for="exampleInputPassword1"
              class="form-label"
              style="font-family: 'Font'"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              style="background-color: #edece8"
              v-model="pwd"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="signIn(email, pwd)"
          >
            Submit
          </button>
        </form>
        <div class="col-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import router from "@/router";
import { useUserStore } from "@/store/user";

export default {
  components: {
    navbar,
    Footer,
  },

  data() {
    return {
      email: "",
      pwd: "",
      data: "",
      response: null,
    };
  },

  methods: {
    async signIn(email, pwd) {
      // Integration with BE
      const data = {
        email: email,
        password: pwd,
      };

      const url = "http://localhost:3000/api/auth/login";
      // Send data to dtb

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pwd,
        }),
      })
        .then((response) => {
          // console.log("POST request successful:", response.json());

          return response.json();
        })
        .then((responseData) => {
          this.dt = responseData.data;
          // console.log(this.dt.accessToken)
          const accessToken = this.dt.accessToken;
          console.log(accessToken);

          // if (accessToken) {
          //   useUserStore.setAccessToken(accessToken);
          //   console.log("Access token stored in Pinia:", accessToken);
          //   router.push("/"); // Redirect to a protected route
          // } else {
          //   loginError.value =
          //     "Login successful, but no access token received.";
          // }
        })
        .catch((error) => {
          this.err = error;
        });

      // Store Toke retrieve from API

      // console.log(accessToken);
      // router.push("/");
    },
  },
};
</script>

<style scoped></style>
