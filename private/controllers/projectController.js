projectDB = require('../models/projectDB');
notesDB = require('../models/noteDB');

/*
    Seems like at this level I should just make sure data is present, check validity before querying database

    Can do a one to many promise event response (think of then as registering an event handler!)
    TODO
    Why is client getting multiple responses?
    How to tell client something went wrong?
    ADD CHECKS TO SEE IF USER IS LOGGED IN AND HAS PERMISSION TO PERFORM THESE ACTIONS ONCE DONE TESTING
*/
function loadTab(req, res) {
    let q = req.query;
    console.log("Loading tab " + q.tab);
    
    // Pull based on tagName
    if (q.tab) {
        console.log("Trying to get projects for tab: " + q.tab);
        projectDB.getForTab(q.tab).then(getProjects).then(function(projects) {console.log("Sending ", projects); res.send({content: projects, error: null})}).catch(err => res.send({content: null, error: err}));

    } else {
        // Let them know no tab name was given
        console.log('\x1b[33m%s\x1b[0m', "Tab) Request with no tab name");
        res.send({content: null, error: "Please provide tab name when requesting information for tabs"});
    }
}

function addProject(req, res) {
    console.log("Adding project to database");
    let q = req.query;

    if (q) {
        if (!q.title) {
            log("addProject) ERROR - No title was provided");
            res.send({content: null, error: err});
        }
        if (!q.imgPath) {
            // Provide a default image
            log("addProject) ERROR - No img was provided");
            res.send({content: null, error: err});
        }

        // title, subtitle, description, imgPath, publishDate,
        projectDB.create(q.title, q.subtitle, q.description, q.imgPath, q.createdAt).then(function(project) {
            res.send({content: project, error: null});
        }).catch(err => res.send({content: null, error: err}));
    }
}

// TODO - Currently if this fails it doesnt return anything... Should maybe find way to pass back the objects it did recover?
function getProjects(pIDs) {
    let promises = [];
    for (let i = 0; i < pIDs.length; i++) {
        promises.push(projectDB.get(pIDs[i]));
    }

    return Promise.all(promises);
}

function fillProject(req, res) {
    let q = req.query;

    console.log("Filling project + " + q.pID);
    if (q.pID) {
        // Want to get project2Projects and project2Notes
        let project2Notes = projectDB.getNoteIDs(q.pID).then(function(nIDs) {
            if (nIDs && nIDs.length) {
                return notesDB.getNotes(nIDs);
            } else {
                // There aren't any notes to pull so just end early
                return new Promise(function(resolve, reject) {
                    resolve([]);
                });
            }
        });
        let project2Projects = projectDB.getSubProjectIDs(q.pID).then(function(pIDs) {
            if (pIDs) {
                return getProjects(pIDs);
            } else {
                return new Promise(function(resolve, reject) {
                    resolve([]);
                })
            }
        });

        Promise.all([project2Notes, project2Projects]).then(function(values) {
            console.log("Filling with");
            console.log(values);
            let returnObj = {
                notes: values[0],
                subProjects: values[1],
            }
            res.send({content: returnObj, error: null});
        }).catch(err => res.send({content: null, error: err}));
        // projectDB.getNoteIDs(q.pID).then(notesDB.getNotes).then(notes => { console.log("Sending response: " + notes); res.send(notes) }).catch(err => res.send(err));
    } else {
        res.send({content: null, error: "Cannot fill project without project id"});
    }
    
}

function getProject(req, res) {
    let q = req.query;
    projectDB.get(q.pID).then(function(project) {
        res.send({content: project, error: null});
    }).catch(err => res.send({content: null, error: err}));
}

function updateProject(req, res) {
    console.log("Updating project: " + req.body);
    projectDB.update(req.body).then(function(updated) {
        res.send({content: updated, error: null});
    }).catch(err => res.send({content: null, error: err}));
}

// Methods for editing project state
function deleteProject(req, res) {
    let q = req.query;
    if (q.pID) {
        projectDB.delete(q.pID).then(function(project) {
            // delete from other databases
            let deletePromises = [
                projectDB.getNoteIDs(q.pID).then(notesDB.deleteNotes).then(function(value) {projectDB.wipeP2N(q.pID)}),
                projectDB.wipepP2P(q.pID),
            ];
            Promise.all(deletePromises).then(function(values) {
                res.send({content: true, error: null});
            }).catch(err => res.send({content: null, error: err}));
        }).catch(err => res.send({content: null, error: err}));
    } else {
        res.send({content: null, error: "Failed to delete project. No ID provided"});
    }
}

