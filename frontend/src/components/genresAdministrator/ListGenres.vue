<template>
    <div class="container" v-if="genres">
        <h4>Список жанров:</h4>
        <form class="row g-3" @submit="addGenre">
            <h4 class="col-auto">
                Добавить жанр:
            </h4>
            <div class="col-5">
                <input class="form-control" type="text" name="name" id="name" placeholder="Название жанра" required v-model="genre.name">
            </div>
            <div class="col-auto">
                <input class="btn btn-primary" type="submit" value="Добавить жанр">
            </div>
        </form>
        <ul class="list-group">
            <li class="list-group-item" v-for="(genre, indexgenre) in genres" :key="indexgenre">
                <router-link :to="{name: 'GenreDetails', params: { id: genre.id }}">{{genre.name}}</router-link>
            </li>
        </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListGenresAdministrator",
    data() {
      return {
        genres: [],
        genre: {
            name: null
        }
      };
    },
    computed: {
      currentUser() {
          return this.$store.state.auth.user;
      }
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
      },
      addGenre() {
        var data = {
            name: this.genre.name
        }
        http
            .post('/addGenre', data)
            .then(() => {
                this.$router.push('/listGenresAdministrator');
            })
            .catch(err => {
                console.log(err);
            })
      }
    },
    mounted() {
      if (this.currentUser.role_id!=1) {
        this.$router.push('/');
      }
      else {
        this.getGenres();
      }
    }
  }
  </script>
  
  <style>

  </style>