import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListBooks from "./components/book/ListBooks.vue";
import Book from "./components/book/Book.vue"
import ListBooksAdministrator from "./components/bookAdministrator/ListBooks.vue";
import BookAdministrator from "./components/bookAdministrator/Book.vue";
import AddBook from "./components/bookAdministrator/AddBook.vue";
import ListWriterBooks from "./components/book/WriterBook.vue";

// определяем маршруты
const routes = [
    {
        path: "/listBooks", // указание маршрута, по которому будем переходить к списку учебных дисциплин
        name: "ListBooks", // имя маршрута
        alias: "/books", // указание дополнительного маршрута
        component: ListBooks, // компонент, на основании которого будет отрисовываться страница
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