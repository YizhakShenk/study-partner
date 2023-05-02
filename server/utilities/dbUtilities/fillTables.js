require('dotenv').config();
const Models = require('../../models/Models');

const mathID = parseInt(process.env.MATH_CATEGORY);
const lnaguageID = parseInt(process.env.LANGUAGE_CATEGORY);
const softwareID = parseInt(process.env.SOFTWARE_CATEGORY);
const philosophyID = parseInt(process.env.PHILOSOPHY_CATEGORY);




const fillCategoryTable = async () => {
    const num = process.env.MATH_CATEGORY
    console.log(num);
    console.log(typeof num);

    try {
        await Models.CategoryModel.findOrCreate({ where: { id: mathID, name: "Math" } });
        await Models.CategoryModel.findOrCreate({ where: { id: lnaguageID, name: "Languages" } });
        await Models.CategoryModel.findOrCreate({ where: { id: softwareID, name: "Software" } });
        await Models.CategoryModel.findOrCreate({ where: { id: philosophyID, name: "Philosophy" } });
        return 'successful';
    }
    catch (err) {
        console.log(err);
        return 'ERROR';
    }

}
const fillSubjectTable = async () => {
    try {
        await Models.SubjectModel.findOrCreate({ where: { name: 'English', category_id: lnaguageID } });
        await Models.SubjectModel.findOrCreate({ where: { name: 'Hebrew', category_id: lnaguageID } });
        await Models.SubjectModel.findOrCreate({ where: { name: 'Arabic', category_id: lnaguageID } });
        await Models.SubjectModel.findOrCreate({ where: { name: 'Linear Algebra', category_id: mathID } });
        await Models.SubjectModel.findOrCreate({ where: { name: 'Geometry', category_id: mathID } });
        await Models.SubjectModel.findOrCreate({ where: { name: 'Statistics', category_id: mathID } });
        await Models.SubjectModel.findOrCreate({ where: { name: 'JavaScript', category_id: softwareID } });
        await Models.SubjectModel.findOrCreate({ where: { name: 'Java', category_id: softwareID } });
        await Models.SubjectModel.findOrCreate({ where: { name: 'Python', category_id: softwareID } });
        return 'successful'
    }
    catch (err) {
        console.log(err);
        return 'ERROR';
    }
}



const fillUserAndPostst = async () => {
    try {
        await Models.UserModel.create({
            name: "David",
            email: "David@g.com",
            password: "$2b$04$iBJDqsn9G8OGuqK3EtmXv.RojYQolDTBntawWP5VoBYuOcdDWZs8m",
            country: "German",
            languages: ["English", "Hebrew", "Spanish"],
            phone_number: "+012487876378",
            age: 30,
        });

        await Models.UserModel.create({
            name: "Yonatan",
            email: "Yonatan@g.com",
            password: "$2b$04$iBJDqsn9G8OGuqK3EtmXv.RojYQolDTBntawWP5VoBYuOcdDWZs8m",
            country: "Israel",
            languages: ["English", "Hebrew"],
            phone_number: "+012487876378",
            age: 30,
        }
        );
        await Models.PostModel.create({

            userId: 1,
            auther_name: "David",
            category: lnaguageID,
            sub_category: "Hebrew",
            post: "i'd like to learn Henbrew!",
            date: 1675632821993,
            time_from: 1675632821993,
            time_to: 1675632821993,
        }
        )
        await Models.PostModel.create({
            userId: 1,
            auther_name: "David",
            category: lnaguageID,
            sub_category: "English",
            post: "i'd like to learn English",
            date: 1675632821993,
            time_from: 1675632821993,
            time_to: 1675632821993,
        })

        await Models.PostModel.create({

            userId: 2,
            auther_name: "Yonatan",
            category: mathID,
            sub_category: "Geometry",
            post: "i'd like to learn Geometry",
            date: 1675632821993,
            time_from: 1675632821993,
            time_to: 1675632821993,

        })

        await Models.PostModel.create({
            userId: 2,
            auther_name: "Yonatan",
            category: softwareID,
            sub_category: "Java",
            post: "i want to learn Java",
            date: 1675632821993,
            time_from: 1675632821993,
            time_to: 1675632821993,
        })
        return "SUCCESS ADDED USER AND POSTS"
    }
    catch (err) {
        console.log(err);
        return "ERROR To ADD USER AND POSTS"
    }
}


module.exports = {
    fillCategoryTable,
    fillSubjectTable,
    fillUserAndPostst
}   