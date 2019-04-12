<template>
  <div class="messages container-fluid">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <h3 class="my-3 d-flex justify-content-around"><span class="font pointer"
            :class="showMessages ? 'selected' : ''" @click="showMessages = true">Pending
            Lends</span> <span class="font pointer" :class="!showMessages ? 'selected' : ''"
            @click="showMessages = false">Pending
            Borrows</span></h3>

        <!-- TRANSITIONS NOT WORKING YET -->
        <transition :name="showMessages ? 'first-slide' : 'second-slide'" mode="out-in">
          <div v-if="showMessages">
            <div v-for="message in lendMessages" class="card text-center my-2">
              <div class="card-header">
                <h3>{{message.borrower.name}}</h3>
              </div>
              <div class="card-body">
                <h5 class="card-title">Item: {{message.item}}</h5>
                <p class="card-text">{{message.description}}</p>
                <button type="button" class="btn btn-sm btn-info mr-1" @click="setActiveMessage(message)"
                  data-toggle="modal" data-target="#contractModal">View
                  Contract</button>
                <button class="btn btn-sm btn-danger" @click="deleteAg(message)">Delete</button>
                <h5 class="mt-3" v-if="message.sent == true">Awaiting Reply...</h5>
                <h5 class="mt-3" style="color: #2fcf2f" v-else>Your Turn to Reply!</h5>
              </div>
              <div class="card-footer text-muted d-flex justify-content-around">
                <p>Lent To: {{message.borrower.name}}</p>
                <p>From: {{message.lender.name}}</p>
              </div>
            </div>
          </div>

          <div v-if="!showMessages">
            <div v-for="message in borrowMessages" class="card text-center my-2">
              <div class="card-header">
                <h3>{{message.title}}</h3>
              </div>
              <div class="card-body">
                <h5 class="card-title">For: {{message.item}}</h5>
                <p class="card-text">{{message.description}}</p>
                <button @click="setActiveMessage(message)" class="btn btn-sm btn-info mr-1" data-toggle="modal"
                  data-target="#contractModal">View
                  Contract</button>
                <button class="btn btn-sm btn-danger" @click="deleteAg(message)">Delete</button>
                <h5 class="mt-3" v-if="message.sent == false">Awaiting Reply...</h5>
                <h5 class="mt-3" style="color: #2fcf2f" v-else>Your Turn to Reply!</h5>
              </div>
              <div class="card-footer text-muted d-flex justify-content-around">
                <p>To: {{message.borrower.name}}</p>
                <p>From: {{message.lender.name}}</p>
              </div>
            </div>
          </div>
        </transition>

      </div>
    </div>

    <Contract></Contract>
  </div>
</template>

<script>
  import Contract from '@/components/Contract-comp.vue'
  import Swal from 'sweetalert2'
  export default {
    name: "messages",
    mounted() {
      this.$store.dispatch('getMessages')
    },
    props: [],
    data() {
      return {
        showMessages: true
      }
    },
    computed: {
      lendMessages() {
        let user = this.$store.state.user
        return this.$store.state.messages.filter(m => m.lender._id == user._id)
      },
      borrowMessages() {
        let user = this.$store.state.user
        return this.$store.state.messages.filter(m => m.borrower._id == user._id)
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      deleteAg(message) {
        Swal.fire({
          title: 'Are you sure?',
          text: "This cancels your contract. You won't be able to undo this action!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#138496',
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your contract has been terminated.',
              'success'
            )
            this.$store.dispatch('deleteAg', message)
          }
        })
      },
      setActiveMessage(message) {
        this.$store.dispatch('setActiveMessage', message)
      }
    },
    components: {
      Contract
    }
  }
</script>

<style>
  .selected {
    border-bottom: solid 5px #13abc4;
  }

  .pointer {
    cursor: pointer;
  }



  .first-slide-enter {
    opacity: 0;
    transform: translatex(-50px);
    transition: all .5s ease-out;
  }

  .first-slide-enter-to {
    opacity: 1;
    transform: translatex(0);
    transition: all .5s ease-out;
  }

  .first-slide-leave-to {
    opacity: 0;
    transform: translatex(50px);
    transition: all .5s ease-out;
  }


  .second-slide-enter {
    opacity: 0;
    transform: translatex(50px);
    transition: all .5s ease-out;
  }

  .second-slide-enter-to {
    opacity: 1;
    transform: translatex(0);
    transition: all .5s ease-out;
  }

  .second-slide-leave-to {
    opacity: 0;
    transform: translatex(-50px);
    transition: all .5s ease-out;
  }
</style>