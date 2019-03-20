<template>
  <div class="Profile container-fluid">
    <div class="row mt-4">
      <div class="col-6 col-md-3 offset-md-3">
        <img src="https://www.r-users.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" alt="User image"
          class="round ml-3 img-fluid">
      </div>
      <div class="col-6 col-md-3 pr-4">
        <!-- <h5 class="text-right faded"><i title="edit" class="far fa-edit"></i></h5> -->
        <h2 class="mt-4">{{activeProfile.name}} <i title="PayPal verified" class="fab fa-paypal fa-xs ml-1 faded"></i></h2>
        <h4>User Rating:</h4>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0"
            aria-valuemax="100">{{activeProfile.score}}%</div>
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12 col-md-6 offset-md-3">
        <p class="mt-3 mx-3 text-justify">{{activeProfile.description}}</p>
        <button class="btn btn-sm btn-info" @click="addFriend(activeProfile, user)">Add Contact</button>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    props: [],
    data() {
      return {}
    },
    computed: {
      activeProfile() {
        return this.$store.state.activeProfile
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      addFriend(result, user) {
        let newFriend = {
          name: result.name,
          userId: result._id,
          image: result.image
        }
        user.friends.push(newFriend)
        this.$store.dispatch('addFriend', user)
      },
    },
    components: {}
  }
</script>