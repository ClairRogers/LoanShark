<template>
  <div class="search">
    <div class="row">
      <div v-for="result in results" v-if="result._id != user._id" class="col-12 d-flex justify-content-between mt-3">
        <span><img src="//placehold.it/30x30" class="sm-img mr-3"> <span class="pointer" data-dismiss="modal" @click="setActiveProfile(result)"><b>{{result.name}}</b>
            <span class="ml-3">{{result.email}}</span></span></span>
        <button v-if="!determineFriendship(result)" class="btn btn-sm btn-info" @click="addFriend(result._id, user)">Add
          Contact</button>
        <button v-else class="btn btn-sm btn-info" data-toggle="modal" data-target="#agreementModal">Start Agreement</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Agreement from '@/components/Agreement-comp.vue'
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

        user.friends.push(result)
        this.$store.dispatch('addFriend', user)
      },
      setActiveProfile(result) {
        this.$store.dispatch('setActiveProfile', result)
      },
      determineFriendship(result) {
        // console.log(this.user.friends)

        return this.user.friends.find(f => f._id == result._id)
      }
    },
    components: {
      Agreement
    }
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