
// Notes are the "blog posts"
let notesDBMock = [
    {nID: 1, content: "A test post for welcome page", updatedAt: new Date(), created: new Date()},
    {nID: 2, content: "A test post for test 1", updatedAt: new Date(), created: new Date()},
    {nID: 3, content: "A test post for test 2", updatedAt: new Date(), created: new Date()},
    {nID: 4, content: "A test post for welcome page to see if can have multiple notes", updatedAt: new Date(), created: new Date()},
    {nID: 5, content: "Stacking those notes", updatedAt: new Date(), created: new Date()},
    {nID: 6, content: ":)", updatedAt: new Date(), created: new Date()},
]

// If in future allow for notes to exist in multiple contexts will need to be able to find what projects are associated to a note
let notes2Project = [

]

let note2NotesDBMock = [

]

function addNote(content, created) {
    return new Promise(function(resolve, reject) {
        let note = {pID: notesDBMock.length, content: content, createdAt: created, updatedAt: created};
        notesDBMock.push(note);
        resolve(note);
    });
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

function getNotes(nIDs) {
    console.log("Getting notes for: " + nIDs);
    let promises = [];
    if (!nIDs.length) {
        // Dont query if nothing to search for
        console.log("Aborted query to getNotes no nIDs provided");
        promises.push(new Promise(function(resolve, reject) {
            reject("Failed to get notes. No ids provided");
        }))
        return Promise.all(promises);
    }

    console.log("Fetching notes " + nIDs + " from database");
    for (let i = 0; i < nIDs.length; i++) {
        promises.push(getNote(nIDs[i]));
    }

    return Promise.all(promises);
}

// Methods for editing project state
function deleteNote(nID) {
    return new Promise(function(resolve, reject) {
        if (!nID) {
            reject("Failed to delete note. No id provided");
        }
        for (let i = 0; i < notesDBMock.length; i++) {
            if (notesDBMock[i] == nID) {
                notesDBMock.splice(i, 1);
                resolve(true);
            }
        }
        reject("Failed to delete note. Could not find note in database");
    });
}

function update(nID, content) {
    return new Promise(function(resolve, reject) {
        if (!nID) {
            reject("Failed to update content. No note ID was provided");
        }
        if (!content) {
            reject("Failed to update content. No content provided");
        }
        for (let i = 0; i < notesDBMock.length; i++) {
            if (notesDBMock[i].nID == nID) {
                notesDBMock.content = content;
                notesDBMock.updatedAt = new Date();
                resolve(notesDBMock[i]);
            }
        }
        reject("Failed to update content. Could not find note with id " + nID);
    });
}

var database = {
    add : addNote,
    get : getNote,
    getNotes : getNotes,
    delete : deleteNote,
    update: update,
};

module.exports = database;