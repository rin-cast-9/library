<template>
    <div class="container" v-if="writers">
        <h5>Список писателей для сортировки:</h5>
        <ul class="list-group">
            <li class="list-group-item" v-for="(writer, indexwriter) in writers" :key="indexwriter">
                <router-link :to="{name: 'ListWriterBooks', params: { id: writer.id }}">{{writer.name}}</router-link>
            </li>
        </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListWriters",
    data() {
      return {
        writers: []
      };
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
      }
    },
    mounted() {
      this.getWriters();
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