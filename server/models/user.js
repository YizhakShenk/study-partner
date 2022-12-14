const db = require('../db/mysql');
const { DataTypes } = require('sequelize');

const SubjectModel = require('./Subject');
const UserSubjects = require('./UserSubject');
const PostModel = require('./Post');


const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    languages: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age_range: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},
    {
        timestamps: false
    });


User.associations =()=>{
}

User.hasMany(PostModel,{foreignKey:"user_id"});
PostModel.belongsTo(User,{foreignKey:"user_id"});
User.belongsToMany(SubjectModel,{through: UserSubjects,foreignKey:"UserId"});
SubjectModel.belongsToMany(User, { through: UserSubjects,foreignKey:"SubjectId"});

module.exports = User;





// (async () => {
//     // User.hasMany(PostModel,{foreignKey:"id"});
//     // PostModel.belongsTo(User,{foreignKey:"id"});
//     // User.belongsToMany(SubjectModel,{through: UserSubjects});
//     // SubjectModel.belongsToMany(User, { through: UserSubjects});
//     await db.sync();
// })()