import http from "../http-common";

function getUserBoard() {
    // Обращаемся к серверу для проверки, авторизован ли пользователь.
    return http.get("/userBoard");
}

export default {
    getUserBoard: getUserBoard
};