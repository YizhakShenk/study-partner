const { Op, where, Sequelize } = require('sequelize');
const { NewPostAlert } = require('../models/Models');

const addAlert = async (user_id, sub_category, date, time) => {
    try {
        NewPostAlert.create({ user_id, sub_category, date, time })
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
                    sub_category && { sub_category },
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


// const { Op } = require('sequelize');

// // Define the value to search for
// const option = 'Eat_Food';

// // Search the database for rows that contain the specified value in the `hobbies` column
// const rows = await Notification.findAll({
//   where: {
//     hobbies: {
//       [Op.like]: `%${option}%`,
//     },
//   },
// });

// // Log the matching rows to the console
// console.log(rows);

const getMatchedAlerts = async (sub_category, dateFrom, dateTo, timeFrom, timeTo) => {
    try {
        const result = await NewPostAlert.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('JSON_CONTAINS', Sequelize.col('sub_category'), JSON.stringify([sub_category])),
                        true
                    ),
                    { date: { [Op.gte]: dateFrom } },
                    { date: { [Op.lte]: dateTo } },
                    { time: { [Op.gte]: timeFrom } },
                    { time: { [Op.lte]: timeTo } },
                ]
            }
            
            
        });
        console.log({ result });
        //     where: {
        //         [Op.and]: [
        //             sub_category && { [Op.contains]: sub_category }, /// contain....
        //             // { date: { [Op.gte]: dateFrom } },
        //             // { date: { [Op.lte]: dateTo } },
        //             // { time: { [Op.gte]: timeFrom } },
        //             // { time: { [Op.lte]: timeTo } },
        //         ]
        //     }
        // })

        console.log({ result });
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