<template>
    <div class="container-fluid" id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="item navbar-brand" to="/listBooks">Витрина книг</router-link>
        <router-link class="item navbar-brand" to="/library">Библиотека</router-link>
        <div v-if="currentUser && currentUser.role_id===1">
          <router-link class="item navbar-brand" to="/administratorPanel">Панель администратора</router-link>
        </div>
        <div v-if="currentUser">
            <router-link class="item navbar-brand" :to="{name: 'UserWallet', params: { id: currentUser.wallet_id }}">Кошелёк</router-link>
            <router-link class="item navbar-brand" to="/profile">
                {{ currentUser.username }}
            </router-link>
            <a href @click.prevent="logOut">
                Выйти
            </a>
        </div>
        <div v-else>
            <router-link class="item navbar-brand" to="/login">
                Войти
            </router-link>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
    export default {
      name: "NavBar",
      data() {
          return {};
      },
      computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
      },
      methods: {
          logOut() {
              this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
              window.location.href = '/login'; // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
          }
      }
    };
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>