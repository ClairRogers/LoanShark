<template>
  <div class="search">
    <div class="row">
      <div v-for="result in results" v-if="result._id != user._id" class="col-12 mt-3">
        <span class="d-flex justify-content-between" data-dismiss="modal"><span @click="setActiveProfile(result)"
            class="pointer"><img :src="result.image" class="sm-img mr-3"> <b>{{result.name}}</b>
            <span class="ml-3">{{result.email}}
            </span>
          </span>
          <button v-if="!determineFriendship(result)" class="btn btn-sm btn-info" @click="addFriend(result, user)">Add
            Contact</button>
          <i class="far fa-check-square" v-else></i>
        </span>
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
        let user = this.$store.state.user
        this.results
        return user
      },
      // friends() {
      //   let friendsList = this.$store.state.user.friends.filter()
      // }
    },
    methods: {
      addFriend(result, user) {
        user.friends.push(result._id)
        this.$store.dispatch('addFriend', user)
        this.determineFriendship(result)
      },
      setActiveProfile(result) {
        this.$store.dispatch('setActiveProfile', result)
      },
      determineFriendship(result, newFriend) {
        return this.user.friends.find(f => f._id == result._id || f == result._id) //this temp fix will work if friends are just id's but you do want to eventually populate the friends again
      }
    },
    components: {

    }
  }
</script>

<style>
  .sm-img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }

  .pointer {
    cursor: pointer;
  }
</style>