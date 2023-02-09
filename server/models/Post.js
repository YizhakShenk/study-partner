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
        allowNull: true
    },
    date:{
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
    }
},
    {
        timestamps: false
    }
);



module.exports = Post

