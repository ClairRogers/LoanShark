<template>
  <div class="viewmodal" v-if="activeAg.description">
    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#viewmodal">
      Launch demo modal
    </button> -->

    <!-- Modal -->
    <div class="modal fade" id="viewmodal" tabindex="-1" role="dialog" aria-labelledby="viewmodalTitle"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewmodalTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-between mb-3"><span>Lender: <img width="30px" style="border-radius: 50%"
                  :src="activeAg.lender.image"> {{activeAg.lender.name}}</span>
              <span>Borrower: <img width="30px" style="border-radius: 50%" :src="activeAg.borrower.image">
                {{activeAg.borrower.name}}</span></div>
            <h5>Item: {{activeAg.item}}</h5>
            <p>{{activeAg.description}}</p>
            <li v-for="term in activeAg.terms">Term: {{term.description}}</li>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "viewmodal",
    props: [],
    data() {
      return {}
    },
    computed: {
      activeAg() {
        return this.$store.state.activeAg
      }
    },
    methods: {},
    components: {}
  }
</script>