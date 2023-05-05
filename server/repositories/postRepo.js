const { Op } = require('sequelize');
const Models = require('../models/Models');


const addPost = async (details) => {
    try {
        const user = await Models.UserModel.findOne({ where: { id: details.userId } });
        if (!user) {
            throw new Error("user does not exist");
        }
        await Models.PostModel.create({ user_id: user.id, auther_name: details.auther_name, category: details.category, sub_category: details.sub_category, post: details.post, date_from: details.date_from, date_to: details.date_to, time_from: details.time_from, time_to: details.time_to, days: details.days });
        return "post added";
    }
    catch (err) {
        return err;
    }
}
const getPosts = async () => {
    try {
        const answer = await Models.PostModel.findAll({ order: ["matched", "date_from"] });
        return answer;
    }
    catch (err) {
        return err;
    }
}

const getPost = async (id) => {
    try {
        const answer = await Models.PostModel.findOne({ where: { id } });
        return answer;
    }
    catch (err) {
        return err;
    }
}

const getExistPost = async (userId, sub_category, date_from, date_to, time_from, time_to, days) => {
    try {
        console.log('...........');
        console.log(userId); 
        console.log(sub_category)
        console.log(date_to)
        console.log(time_from)
        console.log(time_to)
        console.log(days)
        console.log('...........');

        const result = await Models.PostModel.findOne({
            where: {
                [Op.and]: [
                    { user_id: userId },
                    { sub_category },
                    { date_from },
                    { date_to },
                    { time_from },
                    { time_to },
                    { days:{[Op.like]:days} }
                ]
            }
        })
        return result;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getNeturePost = async (id) => {
    try {
        const answer = await Models.PostModel.findOne({ where: { id } });
        return answer;
    }
    catch (err) {
        return err;
    }
}

const updatePost = async (id, updatedValues) => {
    try {
        console.log(updatedValues);
        const result = await Models.PostModel.update(updatedValues, { where: { id: id } });
        if (!result[0]) {
            throw new Error('post has not updated');
        }
        return "post updated";
    }
    catch (err) {
        return err;
    }
}

const deletePost = async (id) => {
    try {
        const result = await Models.PostModel.destroy({ where: { id: id } });
        if (!result) {
            throw new Error('post has not deleted');
        }
        return "post deleted";
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = PostRepo = {
    addPost,
    getPost,
    getNeturePost,
    getPosts,
    getExistPost,
    updatePost,
    deletePost
}