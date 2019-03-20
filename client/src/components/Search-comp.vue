<template>
  <div class="search">
    <div class="row">
      <div v-for="result in results" v-if="result._id != user._id" class="col-12 d-flex justify-content-between mt-3">
        <span><img src="//placehold.it/30x30" class="sm-img mr-3"> <span class="pointer" data-dismiss="modal" @click="setActiveProfile(result)"><b>{{result.name}}</b>
            <span class="ml-3">{{result.email}}</span></span></span>
        <button v-if="!determineFriendship(result)" class="btn btn-sm btn-info" @click="addFriend(result, user)">Add
          Contact</button>
        <button v-else class="btn btn-sm btn-info">Start Agreement</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "search",
    props: [],
    data() {
      return {

      }
    },
    computed: {
      results() {
        return this.$store.state.searchResults
      },
      user() {
        return this.$store.state.user
      },
      // friends() {
      //   let friendsList = this.$store.state.user.friends.filter()
      // }
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
      setActiveProfile(result) {
        this.$store.dispatch('setActiveProfile', result)
      },
      determineFriendship(result) {
        return this.user.friends.find(f => f.userId == result._id)
      }
    },
    components: {}
  }
</script>

<style>
  .sm-img {
    border-radius: 50%;
  }

  .pointer {
    cursor: pointer;
  }
</style>