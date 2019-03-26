<template>
  <div class="Borrows row">
    <div v-if="borrows.length < 1">
      <p>You have no active borrows</p>
    </div>
    <div v-else class="col-12">
      <div v-for="borrow in borrows" class="card my-3">
        <h5 class="card-header">Borrowing from: <img width="30px" :src="borrow.lender.image" style="border-radius: 50%">
          {{borrow.lender.name}}</h5>
        <div class="card-body text-left">
          <h5 class="card-title">{{borrow.title}}</h5>
          <h6>Item: {{borrow.item}}</h6>
          <p class="card-text">{{borrow.description}}</p>
          <hr>
          <p class="text-center"><i>Due Date: {{moment(borrow.updatedAt).add(borrow.timeRemaining,
              'days').calendar()}}</i></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "Borrows",
    props: ["user"],
    data() {
      return {}
    },
    computed: {
      borrows() {
        return this.$store.state.activeDeals.filter(m => m.borrower._id == this.user._id)
      },
      // timeRemaining() {
      //   // this.borrow.map(m. )
      // }
    },
    methods: {
      // getTime
    },
    components: {}
  }
</script>