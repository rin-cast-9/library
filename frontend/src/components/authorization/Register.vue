<template>
    <div class="col-md-3 mx-auto" style="text-align:center">
      <h4>Регистрация пользователя</h4>
      <form name="form" @submit="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <input type="text" class="form-control" name="username" placeholder="Логин" v-model="user.username" required/>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" style="width: 100%">Зарегистрировать</button>
          </div>
        </div>
        <div class="form-group">
          <div v-if="successMessage" class="alert alert-success" role="alert">{{successMessage}}</div>
        </div>
        <div class="form-group">
          <div v-if="errorMessage" class="alert alert-danger" role="alert">{{errorMessage}}</div>
        </div>
      </form>
    </div>
  </template>
  <script>
  export default {
    name: 'RegisterUser',
    data() {
      return {
        user: {
          username: "",
          password: ""
        },
        successful: false,
        successMessage: '',
        errorMessage: ''
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    mounted() {
      if (this.loggedIn) {
        // Авторизация прошла успешно, переходим к главной странице.
        window.location.href = '/';
      }
    },
    methods: {
      handleRegister(e) {
        e.preventDefault();
        this.successMessage = '';
        this.errorMessage = '';
        this.$store.dispatch("auth/register", this.user) // обращаемся к методу register, который определён в auth.service.js
            .then(data => {
              this.successMessage = data.message;
              this.successful = true;
            })
            .catch(e => {
              this.errorMessage = e.response.data.message;
            });
      }
    }
  };
  </script>