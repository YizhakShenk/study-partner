const notificationService =require('../services/notificationService');


const addNotification = async (req,res) => {
    try {
        const answer = await notificationService.addNotification(req.body);
        res.status(200).send(answer);
    }
    catch (err) {
        res.status(401).send(err);
    }
}

const updateNotification = async (req,res) => {
    try {
        const answer = await notificationService.updateNotification(req);
        res.status(200).send(answer);
    }
    catch (err) {
        console.log(err);
        res.status(401).send(err);
    }
}


module.exports ={
    addNotification,
    updateNotification
}