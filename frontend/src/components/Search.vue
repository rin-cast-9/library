<template>
    <div class="container">
        <h5>Выберите категорию сортировки книг:</h5>
        <ul class="list-group">
            <li class="list-group-item"><router-link class="item navbar-brand" to="/listWriters">Писатели</router-link></li>
            <li class="list-group-item"><router-link class="item navbar-brand" to="/listGenres">Жанры</router-link></li>
        </ul>
    </div>
  </template>
  
  <script>
      export default {
        name: "SearchPanel",
        data() {
            return {

            };
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        }
      };
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>