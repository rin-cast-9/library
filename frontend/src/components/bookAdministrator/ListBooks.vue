<template>
    <div class="container" v-if="books">
      <h4>Хранилище книг</h4>
      <router-link class="item btn btn-primary" to="/addBook">Добавить книгу</router-link>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(book, index) in books" :key="index">
          <div class="ms-2 me-auto">
            <div class="fw-bold"><router-link :to="{name: 'BookDetailsAdmin', params: { id: book.id }}">{{book.name}}</router-link></div>
            <div>
              <span v-for="(writer, indexwriter) in book.book_writers" :key="indexwriter">{{writer.writer.name}}&nbsp;</span>
            </div>
            <div>
              <span v-for="(genre, indexgenre) in book.book_genres" :key="indexgenre">{{genre.genre.name}}&nbsp;</span>
            </div>
          </div>
          <span class="badge bg-primary rounded-pill">{{book.cost}} руб.</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListBooksAdministrator",
    data() {
      return {
        books: []
      };
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      getBooks() {
        http
            .get("/listBooks/"+this.$store.state.auth.user.id)
            .then(response => { 
              this.books = response.data;
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    mounted() {
      if (this.currentUser.role_id!=1) {
        this.$router.push('/');
      }
      else {
        this.getBooks();
      }
    }
  }
  </script>
  
  <style>
  
  </style>