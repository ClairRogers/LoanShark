<template>
  <div class="home container-fluid">
    <div class="row mt-4">
      <div class="col-6 col-md-3 offset-md-3">
        <img src="https://www.r-users.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" alt="User image"
          class="round ml-3 img-fluid">
      </div>
      <div class="col-6 col-md-3 pr-4">
        <h5 class="text-right faded"><i title="edit" class="far fa-edit"></i></h5>
        <h2 class="mt-4">{{user.name}} <i title="PayPal verified" class="fab fa-paypal fa-xs ml-1 faded"></i></h2>
        <h4>User Rating:</h4>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0"
            aria-valuemax="100">{{user.score}}%</div>
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12 col-md-6 offset-md-3">
        <p class="mt-3 mx-3 text-justify">{{user.description}}</p>
        <hr>
        <h4 class="text-left ml-3">My Lends:</h4>
        <lends></lends>
        <h4 class="text-left ml-3">My Borrows:</h4>
        <borrows></borrows>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Lends from '@/components/Lends.vue'
  import Borrows from '@/components/Borrows.vue'

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
    data() {
      return {
        // barWidth: this.user.score + '%'
      }
    },
    components: {
      Lends,
      Borrows
    },
    methods: {
      logout() {
        this.$store.dispatch('logOut')
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
  }
</script>

<style>
  .round {
    height: auto;
    width: 180px;
    border-radius: 50%;
    border: solid 1px #c5c5c5;
  }

  .faded {
    opacity: .4;
  }

  .progress-bar {
    background-color: #13abc4;
  }
</style>