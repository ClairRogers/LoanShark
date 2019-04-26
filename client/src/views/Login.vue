<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1">
        <div class="bd-example mt-2">
          <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="../assets/phones.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Keep track of items you've lent and borrowed</h5>
                </div>
              </div>
              <div class="carousel-item">
                <img src="../assets/handshake.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Agree on terms for lends and borrows</h5>
                </div>
              </div>
              <div class="carousel-item">
                <img src="../assets/beers.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Enjoy a stress-free lending experience</h5>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <h1 class="logo bigsize">Welcome to LoanShark!</h1>
        <div class="row">
          <div class="col-12 col-md-8 offset-md-2">
            <p class="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iusto eaque quae. Sunt sequi eos earum
            sed, debitis ab eius quasi aut praesentium illo delectus, a ut veniam voluptatum excepturi. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Inventore distinctio expedita, dolore praesentium provident
            sint possimus illo assumenda alias molestias doloremque accusantium quo in quod tenetur vitae et facilis.
            Sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat porro commodi eaque. Voluptatum
            repellendus eligendi ad ex necessitatibus dolorum nobis eaque voluptates, accusantium dignissimos voluptatem
            optio delectus sint autem minima.</p>
            <button class="btn btn-outline-info mb-5" data-toggle="modal"
              data-target="#loginModal">Click here to get started!</button>
          </div>
        </div>
      </div>
    </div>
    <loginmodal></loginmodal>
  </div>
</template>

<script>
  import loginmodal from '@/components/loginmodal.vue'
  import router from "@/router.js";
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    },
    components: {
      loginmodal
    }
  };
</script>

<style scoped>
  .action {
    cursor: pointer;
  }

  input {
    height: 50px;
    min-width: 300px;
    max-width: 400px;
    text-align: center;
    border: 1px solid rgba(224, 224, 224, 0.473);
  }

  .form-container {
    height: 40vh
  }

  .note-container {
    height: 40vh
  }

  .bigsize {
    font-size: 40px;
    margin-top: 100px;
    margin-bottom: 70px;
  }
</style>