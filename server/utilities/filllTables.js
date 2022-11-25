const range_agesModel = require('../models/range_ages');
const usersModel = require('../models/users');
const categoriesModel = require('../models/categories');
const subjectsModel = require('../models/subjects');


const ageRangeData = []
for (let i = 1; i < 12; i++) {
    ageRangeData.push({
        age_range: ((i * 5) + 10 + i).toString() + " - " + ((i * 5) + 15 + i).toString()
    })
}
const categories = [{ name: 'languages' }, { name: 'math' }, {  name: 'math' }, {  name: 'software' }, {  name: 'philosophy' }]
const users = [{ name: 'firest', email: 'firstemail', password: '1234', languages: 'hebrew', country: 'israel' }, { name: 'secound', email: 'secoundemail', password: '345534', languages: 'hebrew', country: 'israel' }]


const fill = () => {
    users.forEach((item) => {
        usersModel.create(item)
    })

    ageRangeData.forEach((item) => {
        range_agesModel.create(item)
    })
    categories.forEach((item) => {
    categoriesModel.create(item)

    })
}

module.exports = fill;






