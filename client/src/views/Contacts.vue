<template>
  <div class="contacts ">
    <div class="my-2" v-for="friend in friends">
      <span class="d-flex justify-content-center"><span @click="setActiveProfile(friend)" class="pointer"><img
            :src="friend.image" class="sm-img mr-3"> <b>{{friend.name}}</b>
          <span class="ml-3">{{friend.email}}
          </span>
        </span>
        <button class="btn btn-danger btn-sm" @click="removeFriend(friend._id)">Remove Contact</button>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "contacts",
    props: [],
    data() {
      return {}
    },
    computed: {
      friends() {
        return this.$store.state.user.friends
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      removeFriend(friend) {
        this.$store.dispatch('removeFriend', { userId: this.user._id, friendId: friend })
      },
      setActiveProfile(friend) {
        this.$store.dispatch('setActiveProfile', friend)
      }
    },
    components: {}
  }
</script>