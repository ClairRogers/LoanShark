<template>
  <div class="Profile container-fluid">
    <div class="row mt-4">
      <div class="col-12 col-md-6 offset-md-3 white">
        <div class="row py-3">
          <div class="col-6">
            <img :src="activeProfile.image" alt="User image" class="round ml-3 img-fluid">
          </div>
          <div class="col-6 pr-4">
            <!-- <h5 class="text-right faded"><i title="edit" class="far fa-edit"></i></h5> -->
            <h2 class="mt-4">{{activeProfile.name}} <i v-if="activeProfile.paypal" title="PayPal verified"
                class="fab fa-paypal fa-xs ml-1 faded"></i></h2>
            <h5>User Rating:</h5>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0"
                aria-valuemax="100">{{activeProfile.score}}%</div>
            </div>
          </div>
        </div>
        <div class="row mx-0 pb-3">
          <div class="col-12">
            <p class="mt-3 mx-3 text-justify">{{activeProfile.bio}}</p>
            <button v-if="!determineFriendship(activeProfile)" class="btn btn-sm btn-info"
              @click="addFriend(activeProfile, user)">Add
              Contact</button>
            <button class="btn btn-sm btn-danger" @click="removeFriend(activeProfile._id)" v-else>Remove
              Contact</button>
            <hr>
            <button class="btn btn-info mt-2" data-toggle="modal" data-target="#agreementModal">Make a deal</button>
            <Agreement :profileId="activeProfile._id" :user="user"></Agreement>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Agreement from '@/components/Agreement-comp.vue'
  export default {
    name: "Profile",
    props: ["profileId"],
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
      addFriend(profile, user) {
        user.friends.push(profile._id)
        this.$store.dispatch('addFriend', user)
        this.determineFriendship(profile)
      },
      determineFriendship(result, newFriend) {
        if (this.user.friends) {
          return this.user.friends.find(f => f._id == result._id || f == result._id) //this temp fix will work if friends are just id's but you do want to eventually populate the friends again
        } else {
          return
        }
      },
      removeFriend(friend) {
        this.$store.dispatch('removeFriend', { userId: this.user._id, friendId: friend })
      }
    },
    components: {
      Agreement
    }
  }
</script>

<style>
  .white {
    background-color: #fff;
  }
</style>