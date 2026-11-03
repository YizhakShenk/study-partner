
require('dotenv').config();

const db = require('./db/mysql');
const {
    fillCategoryTable,
    fillSubjectTable,
    fillUserAndPostst
} = require('./utilities/dbUtilities/fillTables');

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cron = require('node-cron');

const router = require('./routers/index');
const testRouter = require('./tests/testDB');
const removeOldPosts = require('./utilities/cronJob/cronJob');

const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:3000',
    'http://localhost:3001'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(router);
app.use(testRouter);

cron.schedule('0 00 * * *', removeOldPosts);

async function startServer() {
    try {
        console.log('Connecting to database...');

        await db.authenticate();
        console.log('Database connected successfully');

        await db.sync();

        await fillCategoryTable();
        await fillSubjectTable();

        const PORT = process.env.PORT || 3005;

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`App listening on port ${PORT}`);
        });

    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
}

startServer();
