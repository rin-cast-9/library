import { createWebHistory, createRouter } from "vue-router";

import ListBooks from "./components/book/ListBooks.vue";
import Book from "./components/book/Book.vue"
import ListBooksAdministrator from "./components/bookAdministrator/ListBooks.vue";
import BookAdministrator from "./components/bookAdministrator/Book.vue";
import AddBook from "./components/bookAdministrator/AddBook.vue";
import ListWriterBooks from "./components/book/WriterBook.vue";
import AdministratorPanel from "./components/AdministratorPanel.vue";
import ListWritersAdministrator from "./components/writerAdministrator/ListWriters.vue";
import WriterAdministrator from "./components/writerAdministrator/Writer.vue";
import ListGenresAdministrator from "./components/genresAdministrator/ListGenres.vue";
import GenreAdministrator from "./components/genresAdministrator/Genre.vue";


const routes = [
    {
        path: "/listBooks", 
        name: "ListBooks", 
        alias: "/books",
        component: ListBooks,
        meta: {
            title: "Витрина книг"
        }
    },
    {
        path: "/book/:id",
        name: "BookDetails",
        props: true,
        component: Book,
        meta: {
            title: "Книга"
        }
    },
    {
        path: "/listBooksAdministrator",
        name: "ListBooksAdministrator",
        component: ListBooksAdministrator,
        meta: {
            title: "Список книг"
        }
    },
    {
        path: "/bookAdministrator/:id",
        name: "BookDetailsAdmin",
        props: true,
        component: BookAdministrator,
        meta: {
            title: "Книга"
        }
    },
    {
        path: "/addBook",
        name: "AddBook",
        component: AddBook,
        meta: {
            title: "Добавление книги"
        }
    },
    {
        path: "/listWriterBooks/:id",
        name: "ListWriterBooks",
        props: true,
        component: ListWriterBooks,
        meta: {
            title: "Витрина книг писателя"
        }
    },
    {
        path: "/administratorPanel",
        name: "AdministratorPanel",
        component: AdministratorPanel,
        meta: {
            title: "Настройки магазина"
        }
    },
    {
        path: "/listWritersAdministrator",
        name: "ListWriters",
        component: ListWritersAdministrator,
        meta: {
            title: "Список писателей"
        }
    },
    {
        path: "/writerAdministrator/:id",
        name: "WriterDetails",
        props: true,
        component: WriterAdministrator,
        meta: {
            title: "Писатель"
        }
    },
    {
        path: "/listGenresAdministrator",
        name: "ListGenres",
        component: ListGenresAdministrator,
        meta: {
            title: "Список жанров"
        }
    },
    {
        path: "/genreAdministrator/:id",
        name: "GenreDetails",
        props: true,
        component: GenreAdministrator,
        meta: {
            title: "Жанр"
        }
    }
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;