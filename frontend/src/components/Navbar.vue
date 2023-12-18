<template>
    <div class="container-fluid" id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse">
          <router-link class="item navbar-brand" to="/listBooks">Витрина книг</router-link>
          <router-link class="item navbar-brand" to="/library">Библиотека</router-link>
          <router-link class="item navbar-brand" to="/search">Поиск</router-link>
          <div v-if="currentUser && currentUser.role_id===1">
            <router-link class="item navbar-brand" to="/administratorPanel">Панель администратора</router-link>
          </div>
          <div v-if="currentUser">
              <router-link v-if="wallet" class="item navbar-brand" :to="{name: 'UserWallet', params: { id: wallet.id }}">
                <button type="button" class="btn btn-primary">
                  Баланс:  <span class="badge bg-secondary">{{wallet.money}}</span>
                </button>
              </router-link>
              <router-link v-else class="item navbar-brand" :to="{name: 'UserWallet', params: { id: currentUser.wallet_id }}">Кошелёк</router-link>
              <router-link class="item navbar-brand" to="/profile">
                  {{ currentUser.username }}
              </router-link>
              <!--<a style="color: black; text-decoration: none;" href @click.prevent="logOut">Выйти</a>-->
              <button class="btn btn-danger" v-on:click="logOut()">Выйти</button>
          </div>
          <div v-else>
              <!--<router-link class="item navbar-brand" to="/login">Войти</router-link>-->
              <button class="btn btn-success" v-on:click="logIn()">Войти</button>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
    import http from "../http-common";
    export default {
      name: "NavBar",
      data() {
          return {
            wallet: null //хранит данные кошелька пользователя
          };
      },
      computed: {
        currentUser() {
          return this.$store.state.auth.user;
        }
      },
      methods: {
          logOut() {
            this.$store.dispatch('auth/logout');
            window.location.href = '/login';
          },
          logIn() {
            window.location.href = '/login';
          }
      },
      mounted() {
        if (!this.wallet && this.currentUser) { //получаем кошелёк, если он не определён и пользователь зарегестрирован
            http
                .get("/wallet/"+this.currentUser.wallet_id)
                .then(response => {
                    this.wallet = response.data;
                    console.log(this.wallet);
                })
                .catch(err => {
                    console.log(err);
                });
        }
      }
    };
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>