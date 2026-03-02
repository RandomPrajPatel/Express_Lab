const express = require('express');
const router = express.Router();
const { readFile } = require('fs').promises;

// Home page route
router.get('/', (req, res) => {
    res.send('Word Home Page');
});

router.get('/word', async (req, res) => {
    try {
        const words = await getWordFromDictionary();
        if (words) {
            res.send(words);
        } else {
            res.status(500).send('Error reading dictionary');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});
router.get('allwords', (req, res)=>{

});
const getWordFromDictionary = async () => {
    try {
        const data = await readFile('resources/allwords.txt');
        let lines = data.split('\n');
    } catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = router;
