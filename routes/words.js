const express = require('express');
const router = express.Router();
const { readFile } = require('fs').promises;

// Home page route
router.get('/', (req, res) => {
    res.send('Word Home Page');
});

router.get('/wotd', async (req, res) => {
    let wordArray = await getWordFromDictionary();
    let [word, part, definition] = wordArray;
    res.render('wotd', { word: word, part: part, definition: definition });
});

let getWordFromDictionary = async () => {
    try {
        const data = await readFile('resources/allwords.txt', 'utf8');

        let lines = data.split('\n');

        let randomNumber = parseInt(Math.random() * lines.length);

        let randomLine = lines[randomNumber];

        let wordArray = randomLine.split('\t');

        console.log(wordArray);

        return wordArray;

    } catch (err) {
        console.log("there was an error reading the file:", err);
        return ["error", "error", "error"]; 
    }
};

module.exports = router;