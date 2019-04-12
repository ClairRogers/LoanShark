<template>
  <div class="Lends row">
    <div v-if="lends.length < 1" class="col text-center">
      <p class="mt-3">You have no active lends</p>
    </div>
    <div v-else class="col-12">
      <div v-for="lend in lends" data-toggle="modal" data-target="#viewmodal" class="card pointer my-3"
        @click="setActiveAg(lend)">
        <h5 class="card-header">Lending to: <img width="30px" :src="lend.borrower.image" style="border-radius: 50%">
          {{lend.borrower.name}}</h5>
        <div class="card-body text-left">
          <h5 class="card-title">{{lend.title}}</h5>
          <h6>Item: {{lend.item}}</h6>
          <p class="card-text">{{lend.description}}</p>
          <hr>
          <p class="text-center" :class="[isOverdue(lend) ? 'text-danger' : 'text-black-50']"><i>Due: {{moment(lend.updatedAt).add(lend.timeRemaining,
          'days').calendar()}}</i></p>
        </div>
      </div>
    </div>
    <viewmodal></viewmodal>
  </div>
</template>

<script>
  import moment from 'moment'
  import viewmodal from '@/components/Contract-view-modal.vue'

  export default {
    name: "Lends",
    props: ['user'],
    data() {
      return {}
    },
    computed: {
      lends() {
        return this.$store.state.activeDeals.filter(m => m.lender._id == this.user._id).filter(m => m.closed == false)
      }
    },
    methods: {
      setActiveAg(lend) {
        this.$store.dispatch('setActiveAg', lend)
      },
      isOverdue(lend) {
        let agDate = moment(lend.updatedAt).add(lend.timeRemaining, 'days').format('YYYYMMDD')
        let now = moment().format('YYYYMMDD')
        return agDate < now
      }
    },
    components: {
      viewmodal
    }
  }
</script>

<style>
  .card {
    border: solid 1px #13abc4;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.171);
  }
</style>