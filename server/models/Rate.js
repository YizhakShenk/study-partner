const db = require('../db/mysql');
const { DataTypes } = require('sequelize');

const Rate = db.define('rate', {
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
    rater_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rater_id: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    rate_score: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        timestamps: false
    }
);



module.exports = Rate

