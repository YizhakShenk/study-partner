const { Op } = require('sequelize');
const Models = require('../models/Models');
const rateRepo = require('../repositories/rateRepo');

const addRate = async (req) => {
    const { user_id,rater_name, rater_id, note, rate_score } = req.body;
    try {
        let answer;
        const tempRate = await rateRepo.getExistRate(user_id ,rater_id);
        if(tempRate && tempRate.message !==undefined){
            throw new Error(tempRate.message)
        }
        if (!tempRate ) {
            answer = await rateRepo.addRate(user_id,rater_name ,rater_id, note, rate_score);
        }
        else {
            answer = await rateRepo.updateRate(user_id ,rater_id, note, rate_score);
        }
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getRates = async () => {
    try {
        const answer = await rateRepo.getRates();
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getrate = async (req) => {
    try {
        const { id, rater_id } = req.body;
        const answer = await rateRepo.getrate(id, rater_id);
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


const updateRate = async (req) => {
    try {
        const { user_id, rater_id, note, rate_score } = req.body;
        const result = await rateRepo.updateRate(user_id, rater_id, note, rate_score);
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
    getrate,
    updateRate,
}