let notesDBMock = [
    {nID: 1, content: "A test post for welcome page", updatedAt: new Date(), created: new Date()},
    {nID: 2, content: "A test post for test 1", updatedAt: new Date(), created: new Date()},
    {nID: 3, content: "A test post for test 2", updatedAt: new Date(), created: new Date()},
]

let note2NotesDBMock = [

]

function addNote(title, subtitle, description, imgLink, publishDate, cb) {

}

function getNote(nID) {
    // TODO - Brush up on difference between anon funcs and arrow funcs
    return new Promise(function(resolve, reject) {
        // Find note in db
        for (let i = 0; i < notesDBMock.length; i++) {
            if (notesDBMock[i].nID == nID) {
                resolve(nID);
            }
        }
        // If not found throw an error
        reject("Could not find note with id " + nID + " in database");
    });
}

// Gets all notes for a project (this belongs on controller level I think)
function getForProject(pID, cb) {
    // let promises = 
}

// Methods for editing project state
function deleteNote(id, cb) {

}

function setContent(id, content, cb) {

}

function addSubNote(id, nID, cb) {

}

function addSubNotes(id, nIDs, cb) {
    
}

function removeNote(id, nID, cb) {

}

// Or should I just only have the singleton and let controller deal with it?
function removeNotes(id, nIDs, cb) {

}

var database = {
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

module.exports = database;