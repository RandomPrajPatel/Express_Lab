const express = require('express');
const router = express.Router();
const { readFile } = require('fs').promises;

// Home page route
router.get('/', (req, res) => {
    res.send('Word Home Page');
});

router.get('/wotd', async (req, res) => {
    const wordArray = await getWordFromDictionary();
    const [word, part, definition] = wordArray;
    res.render('wotd', { word, part, definition });
});

router.get('/allwords', async (req, res) => {
    const allWords = await getAllWords(); 
    res.render('allwords', { words: allWords });
});

let getWordFromDictionary = async () => {
    try {
        const data = await readFile('resources/allwords.txt', 'utf8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        const wordArray = randomLine.split('\t');
        console.log(wordArray);
        return wordArray;
    } catch (err) {
        console.log("There was an error reading the file:", err);
        return ["error", "error", "error"];
    }
};

let getAllWords = async () => {
    try {
        const data = await readFile('resources/allwords.txt', 'utf8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const wordList = lines.map(line => line.split('\t')); 
        wordList.sort((a, b) => a[0].localeCompare(b[0])); 
        return wordList;
    } catch (err) {
        console.log("There was an error reading the file:", err);
        return [];
    }
};

module.exports = router;