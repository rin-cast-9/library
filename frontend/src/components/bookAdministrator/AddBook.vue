<template>
    <div class="container" v-if="genres">
        <h4>Добавление книги</h4>
        <form @submit="addBook">
            <div>
                <input class="form-control" type="text" name="name" id="name" placeholder="Название книги" v-model="book.name" required>
            </div>
            <div>
                <select class="form-select" multiple="multiple" aria-label="multiple select example" v-model="writers.id" size="10" >
                    <option value="" disabled>Выберите писателей</option>
                    <option v-for="writer in writers" v-bind:key="writer.id" v-bind:value="writer.id">
                        {{writer.name}}
                    </option>
                </select>
            </div>
            <div>
                <select class="form-select" multiple="multiple" aria-label="multiple select example" v-model="genres.id" size="10" >
                    <option value="" disabled>Выберите жанры</option>
                    <option v-for="genre in genres" v-bind:key="genre.id" v-bind:value="genre.id">
                        {{genre.name}}
                    </option>
                </select>
            </div>
            <div>
                <input class="form-control" type="number" name="cost" id="cost" placeholder="Цена" v-model="book.cost">
            </div>
            <div>
                <input class="btn btn-primary" type="submit" value="Добавить книгу">
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
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            addBook(e) {
                e.preventDefault();
                //console.log(this.genres.id);
                var data = {
                    name: this.book.name,
                    cost: this.book.cost,
                    writers: this.writers.id,
                    genres: this.genres.id
                };
                //console.log(data);
                if (data.genres==undefined || data.genres.length ==0) {
                    data.genres = null;
                    //console.log("genres=null");
                }
                if (data.writers==undefined || data.writers.length ==0) {
                    data.writers = null;
                    //console.log("writers=null");
                }
                console.log(data);
                http
                    .post("/addBook", data)
                    .then(() => {
                        this.$router.push('/listBooksAdministrator');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getWriters() { // получаем список писателей
                http
                    .get("/listWriters")
                    .then(response => {
                        this.writers = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getGenres() { // получаем список жанров
                http
                    .get("/listGenres")
                    .then(response => {
                        this.genres = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted(){
            if (this.currentUser.role_id!=1) {
                this.$router.push('/');
            }
            else {
                this.getWriters();
                this.getGenres();
            }
        }
    }
</script>