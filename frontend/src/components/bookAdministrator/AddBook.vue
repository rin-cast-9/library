<template>
    <div class="container-fluid" v-if="genres">
        <h4>Добавление книги</h4>
        <form @submit="addBook">
            <div>
                <input type="text" name="name" id="name" placeholder="Название книги" required v-model="book.name">
            </div>
            <div>
                <select class="form-select" multiple aria-label="multiple select example" required v-model="writers.id" style="@media (min-width: 768px) { height: calc(4 * 38px)}">
                    <option value="" disabled>Выберите писателей</option>
                    <option v-for="writer in writers" v-bind:key="writer.id" v-bind:value="writer.id">
                        {{writer.name}}
                    </option>
                </select>
            </div>
            <div>
                <select class="form-select" multiple="multiple" aria-label="multiple select example" required v-model="genres.id" size="10">
                    <option value="" disabled>Выберите жанры</option>
                    <option v-for="genre in genres" v-bind:key="genre.id" v-bind:value="genre.id">
                        {{genre.name}}
                    </option>
                </select>
            </div>
            <div>
                <input type="number" name="cost" id="cost" placeholder="Цена" v-model="book.cost">
            </div>
            <div>
                <input type="submit" value="Добавить">
            </div>
        </form>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddBook",
        data() {
            return {
                book: {
                    name: "",
                    cost: 0,
                },
                writers: [],
                genres: []
            };
        },
        methods: {
            addBook(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                //console.log(this.genres.id);
                var data = {
                    name: this.book.name,
                    cost: this.book.cost,
                    writers: this.writers.id,
                    genres: this.genres.id
                };
                //console.log(data);
                http
                    .post("/addBook", data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listBooksAdministrator'); // переходим к списку студентов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            getWriters() { // получаем список писателей
                http
                    .get("/writers")
                    .then(response => {
                        this.writers = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getGenres() {
                http
                    .get("/genres")
                    .then(response => {
                        this.genres = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted(){ // при монтировании компонента подгружаем список групп
            this.getWriters();
            this.getGenres();
        }
    }
</script>