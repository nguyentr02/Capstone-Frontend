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
            </div>
            <p v-if="errors.length" v-for="error in errors" class="text-danger">
              {{ error }}
            </p>
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
  
  export default {
    components: {
      navbar,
      Footer,
    },
  
    data() {
      return {
        errors: [],
        firstName : "",
        lastName: "",
        phoneNo: "",
        email: null,
        pwd: "",
        confirmPwd: "",
      };
    },
  
    methods: {
      signUp() {
        this.errors = [];
        console.log(this.errors);
  
        // check if First Name and Last name contain special character
        const special =  /^[a-z,A-Z]+$/;
  
        this.firstName = this.firstName.trim();
        this.lastName = this.lastName.trim();
  
        var check = special.test(this.firstName);
        if (!check) {
          this.errors.push("Name can only contain alphabet!");
        } else {
          check = special.test(this.lastName);
          if (!check) {
            this.errors.push("Name can only contain alphabet!");
          }
        }
  
        // Check length of Password
        if (this.pwd.length < 10) {
          this.errors.push("Password need to have at least 10 letters!");
        }
  
        // Check if confirmed Password is different from Password
        if (this.confirmPwd != this.pwd) {
          this.errors.push("Password and Confirmed password does not match!");
        }
  
        // Check if phoneNo contains only number
        const pattern = /^[0-9]+$/;
        this.phoneNo = this.phoneNo.trim();
        const isValid = pattern.test(this.phoneNo);
        console.log(isValid);
        console.log(this.phoneNo);
        if (!isValid) {
          this.errors.push("Phone number can only contain number!");
        }
  
        // Once there is no ERROR
        if (this.errors.length == 0) {
          // console.log("GOOD");
          router.push("/signIn");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  h.p {
    font-family: "Font";
  }
  </style>