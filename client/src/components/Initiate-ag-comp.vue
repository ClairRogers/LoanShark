<template>
  <div class="initiate-ag">
    <form @submit.prevent="initiateAgreement">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="">Title and Item</span>
        </div>
        <input type="text" v-model="newAgreement.title" required class="form-control" :disabled="activeAg.initiated">
        <input type="text" v-model="newAgreement.item" required class="form-control" :disabled="activeAg.initiated">
      </div>
      <div class="input-group input-group-lg my-5">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-lg">Description</span>
        </div>
        <input v-model="newAgreement.description" required type="text" class="form-control" aria-label="Large"
          aria-describedby="inputGroup-sizing-sm" :disabled="activeAg.initiated">
      </div>
      <button type="submit" class="btn btn-info" v-if="!activeAg.initiated">Start
        Agreement</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "initiate-ag",
    props: ["newAgreement"],
    data() {
      return {}
    },
    computed: {
      activeAg() {
        return this.$store.state.activeAg
      }
    },
    methods: {
      initiateAgreement() {
        this.$store.dispatch('initiateAgreement', this.newAgreement)
        // this.showDetails = !this.showDetails
      },
    },
    components: {}
  }
</script>