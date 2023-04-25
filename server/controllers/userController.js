const UserService = require('../services/userService');


const addUser = async (req, res) => {
    try {
        const answer = await UserService.addUser(req.body);
        if(answer.message){
            throw new Error(answer.message);
        }
        res.status(200).send(answer);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const answer = await UserService.getAllUsers();
        res.status(200).send(answer);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

const getOneUser = async (req, res) => {
    try {
        const answer = await UserService.getOneUser(req.body);
        if (answer.message) {
            throw new Error(answer.message)
        }
        res.status(200).send(answer);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

const updateUser = async (req,res) => {
    try {
          const answer = await UserService.updateUser(req.body);
          if(answer.message){
            throw new Error(answer.message);
          }
          res.status(200).send('user updated')
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const answer = await UserService.deleteUser(req.body);
        if (answer.message) {
            throw new err(answer.message);
        }
        res.status(200).send(answer);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,

}