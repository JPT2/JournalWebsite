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
    {tID: "notes", pID: 8},
    {tID: "notes", pID: 9},
    {tID: "notes", pID: 10},
    {tID: "books", pID: 11},
    {tID: "personal", pID: 12},
]

// Is there a meaningful difference between a project and note?
// pID, title, author, subtitle, imgPath, description, updatedAt, created
let projectDBMock = [
    {pID: 1, title: 'Welcome to Ject!', author: 'JPT2', subtitle: "J. Patrick Taggart's project notebook!", imgPath: "./img/cyberPunk.jpg", description: "Welcome to my website :D Now pulling stuff from my pseudo database!", updatedAt: new Date(), createdAt: new Date()},
    {pID: 2, title: "Platoon Dynamics", author: 'JPT2', subtitle: 'A decision platform for HDVs',imgPath: "./res/platoonDynamics/imgs/icon.png", description: "A Decision Platform for HDVs", updatedAt: new Date(), createdAt: new Date()},
    {pID: 3, title: "No Script For You!", author: 'JPT2', subtitle: 'AI applied to Seinfeld', imgPath: "./res/noScriptForYou/imgs/noScriptForYou.png", description: "A RNN for generating Seinfeld Scripts", updatedAt: new Date(), createdAt: new Date()},
    {pID: 4, title: "Threads", author: 'JPT2', subtitle: "An idea platform", imgPath: "./res/threads/imgs/threads.png", description: "A Web Based Notebooking Tool", updatedAt: new Date(), createdAt: new Date()},
    {pID: 5, title: "OkEmoji", author: 'JPT2', subtitle: "An emotion map and award winner at HackNY", description: "Maps People's Emoji Responses in Your Vicinity. Won Best First Hack at HackNY some years back", imgPath: "./res/okEmoji/imgs/okEmoji.png", updatedAt: new Date(), createdAt: new Date()},
    {pID: 6, title: "Noted", author: 'JPT2', subtitle: "Attempt to make an online conversation space", description: "A tool for sharing ideas with friends and mapping concepts (Predecessor to threads)", imgPath: "./res/noted/imgs/noted.png", updatedAt: new Date(), createdAt: new Date()},
    {pID: 7, title: "This Website!", author: 'JPT2', subtitle: "My online project portfolio", description: "Attempt at making an online progress journal for myself.", imgPath: "./res/personalSite/imgs/personalSite.png", updatedAt: new Date(), createdAt: new Date()},
    {pID: 8, title: "Gaming", author: 'JPT2', subtitle: "What I've been playing lately", description: "See what I'm playing and what I think of it", imgPath: "./res/notes/gaming/imgs/icon.jpg", updatedAt: new Date(), createdAt: new Date()},
    {pID: 9, title: "Watching", author: 'JPT2', subtitle: "See what I'm watching", imgPath: "./res/notes/watching/imgs/icon.jpg", description: "A list of all the shows I've been watching this year and my general thoughts about them.", updatedAt: new Date(), createdAt: new Date()},
    {pID: 10, title: "Research", author: 'JPT2', subtitle: "See what I'm looking into", imgPath: "./res/notes/research/imgs/icon.jpg", description: "I've been trying to read more papers so this is a catalog of how I'm doing on that front.", updatedAt: new Date(), createdAt: new Date()},
    {pID: 11, title: "Test", author: 'JPT2', subtitle: "Testing a nested project", imgPath: "./res/notes/research/imgs/icon.jpg", description: "A test of doing some stuff :d", updatedAt: new Date(), createdAt: new Date()},
    {pID: 12, title: "Test2", author: 'JPT2', subtitle: "Testing a nested project 2", imgPath: "./res/notes/watching/imgs/icon.jpg", description: "A test of doing some stuff 2 :d", updatedAt: new Date(), createdAt: new Date()},
    {pID: 13, title: "Limbo", author: 'JPT2', subtitle: "Enjoyable, but solemn and short.", imgPath: "./res/notes/gaming/limbo/imgs/icon.jpg", description: "Interesting little puzzle platformer? Was a game I bought way back in 2012 or so and decided to play because I wanted to finally beat games in my steam library.", updatedAt: new Date(), createdAt: new Date()},
    {pID: 14, title: "Celeste", author: 'JPT2', subtitle: "A really well-made thoughtful platformer.", imgPath: "./res/notes/gaming/celeste/imgs/icon.jpg", description: "I can't remember what finally made me buy it, but I'm glad I did. Exploring ideas of anxiety and depression via mountain climbing is a suprisingly potent combination.", updatedAt: new Date(), createdAt: new Date()},
    {pID: 15, title: "Psychonauts", author: 'JPT2', subtitle: "Haven't made my mind up on this one yet.", imgPath: "./res/notes/gaming/psychonauts/imgs/icon.jpg", description: "While somewhat dated, the quirky characters and artstyle still give it a lot of charm that make it worth playing.", updatedAt: new Date(), createdAt: new Date()},
    {pID: 16, title: "Hollow Knight", author: 'JPT2', subtitle: "Another super well made game, looking forward to the sequel", imgPath: "./res/notes/gaming/hollowKnight/imgs/icon.jpg", description: "Team Cherry did an amazing job with this game. I picked the game up since I wanted a game with a world to explore with some bite to it. Interestingly enough what struck me the most when playing this gem was the wonderful music, my hat is off to Christopher Larkin. The other thing that I took away from this game was realizing how stubborn I can be some times. This game definitely made me reflect on my cavalier attitude to chalenge. I definitely have some work to do there.", updatedAt: new Date(), createdAt: new Date()},
    {pID: 17, title: "Darkest Dungeon", author: 'JPT2', subtitle: "Disease, Despair, and RNG", imgPath: "./res/notes/gaming/darkestDungeon/imgs/icon.jpg", description: "Darkest Dungeon's focus on managing resources in the face of constant misfortune was exactly the kind of game I was looking for. I've been making a point latetly of trying to figure out how to think around risk, and this game strangely enough has turned into part of my curriculum for the matter.", updatedAt: new Date(), createdAt: new Date()},
    {pID: 18, title: "Team Fight Tactics", author: 'JPT2', subtitle: "Another Dota Rip Off", imgPath: "./res/notes/gaming/tft/imgs/icon.jpg", description: "Riot's Team Fight Tactics seems to me like a new ago poker. The idea of trying to put together the best \"hand\" of character to win based off of what you're dealt reminds me strongly of poker. Given that I tried my hand at poker to try to learn how to think around risk, this game slotted nicely into that part of my life. In a way I think tft is more true to what I was looking to get out of poker. I have to credit this game with causing me to in a way \"reawaken\" in terms of how I analyze and learn new things. For the first time in a while I'm actually trying to make my own assements and judgements of how to value and think about things. Its super refreshing, and I'm definitely going to try and apply this elsewhere. I don't want to fall asleep at the wheel again.", updatedAt: new Date(), createdAt: new Date()},
    {pID: 19, title: "Marvel's The Punisher", author: 'JPT2', subtitle: "", imgPath: "./res/notes/watching/punisher/imgs/icon.jpg", description: "", updatedAt: new Date(), createdAt: new Date()},
    {pID: 20, title: "Breaking Bad", author: 'JPT2', subtitle: "", imgPath: "./res/notes/watching/breakingBad/imgs/icon.jpg", description: "", updatedAt: new Date(), createdAt: new Date()},
    {pID: 21, title: "Neon Genesis Evangelion", author: 'JPT2', subtitle: "", imgPath: "./res/notes/watching/nge/imgs/icon.jpg", description: "", updatedAt: new Date(), createdAt: new Date()},
    {pID: 22, title: "Dark", author: 'JPT2', subtitle: "", imgPath: "./res/notes/watching/dark/imgs/icon.jpg", description: "", updatedAt: new Date(), createdAt: new Date()},
]

