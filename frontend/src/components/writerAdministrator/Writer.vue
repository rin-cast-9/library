<template>
    <div class="container-fluid" v-if="this.writer">
        <form class="row g-3" @submit="updateName">
            <h4 class="col-auto">
                ФИО:
            </h4>
            <div class="col-4">
                <input class="form-control" type="text" name="name" id="name" placeholder="ФИО" required v-model="writer.name">
            </div>
            <div class="col-auto">
                <input class="btn btn-primary" type="submit" value="Обновить имя">
            </div>
        </form>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "WriterDetails",
        props: ['id'],
        data() {
            return {
                writer: null
            }
        },
        methods: {
            getWriter() {
                http
                    .get("/writer/"+this.id)
                    .then(response => {
                        this.writer = response.data;
                        //console.log(this.writer);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            updateName(e) {
                e.preventDefault();
                var data = {
                    name: this.writer.name
                }
                http
                    .post("/updateWriter/"+this.id,data)
                    .then(() => { 
                        this.$router.push('/listWritersAdministrator'); 
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        mounted() {
            this.getWriter();
        }
    };
</script>

<style>

</style>