
const RateModel = require('./Rate');
const PostModel = require('./Post');
const CategoryModel = require('./category');
const SubjectModel = require('./subject');
const UserModel = require('./user');
const UserSubject = require('./UserSubject');
const NotificationModel = require('./Notifications');
const NewPostAlert =require('./NewPostAlert');


module.exports = {
    UserSubject,
    PostModel,
    CategoryModel,
    SubjectModel,
    UserModel,
    NotificationModel,
    NewPostAlert,
    RateModel,
}