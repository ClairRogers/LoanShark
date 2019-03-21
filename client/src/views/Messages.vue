<template>
  <div class="messages">
    <div v-for="message in messages">{{message.title}}</div>
  </div>
</template>

<script>
  export default {
    name: "messages",
    mounted() {
      this.$store.dispatch('getMessages')
    },
    props: [],
    data() {
      return {}
    },
    computed: {
      messages() {
        return this.$store.state.messages
      }
    },
    methods: {},
    components: {}
  }
</script>