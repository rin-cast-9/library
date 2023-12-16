<template>
    <div class="container-fluid" v-if="books">
      <h4>Витрина книг</h4>
      <router-link class="item btn btn-primary" to="/addBook">Добавить книгу</router-link>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(book, index) in books" :key="index">
          <div class="ms-2 me-auto">
            <div class="fw-bold"><router-link :to="{name: 'BookDetailsAdmin', params: { id: book.id }}">{{book.name}}</router-link></div>
            <div v-for="(writer, indexwriter) in book.book_writers" :key="indexwriter"> {{writer.writer.name}} </div>
          </div>
          <span class="badge bg-primary rounded-pill">{{book.cost}}</span>
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
    methods: {
      getBooks() {
        http
            .get("/listBooks")
            .then(response => { 
              this.books = response.data;
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