<template>
  <div class="contacts container-fluid">
    <h2 class="text-center logo mt-4">Contacts</h2>
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="row mt-4">
          <div v-for="friend in friends" class="col-6">
            <div class="card mb-3 pointer" @click="setActiveProfile(friend)" style="max-width: 540px;">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img :src="friend.image" width="150px" class="card-img img-fluid" style="border-radius: 50%">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{{friend.name}}</h5>
                    <p>{{friend.email}}</p>
                    <button class="btn btn-danger btn-sm" @click="removeFriend(friend._id)">Remove Contact</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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