let project2ProjectMock = [
    {pID: 1, pID2: 10},
    {pID: 1, pID2: 11},
    {pID: 8, pID2: 13},
    {pID: 8, pID2: 14},
    {pID: 8, pID2: 15},
    {pID: 8, pID2: 16},
    {pID: 8, pID2: 17},
    {pID: 8, pID2: 18},
    {pID: 9, pID2: 19},
    {pID: 9, pID2: 20},
    {pID: 9, pID2: 21},
    {pID: 9, pID2: 22},
    
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

// Completed - Not tested
function createProject(title, subtitle, description, imgPath, publishDate) {
    // Should make sure no duplicates exist somehow
    return new Promise(function(resolve, reject) {
        let entry = {pID: projectDBMock.length, title: title, author: "JPT", subtitle: subtitle, imgPath: imgPath, description: description, updatedAt: publishDate, createdAt: publishDate};
        projectDBMock.push(entry);
        return entry;
    });
}

// Completed - Tested (For if project exists)
function getProjectP(id) {
    return new Promise(function(resolve, reject) {
        if (!id) {
            reject("Failed to get project. No id provided!");
        }
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

// Completed - Not Tested (Should there be a check for if a tab exists first?)
function getForTab(tID) {
    return new Promise(function(resolve, reject) {
        // Round up all the projects associated with a tab (its okay to return an empty list)
        let projectIDs = [];
        for (let i = 0; i < tab2ProjectMock.length; i++) {
            if (tab2ProjectMock[i].tID === tID) {
                console.log("Found: " + tab2ProjectMock[i].pID + " for " + tID);
                projectIDs.push(tab2ProjectMock[i].pID);
            }
        }
        console.log("Resolving with: ", projectIDs);
        resolve(projectIDs);
    });
}

// Methods for editing project state
function deleteProject(id) {
    return new Project(function(resolve, reject) {
        // Remove project from database
        for (let i = 0; i < projectDBMock.length; i++) {
            if (projectDBMock[i].pID === id) {
                let p = projectDBMock[i];
                projectDBMock.splice(i, 1);
                resolve(p);
                return;
            }
        }
        log("deleteProject) Could not find project: " + id);
        reject("Project " + id + " was not found");
    });
}

// Completed - Tested lightly
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
                // Don't update createdAt because that never changes!
                projectDBMock[i].updatedAt = projectData.updatedAt ? projectData.updatedAt : projectDBMock[i].updatedAt;
                resolve(true);
                return;
            }
        }
        reject("Could not update. No project with id " + projectData.pID + " found in database");
    });
}

