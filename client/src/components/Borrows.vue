<template>
  <div class="Borrows row">
    <div v-if="borrows.length < 1" class="col text-center">
      <p class="mt-3">You have no active borrows</p>
    </div>
    <div v-else class="col-12">
      <div v-for="borrow in borrows" data-toggle="modal" data-target="#viewmodal" class="card my-3 pointer"
        @click="setActiveAg(borrow)">
        <h5 class="card-header">Borrowing from: <img width="30px" :src="borrow.lender.image" style="border-radius: 50%">
          {{borrow.lender.name}}</h5>
        <div class="card-body text-left">
          <h5 class="card-title">{{borrow.title}}</h5>
          <h6>Item: {{borrow.item}}</h6>
          <p class="card-text">{{borrow.description}}</p>
          <hr>
          <p class="text-center" :class="[isOverdue(borrow) ? 'text-danger' : 'text-black-50']"><i>Due: {{moment(borrow.updatedAt).add(borrow.timeRemaining,
              'days').calendar()}}</i></p>
          <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#viewmodal">
            Launch demo modal
          </button> -->
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
    name: "Borrows",
    props: ["user"],
    data() {
      return {}
    },
    computed: {
      borrows() {
        return this.$store.state.activeDeals.filter(m => m.borrower._id == this.user._id).filter(m => m.closed == false)
      },
    },
    methods: {
      setActiveAg(borrow) {
        this.$store.dispatch('setActiveAg', borrow)
      },
      isOverdue(borrow) {
        let agDate = moment(borrow.updatedAt).add(borrow.timeRemaining, 'days').format('YYYYMMDD')
        let now = moment().format('YYYYMMDD')
        return agDate < now
      }
    },
    components: {
      viewmodal
    }
  }
</script>