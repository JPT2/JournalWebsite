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

function apiAddProject(project) {
    // Should these be promises?
    return apiPostCall("project/add", project.export());
}

function apiDeleteProject(project) {
    return apiGetCall("project/delete?pID=" + project.getID());
}

function apiUpdateProject(project) {
    return apiPostCall("project/update", project.export());
}

function apiAddNote2Project(note, pID) {
    return apiPostCall("project/note/add", {pID: pID, note: note.export()});
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
                console.log("Get request " + route + " returned with: " + returnData);
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
    }) 
}

function encodeObject(data) {
    return JSON.stringify(data);
}