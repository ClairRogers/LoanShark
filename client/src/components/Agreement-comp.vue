<template>
  <div class="agreement">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <li class="card-text">
          <ul v-for="term in agreement.terms">

          </ul>
        </li>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "agreement",
    props: [agreementData],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    components: {}
  }
</script>