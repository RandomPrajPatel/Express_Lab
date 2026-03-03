const express = require('express');
const app = express(); //Calling express as a function sets up server

app.set('view engine', 'ejs');
app.use(express.static ("public")); 
app.get('/', (req, res) => {

    console.log('Here');
    res.render('index', {userName: "Praj"});
    // res.send('Hi')
});

app.get('/users', (req, res)=>{
   res.send('User List');
});
app.get('/users/new', (req, res)=>{
   res.send('User New Form');
});
app.listen(3030); //Tell our app to listen for requests