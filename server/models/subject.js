const db = require('../db/mysql');
const { DataTypes } = require('sequelize');
const CategoryModel = require('./category');
const { SubjectModel } = require('./Models');

const Subject = db.define('subject', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true //false
    }
    ,
    user_connected: {
        type: DataTypes.INTEGER,
        allowNull: true ///false
    }
},
    {
        timestamps: false
    }
);

module.exports = Subject




