<template>
    <div class="container-fluid" v-if="this.subscription">

    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "SubscriptionDetails",
        props: ['id'],
        data() {
            return {
                subscription: null
            }
        },
        methods: {
            getSubscription() {
                http
                    .get("/subscription/"+this.id)
                    .then(response => {
                        this.subscription = response.data;
                        //console.log(this.subscription);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
        },
        mounted() {
            this.getSubscription();
        }
    };
</script>

<style>

</style>