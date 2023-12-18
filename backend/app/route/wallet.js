module.exports = (app) => {

    const wallet = require('../controller/wallet.js');
    
    //обновление баланса кошелька
    app.post('/api/updateWallet/:id', wallet.updateWallet);   

    //получение данных кошелька
    app.get('/api/wallet/:id', wallet.findById);
};
