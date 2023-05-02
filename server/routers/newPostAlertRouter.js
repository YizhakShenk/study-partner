const newPostAlertRouter = require('express').Router();
const {addAlert} = require('../controllers/newPostAlertController');


newPostAlertRouter.post('/add-alert',addAlert);       

module.exports = newPostAlertRouter; 

