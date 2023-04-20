const notificationRouter = require('express').Router()
const {updateNotification} = require('../controllers/notificationController');


notificationRouter.put('/update',updateNotification);



module.exports = notificationRouter;