<template>
  <div class="Lends row">
    <div v-if="lends.length < 1">
      <p>You have no active lends</p>
    </div>
    <div v-else class="col-12">
      <div v-for="lend in lends" class="card my-3">
        <h5 class="card-header">Lending to: <img width="30px" :src="lend.borrower.image" style="border-radius: 50%">
          {{lend.borrower.name}}</h5>
        <div class="card-body text-left">
          <h5 class="card-title">{{lend.title}}</h5>
          <h6>Item: {{lend.item}}</h6>
          <p class="card-text">{{lend.description}}</p>
          <hr>
          <p class="text-center"><i>Due Date: {{moment(lend.updatedAt).add(lend.timeRemaining,
                        'days').calendar()}}</i></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "Lends",
    props: ['user'],
    data() {
      return {}
    },
    computed: {
      lends() {
        return this.$store.state.activeDeals.filter(m => m.lender._id == this.user._id)
      }
    },
    methods: {},
    components: {}
  }
</script>

<style>
  .card {
    border: solid 1px #13abc4;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.171);
  }
</style>