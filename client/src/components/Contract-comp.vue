<template>
  <div class="contract">

    <div class="modal fade" id="contractModal" tabindex="-1" role="dialog" aria-labelledby="contractModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contractModalLabel">{{activeMessage.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>{{activeMessage.item}}</h3>
            <h4>{{activeMessage.description}}</h4>
          </div>
          <!-- terms stuff -->
          <div v-for="term in terms">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <input type="checkbox" @click="term.agreedUpon = false" aria-label="Checkbox for following text input"
                    checked :disabled="!term.agreedUpon || !determineAccess()">
                </div>
              </div>
              <input type="text" class="form-control" v-model="term.description" aria-label="Text input with checkbox"
                :disabled="term.agreedUpon">
              </input>
            </div>
          </div>


          <div class="modal-footer">

            <button class="btn btn-success btn-sm" @click="agree" :disabled="!determineAccess()"
              data-dismiss="modal">Agree to Terms</button>
            <button class="btn btn-info btn-sm" @click="renegotiate" :disabled="!determineAccess() || !editedTerm()"
              data-dismiss="modal">Renegotiate</button>

            <button type="button" class="btn btn-danger btn-sm" @click="deleteAg(activeMessage)"
              data-dismiss="modal">I'm Out!</button>
            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "contract",
    props: [],
    data() {
      return {
      }
    },
    computed: {
      activeMessage() {
        return this.$store.state.activeMessage
      },
      terms() {
        return this.$store.state.activeMessage.terms
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      renegotiate() {
        this.$store.activeMessage.sent = !this.$store.activeMessage.sent
      },
      agree() {
        this.activeMessage.agreedUpon = true
        this.$store.dispatch('acceptAgreement', this.activeMessage)
      },
      determineAccess() {
        if (this.$store.state.activeMessage.description) {
          if (this.activeMessage.lender._id == this.user._id && this.activeMessage.sent == false) {
            return true
          } else if (this.activeMessage.borrower._id == this.user._id && this.activeMessage.sent == true) {
            return true
          } else {
            return false
          }
        }
      },
      deleteAg(message) {
        this.$store.dispatch('deleteAg', message)
      },
      editedTerm() {
        if (this.terms.find(t => t.agreedUpon == false)) {
          return true
        } else {
          return false
        }
      }
    },
    components: {}
  }
</script>