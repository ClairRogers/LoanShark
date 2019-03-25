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
                <input type="text" v-model="newAgreement.title" required class="form-control"
                  :disabled="activeAg.initiated">
                <input type="text" v-model="newAgreement.item" required class="form-control"
                  :disabled="activeAg.initiated">
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

            <ol class="text-left">
              <li v-for="term in newAgreement.terms">{{term.description}}</li>
            </ol>

            <form v-if="showDetails">
              <div v-if="showDetails" class="input-group my-5">
                <input v-model="term.description" type="text" class="form-control">
                <br>
                <button class="btn btn-info" @click="addTerm">Commit Term</button>
              </div>
              <hr>
              <div class="dropdown">
                <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{newAgreement.timeRemaining + ' Days'}}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="activeAg.timeRemaining = 30">30 Days</a>
                  <a class="dropdown-item" @click="activeAg.timeRemaining = 60">60 Days</a>
                  <a class="dropdown-item" @click="activeAg.timeRemaining = 90">90 Days</a>
                </div>
              </div>
            </form>



          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click="editAgreement" class="btn btn-info">Make Agreement</button>
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