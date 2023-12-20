module.exports = (app) => {

    const subscription = require('../controller/subscription.js');
    
    app.get('/api/listSubscriptions', subscription.findAll);

    app.get('/api/subscription/:id', subscription.findById);
};