var xhttp = new XMLHttpRequest();

    // Tabs represent the clickable menu items
    // TODO make these into promises
    function getTab(tabName) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // Load project using returned data
            console.log("Returned!");
            console.log(xhttp.responseText);
            console.log(JSON.parse(xhttp.responseText));

            // Should notes be included? (Would save on # requests but might be too much data. I definitely want notes for the project I'm loading in, but don't really need for others...)
                // Since I'll sometimes need it and sometimes wont ill just make it a param. but this might kinda be premature
            let projectList = JSON.parse(xhttp.responseText);
            fillProjects(projectList).then(function(filledProjects) {
                console.log("Filled projects");
                console.log(filledProjects);
                let projectObjs = wrapToProjects(filledProjects);
                loadPage(projectObjs);
            }).catch(err => console.log("ERROR In PROMISE - fillPROJECTS: " + err)); // Adds notes to each project
            let projectObjs = wrapToProjects(projectList);
            loadPage(projectObjs);
        }
        console.log("About to send request");
        xhttp.open("GET", "tab/load?tab=" + tabName, true);
        xhttp.send();
        console.log("Request sent");
    }

function apiGetTab(tabName) {
    return apiGetCall("tab/load?tab=" + tabName);
}

function apiGetProject(pID) {
    return apiGetCall("project/get?pID=" + pID);
}

function apiUpdateProject(project) {
    return apiPostCall("project/update", project.export());
}

function apiGetNote(nID) {
    return apiPostCall("note/get?nID=" + nID);
}

function apiDeleteNoteFromProject(pID, nID) {
    return apiGetCall("project/note/delete?pID=" + pID + "&nID=" + nID); // I feel like stuff that has to do with adding to db or modifying db should probably be post calls...
}

function apiDeleteSubProject(pID, pID2) {
    return apiGetCall('project/subProject/delete?pID=' + pID + "&pID2=" + pID2);
}
function updateNote(note) {
    return apiPostCall('note/update', note.export());
}

function addUser(username, password, firstName, lastName, preferred) {
    return apiPostCall('user/add', {username: username, password: password, firstName: firstName, lastName: lastName, preferred: preferred});
}

function apiDeleteUser(username) {
    return apiPostCall('user/delete', {username: username});
}

function apiAddProject(project) {
    // Should these be promises?
    return apiPostCall("project/create", project.export());
}

function apiDeleteProject(project) {
    return apiGetCall("project/delete?pID=" + project.getID());
}

function apiUpdateProject(project) {
    return apiPostCall("project/update", project.export());
}

function apiAddNote2Project(pID, note) {
    return apiPostCall("project/note/add", {pID: pID, note: note.export()});
}

function apiAddSubProject(pID, project) {
    return apiPostCall("project/subProject/add", {pID: pID, project: project.export()});
}

function apiFillProject(pID) {
    return apiGetCall("project/fill?pID=" + pID);
}

function apiPostCall(route, jsonObj) {

    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();

        // Handle the return
        xhttp.onreadystatechange = function() {
            console.log("Ready state chagned");
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("Api call returned with: " + xhttp.responseText);
                let returnData = JSON.parse(xhttp.responseText);
                if (returnData.error) {
                    reject(returnData.error);
                    return;
                }
                
                resolve(returnData.content); // Maybe have convention of a "content" and a "error" property?
            }
        }
        xhttp.open("POST", route, true);
        xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhttp.send(encodeObject(jsonObj));
    }) 
}

function apiGetCall(route) {
    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();

        // Handle the return
        xhttp.onreadystatechange = function() {
            console.log("Ready state chagned");
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let returnData = JSON.parse(xhttp.responseText);
                console.log("Get request " + route + " returned with: ", returnData);
                if (returnData.error) {
                    reject(returnData.error);
                    return;
                }
                
                resolve(returnData.content); // Maybe have convention of a "content" and a "error" property?
            }
        }
        xhttp.open("GET", route, true);
        xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhttp.send();
    });
}

function encodeObject(data) {
    return JSON.stringify(data);
}