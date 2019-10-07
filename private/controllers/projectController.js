projectDB = require('../models/projectDB');
notesDB = require('../models/noteDB');

/*
    Seems like at this level I should just make sure data is present, check validity before querying database

    Can do a one to many promise event response (think of then as registering an event handler!)
    TODO
    Why is client getting multiple responses?
    How to tell client something went wrong?
*/
function loadTab(req, res) {
    let q = req.query;
    console.log("Loading tab " + q.tab);
    
    // Pull based on tagName
    if (q.tab) {
        console.log("Trying to get projects for tab: " + q.tab);
        let tabPromise = new Promise(function(resolve, reject) {
            projectDB.getForTab(q.tab, function(pIDs, err) {
                if(err) {
                    reject(err);
                }
                resolve(pIDs);
            })
        });

        tabPromise.then(getProjects).then(function(projects) {res.send({content: projects, error: null})}).catch(err => res.send({content: null, error: res.send}));

    } else {
        // Let them know no tab name was given
        console.log('\x1b[33m%s\x1b[0m', "Tab) Request with no tab name");
        res.send({content: null, error: "Please provide tab name when requesting information for tabs"});
    }
}

function addProject(req, res) {
    console.log("Adding project to database");
    let params = req.query;

    if (params) {
        if (!title) {
            log("addProject) ERROR - No title was provided");
        }
        if (!imgLink) {
            // Provide a default image
        }
        projectDB.create(params.title, params.subtitle, params.description, params.imgLink, params.publishDate, function(project, err) {
            if (err) {
                log("addProject) " + err);
                res.send({content: null, error: err}); // DO I need a return statement to not send multiple times?
            }

            res.send({content: project, error: err});
        });
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
        let project2Notes = projectDB.getNoteIDs(q.pID).then(notesDB.getNotes);
        let project2Projects = projectDB.getSubProjectIDs(q.pID).then(getProjects);

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
        res.send("ERROR) Cannot fill project without project id");
    }
    
}

function getProject(req, res) {
    // TODO
}

function updateProject(req, res) {
    console.log("Updating project: " + req.body);
    projectDB.update(req.body).then(function(updated) {
        res.send({content: updated, error: null});
    }).catch(err => res.send({content: null, error: err}));
}

// Methods for editing project state
function deleteProject(req, res) {

}

function setTitle(req, res) {

}

function setSubtitle(req, res) {

}

function addNote(req, res) {

}

function removeNote(req, res) {

}

// Or should I just only have the singleton and let controller deal with it?
function removeNotes(req, res) {

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
    removeNote: removeNote,
    removeNotes: removeNotes,
}

module.exports = routes;

/*
    So project structure is as follows
    Website is composed of tabs (Dont need table for this since this is constant on the site, but could add a table if wanted to make this dynamic)
    Tabs have projects (Table for tabs to projects (since projects have flux relationship with tabs))
    Projects have notes (Table for Projects to notes (since notes have flux relationship with tabs))
    Notes can have notes (So would I have a Note to Note table (this is kinda the bottom out table that might grow too fast))
*/