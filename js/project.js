/*

TODO - Make it so that if open up to a page dedicated solely to project, can 1 click go back (maybe use cookies)
*/
class Project {
	constructor(title, subtitle, displayImgPath, notes, attachPoint) {
		this.title = title;
		this.subtitle = subtitle;
		this.imgPath = displayImgPath ? displayImgPath : "default image";
		this.notes = notes ? notes : [];
		this.attachPoint = attachPoint;
		this.domElement = this.createDomElement();
		// Create region for appending notes and other new things
		this.notebook = document.createElement("div");
		this.notebook.classList.add("notebook");
		this.domElement.appendChild(this.notebook);

		this.isOpen = false;
		this.canEdit = false;
		this.render();
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
		heroImage.style.backgroundImage  = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + this.imgPath + ")";
		
		// Darken on hover
		let imgPath = this.imgPath;
		heroImage.addEventListener("mouseenter", function() {
			console.log("Mouse entered!");
			heroImage.style.backgroundImage = "linear-gradient(rgba(0, 10, 30, 0.6), rgba(0, 10, 30, 0.6)), url(" + imgPath + ")";
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
		title.textContent = this.title;
		heroText.appendChild(title);

		let subtitle = document.createElement("p");
		subtitle.textContent = this.subtitle;
		heroText.appendChild(subtitle);
		projectHeader.appendChild(heroImage);

		return projectDiv;
	}

	enableEditing() {
		for (let i = 0; i < this.notes.length; i++) {
			this.notes[i].enableEditing();
		}
	}

	disableEditing() {
		for (let i = 0; i < this.notes.length; i++) {
			this.notes[i].disableEditing();
		}
	}

	open() {
		for (let i = 0; i < this.notes.length; i++) {
			this.notes[i].render(this.notebook);
		}
	}

	close() {
		for (let i = 0; i < this.notes.length; i++) {
			this.notes[i].unrender();
		}
	}

	render() {
		if (this.attachPoint) {
			this.attachPoint.appendChild(this.domElement);
		} else {
			console.log("No attachpoint found for " + this.attachPoint);
		}
		
	}
}