module.exports = (app) => {

    const user = require('../controller/user.js');
    
    app.get('/api/listUsers', user.findAll);

    app.get('/api/user/:id', user.findById);

    app.post('/api/updateUserSubscription/:id', user.updateUserSubscription);


};