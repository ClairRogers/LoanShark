<template>
  <div class="messages container-fluid">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <h3 class="my-3"><span class="mr-5 font pointer" :class="showMessages ? 'selected' : ''"
            @click="showMessages = !showMessages">Pending
            Lends</span> <span class="font pointer" :class="!showMessages ? 'selected' : ''"
            @click="showMessages = !showMessages">Pending
            Borrows</span></h3>

        <div v-if="showMessages" v-for="message in lendMessages" class="card text-center my-2">
          <div class="card-header">
            <h3>{{message.title}}</h3>
          </div>
          <div class="card-body">
            <h5 class="card-title">For: {{message.item}}</h5>
            <p class="card-text">{{message.description}}</p>
            <button type="button" class="btn btn-sm btn-info" @click="setActiveMessage(message)" data-toggle="modal"
              data-target="#agreementModal">View
              Contract</button>
            <button class="btn btn-sm btn-danger" @click="deleteAg(message)">Delete</button>
            <h5 class="mt-3" v-if="message.sent == true">Awaiting Reply</h5>
            <h5 class="mt-3" style="color: #2fcf2f" v-else>Your Turn to Reply!</h5>
          </div>
          <div class="card-footer text-muted">
            From: {{message.lender.name}}
          </div>
        </div>


        <div v-if="!showMessages" v-for="message in borrowMessages" class="card text-center my-2">
          <div class="card-header">
            <h3>{{message.title}}</h3>
          </div>
          <div class="card-body">
            <h5 class="card-title">For: {{message.item}}</h5>
            <p class="card-text">{{message.description}}</p>
            <button @click="setActiveMessage(message)" class="btn btn-sm btn-info" data-toggle="modal"
              data-target="#agreementModal">View Contract</button>
            <button class="btn btn-sm btn-danger" @click="deleteAg(message)">Delete</button>
            <h5 class="mt-3" v-if="message.sent == false">Awaiting Reply</h5>
            <h5 class="mt-3" style="color: #2fcf2f" v-else>Your Turn to Reply!</h5>
          </div>
          <div class="card-footer text-muted">
            From: {{message.lender.name}}
          </div>
        </div>
      </div>
    </div>

    <Message></Message>
    <Agreement></Agreement>
  </div>
</template>

<script>
  import Message from '@/components/Message.vue'
  import Agreement from '@/components/Agreement-comp.vue'
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
        this.$store.dispatch('deleteAg', message)
      },
      setActiveMessage(message) {
        this.$store.dispatch('setActiveMessage', message)
      }
    },
    components: {
      Message,
      Agreement
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
</style>