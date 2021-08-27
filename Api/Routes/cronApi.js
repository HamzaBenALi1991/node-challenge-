const express = require('express');
const router = express.Router();

const cron = require('node-cron')

router.get('/', async (req, res) => {
    try {
        cron.schedule(' 3 * * * * *', () => {
            console.log('running a task every 3  minute ');
        });
        res.json({ message: ' task has been schuduled ' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
})


module.exports = router 