<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bgc">
      <a class="navbar-brand" href="#">LoanShark</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">My Contacts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Messages</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logOut">Logout</a>
          </li>
        </ul>
        <i class="fas fa-search" data-toggle="modal" data-target="#exampleModal"></i>
      </div>
    </nav>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <form class="form-inline my-2 my-lg-0">
              <input v-model="searchTerm" @input="userSearch" class="form-control mr-sm-2" type="search" placeholder="Find Users"
                aria-label="Search">
            </form>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="!searchTerm">
              <h3 class="my-5">Search for a User</h3>
            </div>
            <search></search>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
  const { debounce } = require('mini-debounce')
  import search from "@/components/Search-comp.vue";
  export default {
    name: 'App',
    mounted() {
      //Authenticate on startup
      this.$store.dispatch('authenticate')
    },
    data() {
      return {
        searchTerm: ''
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('logOut')
      },
      //Searches as letters are input
      userSearch() {
        let search = debounce(query => {
          this.$store.dispatch('searchUser', this.searchTerm)
        }, 500);
        search()
      }
    },
    components: {
      search
    }
  }
</script>


<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .navbar {
    position: sticky;
    z-index: 100;
  }

  a {
    cursor: pointer;
  }

  .bgc {
    background-color: #13abc4;
  }

  .navbar {
    color: white;
  }

  i {
    cursor: pointer;
  }
</style>