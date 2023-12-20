<template>
    <div class="container-fluid" v-if="subscriptions">
        <h4>Виды подписок</h4>
        <ul class="list-group list-group-horizontal" v-for="(subscription, indexsubscription) in subscriptions"
            :key="indexsubscription">
            <li class="col-4 list-group-item d-flex flex-column justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div>{{ subscription.name }}</div>
                    <span class="subscription-description">{{ getSubscriptionDescription(subscription) }}</span>
                </div>
            </li>
            <li class="col-3 list-group-item d-flex justify-content-between align-items-start">
                <button class="btn btn-primary" v-on:click="buySubscription(subscription)">Купить</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
import http from "../../http-common";

export default {
    name: "ListSubscriptions",
    data() {
        return {
            subscriptions: [],
            subscription: {
                name: null,
            },
            wallet: null
        };
    },
    computed: {
        CurrentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        getSubscriptions() {
            http
                .get("/listSubscriptions")
                .then((response) => {
                    this.subscriptions = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getWallet() {
            console.log(this.$store.state.auth.user);
            if (this.$store.state.auth.user && this.$store.state.auth.user.wallet_id) {
                http
                    .get("/wallet/" + this.$store.state.auth.user.wallet_id)
                    .then(response => {
                        this.wallet = response.data;
                        console.log(this.wallet);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                console.log('Ошибка: отсутствует информация о пользователе или wallet_id');
            }
        },
        buySubscription(subscription) {
            let price = 0;
            switch (subscription.name) {
                case 'Стандартная':
                    price = 0;
                    break;
                case 'Студенческая':
                    price = 70;
                    break;
                case 'Премиум':
                    price = 200;
                    break;
                default:
                    price = 0;
                    break;
            }

            if (this.wallet && this.wallet.money >= price) {
                console.log("Купить подписку:", subscription.name);
                var data = {
                    money: this.wallet.money - price
                };

                http
                    .post("/updateWallet/" + this.$store.state.auth.user.wallet_id, data)
                    .then(() => {
                        let updatedUserData = {
                            subscription_id: subscription.id 
                        };
                        http
                            .post("/updateUserSubscription/" + this.$store.state.auth.user.id, updatedUserData)
                            .then(() => {
                                this.$router.go(0);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                console.log("Недостаточно средств для покупки подписки");
            }
        },
        getSubscriptionDescription(subscription) {
            switch (subscription.name) {
                case 'Стандартная':
                    return 'Описание подписки 1';
                case 'Студенческая':
                    return 'Описание подписки 2';
                case 'Премиум':
                    return 'Описание подписки 3';
                default:
                    return 'Описание по умолчанию';
            }
        },
    },
    mounted() {
        this.getSubscriptions();
        this.getWallet();
    },
};
</script>
  
<style></style>
  