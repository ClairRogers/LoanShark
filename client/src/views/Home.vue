<template>
  <div class="home container-fluid">
    <div class="row mt-4">
      <div class="col-6 col-md-3 offset-md-3">
        <img :src="user.image" alt="User image" class="round ml-3 img-fluid">
      </div>
      <div class="col-6 col-md-3 pr-4">
        <h5 class="text-right faded"><i data-toggle="modal" data-target="#editModal" title="edit" class="far fa-edit"></i></h5>
        <h2 class="mt-4">{{user.name}} <span v-if="user.paypal"><i title="PayPal verified" class="fab fa-paypal fa-xs ml-1 faded"></i></span></h2>
        <h4>User Rating:</h4>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0"
            aria-valuemax="100">{{user.score}}%</div>
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12 col-md-6 offset-md-3">
        <p class="mt-3 mx-3 text-justify">{{user.bio}}</p>
        <hr>
        <h4 class="text-left ml-3">My Lends:</h4>
        <lends></lends>
        <h4 class="text-left ml-3">My Borrows:</h4>
        <borrows></borrows>
      </div>
    </div>
    <editmodal></editmodal>
    <form @submit.prevent="die">
      <input type="text" v-model="userId">
      <button type="submit">delete everyone jamie</button>
    </form>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Lends from '@/components/Lends.vue'
  import Borrows from '@/components/Borrows.vue'
  import Editmodal from '@/components/Edit-modal.vue'


  export default {
    name: 'home',
    created() {

      this.$store.state.user

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
        userId: ''
      }
    },
    components: {
      Lends,
      Borrows,
      Editmodal
    },
    methods: {
      logout() {
        this.$store.dispatch('logOut')
      },
      die() {
        this.$store.dispatch('deleteUser', this.userId)
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
    height: 180px;
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