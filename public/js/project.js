// TODO - Need to add news/notices, and "notes"
class Project {
	constructor(id, title, subtitle, imgPath, description, author, createdAt, updatedAt, noteList, subProjects) {
		this.id = id; // Should there be a default value for new projects?
		this.title = title;
		this.subtitle = subtitle;
		this.description = description;
		this.author = author;
		this.createdAt = createdAt ? createdAt : new Date();
		this.updatedAt = updatedAt;
		this.imgPath = imgPath ? imgPath : "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/triangulation-minimalist-abstract-marble-and-metal-geometric-art-tina-lavoie.jpg";
		this.notes = noteList ? noteList : [];
		this.subProjects = subProjects ? subProjects : [];
	}

	getID() {
		return this.id;
	}
	getTitle() {
		return this.title;
	}
	setTitle(title) {
		this.title = title;
		this.updatedAt = new Date();
	}

	getSubtitle() {
		return this.subtitle;
	}
	setSubtitle(subtitle) {
		this.subtitle = subtitle;
		this.updatedAt = new Date();
	}

	getImg() {
		return this.imgPath;
	}
	setImg(imgPath) {
		this.imgPath = imgPath;
		this.updatedAt = new Date();
	}

	getDescription() {
		return this.description;
	}
	setDescription(description) {
		this.description = description;
	}

	getNotes() {
		return this.notes;
	}
	getNote(index) {
		return this.notes[index];
	}
	numNotes() {
		return this.notes.length;
	}
	addNote(note) {
		this.notes.push(note);
		this.updatedAt = new Date();
	}
	removeNote(note) {
		for (let i = 0; i < this.notes.length; i++) {
			if (this.notes[i] == note) {
				// TODO ? Might want some type of equals operator defined 
				this.notes.splice(i, 1);
			}
		}
	}
	clearNotes() {
		this.notes.clear();
	}

	getSubProjects() {
		return this.subProjects;
	}
	getSubProject(index) {
		return this.subProjects[index];
	}
	numSubProjects() {
		return this.subProjects.length;
	}
	addSubProject(project) {
		this.subProjects.add(project);
		this.updatedAt = new Date();
	}
	removeSubProject(pID) {
		for (let i = 0; i < this.subProjects.length; i++) {
			if (this.subProjects[i].id == pID) {
				this.subProjects.splice(i, 1);
				this.updatedAt = new Date();
			}
		}
	}

	getNewsfeed() {
		console.log("Newsfeed: " + this.subProjects);
		console.log(this.subProjects);
		return this.subProjects;
	}

	export() {
		return {
			pID: this.id,
			title: this.title,
			subtitle: this.subtitle,
			author: this.author,
			description: this.description,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			imgPath: this.imgPath,
			// notes: this.notes,	// Export should probably only be the details about the specific project
			// subProjects: this.subProjects,
		}
	}
}

class CreateProject {
	constructor() {
		this.domElement = this.create();
		this.attachPoint = null;
		this.parentProjects = [];
	}

	listenToNewProjects(projectRef) {
		this.parentProjects.push(projectRef);
	}

	pushNewProject(note) {
		for (let i = 0; i < this.parentProjects.length; i++) {
			this.parentProjects[i].addNote(project);
		}
	}

