<template>
    <div v-if="this.writerbooks" class="container-fluid">
      <div v-for="(writer, indexwriter) in writerbooks" :key="indexwriter">
        <h4>Витрина книг автора {{writer.name}}</h4>
        <ul class="list-group list-group-horizontal" v-for="(book, indexbook) in writer.book_writers" :key="indexbook">
            <li class="col-4 list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold"><router-link :to="{name: 'BookDetails', params: { id: book.book.id }}">{{book.book.name}}</router-link></div>
            </div>
            <span v-if="book.book.cost===0" class="badge bg-primary rounded-pill">Бесплатно</span>
            <span v-else class="badge bg-primary rounded-pill">{{book.book.cost}} руб.</span>
            </li>
            <li class="col-2 list-group-item d-flex justify-content-between align-items-start">
            <input v-if="book.book.cost===0" class="btn btn-primary" type="submit" value="Добавить в библиотеку" style="width: 100%">
            <input v-else class="btn btn-primary" type="submit" value="Купить книгу" style="width: 100%">
            </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListWriterBooks",
    props: ['id'],
    data() {
      return {
        writerbooks: []
      };
    },
    methods: {
      getWriterBooks() {
        http
            .get("/listWriterBooks/"+this.id)
            .then(response => {
              this.writerbooks = response.data;
              console.log(this.writerbooks[0].book_writers);
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    mounted() {
        this.getWriterBooks();
    }
  }
  </script>
  
  <style>
  
  </style>