var db = require('../config/db.config.js');
var User = db.user;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    User.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        }).catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req,res) => {
    User.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res,object);
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        })
};

exports.updateUserSubscription = (req, res) => {
    const userId = req.params.id; // Получаем ID пользователя из запроса
    const newSubscriptionId = req.body.subscription_id; // Получаем новый subscription_id из тела запроса

    // Получаем текущую дату
    const currentDate = new Date();

    User.findByPk(userId)
        .then(user => {
            if (user) {
                // Обновляем subscription_id и subscription_date у пользователя
                user.subscription_id = newSubscriptionId;
                user.subscription_date = currentDate;

                return user.save(); // Сохраняем изменения в базе данных
            } else {
                throw new Error('Пользователь не найден');
            }
        })
        .then(updatedUser => {
            globalFunctions.sendResult(res, updatedUser); // Отправляем обновленные данные пользователя
        })
        .catch(err => {
            globalFunctions.sendError(res, err); // Отправляем ошибку, если что-то пошло не так
        });
};