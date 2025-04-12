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
          <img src="../../assets/logo.png" alt="logo" height="80" width="80" />
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

  mounted() {
    this.checkState();
  },

  methods: {
    // Prevent going to SignIn after login already
    checkState() {
      const userStore = useUserStore();
      if (userStore.isAuthenticated) {
        console.log("User state verified");
        router.push("/");
      }
    },

    async signIn(email, pwd) {
      // Integration with BE

      const userStore = useUserStore();
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
          return response.json();
        })
        .then((responseData) => {
          this.dt = responseData.data;
          const accessToken = this.dt.accessToken;

          // Store Toke retrieve from API
          if (accessToken) {
            userStore.setAccessToken(accessToken);
            router.push("/");
          } else {
            window.alert("Login successfully but no token is store!");
          }
        })
        .catch((error) => {
          this.err = error;
        });
    },
  },
};
</script>

<style scoped></style>