function setTitle(req, res) {
    let data = req.body;
    projectDB.setTitle(data.pID, data.title).then(function(project) {
        res.send({content: project, error: null});
    }).catch({content: null, error: err});
}

function setSubtitle(req, res) {
    let data = req.body;
    projectDB.setSubtitle(data.pID, body.subtitle).then(function(project) {
        res.send({content: project, error: null});
    }).catch({content: null, error: err});
}

function addNote(req, res) {
    let data = req.body;

    if (data.content) {
        // Add note to note database, use id of that to add to p2n database
        notesDB.addNote(data.content, data.createdAt ? data.createdAt : new Date()).then(function(note) {
            return projectDB.addNote(note.nID);
        }).then(function(success) {
            res.send({content: success, error: null});
        }).catch(err => res.send({content: null, error: err}));
    } else {
        res.send({content: null, error: "Failed to add note. No content."});
    }
}

function deleteNote(req, res) {
    let data = req.body;
    if (!data.pID || !data.nID) {
        projectDB.deleteNote(data.pID, data.nID).then(notesDB.deleteNote(data.nID)).then(function(value) {
            res.send({content: value, error: null});
        }).catch(err => res.send({content: null, error: err}));
    } else {
        res.send({content: null, error: "Failed to delete note from project. Need both ids to delete. Given pID: " + data.pID + " and noteID: " + data.nID});
    }
}

// Or should I just only have the singleton and let controller deal with it?
function deleteNotes(req, res) {
    let data = req.body;
    if (data.pID) {
        if (data.nIDs) {
            let promises = [];
            for (let i = 0; i < data.nIDs.length; i++) {
                promises.push(projectDB.deleteNote(data.pID, data.nID).then(notesDB.deleteNote(data.nID)));
            }
            Promise.all(promises).then(function(values) {   
                res.send({content: values, error: null});
            }).then(values => res.send({content: values, error: null})).catch(err => res.send({content: null, error: err}));
        } else {
            res.send({content: null, error: "Failed to delete notes. No note list provided."});
        }
    } else {
        res.send({content: null, error: "Failed to delete notes. No project id provided."});
    }   
}

function addSubProject(req, res) {
    // Create project, then bind
    let data = req.body;
    if (data.pID) {
        if (data.project) {
            projectDB.addSubProject(data.pID, data.project);
        } else {
            res.send({content: null, error: "Failed to add subproject. Missing data for sub project"});
        }
    } else {
        res.send({content: null, error: "Failed to add subproject. Missing ID for parent project"});
    }
}

function deleteSubProject(req, res) {
    let data = req.query;
    if (data.pID) {
        if (data.pID2) {
            // First delete binding, then remove project (must worse to have pointer to nothing imo)
            projectDB.deleteSubProject(data.pID, data.pID2).then(projectDB.deleteProject(data.pID2)).then(function(_) { res.send({content: _, error: null}); }).catch(err => res.send({content: null, error: err}));
        } else {
            res.send({content: null, error: "Failed to delete subproject. Missing ID for subproject"});
        }
    } else {
        res.send({content: null, error: "Failed to delete subproject. Missing ID for parent project"});
    }
}

var routes = {
    loadTab: loadTab,
    create: addProject,
    get: getProject,
    fill: fillProject,
    update: updateProject,
    delete: deleteProject,
    setTitle: setTitle,
    setSubtitle: setSubtitle,
    addNote: addNote,
    deleteNote: deleteNote,
    deleteNotes: deleteNotes,
    addSubProject: addSubProject,
    deleteSubProject: deleteSubProject,
}

module.exports = routes;

/*
    So project structure is as follows
    Website is composed of tabs (Dont need table for this since this is constant on the site, but could add a table if wanted to make this dynamic)
    Tabs have projects (Table for tabs to projects (since projects have flux relationship with tabs))
    Projects have notes (Table for Projects to notes (since notes have flux relationship with tabs))
    Notes can have notes (So would I have a Note to Note table (this is kinda the bottom out table that might grow too fast))
*/