noteDB = require('../models/projectDB');

function getNote(nID) {
    
}

var controller = {
    add : addNote,
    get : getNote,
    getForProject : getForProject,
    delete : deleteNote,
    setContent: setContent,
    addSubNote: addSubNote,
    addSubNotes: addSubNotes,
    removeNote: removeNote,
    removeNotes: removeNotes,
};

module.exports = controller;