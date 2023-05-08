const rateRouter = require('express').Router()
const {addRate,getRates,getRate,updateRate} = require('../controllers/rateController');

rateRouter.post('/add',addRate);
rateRouter.post('/get-all',getRates);
rateRouter.post('/get-one',getRate);
rateRouter.post('/update',updateRate);
// rateRouter.post('/delete',deleteRate);

module.exports = rateRouter;