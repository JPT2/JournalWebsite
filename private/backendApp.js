// Imports
const fs = require('fs');
const path = require('path');
const projectC = require('./controllers/projectController');
const accountC = require('./controllers/accountController');
const noteC = require('./controllers/noteController');


// Express globals
const express = require('express')
const app = express()
const port = 3000

// Setup middleware for serving static files
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/fonts', express.static(path.join(__dirname, '../public/fonts')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));
app.use('/res', express.static(path.join(__dirname, '../public/res')));

app.get('/',  (req, res) => getHomepage(req, res) ); // res.send('Hello World!'))
// Should go into projectController, unless I decide to make a tabController
app.get('/tab/load', projectC.loadTab);
app.get('/project/get', projectC.get);
app.get('/project/fill', projectC.fill);
app.post('/project/create', projectC.create);
app.get('/project/delete', projectC.delete);
app.post('/project/update', projectC.update); // Fpr updating a img, title, subtitle
app.post('/project/note/add', projectC.addNote);
app.get('/project/note/remove', projectC.removeNote);

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