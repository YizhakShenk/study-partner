const newPostAlertRepo = require('../repositories/newPostAlertRepo');


const addAlert = async (req) => {
    try {
        const {email,sub_category,date,time} = req.body;
        const result = newPostAlertRepo.addAlert(email,sub_category,date,time)
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

module.exports={
    addAlert,
    getAlert,
}