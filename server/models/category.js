const db = require('../db/mysql');
const { DataTypes, sequalzie } = require('sequelize');
const SubjectModel = require('./subject');
const Category = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    user_connected: {
        type: DataTypes.INTEGER,
        allowNull: true  ///false
    }
},
    {
        timestamps: false
    }
);

Category.hasMany(SubjectModel, { foreignKey: "category_id"});
SubjectModel.belongsTo(Category,{foreignKey:"category_id"});



module.exports = Category;







