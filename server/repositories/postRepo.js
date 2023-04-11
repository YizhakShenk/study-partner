const Models = require('../models/Models');

// const addPost = async (details) => {
//     try {
//         const user = await Models.UserModel.findOne({ where: { id: details.userId } });
//         if (!user) {
//             throw new Error("user does not exist");
//         }
//         await Models.PostModel.create({ user_id: user.id, auther_name: details.auther_name, category: details.category, sub_category: details.sub_category, post: details.post, date: details.date, time_from: details.time_from, time_to: details.time_to });
//         return "post added";
//     }
//     catch (err) {
//         return err;
//     }
// }
const addPost = async (details) => {
    try {
        const user = await Models.UserModel.findOne({ where: { id: details.userId } });
        if (!user) {
            throw new Error("user does not exist");
        }
        await Models.PostModel.create({ user_id: user.id, auther_name: details.auther_name, category: details.category, sub_category: details.sub_category, post: details.post, date_from: details.date_from, date_to: details.date_to, time_from: details.time_from, time_to: details.time_to, days: details.days});
        return "post added";
    }
    catch (err) {
        return err;
    }
}
const getPosts = async () => {
    try {
        const answer = await Models.PostModel.findAll({order:["time_from"]});
        return answer;
    }
    catch (err) {
        return err;
    }
}

const getPost = async (id) => {
    try {
        const answer = await Models.PostModel.findOne({where:{id}});
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
        if(!result[0]){
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
        console.log('id >> ',id);
        const result = await Models.PostModel.destroy({ where: { id:id } });
        if(!result){
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
    getPosts,
    getPost,
    updatePost,
    deletePost
}