// When would this be used over a full update? (If only have partial info? But why not then just use the update function with only partial data???????)
function setTitle(id, title) {
    return new Promise(function(resolve, reject) {
        if (!title) {
            log("setTitle) ERROR - No title was provided!");
            reject("No title was provided!");
            return;
        }
        // Find project
        for (let i = 0; i < projectDBMock.length; i++) {
            if (projectDBMock[i].pID === id) {
                projectDBMock[i].title = title;
                resolve(true);
                return;
            }
        }

        reject("Could not update title. Project " + id + " was not found in database");
    });
}

// Completed (but when would this be used?)
function setSubtitle(id, sub) {
    return new Promise(function(resolve, reject) {
        if (!title) {
            log("setSubtitle) ERROR - No title was provided!");
            reject("zNo title was provided!");
            return;
        }
        // Find project
        for (let i = 0; i < projectDBMock.length; i++) {
            if (projectDBMock[i].pID === id) {
                projectDBMock[i].subtitle = sub;
                resolve(true);
                return;
            }
        }
    
        log("setSubtitle) Could not find project " + id);
        reject("Project " + id + " was not found");
    });
    
}

// Completed - Lightly tested
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

function addNote(id, nID) {
    return new Promise(function(resolve, reject) {
        if (!id || !nID) {
            log("addNote) Error - pID: " + id + " nID: " + nID);
            reject("Could not add note with id " + nID + " to project with id " + id);
            return;
        }
        project2NoteMock.push({pID: id, nID: nID});
        resolve(true);
    });
}

function removeNote(pID, nID) {
    return new Promise(function(resolve, reject) {
        if (!pID) {
            reject("Could not remove note. Failed to provide a project id.");
        }
        if (!nID) {
            reject("Could not remove note. Failed to provide a note id.");
        }
        for (let i = 0; i < project2NoteMock.length; i++) {
            if (project2NoteMock[i].pID === pID) {
                if (project2NoteMock.nID === nID) {
                    let removed = project2NoteMock.splice(i, 1);
                    resolve(removed);
                    return;
                } else {
                    reject("Failed to remove note " + nID + ". Was not found in notes listed for project " + id);
                }
            }
        }
    
        log("removeNote) Failed to remove note " + nID + ". Could not find project " + id);
        reject("Failed to remove note " + nID + ". Could not find project " + id);
    });
    
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

function removeP2P(pID, pID2) {
    return new Promise(function(resolve, reject) {
        for (let i = 0; i < project2ProjectMock.length; i++) {
            if (project2ProjectMock[i] == pID && project2ProjectMock[i].pID2 == pID2) {
                project2ProjectMock.splice(i, 1);
                resolve(true);
                return;
            }
        }
        reject("Failed to remove relationship between " + pID + " and " + pID2 + ". Not found in database.");
    });
}

function wipeP2P(pID) {
    return new Promise(function(resolve, reject) {
        for (let i = 0; i < project2ProjectMock.length; i++) {
            if (project2ProjectMock[i] == pID && project2ProjectMock[i].pID2 == pID2) {
                project2ProjectMock.splice(i, 1);
                i = i - 1;  // If removed an entry then next entry will now be at position i (everything shifted over)
            }
        }
        resolve(true);
    });
}

function removeP2N(pID, nID) { // Duplicte function
    return new Promise(function(resolve, reject) {
        for (let i = 0; i < project2NoteMock.length; i++) {
            if (project2NoteMock[i] == pID && project2NoteMock[i].pID2 == pID2) {
                project2NoteMock.splice(i, 1);
                resolve(true);
                return;
            }
        }
        reject("Failed to remove relationship between " + pID + " and " + pID2 + ". Not found in database.");
    });
}

function wipeP2N(pID) {
    return new Promise(function(resolve, reject) {
        for (let i = 0; i < project2NoteMock.length; i++) {
            if (project2NoteMock[i] == pID && project2NoteMock[i].pID2 == pID2) {
                project2NoteMock.splice(i, 1);
                i = i - 1;  // If removed an entry then next entry will now be at position i (everything shifted over)
            }
        }
        resolve(true);
    });
}

function addSubProject(pID, pData) {
    // Create the new project
    return createProject(pData.title, pData.subtitle, pData.description, pData.imgPath, pData.publishDate).then(function(project) {
        // Assign that new project to be child of existing project
        return addSubProject(pID, project.pID).then(function(_) { return project; });
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
    getSubProjectIDs: getSubProjectIDs,
    wipeP2P: wipeP2P, 
    deleteSubProject: removeP2P,
    wipeP2N: wipeP2N,
    deleteNote: removeP2N,
    addSubProject: addSubProject,
    // removeNotes: removeNotes,
};

module.exports = database;