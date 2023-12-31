import { createWebHistory, createRouter } from "vue-router";

import ListBooks from "./components/book/ListBooks.vue";
import Book from "./components/book/Book.vue"

import AdministratorPanel from "./components/AdministratorPanel.vue";
import ListWritersAdministrator from "./components/writerAdministrator/ListWriters.vue";
import WriterAdministrator from "./components/writerAdministrator/Writer.vue";
import ListGenresAdministrator from "./components/genresAdministrator/ListGenres.vue";
import GenreAdministrator from "./components/genresAdministrator/Genre.vue";
import ListBooksAdministrator from "./components/bookAdministrator/ListBooks.vue";
import BookAdministrator from "./components/bookAdministrator/Book.vue";
import AddBook from "./components/bookAdministrator/AddBook.vue";

import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";
import store from "./store/index";

import Library from "./components/library/Library.vue";

import Wallet from "./components/wallet/Wallet.vue";

import SearchPanel from "./components/Search.vue"
import ListWriters from "./components/writer/ListWriters.vue";
import ListWriterBooks from "./components/book/WriterBook.vue";
import ListGenres from "./components/genre/ListGenres.vue";
import ListGenreBooks from "./components/genre/GenreBook.vue";

import Subscriptions from './components/subscription/ListSubscriptions.vue';

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
        name: "ListWritersAdministrator",
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
        name: "ListGenresAdministrator",
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
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя",
            requiredAuth: true
        }
    },
    {
        path: "/library",
        name: "UserLibrary",
        component: Library,
        meta: {
            title: "Библиотека",
            requiredAuth: true
        }
    },
    {
        path: "/wallet/:id",
        name: "UserWallet",
        props: true,
        component: Wallet,
        meta: {
            title: "Кошелёк",
            requiredAuth: true
        }
    },
    {
        path: "/listWriters",
        name: "ListWriters",
        component: ListWriters,
        meta: {
            title: "Список писателей"
        }
    },
    {
        path: "/search",
        name: "SearchPanel",
        component: SearchPanel,
        meta: {
            title: "Поиск"
        }
    },
    {
        path: "/listGenreBooks/:id",
        name: "ListGenreBooks",
        props: true,
        component: ListGenreBooks,
        meta: {
            title: "Витрина книг жанра"
        }
    },
    {
        path: "/listGenres",
        name: "ListGenres",
        component: ListGenres,
        meta: {
            title: "Список жанров"
        }
    },
    {
        path: "/listSubscriptions",
        name: "ListSubscriptions",
        component: Subscriptions,
        meta: {
            title: "Подписки"
        }
    }
];

const router = createRouter({
    history: createWebHistory(), //будет создаваться история посещений веб-страниц
    routes, //маршрутизация
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({ path: "/login" });
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;