	create() {
		// Div to hold everything we do (tethers button and textarea together)
		let containerDiv = document.createElement("div");
		containerDiv.classList.add("content");

		// Object for handling all text input // TODO will want to update to some editor that has ability to format
		// let titleTag = document.createElement("h3");
		// titleTag.textContent = "Title";
		let editorTitle = document.createElement("p");
		editorTitle.classList.add("editor");

		let editorBody = document.createElement("p");
		editorBody.classList.add("editor");

		let editorImgLink = document.createElement("p");
		editorImgLink.classList.add("editor");
		let obj = this;

		// Don't want to show the text area by default so have a way of opening up place to edit
		let addProjectButton = document.createElement("button");
		addProjectButton.textContent = "Add New Project";
		addProjectButton.onclick = function() {
			// Render the div for making a new note
			containerDiv.removeChild(addProjectButton);
			containerDiv.appendChild(editorTitle);
			containerDiv.appendChild(editorBody);
			containerDiv.appendChild(editorImgLink);
			editorTitle.setAttribute("contentEditable", true);
			editorBody.setAttribute("contentEditable", true);
			editorImgLink.setAttribute("contentEditable", true); // TODO change this to something more appropriate
			editorTitle.focus();

			// Change button to now publish posts when clicked since they are currently in "editing/adding" mode
			addProjectButton.onclick = function() {
				let project = new Project(editorTitle.textContent, editorBody.textContent, editorImgLink.textContent, null, null);
				let renderableNote = new RenderProject(project);

				// Publish note before since its where questions would be stemming from anyways
				containerDiv.parentNode.insertBefore(renderableNote.domElement, containerDiv);
				pushNewNote(renderableNote);

				// Want to push newNote after any questions that would have been added (in future this step might be unnecessary if questions end up being children or something)
				let parent = containerDiv.parentNode;
				parent.removeChild(containerDiv);
				parent.appendChild(containerDiv); // Should move after all questions
				editor.textContent = "";
						
			};
			addProjectButton.textContent = "Publish";
			containerDiv.appendChild(addProjectButton);
		};

		containerDiv.appendChild(addProjectButton);
		return containerDiv;
	}

	render(attachPoint) {
		if (attachPoint) {
			attachPoint.appendChild(this.domElement);
			this.attachPoint = attachPoint;
		} else {
			console.log("No attach point provided to CreateNote");
		}
	}

	unrender() {
		if (this.domElement.parentNode) {
			this.domElement.parentNode.removeChild(this.domElement);
			this.attachPoint = null;
		} else {
			console.log("Tried to unrender newNote when wasn't rendered");
		}
	}
}

/*
TODO - Make it so that if open up to a page dedicated solely to project, can 1 click go back (maybe use cookies)
TODO - Decide if should be coupled with note?
TODO - Decide if should store notes and then wrap them with a renderer, or just store the note
TODO - Allow just setting bg colors as bgImg
*/
class RenderProject {
	constructor(project) {
		this.project = project;
		this.domElement = this.createDomElement();
		// Create region for appending notes and other new things
		this.notebook = document.createElement("div");
		this.notebook.classList.add("notebook");
		this.domElement.appendChild(this.notebook);

		this.newNote = new CreateNote();
		this.newNote.listenToNewNotes(this.project);

		this.newProject = new CreateProject();
		this.newProject.listenToNewProjects(this.project);

		this.isOpen = false;
		this.canEdit = false;
		this.rendered = false;
	}

	sleep() {
		let heroText = this.domElement.childNodes[0].childNodes[0].childNodes[0];
		let heroImage = this.domElement.childNodes[0].childNodes[0];

		// heroImage.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(" + this.project.imgPath + ")";
		// heroText.style.color = "black";
		// heroText.style.background = "#000000c9";
		heroText.classList.add("sleep");
	}

	awake() {
		let heroText = this.domElement.childNodes[0].childNodes[0].childNodes[0];
		let heroImage = this.domElement.childNodes[0].childNodes[0];

		// heroImage.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(" + this.project.imgPath + ")";
		// heroText.style.background = "none";
		// heroText.style.color = "white";
		heroText.classList.remove("sleep");
	}

	createDomElement() {
		// Should I re-use the card thing I have to allow for easily changing how it is displayed? or just make own thing?
		
		// Create div that will hold everything
		let projectDiv = document.createElement("div");
		projectDiv.classList.add("project");

		// SETUP HEADER (The Hero image and Project title)
		let projectHeader = document.createElement("div");
		projectHeader.classList.add("project-header");
		projectDiv.appendChild(projectHeader);

		// Setup image stuff (Could add ability to do just a color?)
		let heroImage = document.createElement("div");
		heroImage.classList.add("hero-image");
		heroImage.style.backgroundImage  = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" + this.project.getImg() + ")";
		
