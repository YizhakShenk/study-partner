const { NewPostAlert } = require('../models/Models');

const addAlert = async (email, sub_category, date, time) => {
    try {
        NewPostAlert.create({ email, sub_category, date, time })
        return "Alert added"
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


const getAlert = async (email,sub_category,date,time) => {
    try {
        const result = await NewPostAlert.findOne({where: {email,sub_category,date,time}});        
        return result;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getMatchedAlert = async () => {
    try {
        const result = await NewPostAlert.findOne({
            where: {
                    [Op.and]: [
                        // subject && { sub_category:subject},
                        // date && { date_from: { [Op.lte]: date } },
                        // date && { date_to: { [Op.gte]: date } },
                        // time && { time_from: { [Op.lte]: time } },
                        // time && { time_to: { [Op.gte]: time } },
                    ]
                }
            }
        );
        return result;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    addAlert,
    getAlert,
    getMatchedAlert,
}