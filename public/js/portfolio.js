// TODO Should make menu bar tabs part of scroll bar

// Feel like this might get dicey later on
let state = {
    activeProject: null,
    projects: null,
    modal: null, // TODO <- Shouldnt do this...
}

function loadProject(project) {
    console.log("Loading project");
    console.log(project);
    state.activeProject = project;

    loadHeroImage(project.getImg());
    loadTitle(project.getTitle(), project.getSubtitle());
    loadNewsfeed(project.getNewsfeed());
    loadDescription(project.getDescription(), project.getNotes());
}

function loadHeroImage(imgPath) {
    let div = document.getElementById("hero-image");
    // Unload previous img
    cleanDiv(div);

    let heroImage = document.createElement("div");
    heroImage.classList.add("hero-image");
    heroImage.style.backgroundImage  = "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(" + imgPath + ")";
    if (state.books) {
        heroImage.style.backgroundSize = "300px 100%";
    }

    div.appendChild(heroImage);

    let editDiv = document.getElementById("edit-hero-image");
    editDiv.onclick = function() {
        editHeroImage();
        loadScrollBar(state.projects);
    }
}

function editHeroImage() {
    let editDiv = document.getElementById("edit-hero-image");
    var url = prompt("Please enter new image url", "https://i.kym-cdn.com/photos/images/newsfeed/001/504/739/5c0.jpg");
    if (url) {
        state.activeProject.setImg(url);
        loadHeroImage(url);
    }
}

function loadTitle(title, subtitle) {
    let div = document.getElementById("title");
    cleanDiv(div);

    let titleDiv = document.createElement("h1");
    titleDiv.classList.add("title");
    let subtitleDiv = document.createElement("h4");
    subtitleDiv.classList.add("subtitle");

    titleDiv.textContent = title;
    div.appendChild(titleDiv);
    if (subtitle) {
        subtitleDiv.textContent = subtitle;
        div.appendChild(subtitleDiv);
    }

    // Allow for content to be edited
    let editDiv = document.getElementById("edit-title");
    // ToDo - Should be able to just string this up in some setup function and not call everytimg we call loadTitle
    editDiv.onclick = function() {
        enableEditTitle();
    }
}

function loadNewsfeed(news) {
    // Unload previous news
    let div = document.getElementById("newsfeed");
    cleanDiv(div);

    // TODO - Add way to add a new newsfeed entry? Or should that be handled elsewhere?
        // Maybe have it set as outside so not constantly erasing and reloading it
    if (news.length) {
        for (let i = 0; i < news.length; i++) {
            let p = document.createElement("p");
            p.classList.add("news");
            p.classList.add("hoverable");
            console.log("Added classes!");
            p.textContent = news[i].getTitle();

            // Actually by default it should all be clickable
            // Maybe move function body out?
            p.addEventListener("click", function() {
                console.log("Opening notice: " + news[i]);
                // Repopulate the display
                // TODO Decide if should reload image, newsfeed
                if (news[i].getImg) {
                    loadHeroImage(news[i].getImg());
                }
                loadTitle(news[i].getTitle(), news[i].getSubtitle());
                loadDescription(news[i].getDescription(), news[i].getNotes());
            });
            div.appendChild(p);
        }
    } else {
        // Render some notice that there are none
        let p = document.createElement("p");
        p.classList.add("news");
        p.classList.add("notice");
        p.textContent = "No New Notices";
        div.appendChild(p);
    }

    let addNewsDiv = document.getElementById("add-newsfeed"); // TODO this should not be in this class
    addNewsDiv.onclick = function() {
        addNews();
    }
}