		// Darken on hover
		let imgPath = this.project.getImg();
		heroImage.addEventListener("mouseenter", function() {
			console.log("Mouse entered!");
			heroImage.style.backgroundImage = "linear-gradient(rgba(0, 10, 30, 0.2), rgba(0, 10, 30, 0.2)), url(" + imgPath + ")";
		});
		heroImage.addEventListener("mouseleave", function() {
			// if (!project.isOpen) {
				heroImage.style.backgroundImage  = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" + imgPath + ")";
			// }
		});

		// Setup the options menu for the div (should only render on desktop?)
		let project = this;
		var optionsMenu2 = document.createElement("div"); // Menu for interacting with project
		
		// editing button for menu
		let enableEditingButton = document.createElement("div");
		enableEditingButton.classList.add("projectButton");
		let editingIcon = document.createElement("img");
		enableEditingButton.classList.add("hoverable");
		editingIcon.src = "../res/imgs/edit.png";
		enableEditingButton.appendChild(editingIcon);
		optionsMenu2.appendChild(enableEditingButton);

		enableEditingButton.addEventListener("click", function() {
			if (project.isOpen && project.canEdit) {
				project.disableEditing();
			} else {
				project.enableEditing();
			}
			project.canEdit = !project.canEdit;
		});
		
		heroImage.addEventListener("click", function() {
			if (project.isOpen) {
				// Minimize the project
				project.close();
				projectDiv.removeChild(optionsMenu2);
			} else {
				// Expand the project and show the notes
				project.open();
				// optionsMenu2.classList.add("cardOptionsMenu2"); // TODO re-enable when do user accounts
				projectDiv.appendChild(optionsMenu2);
			}
			project.isOpen = !project.isOpen;
		});

		let heroText = document.createElement("div");
		heroText.classList.add("hero-text");
		heroImage.appendChild(heroText);

		let title = document.createElement("h1");
		title.classList.add("marker"); // Choose what font to display in
		title.textContent = this.project.getTitle();
		heroText.appendChild(title);

		let subtitle = document.createElement("p");
		subtitle.textContent = this.project.getSubtitle();
		heroText.appendChild(subtitle);
		projectHeader.appendChild(heroImage);

		return projectDiv;
	}

	enableEditing() {
		// TODO shouldn't it also apply to self?
		for (let i = 0; i < this.project.numNotes(); i++) {
			this.Project.getNote(i).enableEditing();
		}
	}

	disableEditing() {
		// TODO Shouldn't it also apply to itself?
		for (let i = 0; i < this.project.numNotes(); i++) {
			this.project.getNote(i).disableEditing();
		}
	}

	open() {
		for (let i = 0; i < this.project.numNotes(); i++) {
			this.project.getNote(i).render(this.notebook);
		}

		// this.newNote.render(this.notebook);
		// this.newProject.render(this.notebook);
	}

	close() {
		for (let i = 0; i < this.project.numNotes(); i++) {
			this.project.getNote(i).unrender();
		}
		this.newNote.unrender(this.notebook);
		this.newProject.unrender(this.notebook);
	}

	render(attachPoint) {
		if (attachPoint && !this.rendered) {
			attachPoint.appendChild(this.domElement);
			this.rendered = true; // Prevent circular rendering. Everything should render once at highest level it can be (maybe don't render things after a certain depth tho)
		} else {
			console.log("No attachpoint found for " + attachPoint);
		}
	}

	unrender() {
		if (this.domElement.parentNode) {
			this.domElement.parentNode.removeChild(this.domElement);
		}
		this.rendered = false;
	}

	/*
		Right now still need a way to expose the underlying methods of pulling data out...
	*/
	getTitle() {
		return this.project.getTitle();
	}

	getSubtitle() {
		return this.project.getSubtitle();
	}

	getImg() {
		return this.project.getImg();
	}
}

