<template>
  <div class="home container-fluid">
    <div class="row mt-4">
      <div class="col-12 col-md-6 offset-md-3 white">
        <div class="row py-3">
          <div class="col-6">
            <img :src="user.image" alt="User image" class="round ml-3 img-fluid">
          </div>
          <div class="col-6">
            <h5 class="text-right faded"><i data-toggle="modal" data-target="#editModal" title="edit"
                class="far fa-edit"></i></h5>
            <h2 class="mt-4">{{user.name}} <span v-if="user.paypal"><i title="PayPal verified"
                  class="fab fa-paypal fa-xs ml-1 faded noClick"></i></span></h2>
            <h5>User Rating:</h5>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style="{ width: barWidth + '%' }"
                :aria-valuenow="score" aria-valuemin="0" aria-valuemax="100">{{score}}%</div>
            </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col-12">
            <p class="mt-3 mx-3 text-justify">{{user.bio}}</p>
            <hr>
            <button v-if="showCurrent" class="btn btn-info" @click="showCurrent = !showCurrent">View Active
              Contracts</button>
            <button v-else class="btn btn-info mb-3" @click="showCurrent = !showCurrent">View Completed
              Contracts</button>
            <h4 v-if="!showCurrent" class="text-center d-flex justify-content-around"><span class="pointer font"
                :class="showContracts ? 'selected' : ''" @click="showContracts = !showContracts">My Lends</span> <span
                class="pointer font" :class="!showContracts ? 'selected' : ''"
                @click="showContracts = !showContracts">My
                Borrows</span></h4>
            <div v-if="!showCurrent">
              <lends v-if="showContracts" :user="user"></lends>
              <borrows v-if="!showContracts" :user="user"></borrows>
            </div>
            <completed v-else :user="user"></completed>

          </div>
        </div>
      </div>
      <!-- <div class="target">hello</div>
      <button class="trigger"></button> -->
    </div>
    <editmodal></editmodal>
    <!-- <form @submit.prevent="die">
      <input type="text" v-model="userId">
      <button type="submit">delete everyone jamie</button>
    </form> -->
  </div>
</template>

<script>
  // @ is an alias to /src
  import Lends from '@/components/Lends.vue'
  import Borrows from '@/components/Borrows.vue'
  import Editmodal from '@/components/Edit-modal.vue'
  import Completed from '@/components/Completed-contracts.vue'


  export default {
    name: 'home',
    mounted() {
      this.$store.dispatch('getActiveDeals')
      this.$store.dispatch('getCompletedDeals')
    },
    created() {

      this.$store.state.user

      //blocks users not logged in      
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    data() {
      return {
        // barWidth: this.user.score + '%'
        userId: '',
        showContracts: true,
        barWidth: 0,
        showCurrent: false,
      }
    },
    components: {
      Lends,
      Borrows,
      Editmodal,
      Completed
    },
    methods: {
      logout() {
        this.$store.dispatch('logOut')
      },
      die() {
        this.$store.dispatch('deleteUser', this.userId)
      },
      // $('.trigger').click(function () {
      //   var target = $('.target');
      //   if (!target.hasClass('hide')) {
      //     target.removeClass('show');
      //     target.addClass('hide');
      //   } else {
      //     target.removeClass('hide');
      //     target.addClass('show');
      //   }
      // })
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      score() {
        if (this.$store.state.user.score) {
          let scoreArr = this.$store.state.user.score
          let total = 0
          let out = 0
          for (let i = 0; i < scoreArr.length; i++) {
            total += scoreArr[i].rating
            out = (total / scoreArr.length) * 20
          }
          this.barWidth = out.toFixed()
          return out.toFixed()
        }
      }
    },
  }
</script>

<style>
  .round {
    height: 180px;
    width: 180px;
    border-radius: 50%;
    border: solid 1px #c5c5c5;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.171);
  }

  .faded {
    opacity: .4;
  }

  .progress-bar {
    background-color: #13abc4;
  }

  .white {
    background-color: white;
  }

  .noClick {
    cursor: default;
  }

  .pointer {
    cursor: pointer;
  }

  .selected {
    border-bottom: solid 5px #13abc4;
  }






  /* @keyframes hide {
    0% {
      transform: translate(0);
    }

    20% {
      transform: translate(5px);
    }

    100% {
      transform: translate(-120vw);
    }
  }

  @keyframes show {
    0% {
      transform: translate(-120vw);
    }

    80% {
      transform: translate(-5px);
    }

    100% {
      transform: translate(0vw);
    }
  }

  .hide {
    animation: hide 0.5s forwards ease-in-out;
    animation-delay: .2s;
  }

  .show {
    animation: show 0.5s forwards ease-in-out;
  } */
</style>