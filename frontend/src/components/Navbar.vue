<template>
    <div class="container-fluid" id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="item navbar-brand" to="/listBooks">Витрина книг</router-link>
        <router-link class="item navbar-brand" to="/administratorPanel">Панель администратора</router-link>
      </nav>
    </div>
  </template>
  
  <script>
      export default {
          name: "NavBar",
          data() {
              return {
  
              };
          }
      };
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>