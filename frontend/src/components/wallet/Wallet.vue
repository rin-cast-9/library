<template>
    <div class="container" v-if="this.wallet">
        <h4>Дорогой пользователь {{currentUser.username}}!</h4>
        <h4>Баланс вашего кошелька составляет {{this.wallet.money}} руб.</h4>
        <button class="btn btn-primary" v-on:click="plusThousand()">+1000 руб.</button>
    </div>
</template>
  
<script>
    import http from "../../http-common.js";
    export default {
      name: "UserWallet",
      props: ['id'],
      data() {
            return {
                wallet: null,
            };
        },
      computed: {
          currentUser() {
              return this.$store.state.auth.user;
          }
      },
      methods: {
        plusThousand() {
            var data = {
                money: this.wallet.money + 1000
            }
            console.log(this.wallet);
            http
                .post("/updateWallet/"+this.id,data)
                .then(() => {
                    this.$router.go(0);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getWallet() {
            http
                .get("/wallet/"+this.id)
                .then(response => {
                    this.wallet = response.data;
                    console.log(this.wallet);
                })
                .catch(err => {
                    console.log(err);
                })
        }
      },
      mounted() {
        this.getWallet();
      }
    };
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>