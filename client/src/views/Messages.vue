<template>
  <div class="messages container-fluid">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <h2><span class="mr-5" @click="showMessages = !showMessages">Pending Lends</span> <span
            @click="showMessages = !showMessages">Pending Borrows</span></h2>

        <div v-if="showMessage" v-for="message in lendMessages" class="card text-center my-2">
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
          </div>
          <div class="card-footer text-muted">
            From: {{message.lender.name}}
          </div>
        </div>


        <div v-if="!showMessage" v-for="message in borrowMessages" class="card text-center my-2">
          <div class="card-header">
            <h3>{{message.title}}</h3>
          </div>
          <div class="card-body">
            <h5 class="card-title">For: {{message.item}}</h5>
            <p class="card-text">{{message.description}}</p>
            <button @click="setActiveMessage(message)" class="btn btn-sm btn-info" data-toggle="modal"
              data-target="#agreementModal">View Contract</button>
            <button class="btn btn-sm btn-danger" @click="deleteAg(message)">Delete</button>
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
        showMessage: true
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