/*
	How to deal with issue of clicking to open to see notes and clicking to follow a link?
*/
class LinkedRenderProject {
	// Would technically not even want to load the data for a project in this case as its an un-necessary expense...
	constructor(project, link) {
		this.project = project;
		this.link = link;
		this.domElement = this.create();
	}

	create() {
		// Create the link element
		let linkTag = document.createElement("a");
		linkTag.href = this.link;
		
		// Create div that will hold everything
		let projectDiv = document.createElement("div");
		projectDiv.classList.add("project");

		// SETUP HEADER (The Hero image and Project title)
		let projectHeader = document.createElement("div");
		projectHeader.classList.add("project-header");
		projectDiv.appendChild(projectHeader);

		let heroImage = document.createElement("div");
		heroImage.classList.add("hero-image");
		heroImage.style.backgroundImage  = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" + this.project.getImg() + ")";
		
		// Darken on hover
		let imgPath = this.project.getImg();
		heroImage.addEventListener("mouseenter", function() {
			heroImage.style.backgroundImage = "linear-gradient(rgba(0, 10, 30, 0.2), rgba(0, 10, 30, 0.2)), url(" + imgPath + ")";
		});
		let project = this;
		heroImage.addEventListener("mouseleave", function() {
			if (!project.isOpen) {
				heroImage.style.backgroundImage  = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imgPath + ")";
			}
		});

		let heroText = document.createElement("div");
		heroText.classList.add("hero-text");
		heroImage.appendChild(heroText);

		let title = document.createElement("h1");
		title.classList.add("marker"); // Choose what font to display in
		title.textContent = this.project.getTitle();
		heroText.appendChild(title);

		let subtitle = document.createElement("p");
		subtitle.textContent = this.project.getSubtitle();
		heroText.appendChild(subtitle);
		projectHeader.appendChild(heroImage);

		linkTag.appendChild(projectDiv);
		return linkTag;
	}

	render(attachPoint) {
		attachPoint.appendChild(this.domElement);
	}
	unrender() {
		if (this.domElement.parentNode) {
			this.domElement.parentNode.removeChild(this.domElement);
		}
	}
}

/*
	Used to collect data to create new project

	Should I create a factory for creating new elements?
*/
class NewProject {
	constructor(reportTo) {
		// Feel like using modals to just quickly get all the data might work
		this.modal = this.createProjectModal();
		this.modalContent = this.modal.firstChild.firstChild;
		this.domElement = this.createButton();
		this.img = "../img/library.jpg";
		this.title = "Example Title";
		this.subtitle = "Example Subtitle";
		this.description = "Example description";
		this.reportCallback = reportTo;
	}

	render(attachPoint) {
		// attachPoint.appendChild(this.domElement);
		attachPoint.appendChild(this.modal);
		this.openModal;
	}

	createButton() {
		// So create a floating button that when clicked spawns process of creating a new project?
		let newProjectDiv = document.createElement("div");
		newProjectDiv.classList.add("new-project-div");

		let newProjectButton = document.createElement("button");
		newProjectButton.textContent = "New Project";
		newProjectButton.classList.add("new-project-button");
		let npObj = this;
		newProjectButton.onclick = function() {
			npObj.modal.style.display = "block";
		}

		newProjectDiv.appendChild(newProjectButton);
		return newProjectDiv;
	}

