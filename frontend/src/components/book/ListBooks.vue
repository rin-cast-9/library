<template>
    <div class="container-fluid" v-if="books">
      <h4>Витрина книг</h4>
      <ul class="list-group list-group-horizontal" v-for="(book, index) in books" :key="index">
        <li class="col-4 list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold"><router-link :to="{name: 'BookDetails', params: { id: book.id }}">{{book.name}}</router-link></div>
            <div v-for="(writer, indexwriter) in book.book_writers" :key="indexwriter"> <router-link :to="{name: 'ListWriterBooks', params: { id: writer.writer.id }}">{{writer.writer.name}}</router-link> </div>
          </div>
          <span v-if="book.cost===0" class="badge bg-primary rounded-pill">Бесплатно</span>
          <span v-else class="badge bg-primary rounded-pill">{{book.cost}} руб.</span>
        </li>
        <li class="col-3 list-group-item d-flex justify-content-between align-items-start">
          <input v-if="book.cost===0" class="btn btn-primary" type="submit" value="Добавить в библиотеку" style="width: 100%">
          <input v-else class="btn btn-primary" type="submit" value="Купить книгу" style="width: 100%">
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListBooks",
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
              //console.log(this.books);
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
  router-link {
    text-decoration: none;
    color: black;
  }
  router-link:hover {
    text-decoration: underline;
  }
  </style>