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

const getMatchedAlert = async (sub_category,dateFrom,dateTo,timeFrom,timeTo) => {
    try {
        const result = await NewPostAlert.findAll({
            where: {
                    [Op.and]: [
                        sub_category && { sub_category},
                        // date && { date: { [Op.lte]: date } },
                        // date && { date: { [Op.gte]: date } },
                        // time && { time: { [Op.lte]: time } },
                        // time && { time: { [Op.gte]: time } },
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