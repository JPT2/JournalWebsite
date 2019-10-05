projectDB = require('../models/projectDB');

/*
    Seems like at this level I should just make sure data is present, check validity before querying database
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
        // TODO just make the db calls into promises
        let tabPromise = new Promise(function(resolve, reject) {
            projectDB.getForTab(q.tab, function(pIDs, err) {
                if(err) {
                    reject(err);
                }
                resolve(pIDs);
            })
        });
        
        tabPromise.then(function(pIDs) {
            getProjects(pIDs, function(projects, err) {
                if (err) {
                    res.send(err);
                } else {
                    // In the future maybe fill here, but could also send back the project data and then let them make separate request for fills? Its just I know I need the "first" page data here
                    res.send(projects);
                }
            })
        }).catch(err => res.send(err));
    } else {
        // Let them know no tab name was given
        console.log("Tab) Request with no tab name");
        res.send("Please provide tab name when requesting information for tabs");
    }
}

function addProject(req, res) {
    console.log("Adding project to database");
    let params = req.query;

    if (params) {
        if (!title) {
            log("addProject) ERROR - NO title was provided");
        }
        if (!imgLink) {
            // Provide a default image
        }
        projectDB.create(params.title, params.subtitle, params.description, params.imgLink, params.publishDate, function(project, err) {
            if (err) {
                log("addProject) " + err);
                res.send(err); // DO I need a return statement to not send multiple times?
            }

            res.send(project);
        });
    }
}

function getProjects(pIDs, cb) {
    let promises = [];
    for (let i = 0; i < pIDs.length; i++) {
        promises.push(new Promise(function(resolve, reject) {
            // Kinda weird probably better way to do this
            projectDB.get(pIDs[i], function(pData, err) {
                if (err) {
                    reject(err);
                }
                resolve(pData);
            });
        }))
    }
    Promise.all(promises).then(function(projects) {
        // Return projects (Should I sort them here by date?)
        cb(projects, null);
    }).catch(err => cb(null, err));
}

function getProject(req, res) {
    let params = req.query;

    if (!id) {
        // Need id in order to query DB
        log("getProject) ERROR - Cannot find a project without project Id");
        res.send("ERROR - Cannot find a project without project Id");
    }
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