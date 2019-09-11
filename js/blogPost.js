// TODO should this extend note?
// TODO decide if this should go into a "render models" folder
class BlogPost {
	/*
		Title - Title of the blog post (if there is one)
		Content - info to be displayed
		date - when the post was made
		parent - TODO (think it should eventually be the id of the node to attach to (or something like that))
	*/
	constructor(title, content, date, tags, parent) {
		this.note = new Note(title, content, date, tags, parent);
		this.domElement = this.create();
		this.editing = false;
		// this.render(parent); // Or maybe render logic should be handled by the caller? That might make more sense...
	}

	create() {
		let postDiv = document.createElement("div");
		postDiv.classList.add("blogPost");

		// Add a div for displaying the title (or subtitle) if there is one
		if (this.note.hasTitle()) {
			let titleDiv = document.createElement("div");
			if (this.note.hasParent()) {
				// Add subtitle
				titleDiv.classList.add("postSubtitle");
			} else {
				titleDiv.classList.add("postTitle");
				postDiv.classList.add("initial");
			}
			titleDiv.textContent = this.note.getTitle();
			postDiv.appendChild(titleDiv);
			
			// TODO - Add ability to edit the title
				// TODO - Only edit title if there is permission (double the check on the backend.)
		}

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
			console.log("Saving new content!");
			let content = contentBody.textContent;
			noteObj.setContent(content);
			menu.parentNode.removeChild(menu);
		});
		
		let revertButton = document.createElement("div");
		revertButton.textContent = "Revert to pre-change";
		revertButton.classList.add("menuButton");
		revertButton.classList.add("half");
		revertButton.addEventListener("click", function() {
			console.log("Reverting");
			console.log("Content: " + noteObj.getContent());
			contentBody.textContent = noteObj.getContent();
			menu.parentNode.removeChild(menu);
		});

		menu.appendChild(saveButton);
		menu.appendChild(revertButton);

		let note = this;
		contentDiv.addEventListener("click", function() {
			console.log("Trying to turn on editing!");
			if (note.editing) {
				contentBody.setAttribute("contenteditable", true);
				contentBody.focus();
				contentBody.addEventListener("input", function() {
					console.log("Made change to the post!");
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
			console.log("Mouse enter appending close button!");
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

	render(defaultAttachPoint) {
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
	}
}