<template>
  <div class="search">
    <div class="row">
      <div v-for="result in results" class="col-12 d-flex justify-content-between mt-3">
        <span><img src="//placehold.it/30x30" class="sm-img mr-3"> <b>{{result.name}}</b> <span class="ml-3">{{result.email}}</span></span>
        <button class="btn btn-sm btn-info">Add Contact</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "search",
    props: [],
    data() {
      return {}
    },
    computed: {
      results() {
        return this.$store.state.searchResults
      }
    },
    methods: {},
    components: {}
  }
</script>

<style>
  .sm-img {
    border-radius: 50%;
  }
</style>