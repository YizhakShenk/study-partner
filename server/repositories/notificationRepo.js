const NotificationModel = require('../models/Notifications');

const addNotification = async (user_id, title,message,url) => {
    NotificationModel.create({ user_id,title, message,url})
    return 'notification added successfull';
}



const updateNotification = async (id,has_readed) => {
    NotificationModel.update({has_readed},{where:{id}});
    return 'notification updated successfull';
}


module.exports = {
    addNotification,
    updateNotification,
}