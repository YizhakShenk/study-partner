const notificationRepo = require('../repositories/notificationRepo');

const addNotification = async (reqBody) => {

    try {
        const { user_id,title, message ,url } = reqBody;
        const answer = await notificationRepo.addNotification(user_id,title, message,url);
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const updateNotification = async (req) => {
    try {
        const { id,has_readed } = req.body;
        const answer = await notificationRepo.updateNotification(id,has_readed);
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    addNotification,
    updateNotification
}