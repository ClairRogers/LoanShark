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


          <div class="modal-body text-left">
            <form @submit.prevent="initiateAgreement">
              <h6>Title:</h6>
              <input type="text" v-model="newAgreement.title" required class="form-control mb-3"
                :disabled="activeAg.initiated">
              <h6>Item:</h6>
              <input type="text" v-model="newAgreement.item" required class="form-control mb-3"
                :disabled="activeAg.initiated">
              <h6>Description:</h6>
              <input v-model="newAgreement.description" required type="text" class="form-control mb-4"
                aria-label="Large" aria-describedby="inputGroup-sizing-sm" :disabled="activeAg.initiated">
              <button type="submit" class="btn btn-info" v-if="!activeAg.initiated">Start
                Agreement</button>
            </form>

            <ol class="text-left mt-4">
              <li v-for="term in newAgreement.terms">{{term.description}}</li>
            </ol>

            <form v-if="showDetails">
              <div v-if="showDetails" class="input-group my-5">
                <input v-model="term.description" type="text" class="form-control">
                <br>
                <button class="btn btn-info" @click="addTerm">Commit Term</button>
              </div>
              <hr>
              <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">Number of Days</div>
                </div>
                <input class="form-control" type="number" placeholder="Days" v-model="newAgreement.timeRemaining">
              </div>
              <!-- <input class="form-control" type="number" placeholder="Days" v-model="newAgreement.timeRemaining"> -->
            </form>



          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click="editAgreement" class="btn btn-info" data-dismiss="modal">Update
              Agreement</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swal from 'sweetalert2'
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
          terms: [],
          //to get whole user object use populate mongoose method in agreement routes
          lender: this.user._id,
          borrower: this.profileId,
          timeRemaining: 0,
          initiated: true
        },
        showDetails: false,
        term: {
          authorId: this.user._id,
          description: '',
          agreedUpon: true
        },
        editTerm: false
      }
    },
    computed: {
      activeAg() {
        return this.$store.state.activeAg
      }
    },
    methods: {
      initiateAgreement() {
        this.$store.dispatch('initiateAgreement', this.newAgreement)
        this.showDetails = !this.showDetails
      },
      editAgreement() {
        this.newAgreement._id = this.$store.state.activeAg._id
        this.newAgreement.sent = !this.newAgreement.sent
        let agreement = JSON.parse(JSON.stringify(this.newAgreement))
        this.$store.dispatch('editAgreement', agreement)
        this.newAgreement.title = ''
        this.newAgreement.item = ''
        this.newAgreement.description = ''
        this.newAgreement.terms = []
        this.showDetails = false
        delete this.newAgreement._id
        this.$store.dispatch('setActiveAg', {})
        Swal.fire(
          'Agreement Sent!',
          'Now awaiting their reply.',
          'success'
        )
      },
      addTerm() {
        let newTerm = JSON.parse(JSON.stringify(this.term))
        this.newAgreement.terms.push(newTerm)
        this.term.description = ''
      }
    },
    components: {}
  }
</script>