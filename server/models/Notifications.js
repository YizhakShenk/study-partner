const db = require('../db/mysql');
const { DataTypes } = require('sequelize');
const Notification = db.define('notification', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    has_readed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    }

},
    {
        timestamps: false
    }
);



module.exports = Notification

