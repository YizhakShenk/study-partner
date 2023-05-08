const Rate = require('../models/Rate');
const RateService = require('../services/rateService');

const addRate = async (req, res) => {
    try {
        const answer = await RateService.addRate(req);
        if (answer.message !== undefined) {
            throw new Error(answer.message);
        }
        res.status(200).send(answer);
    }
    catch (err) {
        console.log(err);
        res.status(401).send(err.message);
    }
}

const getRate = async (req, res) => {
    try {
        const answer = await RateService.getrate(req);
        if (answer.message !== undefined) {
            throw new Error(answer.message);
        }
        res.status(200).send(answer);
    }
    catch (err) {
        console.log(err);
        res.status(404).send(err.message);
    }
}

const getRates = async (req, res) => {
    try {
        const rates = await RateService.getRates();
        if (rates.message !== undefined) {
            throw new Error(rates.message);
        }
        res.status(200).send(rates);
    }
    catch (err) {
        console.log(err);
        res.status(404).send(err.message);
    }
}

const updateRate = async (req, res) => {
    try {
        const answer = await RateService.updateRate(req);
        if (answer.message !== undefined) {
            throw new Error(answer.message);
        }
        res.status(200).send(answer);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }

}

// const deleteRate = async (req, res) => {
//     try {
//         const { id } = req.body;
//         const answer = await RateService(req);
//         if (answer.message!== undefined) {
//             throw new Error(answer.message)
//         }
//         res.status(200).send(answer);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(400).send(err);
//     }
// }


module.exports = {
    addRate,
    getRate,
    getRates,
    updateRate,
}

