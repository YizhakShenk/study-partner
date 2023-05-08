const db = require('../db/mysql');
const { DataTypes } = require('sequelize');

const RateModel= require('./Rate');
const SubjectModel = require('./Subject');
const UserSubjects = require('./UserSubject');
const PostModel = require('./Post');
const NotificationModel = require('./Notifications')

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    languages: {
        type: DataTypes.STRING(16),
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.STRING(12),
        allowNull: true,
        // unique:true,

    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rate: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    num_of_rates: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},
    {
        indexes: [
            {
                unique: true,
                fields: ["email"]
            }
        ],
        timestamps: false
    });


User.associations = () => {
}

User.hasMany(PostModel, { foreignKey: "user_id" });
PostModel.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(NotificationModel,{foreignKey:"user_id"});
NotificationModel.belongsTo(User,{foreignKey:"user_id"});
User.hasMany(RateModel,{foreignKey:"user_id"});
RateModel.belongsTo(User,{foreignKey:"user_id"});
User.belongsToMany(SubjectModel, { through: UserSubjects, foreignKey: "UserId" });
SubjectModel.belongsToMany(User, { through: UserSubjects, foreignKey: "SubjectId" });

module.exports = User;

