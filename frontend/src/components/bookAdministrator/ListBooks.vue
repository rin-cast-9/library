<template>
    <div v-if="books">
      <h4>Витрина книг</h4>
      <router-link class="item btn btn-primary" to="/addBook">Добавить книгу</router-link>
      <ul>
        <!-- Вывод списка учебных дисциплин -->
        <li v-for="(book, index) in books" :key="index">
          <router-link :to="{name: 'BookDetailsAdmin', params: { id: book.id }}">{{book.name}}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
  export default {
    name: "ListBooksAdministrator", // Имя шаблона
    data() { // данные компонента (определение переменных)
      return {
        books: []
      };
    },
    methods: { // методы компонента
      getBooks() {
        http
            .get("/listBooks") // обращаемся к серверу для получения списка учебных дисциплин
            .then(response => { // запрос выполнен успешно
              this.books = response.data;
            })
            .catch(e => { // запрос выполнен с ошибкой
              console.log(e);
            });
      }
    },
    mounted() { // загружаем данные учебных дисциплин. Обработчик mounted() вызывается после монтирования экземпляра шаблона
      this.getBooks();
    }
  }
  </script>
  
  <style>
  
  </style>