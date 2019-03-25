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
            <!-- end ba -->
            <!--this is the part where we add and display terms -->
            <ol class="text-left">
              <li v-for="term in this.newAgreement.terms">{{term.description}}</li>
            </ol>
            <!--had v-ifs on the following form and div tags with showdetails (activeAg.initiated) as value-->
            <form>
              <div class="input-group my-5">
                <input v-model="term.description" type="text" class="form-control"
                  aria-label="Text input with checkbox">
                <br>
                <button class="btn btn-info" @click="addTerm">Commit Term</button>
              </div>
              <hr>
              <div class="dropdown">
                <!--changed newAgreement to activeAg-->
                <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{activeAg.timeRemaining + ' Days'}}
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
  import initAg from '@/components/Initiate-ag-comp.vue'



  export default {
    name: "agreement",
    props: ["profileId", "user"],
    data() {
      return {
        newAgreement: {
          activeAg() {
            return this.$store.state.activeAg
          },
          user() {
            return this.$store.state.user
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
          },
          initiateAgreement() {
            this.$store.dispatch('initiateAgreement', this.newAgreement)
            // this.showDetails = !this.showDetails
          },
        },
        components: {
          initAg,
          editParts
        }
      }

    }
  }
</script>