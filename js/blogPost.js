// TODO should this extend note?
// TODO decide if this should go into a "render models" folder
// TODO decide if "parent" should be used at all
// TODO Might want to make a "RENDER" class that handles logic of rendering
class BlogPost {
	/*
		Title - Title of the blog post (if there is one)
		Content - info to be displayed
		date - when the post was made
		parent - TODO (think it should eventually be the id of the node to attach to (or something like that))
	*/
	constructor(note) {
		this.note = note;
		if (this.note) {
			this.domElement = this.create();
		} else {
			console.log("No note provided to create blog post!");
		}
		
		this.editing = false;
		this.rendered = false;
	}

	create() {
		let postDiv = document.createElement("div");
		postDiv.classList.add("blogPost");

		// Populate the content
		let contentDiv = document.createElement("div");
		contentDiv.classList.add("content");
		let contentBody = document.createElement("p");
		contentBody.textContent = this.note.getContent();
		contentDiv.appendChild(contentBody);
		postDiv.appendChild(contentDiv);
			// TODO add ability to edit the content

		// Create menu div for editing and stuff // TODO only show when permissions set
		let menu = document.createElement("div");
		menu.classList.add("menu");
		contentDiv.classList.add("hover");

		let saveButton = document.createElement("div");
		saveButton.textContent = "Save Changes";
		saveButton.classList.add("menuButton");
		saveButton.classList.add("half");

		let noteObj = this.note;
		saveButton.addEventListener("click", function() {
			// Update the note's content
			let content = contentBody.textContent;
			noteObj.setContent(content);
			menu.parentNode.removeChild(menu);
		});
		
		let revertButton = document.createElement("div");
		revertButton.textContent = "Revert to pre-change";
		revertButton.classList.add("menuButton");
		revertButton.classList.add("half");
		revertButton.addEventListener("click", function() {
			contentBody.textContent = noteObj.getContent();
			menu.parentNode.removeChild(menu);
		});

		menu.appendChild(saveButton);
		menu.appendChild(revertButton);

		let note = this;
		contentDiv.addEventListener("click", function() {
			if (note.editing) {
				contentBody.setAttribute("contenteditable", true);
				contentBody.focus();
				contentBody.addEventListener("input", function() {
					// Give option to save changes, or revert to previous
					contentDiv.parentNode.insertBefore(menu, contentDiv.nextSibling);
				});
			}			
		});

		let closeButton = document.createElement("div");
		closeButton.classList.add("closeButton");
		closeButton.innerHTML = "&#10006";
		closeButton.addEventListener("click", function() {
			postDiv.parentNode.removeChild(postDiv);
			// TODO - Code to delete note
		});
		contentDiv.addEventListener("mouseenter", function() {
			contentDiv.appendChild(closeButton);
		});

		contentDiv.addEventListener("mouseleave", function() {
			contentDiv.removeChild(closeButton);
		});
		return postDiv;
	}
	
	enableEditing() {
		this.editing = true;
	}

	disableEditing() {
		this.editing = false;
	}

	render(attachPoint) {
		if (attachPoint) {
			attachPoint.appendChild(this.domElement);
			this.rendered = true;
		} else {
			console.log("Failed to render note - " + this.title + " with content " + this.content);
		}
	}

	render2(defaultAttachPoint) {
		if (this.parent) {
			console.log("Had parent");
			console.log(this.parent);
			let attachPoint = this.getAttachPoint();
			attachPoint.appendChild(this.domElement);	// TODO - I'm not sure I like this current solution. Need some more intelligent logic regarding "depth" imo
		} else {
			console.log("Appending to default!");
			defaultAttachPoint.appendChild(this.domElement);
		}	
	}

	unrender() {
		if (this.domElement.parentNode) {
			this.domElement.parentNode.removeChild(this.domElement);
		}
		this.rendered = false;
	}

	getAttachPoint() {
		let parent = this.note.getParent();
		if (parent && parent.domElement) {
			console.log("Appending to parent");
			return parent.domElement;
		}
		console.log("Appending to wall");
		return document.getElementById("wall");
	}

	getNewsEvent() {
		// Need to include the news event
			// Have to return a news object (or should the news object have a way of pulling data from here?)
		// Technically news event is just a wrapped note. Or it could be a refernce to a note (maybe return a string like "New Blog Post in Project")
		return this.note;
	}
}