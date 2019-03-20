<template>
  <div class="Borrows">
    <div v-if="borrows.length < 1">
      <p>You have no active borrows</p>
    </div>
    <div v-else v-for="borrow in borrows" class="col-12">
      {{borrow.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "Borrows",
    props: [],
    data() {
      return {}
    },
    computed: {
      borrows() {
        return this.$store.state.borrows
      }
    },
    methods: {},
    components: {}
  }
</script>