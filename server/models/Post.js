const db = require('../db/mysql');
const { DataTypes } = require('sequelize');

const Post = db.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    auther_name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sub_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post: {
        type: DataTypes.TEXT,
        defaultValue:"",
        allowNull: true
    },
    date_from:{
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    date_to:{
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    time_from: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    time_to: {
        type: DataTypes.BIGINT,
        allowNull: false 
    },
    days: {
        type: DataTypes.JSON,
        allowNull: true 
    },
    matched:{
        type:DataTypes.TINYINT,
        defaultValue:-1,
    }

},
    {
        timestamps: false
    }
);



module.exports = Post

