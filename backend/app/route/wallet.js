module.exports = (app) => {

    const wallet = require('../controller/wallet.js');
    
    app.post('/api/updateWallet/:id', wallet.updateWallet);   

    app.get('/api/wallet/:id', wallet.findById);
};
