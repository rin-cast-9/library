<template>
    <div class="container" v-if="this.book">
        <h4>Информация о книге</h4>
        <form class="row g-3" @submit="updateName">
            <h4 class="col-auto">
                Название:
            </h4>
            <div class="col-4">
                <input class="form-control" type="text" name="name" id="name" placeholder="Название" required v-model="book.name">
            </div>
            <div class="col-auto">
                <input class="btn btn-primary" type="submit" value="Обновить название">
            </div>
        </form>
        <form class="row g-3" @submit="updateCost">
            <h4 class="col-auto">
                Цена:
            </h4>
            <div class="col-auto">
                <input class="form-control" type="number" name="cost" id="cost" placeholder="Цена" required v-model="book.cost">
            </div>
            <div class="col-auto">
                <input class="btn btn-primary" type="submit" value="Обновить цену">
            </div>
        </form>
        <form class="row g-3" @submit="updateDescription">
            <h4 class="col-auto">
                Описание:
            </h4>
            <div>
                <textarea class="form-control" type="text" name="description" id="description" placeholder="Описание" v-model="book.description">

                </textarea>
            </div>
            <div class="col-auto">
                <input class="btn btn-primary" type="submit" value="Обновить описание">
            </div>
        </form>
        <h5>Авторы:</h5>
        <div v-if="book.book_writers.length!=0">
            <ul class="list-group">
                <li class="list-group-item" v-for="(writer, indexwriter) in book.book_writers" :key="indexwriter"> {{writer.writer.name}} </li>
            </ul> 
        </div>
        <div v-else>
            <ul class="list-group">
                <li class="list-group-item"> Авторы отсутствуют </li>
            </ul>
        </div>
        <h5>Жанры:</h5>
        <div v-if="book.book_genres.length!=0">
            <ul class="list-group">
                <li class="list-group-item" v-for="(genre, indexgenre) in book.book_genres" :key="indexgenre"> {{genre.genre.name}} </li>
            </ul>
        </div>
        <div v-else>
            <ul class="list-group">
                <li class="list-group-item"> Жанры отсутствуют </li>
            </ul>
        </div> 
        <div>
            <button class="btn btn-danger" v-on:click="deleteBook()">Удалить книгу</button>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "BookDetailsAdmin",
        props: ['id'],
        data() {
            return {
                book: null
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getBook() {
                http
                    .get("/book/"+this.id)
                    .then(response => {
                        this.book = response.data;
                        //console.log(this.book[0].book_genres.length);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            updateCost(e) {
                e.preventDefault();
                var data = {
                    cost: this.book.cost
                };
                http
                    .post("/updateCost/" + this.id, data)
                    .then(() => {
                        this.$router.push('/listBooksAdministrator');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateName(e) {
                e.preventDefault();
                var data = {
                    name: this.book.name
                };
                http
                    .post("/updateBookName/" + this.id, data)
                    .then(() => { 
                        this.$router.push('/listBooksAdministrator'); 
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateDescription(e) {
                e.preventDefault();
                var data = {
                    description: this.book.description
                };
                http
                    .post("/updateBookDescription/" + this.id, data)
                    .then(() => { 
                        this.$router.push('/listBooksAdministrator'); 
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteBook() {
                http
                    .post("/deleteBook/" + this.id)
                    .then(() => {
                        this.$router.push('/listBooksAdministrator');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            if (this.currentUser.role_id!=1) {
                this.$router.push('/');
            }
            else {
                this.getBook();
            }
        }
    };
</script>

<style>

</style>