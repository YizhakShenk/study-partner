const db = require('../db/mysql');
const { DataTypes } = require('sequelize');

const NewPostAlert = db.define('new_post_alert', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false

    },
    sub_category: {
        type: DataTypes.JSON,
        allowNull: true
    },
    date: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    time: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
},
    {
        timestamps: true
    }
);

module.exports = NewPostAlert;




