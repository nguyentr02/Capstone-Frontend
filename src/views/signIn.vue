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
          <h1 style="font-family: 'LogoFont'" class="text-warning">Teket</h1>
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
            />
            <div id="emailHelp" class="form-text ">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3 text-start">
            <label for="exampleInputPassword1" class="form-label" style="font-family: 'Font';"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              style="background-color: #edece8"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div class="col-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";

export default {
  components: {
    navbar,
    Footer,
  },
};
</script>

<style scoped>
</style>
