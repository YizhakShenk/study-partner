const filterRepo = require('../repositories/filterRepo')
const {convertToReadingPossibility} = require('../utilities/post/adjustungPostData')

const filter = async (req) => {
    try {
        const {subject,date, time,matched } = req.body;  
        const answer = await filterRepo.filter({subject,date,time,matched});
        if (!answer || answer.message) {
            throw new Error("fail to get post or post not found ");
        }
        const result = answer?.map((post)=>{
            return convertToReadingPossibility(post)
        })
         return result;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

module.exports ={
    filter,
}