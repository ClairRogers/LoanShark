<template>
  <div class="Lends">
    <div v-if="lends.length < 1">
      <p>You have no active lends</p>
    </div>
    <div v-else v-for="lend in lends" class="col-12">
      {{lend.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "Lends",
    props: [],
    data() {
      return {}
    },
    computed: {
      lends() {
        return this.$store.state.lends
      }
    },
    methods: {},
    components: {}
  }
</script>