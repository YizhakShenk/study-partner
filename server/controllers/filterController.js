const filterService =require('../services/filterService');

const filter = async (req, res) => {
    try {
        const result = await filterService.filter(req);
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(404).send(err.message);
    }
}

module.exports ={
    filter
}