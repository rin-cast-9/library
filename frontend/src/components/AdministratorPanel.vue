<template>
    <div class="container-fluid">
        <ul class="list-group">
            <li class="list-group-item"><router-link class="item navbar-brand" to="/listBooksAdministrator">Хранилище книг</router-link></li>
            <li class="list-group-item"><router-link class="item navbar-brand" to="/listWritersAdministrator">Писатели</router-link></li>
            <li class="list-group-item"><router-link class="item navbar-brand" to="/listGenresAdministrator">Жанры</router-link></li>
        </ul>
    </div>
  </template>
  
  <script>
      export default {
        name: "AdministratorPanel",
        data() {
            return {

            };
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/');
            }
        }
      };
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>