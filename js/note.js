/*
	This will serve as the core atom from which most site content will be built from (they might just have different render wrappers around this base)
*/
class Note {
	// This class is basically a data struct wrapper for notes on the site
	constructor(title, content, date, tags, parent) {
		this.title = title;
		this.content = content;
		this.date = date; // TODO decide if want to add a "originally posted date" and a "last edited" date
		this.tags = tags;
		this.parent = parent;
	}

	setTitle(title) {
		this.title = title; // TODO what types of titles might I not want allowed?
	}
	getTitle() {
		return this.title;
	}
	hasTitle() {
		return this.title ? true : false;
	}

	setContent(content) {
		this.content = content; // TODO at some point in future might want to optimize updates and only edit stuff that needs it
	}
	getContent() {
		return this.content;
	}

	setDate(date) {
		this.date = date;
	}
	getDate() {
		return this.date;
	}

	setParent(parent) {
		this.parent = parent;
	}
	getParent() {
		return this.parent;
	}
	hasParent() {
		return this.parent ? true : false;
	}

	addTag(tag) {
		this.tags.add(tag);
	}

	// If need JSON version of object call this function
	export() {
		return {
			"title": this.title,
			"content": this.content,
			"parent": this.parent,
		}
	}
}

// TODO should this extend note?
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

class createNote {
	constructor() {
		
	}

	create() {
		
	}
}

class CollapsibleNoteCreator {
	constructor(attachPoint) {
	  // Bind context for certain methods that need a constant this
	  // this.publish = this.publish.bind(this);
	  this.newPost = this.render();
	  this.attachPoint = attachPoint;
	  if (this.newPost != null && attachPoint != null) {
		attachPoint.appendChild(this.newPost);
	  }
	}

	render() {
	  // Create the holder for everything
	  let shadowBox = document.createElement("div");
	  shadowBox.classList.add("createPost");
	  shadowBox.classList.add("shadowBox");

	  // Create button that will handle collapsing (and title)
	  let collapsible = document.createElement("button");
	  collapsible.classList.add("collapsible");
	  collapsible.textContent = "Create New Post";

	  let newSpan = document.createElement("span");
	  newSpan.innerHTML = "&#9999";
	  newSpan.addEventListener("click", function(event) {
		event.stopPropagation();
		collapsible.setAttribute("contenteditable", true);
	  });
	  

	  // Create div to house the content
	  let content = document.createElement("div");
	  content.classList.add("content");

	  // paste inside the div a place for the user to edit
	  let editableContent = document.createElement("p");

	  // Create the menu buttons for saving and deleting
	  let menuButtons = document.createElement("div");
	  menuButtons.style.width = "100%";

	  // Create the button to publish post
	  let save = document.createElement("div");
	  save.classList.add("menuButton");
	  save.style.width = "50%";
	  save.textContent = "Publish Post";

	  let collapsiblePost = this;
	  save.addEventListener("click", function() {
		let post = collapsiblePost.publish(editableContent.textContent);
		editableContent.textContent = "";
	  });

	  // Create the button to delete post
	  let clear = document.createElement("div");
	  clear.classList.add("menuButton");
	  clear.style.width = "50%";
	  clear.textContent = "Clear Post";
	  clear.addEventListener("click", function() {
		editableContent.textContent = "";
	  });

	  menuButtons.appendChild(save);
	  menuButtons.appendChild(clear);

	  // Put everything together
	  content.appendChild(editableContent);
	  content.appendChild(menuButtons);
	  shadowBox.appendChild(collapsible);
	  shadowBox.appendChild(content);

	  collapsible.addEventListener("click", function() {
		// Activate the div
		collapsible.classList.toggle("active");
		content.classList.add("open");
		if (content.style.maxHeight) {
		  // closing the post
		  content.style.maxHeight = null;
		  editableContent.setAttribute("contenteditable", false);
		  // Why would we want to remove last child here?

		  // Check if continuing or if new post
		  if (editableContent.textContent === "") {
			collapsible.textContent = "Create New Post";
		  } else {
			collapsible.textContent = "Re-Open Post";
		  }
		} else {
		  collapsible.textContent = "Hide Post (Will not publish!)";
		  content.style.maxHeight = "inherit";
		  editableContent.setAttribute("contenteditable", true);
		}
		collapsible.appendChild(newSpan);
	  });
	  return shadowBox;
	}

	publish(postBody) {
	  if (postBody != "") {
		let newPost = document.createElement("p");
		newPost.classList.add("post");
		newPost.textContent = postBody;
		this.attachPoint.appendChild(newPost);
	  }
	}
}