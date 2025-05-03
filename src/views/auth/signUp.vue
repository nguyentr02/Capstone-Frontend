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
          <h1 style="font-family: 'Font'" class="text-warning">
            Create an account
          </h1>
          <div class="mb-3 text-start input-group mt-4">
            <div class="col-6 pe-2">
              <label
                for="exampleInputEmail1"
                class="form-label"
                style="font-family: 'Font'"
                >First name</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                style="font-family: 'Font'; background-color: #fcfcfa"
                v-model="firstName"
                required
              />
              <!-- Display first name error message below input -->
              <div v-if="errors.firstName" class="text-danger small mt-1">
                {{ errors.firstName }}
              </div>
            </div>
            <div class="col-6">
              <label
                for="exampleInputEmail1"
                class="form-label"
                style="font-family: 'Font'"
                >Last name</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                style="font-family: 'Font'; background-color: #fcfcfa"
                v-model="lastName"
                required
              />
              <!-- Display last name error message below input -->
              <div v-if="errors.lastName" class="text-danger small mt-1">
                {{ errors.lastName }}
              </div>
            </div>
          </div>

          <div class="mb-3 text-start">
            <label
              for="exampleInputEmail1"
              class="form-label"
              style="font-family: 'Font'"
              >Phone number</label
            >
            <input
              type="string"
              class="form-control"
              id="exampleInputEmail1"
              style="font-family: 'Font'; background-color: #fcfcfa"
              v-model="phoneNo"
              required
            />
            <!-- Display phone number error message below input -->
            <div v-if="errors.phoneNo" class="text-danger small mt-1">
              {{ errors.phoneNo }}
            </div>
          </div>

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
              style="font-family: 'Font'; background-color: #fcfcfa"
              v-model="email"
              required
            />
            <!-- Display email error message below input -->
            <div v-if="errors.email" class="text-danger small mt-1">
              {{ errors.email }}
            </div>
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
            <!-- Display password error message below input -->
            <div v-if="errors.pwd" class="text-danger small mt-1">
              {{ errors.pwd }}
            </div>
          </div>
          <div class="mb-3 text-start">
            <label
              for="exampleInputPassword1"
              class="form-label"
              style="font-family: 'Font'"
              >Confirm password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              style="background-color: #edece8"
              v-model="confirmPwd"
              required
            />
            <!-- Display confirm password error message below input -->
            <div v-if="errors.confirmPwd" class="text-danger small mt-1">
              {{ errors.confirmPwd }}
            </div>
          </div>
          <!-- Removed the previous error list display -->
          <button type="submit" class="btn btn-primary" @click.prevent="signUp">
            Sign Up
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
      // Changed errors from an array to an object for field-specific error messages
      errors: {},
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: null,
      pwd: "",
      confirmPwd: "",
    };
  },

  mounted() {
    this.checkState();
  },

  methods: {
    // Prevent going to SignUp after login already
    checkState() {
      const userStore = useUserStore();
      if (userStore.isAuthenticated) {
        console.log("User state verified");
        router.push("/");
      }
    },

    async signUp() {
      const userStore = useUserStore();
      // Clear previous errors
      this.errors = {};

      // Validate First Name and Last Name (only allow alphabets)
      const special = /^[A-Za-z]+$/;
      this.firstName = this.firstName.trim();
      this.lastName = this.lastName.trim();

      if (!special.test(this.firstName)) {
        this.errors.firstName = "Name can only contain alphabet!";
      }
      if (!special.test(this.lastName)) {
        this.errors.lastName = "Name can only contain alphabet!";
      }

      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.errors.email = "Invalid email address!";
      }

      // Check length of Password
      if (this.pwd.length < 10) {
        this.errors.pwd = "Password need to have at least 10 letters!";
      }

      // Check whether Password contains number, uppercase and lowercase letter
      const passwordCharacter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordCharacter.test(this.pwd)) {
        this.errors.pwd =
          "Password must contain at least one uppercase letter, one lowercase letter, and one number!";
      }

      // Check if Confirmed Password matches Password
      if (this.confirmPwd != this.pwd) {
        this.errors.confirmPwd =
          "Password and Confirmed password does not match!";
      }

      // Check if phone number contains only numbers
      const pattern = /^[0-9]+$/;
      this.phoneNo = this.phoneNo.trim();
      if (!pattern.test(this.phoneNo)) {
        this.errors.phoneNo = "Phone number can only contain number!";
      }

      // If any error exists, do not proceed
      if (Object.keys(this.errors).length > 0) {
        return;
      }

      const url = "http://localhost:3000/api/auth/register";

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.pwd,
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNo: this.phoneNo,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          this.dt = responseData.data;

          if (responseData.success == false) {
            this.errors.server = responseData.message;
          } else {
            const accessToken = this.dt.accessToken;
            const role = this.dt.user.role;

            // Store accessToken into storage
            if (accessToken) {
              userStore.setAccessToken(accessToken);
              userStore.setRole(role);
              router.push("/");
            } else {
              window.alert("Login successfully but no token is store!");
            }
          }
        })
        .catch((error) => {
          this.err = error;
        });
    },
  },
  computed: {},
};
</script>

<style scoped>
h.p {
  font-family: "Font";
}
</style>
