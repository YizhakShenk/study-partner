const NotificationModel = require('../models/Notifications');

const addNotification = async (user_id, title,message,url) => {
    await NotificationModel.create({ user_id,title, message,url})
    return 'notification added successfull';
}


const updateNotification = async (id,has_readed) => {
    await NotificationModel.update({has_readed},{where:{id}});
    return 'notification updated successfull';
}


module.exports = {
    addNotification,
    updateNotification,
}