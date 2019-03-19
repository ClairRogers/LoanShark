<template>
  <div class="home container-fluid">
    <div></div>
    <p>this is the home page</p>
    <button @click="logout">log out</button>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'home',
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    components: {

    },
    methods: {
      logout() {
        this.$store.dispatch('logOut')
      }
    }
  }
</script>