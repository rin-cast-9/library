<template>
    <div v-if="this.book">
        <h1>{{book[0].name}}</h1>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "BookDetails",
        props: ['id'],
        data() {
            return {
                book: null
            }
        },
        methods: {
            getBook() {
                http
                    .get("/book/"+this.id)
                    .then(response => {
                        this.book = response.data;
                        console.log(this.book);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        mounted() {
            this.getBook();
        }
    };
</script>

<style>

</style>