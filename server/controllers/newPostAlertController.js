const newPostAlertService = require('../services/newPostAlertService');

const addAlert = async (req,res) => {
    try {
        const result =await newPostAlertService.addAlert(req)
        if(result.message !== undefined){
            throw new Error(result.message)
        }
        res.status(200).send(result)
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err.message)
    }
}

const getAlert = async () => {
    try {
        const result =await newPostAlertService.getAlert(req)
        if(result.message!== undefined){
            throw Error(result.message)
        }
        res.status(200).send(result)
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err.message)
    }
}

module.exports = {
    addAlert,
    getAlert,
}