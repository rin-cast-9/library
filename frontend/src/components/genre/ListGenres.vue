<template>
    <div class="container" v-if="genres">
        <h5>Список жанров для сортировки:</h5>
        <ul class="list-group">
            <li class="list-group-item" v-for="(genre, indexgenre) in genres" :key="indexgenre">
                <router-link :to="{name: 'ListGenreBooks', params: { id: genre.id }}">{{genre.name}}</router-link>
            </li>
        </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListGenres",
    data() {
      return {
        genres: []
      };
    },
    methods: {
      getGenres() {
        http
            .get("/listGenres")
            .then(response => {
              this.genres = response.data;
              //console.log(this.genres);
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    mounted() {
      this.getGenres();
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