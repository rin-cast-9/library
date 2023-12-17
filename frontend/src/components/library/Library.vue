<template>
    <div class="container-fluid" v-if="books">
      <h4>Библиотека пользователя {{this.$store.state.auth.user.username}}</h4>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(book, index) in books.user_books" :key="index">
          <div class="ms-2 me-auto">
            <div class="fw-bold"><router-link :to="{name: 'BookDetails', params: { id: book.book.id }}">{{book.book.name}}</router-link></div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "UserLibrary",
    data() {
      return {
        books: []
      };
    },
    methods: {
      getBooks() {
        http
            .get("/library/"+this.$store.state.auth.user.id)
            .then(response => { 
              this.books = response.data;
              console.log(this.books.user_books);
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    mounted() {
      this.getBooks();
    }
  }
  </script>
  
  <style>
  
  </style>