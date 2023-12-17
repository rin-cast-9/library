<template>
    <div class="container" v-if="writers">
        <h4>Список писателей:</h4>
        <form class="row g-3" @submit="addWriter">
            <h4 class="col-auto">
                Добавить писателя:
            </h4>
            <div class="col-5">
                <input class="form-control" type="text" name="name" id="name" placeholder="ФИО" required v-model="writer.name">
            </div>
            <div class="col-auto">
                <input class="btn btn-primary" type="submit" value="Добавить писателя">
            </div>
        </form>
        <ul class="list-group">
            <li class="list-group-item" v-for="(writer, indexwriter) in writers" :key="indexwriter">
                <router-link :to="{name: 'WriterDetails', params: { id: writer.id }}">{{writer.name}}</router-link>
            </li>
        </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListWritersaAdministrator",
    data() {
      return {
        writers: [],
        writer: {
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
      getWriters() {
        http
            .get("/listWriters")
            .then(response => {
              this.writers = response.data;
              //console.log(this.writers);
            })
            .catch(e => {
              console.log(e);
            });
      },
      addWriter() {
        var data = {
            name: this.writer.name
        }
        http
            .post('/addWriter', data)
            .then(() => {
                this.$router.push('/listWritersAdministrator');
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
        this.getWriters();
      }
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