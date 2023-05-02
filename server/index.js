require('dotenv').config();
const db = require('./db/mysql');
const {fillCategoryTable,fillSubjectTable,fillUserAndPostst} = require('./utilities/dbUtilities/fillTables');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const router = require('./routers/index');
const testRouter = require('./tests/testDB');
const cors = require('cors');

const cron = require('node-cron');
const removeOldPosts = require('./utilities/cronJob/cronJob');

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }));
app.use(express.json());
app.use(cookieParser())
app.use(router);
app.use(testRouter);

cron.schedule("0 00 * * *",removeOldPosts);

app.listen(process.env.PORT, () => {
    (async () => {
        await db.sync();
        await fillCategoryTable();
        await fillSubjectTable();
        // console.log(await fillUserAndPostst());/// for testing
        
    })()
    console.log(`app listen on port ${process.env.PORT}`)
});

