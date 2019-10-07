noteDB = require('../models/projectDB');

function getNote(req, res) {
    let q = req.query;
    if (q.nID) {
        noteDB.get(q.nID).then(function(noteData) {
            res.send({content: noteData, error: null});
        }).catch(err => res.send(err));
    } else {
        res.send({content: null, error: "Cannot retrieve note data without id"});
    }
}

function addNote(req, res) {
    let q = req.query;
    if (q.nID) {
        noteDB.addNote(q.nID, q.content, q.createdAt, q.updatedAt).then(function(noteData) {
            res.send({content: noteData, error: null});
        }).catch(err => res.send({content: null, error: err}));
    } else {
        res.send({content: null, error: "Cannot retrieve note data without id"});
    }
}

var controller = {
    // add : addNote,
    // get : getNote,
    // getForProject : getForProject,
    // delete : deleteNote,
    // setContent: setContent,
    // addSubNote: addSubNote,
    // addSubNotes: addSubNotes,
    // removeNote: removeNote,
    // removeNotes: removeNotes,
};

module.exports = controller;