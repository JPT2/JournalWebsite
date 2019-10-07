/*
    Should house all functions dealing with project management (creation, deletion, edit)
    Projects are the containers!

    TODO
    make all the db calls into promises
*/

// In actual DB am going to need to have a tab DB since need way of getting the tab ids (unless I just make tab names unique...)
// Also focusin on development of one thing at a time really helps in spotting issues that will soon face on horizon
let tab2ProjectMock = [
    {tID: "home", pID: 1},
    {tID: "projects", pID: 2},
    {tID: "projects", pID: 3},
    {tID: "projects", pID: 4},
    {tID: "projects", pID: 5},
    {tID: "projects", pID: 6},
    {tID: "projects", pID: 7},
    {tID: "notes", pID: 1},
    {tID: "books", pID: 3},
    {tID: "personal", pID: 4},
]

// Is there a meaningful difference between a project and note?
// pID, title, author, subtitle, imgPath, description, updatedAt, created
let projectDBMock = [
    {pID: 1, title: 'Welcome to Ject!', author: 'JPT2', subtitle: "J. Patrick Taggart's project notebook!", imgPath: "./img/cyberPunk.jpg", description: "Welcome to my website :D Now pulling stuff from my pseudo database!", updatedAt: new Date(), created: new Date()},
    {pID: 2, title: "Platoon Dynamics", author: 'JPT2', subtitle: 'A decision platform for HDVs',imgPath: "./res/platoonDynamics/imgs/icon.png", description: "A Decision Platform for HDVs", updatedAt: new Date(), created: new Date()},
    {pID: 3, title: "No Script For You!", author: 'JPT2', subtitle: 'AI applied to Seinfeld', imgPath: "./res/noScriptForYou/imgs/noScriptForYou.png", description: "A RNN for generating Seinfeld Scripts", updatedAt: new Date(), created: new Date()},
    {pID: 4, title: "Threads", author: 'JPT2', subtitle: "An idea platform", imgPath: "./res/threads/imgs/threads.png", description: "A Web Based Notebooking Tool", updatedAt: new Date(), created: new Date()},
    {pID: 5, title: "OkEmoji", author: 'JPT2', subtitle: "An emotion map and award winner at HackNY", description: "Maps People's Emoji Responses in Your Vicinity. Won Best First Hack at HackNY some years back", imgPath: "./res/okEmoji/imgs/okEmoji.png", updatedAt: new Date(), created: new Date()},
    {pID: 6, title: "Noted", author: 'JPT2', subtitle: "Attempt to make an online conversation space", description: "A tool for sharing ideas with friends and mapping concepts (Predecessor to threads)", imgPath: "./res/noted/imgs/noted.png", updatedAt: new Date(), created: new Date()},
    {pID: 7, title: "This Website!", author: 'JPT2', subtitle: "My online project portfolio", description: "Attempt at making an online progress journal for myself.", imgPath: "./res/personalSite/imgs/personalSite.png", updatedAt: new Date(), created: new Date()},
    {pID: 8, title: "Gaming", author: 'JPT2', subtitle: "What I've been playing lately", description: "See what I'm playing and what I think of it", imgPath: "./res/gaming/imgs/icon.jpg", updatedAt: new Date(), created: new Date()},
    {pID: 9, title: "Watching", author: 'JPT2', subtitle: "See what I'm watching", description: "./res/notes/watching/imgs/icon.jpg", description: "A list of all the shows I've been watching this year and my general thoughts about them.", updatedAt: new Date(), created: new Date()},
    {pID: 9, title: "Research", author: 'JPT2', subtitle: "See what I'm looking into", description: "./res/notes/research/imgs/icon.jpg", description: "I've been trying to read more papers so this is a catalog of how I'm doing on that front.", updatedAt: new Date(), created: new Date()},
    {pID: 10, title: "Test", author: 'JPT2', subtitle: "Testing a nested project", imgPath: "./res/notes/research/imgs/icon.jpg", description: "A test of doing some stuff :d", updatedAt: new Date(), created: new Date()},
    {pID: 11, title: "Test2", author: 'JPT2', subtitle: "Testing a nested project 2", imgPath: "./res/notes/watching/imgs/icon.jpg", description: "A test of doing some stuff 2 :d", updatedAt: new Date(), created: new Date()},
]

let project2ProjectMock = [
    {pID: 1, pID2: 10},
    {pID: 1, pID2: 11},
]

let project2NoteMock = [
    {pID: 1, nID: 1},
    {pID: 1, nID: 4},
    {pID: 1, nID: 5},
    {pID: 1, nID: 6},
    {pID: 10, nID: 2},
    {pID: 11, nID: 3},
]

function log(msg) {
    console.log(msg);
}


function createProject(title, subtitle, description, imgPath, publishDate, cb) {
    // Should make sure no duplicates exist somehow
    projectDBMock.push({pID: projectDBMock.length, title: title, author: "JPT", subtitle: subtitle, imgPath: imgPath, description: description, updatedAt: publishDate, created: publishDate});
    cb(true, null);
}

// Should this be a promise?
function getProject(id, cb) {
    // Pull project with corresponding id and return to caller
    for (let i = 0; i < projectDBMock.length; i++) {
        if (projectDBMock[i].pID === id) {
            log("getProject) Returning pID: " + id);
            cb(projectDBMock[i], null);
            return;
        }
    }

    // Didn't find it, alert the user
    log("getProject) Failed to find project with given id");
    cb(null, "Could not find project with id: " + id);
}

