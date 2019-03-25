<template>
  <div class="contract">

    <div class="modal fade" id="contractModal" tabindex="-1" role="dialog" aria-labelledby="contractModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contractModalLabel">Contract</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button class="btn btn-success btn-sm">Agree to Terms</button>
            <button class="btn btn-info btn-sm">Renegotiate</button>
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
      return {}
    },
    computed: {
      activeMessage() {
        return this.$store.state.activeMessage
      }
    },
    methods: {},
    components: {}
  }
</script>