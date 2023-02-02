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
        allowNull: true
    },
    sub_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: true //false
    },
    time_from: {
        type: DataTypes.TIME(6),
        allowNull: true //false
    },
    time_to: {
        type: DataTypes.DATE(6),
        allowNull: true //false
    }

},
    {
        timestamps: false
    }
);



module.exports = Post

