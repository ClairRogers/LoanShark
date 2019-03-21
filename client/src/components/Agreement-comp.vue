<template>
  <div class="agreement">
    <!-- Modal -->
    <div class="modal fade" id="agreementModal" tabindex="-1" role="dialog" aria-labelledby="agreementModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Initiate an Agreement</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="initiateAgreement">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">Title and Item</span>
                </div>
                <input type="text" v-model="newAgreement.title" class="form-control">
                <input type="text" v-model="newAgreement.item" vclass="form-control">
              </div>
              <div class="input-group input-group-lg my-5">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-lg">Description</span>
                </div>
                <input v-model="newAgreement.description" type="text" class="form-control" aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
              <button @click="showDetails = !showDetails" type="submit" class="btn btn-info">Start Agreement</button>
            </form>
            <form v-if="showDetails">
              <div v-if="showDetails" class="input-group my-5">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input type="checkbox" aria-label="Checkbox for following text input">
                  </div>
                </div>
                <input type="text" class="form-control" aria-label="Text input with checkbox">
                <br>
                <button class="btn btn-info">Commit Term</button>
              </div>
              <button class="btn btn-info" @click="showTaskForm = !showTaskForm">Add Term</button>
              <hr>
              <div class="dropdown">
                <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {{newAgreement.timeRemaining + ' Days'}}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="newAgreement.timeRemaining = 30">30 Days</a>
                  <a class="dropdown-item" @click="newAgreement.timeRemaining = 60">60 Days</a>
                  <a class="dropdown-item" @click="newAgreement.timeRemaining = 90">90 Days</a>
                </div>
              </div>
              <hr>
              <button type="submit" class="btn btn-info">Make Agreement</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "agreement",
    props: ["profileId", "user"],
    data() {
      return {
        newAgreement: {
          item: '',
          title: '',
          description: '',
          authorId: this.user._id,
          // terms: [term],
          //to get whole user object use populate mongoose method in agreement routes
          lender: this.user._id,
          borrower: this.profileId,
          timeRemaining: 0
        },
        showDetails: false
      }
    },
    computed: {
    },
    methods: {
      initiateAgreement() {
        this.$store.dispatch('initiateAgreement', this.newAgreement)
      },
      editAgreement() {
        this.$store.dispatch('editAgreement')
      }
    },
    components: {}
  }
</script>