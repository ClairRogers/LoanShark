<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bgc">
      <a class="navbar-brand logo" href="#"><i class="">LoanShark</i><img src="./assets/LoanShark-white.png"
          width="40px"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" @click="goHome">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="goContacts">My Contacts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="goMessages">Messages
              <span>{{unreadMessages()}}</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logOut">Logout</a>
          </li>
        </ul>
        <i class="fas fa-search" data-toggle="modal" data-target="#searchModal" @click="modalAutoFocus"></i>
      </div>
    </nav>
    <!-- Modal -->
    <div @click="searchTerm = '' " class="modal fade" id="searchModal" tabindex="-1" role="dialog"
      aria-labelledby="searchModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <form class="form-inline my-2 my-lg-0">
              <input ref="search" v-model="searchTerm" @input="userSearch" class="form-control mr-sm-2" type="search"
                placeholder="Find Users" aria-label="Search">
            </form>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
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
  import router from './router'
  export default {
    name: 'App',
    mounted() {
      //Authenticate on startup
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getMessages')
    },
    data() {
      return {
        searchTerm: ''
      }
    },
    methods: {
      results() {
        return this.$store.state.searchResults
      },
      logOut() {
        this.$store.dispatch('logOut')
      },
      //Searches as letters are input
      userSearch() {

        let search = debounce(query => {
          this.$store.dispatch('searchUser', this.searchTerm)
        }, 300);
        search()
      },
      modalAutoFocus() {
        $('#searchModal').on('shown.bs.modal', function () {
          $(this).find('input:first').focus();
        });
        this.userSearch('')
      },
      goHome() {
        router.push({ name: 'home' })
      },
      goMessages() {
        router.push({ name: 'messages' })
      },
      goContacts() {
        router.push({ name: 'contacts' })
      },
      unreadMessages() {
        if (this.lendMessages.length + this.borrowMessages.length == 0) {
          return ''
        } else {
          return `(${this.lendMessages.length + this.borrowMessages.length})`
        }

      }
    },
    components: {
      search,
      router
    },
    computed: {
      lendMessages() {
        let user = this.$store.state.user
        return this.$store.state.messages.filter(m => m.lender._id == user._id).filter(m => m.sent == false)
      },
      borrowMessages() {
        let user = this.$store.state.user
        return this.$store.state.messages.filter(m => m.borrower._id == user._id).filter(m => m.sent == true)
      }
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

  body {
    background-color: #ffffff;
    background-image: url("https://www.transparenttextures.com/patterns/brick-wall.png");
    background-attachment: fixed;
  }

  .logo {
    font-family: 'Prosto One', cursive;
    font-size: 30px;
  }

  .font {
    font-family: 'Prosto One', cursive;
  }
</style>