	// TODO refactor (make shorter, organize)
	createProjectModal() {
		let newProjObj = this;

		// Create an example of what it would look like
		let exampleProject = document.createElement("div");
		exampleProject.classList.add("container");	
		let refreshExample = function() {
			if (exampleProject.firstElementChild) {
				exampleProject.removeChild(exampleProject.firstElementChild);
			}

			let project = new RenderProject(new Project(newProjObj.title, newProjObj.subtitle, newProjObj.img, null));
			
			// let pictureCard = new PictureCard(newProjObj.title, newProjObj.subtitle, newProjObj.img, null, null);
			project.render(exampleProject);
			// exampleProject.appendChild(project.);	// Should probably switch to just updating...
		}
		refreshExample();

		let modal = this.createModal();
		let content = modal.firstChild.firstChild;

		let header = document.createElement("div");
		header.classList.add("header");
		header.classList.add("marker");
		header.textContent = "Create a New Project!";

		let nameRequest = document.createElement("h2");
		nameRequest.textContent = "Project name";
		let nameInput = document.createElement("input");
		nameInput.type = "text";
		nameInput.name = "project-name";
		nameInput.oninput = function(e) {
			newProjObj.title = nameInput.value;
			refreshExample();
		}

		let bgImg = document.createElement("h2");
		bgImg.textContent = "Upload background image";
		let bgImgInput = document.createElement("input");
		bgImgInput.type = "file";
		bgImgInput.name = "bgImg";
		bgImgInput.accept = "image/gif, image/jpeg, image/png";

		bgImgInput.addEventListener("change", function() {
			var file = bgImgInput.files[0];
			var reader  = new FileReader();

			reader.onloadend = function (theFile) {
				newProjObj.img = theFile.target.result;
				refreshExample();
			}

			if (file) {
				reader.readAsDataURL(file);
			} else {
				// Error'd out. Print error message and prompt re-entry
				// preview.src = "";
			}
		}, false);

		let subtitleRequest = document.createElement("h2");
		subtitleRequest.textContent = "Project subtitle";
		let subtitleInput = document.createElement("input");
		subtitleInput.type = "text";
		subtitleInput.name = "subtitle";
		subtitleInput.oninput = function() {
			newProjObj.subtitle = subtitleInput.value;
			refreshExample();
		}

		let descriptionRequest = document.createElement("h2");
		descriptionRequest.textContent = "Project description";
		let descriptionInput = document.createElement("textarea");
		descriptionInput.oninput = function() {
			newProjObj.description = descriptionInput.value;
			console.log("Updated description to: " + newProjObj.description);
			refreshExample();
		}

		let submit = document.createElement("button");
		submit.textContent = "Submit";
		submit.onclick = function() {
			newProjObj.report(newProjObj.title, newProjObj.subtitle, newProjObj.imgPath, newProjObj.description);
		}

		// TODO add stuff for goals or expected finish date?
		content.appendChild(header);
		content.appendChild(nameRequest);
		content.appendChild(nameInput);
		content.appendChild(bgImg);
		content.appendChild(bgImgInput);
		content.appendChild(subtitleRequest);
		content.appendChild(subtitleInput);
		content.appendChild(descriptionRequest);
		content.appendChild(descriptionInput);
		content.appendChild(submit);
		content.appendChild(exampleProject);
		return modal;
	}

	openModal() {
		this.modal.style.display = "block";
	}

	closeModal() {
		this.modal.style.display = "none";
	}

	createModal() {
		let modal = document.createElement("div");
		modal.classList.add("modal");

		window.onclick = function(event) {
			if (event.target == modal) {
				console.log("Closing modal on window click");
				modal.style.display = "none";
			}
		}

		let modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");

		let closeButton = document.createElement("span");
		closeButton.innerHTML = "&times;";
		closeButton.classList.add("close");
		closeButton.onclick = function() {
			console.log("Closing modal on x click");
			modal.style.display = "none";
		}

		let container = document.createElement("div");
		container.classList.add("container");

		modalContent.appendChild(container);
		modalContent.appendChild(closeButton);
		modal.appendChild(modalContent);

		return modal;
	}

	askForTitle() {
		let title = document.createElement("h2");
		title.textContent = "Project name: ";
		let input = document.createElement("input");
		input.type = "text";
		input.name = "project-name";
		input.addEventListener("keypress", function(e) {
			console.log("Key press!");
		});
	}

	report(title, subtitle, bgImg, description) {
		console.log("Reporting data to callback");
		if (this.reportCallback) {
			console.log("Callback was registered");
			this.reportCallback(title, subtitle, bgImg, description);
		}
	}
}