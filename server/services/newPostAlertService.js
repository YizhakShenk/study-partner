const CLIENT_URL = process.env.CLIENT_URL;
const newPostAlertRepo = require('../repositories/newPostAlertRepo');
const userRepo = require('../repositories/userRepo');
const notificationRepo = require('../repositories/notificationRepo');
const { transferMail } = require('../utilities/mailer/mailer');

const addAlert = async (req) => {
    try {
        const { user_id, sub_category, date, time } = req.body;
        const alert = await newPostAlertRepo.getAlert(user_id, sub_category, date, time);
        if (alert) {
            throw new Error("alert already exist");
        }
        const result = await newPostAlertRepo.addAlert(user_id, sub_category||null, date||null, time|null);
        console.log({result});
        return result;
    }
    catch (err) {
        console.error(err)
        return err;
    }
}

const getAlert = async () => {
    try {
        const result = newPostAlertRepo.getAlert(req)
        return result;
    }
    catch (err) {
        console.error(err)
        return err;
    }
}

const getMatchedAlerts = async (sub_category, dateFrom, dateTo, timeFrom, timeTo) => {
    try {
        const result = newPostAlertRepo.getMatchedAlerts(sub_category, dateFrom, dateTo, timeFrom, timeTo)
        return result;
    }
    catch (err) {
        console.error(err)
        return err;
    }
}

const handleSendAlerts = async (alerts) => {
    const title = "someone posted a post you might interesting in";
    const message = "someone posted a post that is match with your previous search in the site."
    const url = `${CLIENT_URL}` //needs to complete edit
    const emailsArray = [];
    await alerts.forEach(async (item) => {
        const user = await userRepo.getOneUser(null, user_id);
        console.log('user >>>>>>' ,user );
        if (user) {
            emailsArray.push(user.email);
            await notificationRepo.addNotification(user.id, title, message, url);
        }
    });
    const strEmails = emailsArray.toString();
    console.log('//////////////////////////////////////////email s');
    console.log(strEmails);
    console.log('//////////////////////////////////////////email e');
    const htmlMessage = `<p>${message} click <a href=${url}> here </a>to view post</p>`//needs to complete edit
    await transferMail(strEmails, title, null, htmlMessage);
    emailDestination, titleMessage, bodyMessage, htmlBody
}

module.exports = {
    addAlert,
    getAlert,
    getMatchedAlerts,
    handleSendAlerts,
}