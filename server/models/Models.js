
const PostModel = require('./Post');
const CategoryModel = require('./Category');
const SubjectModel = require('./Subject');
const UserModel = require('./User');
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
}