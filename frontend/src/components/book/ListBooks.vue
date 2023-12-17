<template>
    <div class="container" v-if="books">
      <h4>Витрина книг</h4>
      <ul class="list-group list-group-horizontal" v-for="(book, index) in books" :key="index">
        <li class="col-4 list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold"><router-link :to="{name: 'BookDetails', params: { id: book.id }}">{{book.name}}</router-link></div>
            <div>
              <span v-for="(writer, indexwriter) in book.book_writers" :key="indexwriter"> <router-link class="navbar-brand" :to="{name: 'ListWriterBooks', params: { id: writer.writer.id }}">{{writer.writer.name}}</router-link>&nbsp;</span>
            </div>
            <div>
              <span v-for="(genre, indexgenre) in book.book_genres" :key="indexgenre"><router-link class="navbar-brand" :to="{name: 'ListGenreBooks', params: { id: genre.genre.id }}">{{genre.genre.name}}</router-link>&nbsp;</span>
            </div>
          </div>
          <span v-if="book.cost===0" class="badge bg-primary rounded-pill">Бесплатно</span>
          <span v-else class="badge bg-primary rounded-pill">{{book.cost}} руб.</span>
        </li>
        <li class="col-3 list-group-item d-flex justify-content-between align-items-start">
<!--          <input v-if="book.user_books.length!=0 && book.user_books[0].user_id===currentUser.id" type="submit" class="btn btn-secondary btn-lg" disabled value="Уже в библиотеке" style="width: 100%">-->
<!--          <input v-else-if="book.cost===0" class="btn btn-primary" type="submit" value="Добавить в библиотеку" style="width: 100%">-->
<!--          <input v-else class="btn btn-primary" type="submit" value="Купить книгу" style="width: 100%">-->
          <button
            v-if="book.user_books.length !== 0 && book.user_books[0].user_id === currentUser.id"
            class="btn btn-secondary btn-lg"
            disabled
            style="width: 100%">
            Уже в библиотеке
          </button>
          <button
            v-else-if="book.cost === 0"
            class="btn btn-primary"
            @click="addToLibrary(book)"
            style="width: 100%">
            Добавить в библиотеку
          </button>
          <button
            v-else
            class="btn btn-primary"
            @click="purchaseBook(book)"
            style="width: 100%">
            Купить книгу
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListBooks",
    data() {
      return {
        books: []
      };
    },
    computed: {
      currentUser() {
          return this.$store.state.auth.user;
      }
    },
    methods: {
      getBooks() {
        http
            .get("/listBooks/"+this.$store.state.auth.user.id)
            .then(response => {
              this.books = response.data;
              //console.log(this.books[1].user_books[0].user_id);
            })
            .catch(e => {
              console.log(e);
            });
      },
      getBooksWithoutUser() {
        http
            .get("/listBooks")
            .then(response => {
              this.books = response.data;
              //console.log(this.books[1].user_books[0].user_id);
            }).catch(e => {
              console.log(e);
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
      }
    },
    mounted() {
      if (this.currentUser) {
        this.getBooks();
      }
      else {
        this.getBooksWithoutUser();
      }
    }
  }
  </script>
  
  <style>
  router-link {
    text-decoration: none;
    color: black;
  }
  router-link:hover {
    text-decoration: underline;
  }
  </style>