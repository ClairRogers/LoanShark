<template>
  <div class="CompletedContracts row d-flex justify-content-center">
    <h4 class="font mt-3">Completed Contracts</h4>
    <div v-if="completedAgs.length < 1">
      <p>You have no completed contracts</p>
    </div>
    <div v-else class="col-12">
      <div v-for="ag in completedAgs" data-toggle="modal" data-target="#viewmodal" class="card pointer my-3"
        @click="setActiveAg(ag)">
        <h5 v-if="user._id == ag.borrower._id" class="card-header">Borrowed from: <img width="30px"
            :src="ag.lender.image" style="border-radius: 50%">
          {{ag.lender.name}}</h5>
        <h5 v-else-if="user._id == ag.lender._id" class="card-header">Lended to: <img width="30px"
            :src="ag.borrower.image" style="border-radius: 50%">
          {{ag.borrower.name}}</h5>
        <div class="card-body text-left">
          <div class="d-flex justify-content-between">
            <div>
              <h5 class="card-title">{{ag.title}}</h5>
              <h6>Item: {{ag.item}}</h6>
              <p class="card-text">{{ag.description}}</p>
            </div>
            <div class="d-flex flex-column justify-content-center">
              <button class="btn btn-danger" @click="rateLender(ag)" data-dismiss="modal">Rate Lender</button>
            </div>
          </div>
          <hr>
          <p class="text-center"><i>Closed: {{moment(ag.updatedAt).calendar()}}</i></p>
        </div>
      </div>
    </div>
    <viewmodal></viewmodal>
  </div>
</template>

<script>
  import moment from 'moment'
  import viewmodal from '@/components/Contract-view-modal.vue'
  import Swal from 'sweetalert2'

  export default {
    name: "CompletedContracts",
    props: ['user'],
    data() {
      return {}
    },
    computed: {
      completedAgs() {
        return this.$store.state.completedDeals
      }
    },
    methods: {
      setActiveAg(lend) {
        this.$store.dispatch('setActiveAg', lend)
      },
      async rateLender(ag) {
        const inputOptions = new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              '1': 'Terrible',
              '2': 'Okay',
              '3': 'Good',
              '4': 'Great',
              '5': 'Excellent',
            })
          }, 1000)
        })
        const { value: rating } = await Swal.fire({
          title: 'Rate User',
          text: 'Please rate your overall experience with this user:',
          input: 'radio',
          showCancelButton: true,
          inputOptions: inputOptions,
          inputValidator: (value) => {
            if (!value) {
              return 'You need to choose something!'
            } else {
              this.$store.dispatch('thisIsANewName', { score: value, _id: ag.lender._id })
              Swal.fire({ text: 'Thanks for rating!' })
            }
          }
        })
      }

    },
    components: {
      viewmodal,
      Swal
    }
  }
</script>

<style>
  .card {
    border: solid 1px #13abc4;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.171);
  }
</style>