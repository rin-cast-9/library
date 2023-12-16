<template>
    <div class="container-fluid" v-if="this.book">
        <h4>Информация о книге</h4>
        <form class="row g-3" @submit="updateName">
            <h4 class="col-auto">
                Название:
            </h4>
            <div class="col-4">
                <input class="form-control" type="text" name="name" id="name" placeholder="Название" required v-model="book[0].name">
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
                <input class="form-control" type="number" name="cost" id="cost" placeholder="Цена" required v-model="book[0].cost">
            </div>
            <div class="col-auto">
                <input class="btn btn-primary" type="submit" value="Обновить цену">
            </div>
        </form>
        <h5>Авторы:</h5>
        <ul class="list-group">
            <li class="list-group-item" v-for="(writer, indexwriter) in book[0].book_writers" :key="indexwriter"> {{writer.writer.name}} </li>
        </ul> 
        <h5>Жанры:</h5>
        <ul class="list-group">
            <li class="list-group-item" v-for="(genre, indexgenre) in book[0].book_genres" :key="indexgenre"> {{genre.genre.name}} </li>
        </ul> 
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
        methods: {
            getBook() {
                http
                    .get("/book/"+this.id)
                    .then(response => {
                        this.book = response.data;
                        //console.log(this.book);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            updateCost(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    cost: this.book[0].cost
                };
                http
                    .post("/updateCost/" + this.id, data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listBooksAdministrator'); // переходим к списку студентов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            updateName(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.book[0].name
                };
                http
                    .post("/updateBookName/" + this.id, data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listBooksAdministrator'); // переходим к списку студентов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            deleteBook() {
                http
                    .post("/deleteBook/" + this.id)
                    .then(() => {
                        this.$router.push('/listBooksAdministrator'); // переходим к списку студентов
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getBook();
        }
    };
</script>

<style>

</style>