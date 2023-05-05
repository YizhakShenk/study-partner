const db = require('../db/mysql');
const { DataTypes } = require('sequelize');

const NewPostAlert = db.define('new_post_alert', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sub_category: {
        type: DataTypes.JSON,
        allowNull: true
    },
    date: {
        type: DataTypes.BIGINT,
        defaultValue:0,
        
    },
    time: {
        type: DataTypes.BIGINT,
        defaultValue:0,
    },
},
    {
        timestamps: true
    }
);

module.exports = NewPostAlert;




