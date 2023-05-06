const { Op,  Sequelize } = require('sequelize');
const { NewPostAlert } = require('../models/Models');

const addAlert = async (user_id, sub_category, date, time) => {
    try {
        console.log(user_id);
        await NewPostAlert.create({ user_id, sub_category, date, time })
        return "Alert added"
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


const getAlert = async (user_id, sub_category, date, time) => {
    try {
        const result = await NewPostAlert.findOne({
            where: {
                [Op.and]: [
                    sub_category && { sub_category: { [Op.like]: sub_category } },
                    user_id && { user_id },
                    date && { date },
                    time && { time }
                ]
            }
        });
        return result;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


const getMatchedAlerts = async (sub_category, dateFrom, dateTo, timeFrom, timeTo) => {
    try {
        const result = await NewPostAlert.findAll({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { sub_category: { [Op.eq]: null } },
                            Sequelize.where(
                                Sequelize.fn('JSON_CONTAINS', Sequelize.col('sub_category'), JSON.stringify([sub_category])),
                                true
                            ),
                        ]
                    },
                    {
                        [Op.or]: [
                            { date: { [Op.eq]: null } },
                            {
                                [Op.and]: [
                                    { date: { [Op.gte]: dateFrom } },
                                    { date: { [Op.lte]: dateTo } },
                                ]
                            }
                        ]
                    },
                    {
                        [Op.or]: [
                            { time: { [Op.eq]: 0 } },
                            {
                                [Op.and]: [
                                    { time: { [Op.gte]: timeFrom } },
                                    { time: { [Op.lte]: timeTo } },
                                ]
                            }
                        ]
                    },


                ]
            }
        });
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
    getMatchedAlerts,
}