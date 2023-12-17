<template>
    <div class="container" v-if="this.genre">
        <form class="row g-3" @submit="updateName">
            <h4 class="col-auto">
                Название:
            </h4>
            <div class="col-4">
                <input class="form-control" type="text" name="name" id="name" placeholder="Название жанра" required v-model="genre.name">
            </div>
            <div class="col-auto">
                <input class="btn btn-primary" type="submit" value="Обновить название жанра">
            </div>
        </form>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "GenreDetails",
        props: ['id'],
        data() {
            return {
                genre: null
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getGenre() {
                http
                    .get("/genre/"+this.id)
                    .then(response => {
                        this.genre = response.data;
                        //console.log(this.genre);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            updateName(e) {
                e.preventDefault();
                var data = {
                    name: this.genre.name
                }
                http
                    .post("/updateGenre/"+this.id,data)
                    .then(() => { 
                        this.$router.push('/listGenresAdministrator'); 
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        mounted() {
            if (this.currentUser.role_id!=1) {
                this.$router.push('/');
            }
            else {
                this.getGenre();
            }
        }
    };
</script>

<style>

</style>