function cleanDiv(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

// TODO Need to reset the addNote text when running this, just in case. Send alert to user to throw away or save opej things
function loadDescription(description, notes) {
    let div = document.getElementById("description");
    cleanDiv(div);

    let notebook = document.createElement("div");
    notebook.classList.add("notebook");
    let contentP = document.createElement("p");
    contentP.classList.add("content");
    contentP.textContent = description;
    notebook.appendChild(contentP);
    div.appendChild(notebook);

    let addDescripDiv = document.getElementById("add-description");
    addDescripDiv.onclick = function() {
        addNote();
    };
}

function loadScrollBar(projects) {
    let div = document.getElementById("scroll");
    cleanDiv(div);

    // Update state to let us now what is currently active
    state.projects = projects;
    for (let i = 0; i < projects.length; i++) {
        // TODO Do I need to track the rendered projects? <- I would think not
        let newProject = new RenderProject(projects[i]);

        let clickable = document.createElement("div");
        clickable.addEventListener("click", function() {
            loadProject(projects[i]);
        });
        
        // Publishh
        newProject.render(clickable);
        div.appendChild(clickable);
    }

    let addDiv = document.getElementById("add-scroll");
    addDiv.onclick = function() {
        console.log("Add div clicked");
        addScroll();
    }
}

function addScroll() {
    // Just need to ask for title and subtitle.
    let projectCallback = function(title, subtitle, bgImg, description) {
        console.log("Project callback active");
        let project = new Project(title, subtitle, bgImg, description, []);
        if (state.projects) {
            console.log("Adding to projects");
            state.projects.unshift(project);
            // Should close modal...
            state.modal.closeModal();
            loadScrollBar(state.projects);
        } else {
            console.log("Making new project list");
            state.projects = [project];
        }
    }

    if (state.modal) {
        state.modal.openModal();
    } else {
        let newProject = new NewProject(projectCallback);
        state.modal = newProject;
        let div = document.body; // getElementById("add-scroll");
        newProject.render(div);
        console.log("Add a new scroll");
    }
    
}

function enableEditTitle() {
    let div = document.getElementById("title");
    let editFlag = document.getElementById("edit-title");   // ToDo Shouldn't have to do this twice
    editFlag.textContent = "Save";

    let textNodes = div.childNodes;

    for (let i = 0; i < textNodes.length; i++) {
        textNodes[i].contentEditable = "true";
    }
    textNodes[0].focus();

    // Set edit element to save content when clicked // TODO Decide if this code should be in here
    editFlag.onclick = function() {
        editFlag.textContent = "Edit";

        // Deal with title updates
        if (textNodes[0].textContent) {
            // Save the title // TODO
        }
        textNodes[0].contentEditable = "false";

        // Deal with subtitle
        if (textNodes[1].textContent) {
            // Save the subtitle // TODO
        }
        textNodes[1].contentEditable = "false";

        // Make it so can edit text again
        editFlag.onclick = enableEditTitle;
    }
}

function addNote() {
    let description = document.getElementById("description");
    let notebook = description.firstChild;

    // Create div for writing new content
    let editable = document.createElement("p");
    editable.classList.add("content");
    editable.contentEditable = "true";

    // Updated text on add
    let addFlag = document.getElementById("add-description");
    addFlag.textContent = "save";
    addFlag.onclick = function() {
        addFlag.textContent ="+";
        if (editable.textContent) {
            editable.contentEditable = "false";
            editable.focus();
            let project = new Project(editable.textContent, "", "./img/cyberPunk.jpg", "", []);
        } else {
            editable.parentNode.removeChild(editable);
        }
        
        // have to add to currently rendered project somehow... Need state mangement. (Should have something monitoring what is currently rendered, whats in the wings, etc.)
        addFlag.onclick = addNote;
    };

    // Add the new element
    notebook.insertBefore(editable, notebook.firstChild);
    editable.focus();
}

function addNews() {
    let newsfeed = document.getElementById("newsfeed");

    // Create div for writing new content
    let editable = document.createElement("div");
    editable.classList.add("news");
    editable.contentEditable = "true";

    // Updated text on add
    let addFlag = document.getElementById("add-newsfeed");
    addFlag.textContent = "save";
    addFlag.onclick = function() {
        addFlag.textContent ="+";
        if (editable.textContent) {
            editable.contentEditable = "false";
            let project = new Project(editable.textContent, "", "./img/cyberPunk.jpg", "", []);
        } else {
            editable.parentNode.removeChild(editable);
        }
        
        // have to add to currently rendered project somehow... Need state mangement. (Should have something monitoring what is currently rendered, whats in the wings, etc.)
        addFlag.onclick = addNews;
    };

    // Add the new element
    newsfeed.insertBefore(editable, newsfeed.firstChild);
    editable.focus();
}