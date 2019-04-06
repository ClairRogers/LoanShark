<template>
  <div class="login container-fluid login-forms">
    <div class="row">
      <div class="col-12">
      </div>
    </div>

    <div class="row">
      <div class="form-container col-12 d-flex align-items-end justify-content-center">
        <div>
          <h4 class="mb-4">Welcome to LoanShark!</h4>
          <form v-if="loginForm" @submit.prevent="loginUser">
            <input type="email" v-model="creds.email" placeholder="email" class="mx-2 login-form">
            <input type="password" v-model="creds.password" placeholder="password" class="mx-2 login-form">
            <br>
            <button type="submit" class="btn btn-outline-success mt-3 text-center">Login</button>
          </form>
          <form v-else @submit.prevent="register" class="mt-2 text-center">
            <input type="text" v-model="newUser.name" placeholder="name" class="login-form mx-2">
            <input type="email" v-model="newUser.email" placeholder="email" class="login-form mx-2">
            <input type="password" v-model="newUser.password" placeholder="password" class="login-form mx-2">
            <br>
            <button type="submit" class="btn btn-outline-success mt-3 text-center">Create Account</button>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 form-container col-12 d-flex align-items-start justify-content-center"">
        <div class=" action mt-3" @click="loginForm = !loginForm">
        <p v-if="loginForm">No account? Click here to Register</p>
        <p v-else>Already have an account? Click here to Login</p>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import router from "@/router.js";
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      logout() {
        this.$store.dispatch('logOut')
      }
    }
  };
</script>

<style scoped>
  .action {
    cursor: pointer;
  }

  input {
    height: 50px;
    min-width: 300px;
    max-width: 400px;
    text-align: center;
    border: 1px solid rgba(224, 224, 224, 0.473);
  }

  .form-container {
    height: 40vh
  }

  .note-container {
    height: 40vh
  }
</style>