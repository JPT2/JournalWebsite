// TODO - I think it would be cool to have a featured project top and to the left, and then a scrollable carousel to the right where hovering over something in it causes it to be featured
class Project {
	constructor(title, subtitle, imgPath, noteList) {
		this.title = title;
		this.subtitle = subtitle;
		this.imgPath = imgPath ? imgPath : "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/triangulation-minimalist-abstract-marble-and-metal-geometric-art-tina-lavoie.jpg";
		this.notes = noteList ? noteList : [];
	}

	getTitle() {
		return this.title;
	}
	setTitle(title) {
		this.title = title;
	}

	getSubtitle() {
		return this.subtitle;
	}
	setSubtitle(subtitle) {
		this.subtitle = subtitle;
	}

	getImg() {
		return this.imgPath;
	}
	setImg(imgPath) {
		this.imgPath = imgPath;
	}

	getNote(index) {
		return this.notes[index];
	}
	numNotes() {
		return this.notes.length;
	}
	addNote(note) {
		this.notes.push(note);
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
}

/*
TODO - Make it so that if open up to a page dedicated solely to project, can 1 click go back (maybe use cookies)
TODO - Add mobile friendly version of project?
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

		this.isOpen = false;
		this.canEdit = false;
		this.rendered = false;
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

		let heroImage = document.createElement("div");
		heroImage.classList.add("hero-image");
		heroImage.style.backgroundImage  = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" + this.project.getImg() + ")";
		
		// Darken on hover
		let imgPath = this.project.getImg();
		heroImage.addEventListener("mouseenter", function() {
			console.log("Mouse entered!");
			heroImage.style.backgroundImage = "linear-gradient(rgba(0, 10, 30, 0.2), rgba(0, 10, 30, 0.2)), url(" + imgPath + ")";
		});
		let project = this;
		var optionsMenu2 = document.createElement("div"); // Menu for interacting with project
		
		let enableEditingButton = document.createElement("div");
		enableEditingButton.classList.add("projectButton");
		let editingIcon = document.createElement("img");
		enableEditingButton.classList.add("hoverable");
		editingIcon.src = "../res/imgs/edit.png";
		enableEditingButton.appendChild(editingIcon);
		optionsMenu2.appendChild(enableEditingButton);

		enableEditingButton.addEventListener("click", function() {
			console.log("edit click open: " + project.isOpen + " and edit: " + project.canEdit);
			if (project.isOpen && project.canEdit) {
				// Disable editing
				console.log("Disabling editing!");
				project.disableEditing();
			} else {
				// Enable editing
				console.log("Enabling editing!");
				project.enableEditing();
			}
			project.canEdit = !project.canEdit;
		});
		
		heroImage.addEventListener("click", function() {
			console.log("Clicked!");
			if (project.isOpen) {
				// Minimize the project
				project.close();
				projectDiv.removeChild(optionsMenu2);
			} else {
				// Expand the project and show the notes
				project.open();
				optionsMenu2.classList.add("cardOptionsMenu2");
				projectDiv.appendChild(optionsMenu2);
			}
			project.isOpen = !project.isOpen;
		});
		heroImage.addEventListener("mouseleave", function() {
			console.log("Mouse exited!");
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
	}

	close() {
		for (let i = 0; i < this.project.numNotes(); i++) {
			this.project.getNote(i).unrender();
		}
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

		// Should I re-use the card thing I have to allow for easily changing how it is displayed? or just make own thing?
		
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
			console.log("Mouse entered!");
			heroImage.style.backgroundImage = "linear-gradient(rgba(0, 10, 30, 0.2), rgba(0, 10, 30, 0.2)), url(" + imgPath + ")";
		});
		let project = this;
		heroImage.addEventListener("mouseleave", function() {
			console.log("Mouse exited!");
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
	constructor() {
		// Feel like using modals to just quickly get all the data might work

		this.modal = this.createProjectModal();
		this.modalContent = this.modal.firstChild.firstChild;
		this.domElement = this.createButton();
		this.img = "../img/library.jpg";
		this.title = "Example Title";
		this.subtitle = "Example Subtitle";
		this.description = "Example description";
	}

	render(attachPoint) {
		attachPoint.appendChild(this.domElement);
		attachPoint.appendChild(this.modal);
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

		// let tstImg = document.createElement("img");
		// content.appendChild(tstImg);
		bgImgInput.addEventListener("change", function() {
			var file = bgImgInput.files[0];
			var reader  = new FileReader();

			reader.onloadend = function (theFile) {
				// console.log("Reader.result: " + reader.result);
				// console.log("TheFile: "+ theFile.target.result);
				// // console.log("TheFile: "+ theFile);
				// newProjObj.img = reader.result;
				newProjObj.img = theFile.target.result;
				// tstImg.src = reader.result;
				refreshExample();
			}

			if (file) {
				reader.readAsDataURL(file);
			} else {
				// Error'd out. Print error message and prompt re-entry
				// preview.src = "";
			}
		}, false);
		// bgImgInput.onchange = function(e) {
		// 	// Should save image somehow?
		// 	newProjObj.img = e.target.result;
		// 	console.log("Setting img to: " + e.target.result);
		// 	console.log(e.target.result);
		// 	refreshExample();
		// }

		let subtitleRequest = document.createElement("h2");
		subtitleRequest.textContent = "Project subtitle";
		let subtitleInput = document.createElement("input");
		subtitleInput.type = "text";
		subtitleInput.name = "subtitle";
		subtitleInput.oninput = function() {
			newProjObj.subtitle = subtitleInput.value;
			console.log("Updated subtitle to: " + newProjObj.subtitle);
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
		content.appendChild(exampleProject);
		return modal;
	}

	createModal() {
		let modal = document.createElement("div");
		modal.classList.add("modal");

		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}

		let modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");

		let closeButton = document.createElement("span");
		closeButton.innerHTML = "&times;";
		closeButton.classList.add("close");
		closeButton.onclick = function() {
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

	askForSubtitle() {
		
	}

	askForDescription() {
		
	}

	askForBackgroundImage() {
	
	}
}