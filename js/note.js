/*
	This will serve as the core atom from which most site content will be built from (they might just have different render wrappers around this base)

	TODO
	---------------------
	Think I should get rid of the title option and leave that to only the projects
*/
class Note {
	// This class is basically a data struct wrapper for notes on the site
	constructor(title, content, date, tags, parent) {
		this.title = title; // TODO decide if this is still going to be used
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

	// TODO Move the creation into a separate method and then have render just attach it
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
	  let editableContent = document.createElement("div");

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

	  let editor = new Editor();
	//   editor.render(content);
	  collapsible.addEventListener("click", function() {
		// Activate the div
		collapsible.classList.toggle("active");
		content.classList.add("open");
		if (content.style.maxHeight) {
		  // closing the post
		  content.style.maxHeight = null;
		//   editableContent.unrender();

		  // Check if continuing or if new post
		  if (editableContent.textContent === "") {
			collapsible.textContent = "Create New Post";
		  } else {
			collapsible.textContent = "Re-Open Post";
		  }
		} else {
		  collapsible.textContent = "Hide Post (Will not publish!)";
		  content.style.maxHeight = "inherit";
		  editor.render(editableContent);
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

class Editor {
    constructor(width, height) {
        this.width = width;
		this.height = height;
		this.setup = false;

        // Create new quill editor
        this.editor = document.createElement("div");
        this.editor.id = "editor";
        this.editor.width = width ? width + "px" : "100%";
        this.editor.height = height ? height + "px" : "100%";
    }

    setupQuill() {
		let quill = null;
		if (!this.setup) {
			console.log("have not setup before, setting up quill");
			quill = new Quill("#editor", {
				theme: "snow",
			});
			this.setup = true;
		}
        return quill;
    }

    render(attachPoint) {
        if (attachPoint) {
			console.log("Have attachpoint for editor");
			attachPoint.appendChild(this.editor);
			console.log("Setting up quill");
            this.setupQuill();
        } else {
			console.log("Tried to render editor without an attach point!")
		}
	}
	
	unrender() {
		if (this.editor.parentNode) {
			this.editor.parentNode.removeChild(this.editor);
		} else {
			console.log("Tried to unrender editor when wasn't rendered!");
		}
	}
}