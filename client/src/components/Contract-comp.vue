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
                    checked :disabled="!term.agreedUpon">
                </div>
              </div>
              <input type="text" class="form-control" v-model="term.description" aria-label="Text input with checkbox"
                :disabled="term.agreedUpon">
              </input>
            </div>
          </div>


          <div class="modal-footer">
            <button class="btn btn-success btn-sm" @click="agree">Agree to Terms</button>
            <button class="btn btn-info btn-sm" @click="renegotiate">Renegotiate</button>
            <button type="button" class="btn btn-danger btn-sm">I'm Out!</button>
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
      }
    },
    methods: {
      renegotiate() {

      },
      agree() {
        //maybe put debugger here; getting timeout error. trying to pass in updated bool with entire object.
        this.activeMessage.agreedUpon = true
        this.$store.dispatch('acceptAgreement', this.activeMessage)
      }
    },
    components: {}
  }
</script>