<template>
    <div v-if="this.writerbooks" class="container-fluid">
      <div v-for="(writer, indexwriter) in writerbooks" :key="indexwriter">
        <h4>Витрина книг автора {{writer.name}}</h4>
        <ul class="list-group list-group-horizontal" v-for="(book, indexbook) in writer.book_writers" :key="indexbook">
            <li class="col-4 list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold"><router-link :to="{name: 'BookDetails', params: { id: book.book.id }}">{{book.book.name}}</router-link></div>
            </div>
            <span v-if="book.book.cost===0" class="badge bg-primary rounded-pill">Бесплатно</span>
            <span v-else class="badge bg-primary rounded-pill">{{book.book.cost}} руб.</span>
            </li>
            <li class="col-2 list-group-item d-flex justify-content-between align-items-start">
            <button
            v-if="book.book.user_books.length !== 0 && book.book.user_books[0].user_id === currentUser.id"
            class="btn btn-secondary btn-lg"
            disabled
            style="width: 100%">
            Уже в библиотеке
          </button>
          <button
            v-else-if="book.book.cost === 0"
            class="btn btn-primary"
            @click="addToLibrary(book.book)"
            style="width: 100%">
            Добавить в библиотеку
          </button>
          <button
            v-else
            class="btn btn-primary"
            @click="purchaseBook(book.book)"
            style="width: 100%">
            Купить книгу
          </button>
            </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListWriterBooks",
    props: ['id'],
    data() {
      return {
        writerbooks: []
      };
    },
    computed: {
      currentUser() {
          return this.$store.state.auth.user;
      }
    },
    methods: {
      getWriterBooksWithoutUser() {
        http
            .get("/listWriterBooks/"+this.id)
            .then(response => {
              this.writerbooks = response.data;
              //console.log(this.writerbooks[0].book_writers);
            })
            .catch(e => {
              console.log(e);
            });
      },
      getWriterBooks() {
        http
            .get(`/listWriterBooks/${this.id}/user/${this.currentUser.id}`)
            .then(response => {
              this.writerbooks = response.data;
              //console.log(this.writerbooks[0].book_writers);
            })
            .catch(e => {
              console.log(e);
            });
      },
      purchaseBook(book) {
        http
            .get(`/wallet/${this.currentUser.wallet_id}`)
            .then(response => {
              const userWallet = response.data;
              const bookCost = book.cost;

              if (userWallet.money >= bookCost) {
                const isConfirmed = window.confirm(`Вы действительно хотите приобрести ${book.name} за ${book.cost} руб?`);

                if (isConfirmed) {
                  this.performPurchase(book, userWallet);
                }
              }
              else {
                alert("У вас недостаточно средств для совершения покупки.")
              }
            })
            .catch(err => {
              console.log("error fetching user's wallet: ", err);
            })
      },
      performPurchase(book, userWallet) {
        const balance = userWallet.money - book.cost;
        http
            .post(`/updateWallet/${userWallet.id}`, {
              money: balance
            })
            .then(() => {
              this.addToLibrary(book);
            })
            .catch(err => {
              console.error("error updating wallet balance: ", err);
            });
      },
            addToLibrary(book) {
        http
            .post("/addBookToLibrary", {
              userId: this.currentUser.id,
              bookId: book.id
            })
            .then(() => {
              this.$router.go(0);
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    mounted() {
      if (this.currentUser) {
        this.getWriterBooks();
      }
      else {
        this.getWriterBooksWithoutUser();
      }
    }
  }
  </script>
  
  <style>
  
  </style>