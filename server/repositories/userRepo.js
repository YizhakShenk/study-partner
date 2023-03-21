
const { UserModel, PostModel, SubjectModel } = require('../models/Models')

const addUser = async (user) => {
    try {
        const existuser = await UserModel.findOne({ where: { email: user.email } });
        if (existuser) {
            throw new Error("user already exist!");
        }
        await UserModel.create(user);
        return 'user added';
    }
    catch (err) {
        console.log(err);
        return err
    }
}

const getAllUsers = async () => {
    try {
        const answer = await UserModel.findAll();
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getOneUser = async (email, id) => {
    try {
        let answer;
        if (email) {
            answer = await UserModel.findOne({ where: { email }, include: [PostModel, SubjectModel] });
        }

        else if (id) {
            console.log('email found');
            answer = await UserModel.findOne({ where: { id }, include: [PostModel, SubjectModel] });
        }
        console.log('answer', answer);
        if (!answer) {
            throw new Error('user not found');
        }
        return answer;
    }
    catch (err) {
        return err;
    }
}

const updateUser = async (email, id, updatedValues) => {
    try {
        let answer;
        if (id) {
            answer = await UserModel.update(updatedValues, { where: { id } });
        }
        else if (email) {
            answer = await UserModel.update(updatedValues, { where: { email } });
        }

        if (!answer[0]) {
            throw new Error('user has not updated');
        }
        return 'user updated';
    }
    catch (err) {
        console.log(err);
        return err;
    }

}
const deleteUser = async (email) => {
    try {
        const answer = await UserModel.destroy({ where: { email } });
        return 'user deleted';
    }
    catch (err) {
        console.log(err);
        return err
    }
}

module.exports = {
    addUser, getAllUsers, getOneUser, updateUser, deleteUser
}