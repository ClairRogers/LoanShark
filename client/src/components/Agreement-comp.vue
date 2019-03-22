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

            <!-- basic agreement -->
            <initAg :newAgreement="newAgreement"></initAg>
            <!-- end ba -->

            <ol class="text-left">
              <li v-for="term in this.newAgreement.terms">{{term.description}}</li>
            </ol>

            <form v-if="showDetails">
              <div v-if="showDetails" class="input-group my-5">
                <input v-model="term.description" type="text" class="form-control"
                  aria-label="Text input with checkbox">
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
                  <a class="dropdown-item" @click="newAgreement.timeRemaining = 30">30 Days</a>
                  <a class="dropdown-item" @click="newAgreement.timeRemaining = 60">60 Days</a>
                  <a class="dropdown-item" @click="newAgreement.timeRemaining = 90">90 Days</a>
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
  import initAg from '@/components/Initiate-ag-comp.vue'
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
          initiated: true,
          sent: false
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
        //  let list = JSON.parse(JSON.stringify(this.newList))
        // this.$store.dispatch('createList', list)
        // this.newList.title = ''
      },
      addTerm() {
        this.newAgreement.terms.push(this.term)
        this.term = ''
      }
    },
    components: {
      initAg
    }
  }
</script>