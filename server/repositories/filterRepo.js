const { Op } = require('sequelize');
const PostModel = require('../models/Post');

const filter = async ({ subject, date, time,matched }) => {
    try {
        const answer = await PostModel.findAll(
            {
                where: {
                    [Op.and]: [
                        subject && { sub_category:subject},
                        date && { date_from: { [Op.lte]: date } },
                        date && { date_to: { [Op.gte]: date } },
                        time && { time_from: { [Op.lte]: time } },
                        time && { time_to: { [Op.gte]: time } },
                        !matched && {matched: -1},
                    ]   
                },
                order:["matched","date_from"]
            });
        return answer
    }
    catch (err) {
        console.log(err);
        return err;
    }
}











module.exports = {
    filter,
}