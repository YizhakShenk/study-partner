const NotificationModel = require('../models/Notifications');

const addNotification = async (user_id, message,url) => {
    NotificationModel.create({ user_id, message,url})
    return 'notification added successfull';
}



const updateNotification = async (id,has_readed) => {
    console.log('/////////////////////////////////////');
    console.log('called');
    NotificationModel.update({has_readed},{where:{id}});
    return 'notification updated successfull';
}


module.exports = {
    addNotification,
    updateNotification,
}