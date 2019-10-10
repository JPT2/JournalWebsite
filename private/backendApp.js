// Imports
const fs = require('fs');
const path = require('path');
const projectC = require('./controllers/projectController');
const noteC = require('./controllers/noteController');
const userC = require('./controllers/accountController');


// Express globals
const express = require('express')
const app = express()
const port = 3000

// Setup middleware for serving static files
app.use(express.json())
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/fonts', express.static(path.join(__dirname, '../public/fonts')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));
app.use('/res', express.static(path.join(__dirname, '../public/res')));

app.get('/',  (req, res) => getHomepage(req, res) );
app.get('/tab/load', projectC.loadTab);
app.get('/project/get', projectC.get);
app.get('/project/fill', projectC.fill);
app.post('/project/create', projectC.create);
app.get('/project/delete', projectC.delete);
app.post('/project/update', projectC.update); // Fpr updating a img, title, subtitle
app.post('/project/note/add', projectC.addNote);
app.get('/project/note/delete', projectC.deleteNote);
app.post('/project/subProject/add', projectC.addSubProject);
app.get('/project/subProject/delete', projectC.deleteSubProject);
app.post('/note/update', noteC.update);
app.get('/note/get', noteC.get);
app.post('/user/add', userC.add);
app.get('/user/delete', userC.delete);

// removeNotes: removeNotes,

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function getHomepage(req, res) { // Should it take a next callback?
    var options = {
        root: path.join(__dirname, '../public'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    
    var fileName = "index.html"
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
}