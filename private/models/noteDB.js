
// Notes are the "blog posts"
let notesDBMock = [
    {nID: 1, content: "A test post for welcome page", updatedAt: new Date(), created: new Date()},
    {nID: 2, content: "A test post for test 1", updatedAt: new Date(), created: new Date()},
    {nID: 3, content: "A test post for test 2", updatedAt: new Date(), created: new Date()},
    {nID: 4, content: "A test post for welcome page to see if can have multiple notes", updatedAt: new Date(), created: new Date()},
    {nID: 5, content: "Stacking those notes", updatedAt: new Date(), created: new Date()},
    {nID: 6, content: ":)", updatedAt: new Date(), created: new Date()},
]

let note2NotesDBMock = [

]

function addNote(title, subtitle, description, imgLink, publishDate, cb) {

}

// TODO - Brush up on difference between anon funcs and arrow funcs
function getNote(nID) {
    return new Promise(function(resolve, reject) {
        // Find note in db
        for (let i = 0; i < notesDBMock.length; i++) {
            if (notesDBMock[i].nID == nID) {
                resolve(notesDBMock[i]);
            }
        }
        // If not found throw an error
        reject("Could not find note with id " + nID + " in database");
    });
}

// Gets all notes for a project (this belongs on controller level I think)
function getForProject(pID, cb) {   // This "action" belongs in the project DB model i think (get the ids, then ask noteDB for the content)
    // // Returns all the note IDs for a project
    // return new Promise(function(resolve, reject) {
    //     for (let i = 0; i < notesDBMock)
    // })
}

function getNotes(nIDs) {
    console.log("Getting notes for: " + nIDs);
    if (!nIDs.length) {
        // Dont query if nothing to search for
        console.log("Aborted query to getNotes no nIDs provided");
        return;
    }
    let promises = [];

    console.log("Fetching notes " + nIDs + " from database");
    for (let i = 0; i < nIDs.length; i++) {
        promises.push(getNote(nIDs[i]));
    }

    return Promise.all(promises);
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
    getNotes : getNotes,
    delete : deleteNote,
    setContent: setContent,
    addSubNote: addSubNote,
    addSubNotes: addSubNotes,
    removeNote: removeNote,
    removeNotes: removeNotes,
};

module.exports = database;