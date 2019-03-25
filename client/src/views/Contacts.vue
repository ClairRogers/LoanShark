<template>
  <div class="contacts ">
    <div class="my-2" v-for="friend in friends">{{friend.name}}
      <button class="btn btn-info btn-sm" @click="removeFriend(friend._id)">Remove Contact</button>
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
      }
    },
    components: {}
  }
</script>