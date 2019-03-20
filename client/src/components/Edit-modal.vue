<template>
  <div class="edit-modal">
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalTitle">Edit Profile</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <form @submit.prevent="editProfile(user)">
              Name:
              <input v-model="editedUser.name" class="form-control mb-3" type="text" placeholder="">
              Description:
              <input v-model="editedUser.description" class="form-control mb-3" type="text" placeholder="">
              Email:
              <input v-model="editedUser.email" class="form-control mb-3" type="text" placeholder="">
              Profile Image (URL):
              <input v-model="editedUser.image" class="form-control" type="text" placeholder="">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-info">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "edit-modal",
    mounted() {
      this.modalAutoFocus
    },
    props: [],
    data() {
      return {
        editedUser: {
          // name: '',
          // email: '',
          // bio: '',
          // image: '',
          _id: ''
        }
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      modalAutoFocus() {
        $('#editModule').on('shown.bs.modal', function () {
          $(this).find('input:first').focus();
        });
      },
      editProfile(user) {
        debugger
        this.editedUser._id = user._id
        this.$store.dispatch('editProfile', this.editedUser)
      }
    },
    components: {}
  }
</script>