function getProjectP(id) {
    return new Promise(function(resolve, reject) {
        for (let i = 0; i < projectDBMock.length; i++) {
            if (projectDBMock[i].pID === id) {
                log("getProject) Returning pID: " + id);
                resolve(projectDBMock[i]);
                return;
            }
        }
    
        // Didn't find it, alert the user
        log("getProject) Failed to find project with given id");
        reject("Could not find project with id: " + id);
    });
}

function getProjectNotes(id, cb) {

}

// Gets all projects for a tab
function getForTab(tID, cb) {
    // Round up all the projects associated with a tab (its okay to return an empty list)
    let projectIDs = [];
    for (let i = 0; i < tab2ProjectMock.length; i++) {
        if (tab2ProjectMock[i].tID === tID) {
            console.log("Found: " + tab2ProjectMock[i].pID + " for " + tID);
            projectIDs.push(tab2ProjectMock[i].pID);
        }
    }

    cb(projectIDs, null);
}

// Methods for editing project state
function deleteProject(id, cb) {
    // Remove project from database
    for (let i = 0; i < projectDBMock.length; i++) {
        if (projectDBMock[i].pID === id) {
            let p = projectDBMock[i];
            projectDBMock.splice(i, 1);
            cb(p, null);
            return;
        }
    }
    log("deleteProject) Could not find project: " + id);
    cb(null, "Project " + id + " was not found");

}

function updateProject(projectData) {
    return new Promise(function(resolve, reject) {
        for (let i = 0; i < projectDBMock.length; i++) {
            if (projectDBMock[i].pID == projectData.pID) {
                if (projectData.title) {
                    projectDBMock[i].title = projectData.title;
                }
                if (projectDBMock[i].subtitle == projectData.subtitle) {
                    projectDBMock[i].subtitle = projectData.subtitle;
                }
    
                projectDBMock[i].author = projectData.author ? projectData.author : projectDBMock[i].author;
                projectDBMock[i].imgPath = projectData.imgPath ? projectData.imgPath : projectDBMock[i].imgPath;
                projectDBMock[i].description = projectData.description ? projectData.description : projectDBMock[i].description;
                projectDBMock[i].updatedAt = projectData.updatedAt ? projectData.updatedAt : projectDBMock[i].updatedAt;
                resolve(true);
                return;
            }
        }
        reject("updateProject) No project with id " + projectData.pID + " found in database");
    });
}

function setTitle(id, title, cb) {
    if (!title) {
        log("setTitle) ERROR - No title was provided!");
        cb(null, "ERROR - No title was provided!");
        return;
    }
    // Find project
    for (let i = 0; i < projectDBMock.length; i++) {
        if (projectDBMock[i].pID === id) {
            projectDBMock[i].title = title;
            cb(true, null);
            return;
        }
    }

    log("setTitle) Could not find project " + id);
    cb(null, "ERROR) Project " + id + " was not found");
}

function setSubtitle(id, sub, cb) {
    if (!title) {
        log("setSubtitle) ERROR - No title was provided!");
        cb(null, "ERROR - No title was provided!");
        return;
    }
    // Find project
    for (let i = 0; i < projectDBMock.length; i++) {
        if (projectDBMock[i].pID === id) {
            projectDBMock[i].subtitle = sub;
            return;
        }
    }

    log("setSubtitle) Could not find project " + id);
    cb(null, "ERROR) Project " + id + " was not found");
}

function getNoteIDs(pID) {
    return new Promise(function(resolve, reject) {
        let nIDs = [];
        for (let i = 0; i < project2NoteMock.length; i++) {
            if (project2NoteMock[i].pID == pID) {
                nIDs.push(project2NoteMock[i].nID);
            }
        }

        // Maybe should check if project exists and error oout if it doesnt?
        console.log("Found note ids: " + nIDs + " for project id " + pID);
        resolve(nIDs);
    });
}

function addNote(id, nID, cb) {
    if (!id || !nID) {
        log("addNote) Error - pID: " + id + " nID: " + nID);
        cb(null, "Error - pID: " + id + " nID: " + nID);
        return;
    }
    project2NoteMock.push({pID: id, nID: nID});
    cb(true, null);
}

function removeNote(id, nID, cb) {
    if (!id || !nID) {
        log("reomveNote) Error pID: " + id + " nID: " + nID);
        cb(null, "Error pID: " + id + " nID: " + nID);
        return;
    }
    for (let i = 0; i < project2NoteMock.length; i++) {
        if (project2NoteMock[i].pID === id && project2NoteMock.nID === nID) {
            let removed = project2NoteMock.splice(i, 1);
            cb(removed, null);
            return;
        }
    }

    log("removeNote) Error - Could not find not: " + id);
}

function getSubProjectIDs(pID) {
    return new Promise(function(resolve, reject) {
        let pIDs = [];
        for (let i = 0; i < project2ProjectMock.length; i++) {
            if(project2ProjectMock[i].pID == pID) {
                pIDs.push(project2ProjectMock[i].pID2);
            }
        }

        console.log("Got sub project ids: ");
        console.log(pIDs);
        resolve(pIDs);
    });
}

// // Or should I just only have the singleton and let controller deal with it?
// function removeNotes(id, nIDs, cb) {

// }

var database = {
    create : createProject,
    get : getProjectP,
    getForTab : getForTab,
    getNoteIDs : getNoteIDs,
    update: updateProject,
    delete : deleteProject,
    setTitle: setTitle,
    setSubtitle: setSubtitle,
    addNote: addNote,
    removeNote: removeNote,
    getSubProjectIDs: getSubProjectIDs
    // removeNotes: removeNotes,
};

module.exports = database;