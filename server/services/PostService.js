const PostRepo = require('../repositories/postRepo');
const newPostAlertRepo = require('../repositories/newPostAlertRepo');
const newPostAlertService = require('../services/newPostAlertService');
const { convertToReadingPossibility } = require('../utilities/post/adjustungPostData');

const addPost = async (reqBody) => {
    try {
        const { email, userId, auther_name, category, sub_category, post, date_from, date_to, time_from, time_to, days } = reqBody;
        const postExist = await PostRepo.getExistPost(userId, sub_category, date_from, date_to, time_from, time_to, days);
        if (postExist) {
            throw new Error("Post already Exist on this user");
        }
        const PostDetails = { email, userId, auther_name, category, sub_category, post, date_from, date_to, time_from, time_to, days };
        const answer = await PostRepo.addPost(PostDetails);
        const alerts = await newPostAlertService.getMatchedAlerts(sub_category, date_from, date_to, time_from, time_to);
        if (alerts && alerts.length > 0) {
            await newPostAlertService.handleSendAlerts(alerts);
        }
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getPost = async (req) => {
    try {
        const { id } = req.body;
        const result = await PostRepo.getPost(id);
        if (!result) {
            throw new Error("fail to get post or post not found ");
        }
        return convertToReadingPossibility(result)
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getNeturePost = async (req) => {
    try {
        const { id } = req.body;
        const result = await PostRepo.getNeturePost(id);
        if (!result) {
            throw new Error("fail to get post or post not found ");
        }
        return {
            category: result.category,
            date_from: result.date_from,
            date_to: result.date_to,
            days: JSON.parse(result.days),
            id: result.id,
            post: result.post,
            sub_category: result.sub_category,
            time_from: result.time_from,
            time_to: result.time_to,
        }




    }
    catch (err) {
        console.log(err);
        return err;
    }
}



const getPosts = async () => {
    try {
        const result = await PostRepo.getPosts();
        if (result.message) {
            throw new Error("fail to get posts or not found any posts");
        }
        answer = result.map((post) => {
            return convertToReadingPossibility(post)
        })
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const updatePost = async (reqBody) => {

    try {
        { }
        const { id, sub_category, post, date_from, date_to, time_from, time_to, days } = reqBody;
        const updatedValues = {
            sub_category: sub_category || undefined,
            post: post || undefined,
            date_from: date_from || undefined,
            date_to: date_to || undefined,
            time_from: time_from || undefined,
            time_to: time_to || undefined,
            days: days || undefined,
        }
        const answer = await PostRepo.updatePost(id, updatedValues);
        return answer;
    }
    catch (err) {
        return err;
    }
}

const deletePost = async (req) => {
    const { id } = req.body;
    console.log('id serv >> ', id);
    try {
        const answer = await PostRepo.deletePost(id);
        if (answer.message !== undefined) {
            throw new Error(answer.message)
        }
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = PostService = {
    addPost,
    getPost,
    getNeturePost,
    getPosts,
    updatePost,
    deletePost,
}

