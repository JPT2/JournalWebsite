/*
    TODO - ADD CHECKS TO SEE IF USER IS LOGGED IN AND HAS PERMISSION TO PERFORM THESE ACTIONS ONCE DONE TESTING
*/
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
    let q = req.body;
    if (q.nID) {
        noteDB.addNote(q.nID, q.content, q.createdAt).then(function(noteData) {
            res.send({content: noteData, error: null});
        }).catch(err => res.send({content: null, error: err}));
    } else {
        res.send({content: null, error: "Cannot retrieve note data without id"});
    }
}

// Would this ever be called? Feel like project has to handle this in most cases?
function deleteNote(req, res) {
    let q = req.query;
    if (q.nID) {
        noteDB.delete(q.nID).then(function(note) {
            res.send({content: note, error: null});
        }).catch(err => res.send({content: null, error: err}));
    } else {
        res.send({content: null, error: "Failed to delete note. No note id provided"});
    }
}

function update(req, res) {
    let data = req.body;
    if (data.nID) {
        if (data.content) {
            noteDB.update(data.nID, data.body).then(function(note) {
                res.send({content: note, error: null});
            }).catch(err => res.send({content: null, error: err}));
        } else {
            res.send({content: null, error: "Failed to update onte. No content was provided"});
        }
    } else {
        res.send({content: null, error: "Failed to update note. No note id was provided"});
    }
}

var controller = {
    add : addNote,
    get : getNote,
    // getForProject : getForProject,
    delete : deleteNote,
    update: update,
    // setContent: setContent,
    // addSubNote: addSubNote,
    // addSubNotes: addSubNotes,
    // removeNote: removeNote,
    // removeNotes: removeNotes,
};

module.exports = controller;