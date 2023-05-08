const { Op } = require('sequelize');
const Models = require('../models/Models');


const addRate = async (user_id,rater_name ,rater_id, note, rate_score) => {
    try {
        // const user = await Models.UserModel.findOne({ where: { rater_id, user_id, note } });
        // if (!user) {
        //     throw new Error("user does not exist");
        // }
        await Models.RateModel.create({ user_id,rater_name , rater_id, note, rate_score });
        return "rate added";
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
const getRates = async () => {
    try {
        const answer = await Models.RateModel.findAll();
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getRate = async (id, rater_id) => {
    try {
        let answer
        if (id !== undefined) {
            answer = await Models.RateModel.findOne({ where: { id } });
            return answer;
        }
        else {
            answer = await Models.RateModel.findOne({ where: { rater_id } });
            return answer;
        }
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getExistRate = async (user_id, rater_id) => {
    try {
        const answer = await Models.RateModel.findOne({ where: { [Op.and]: [{ user_id, rater_id }] } })
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const updateRate = async (user_id, rater_id, note, rate_score) => {
    try {
        const result = await Models.RateModel.update({ note, rate_score }, { where: { user_id:user_id, rater_id:rater_id } });
        if (!result[0]) {
            throw new Error('rate has not updated');
        }
        return "rate updated";
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

// const deleterate = async (id) => {
//     try {
//         const result = await Models.RateModel.destroy({ where: { id: id } });
//         if (!result) {
//             throw new Error('rate has not deleted');
//         }
//         return "rate deleted";
//     }
//     catch (err) {
//         console.log(err);
//         return err;
//     }
// }

module.exports = PostRepo = {
    addRate,
    getRates,
    getRate,
    getExistRate,
    updateRate,
}