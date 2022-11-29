const db = require('../db/mysql');
const { DataTypes } = require('sequelize');
// const usersModel = require('./users');



const range_ages = db.define('range_ages', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false
    // },
    range: {
        type: DataTypes.STRING,
        allowNull: false

  
     },
},
    {
        timestamps: false
    }
);


const ageRangeData = []

for (let i = 1; i < 12; i ++) {
    ageRangeData.push({
        // id: i,
        age_range: ((i * 5)+ 10 +i).toString() + " - " + ((i *5) + 15 + i).toString()
        
    })
}

// range_ages.belongsTo(usersModel)
(async () => {
    await db.sync();
    // await range_ages.bulkCreate(ageRangeData, {validate: true} );
})()


module.exports = range_ages