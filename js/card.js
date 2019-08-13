// Declares a "card" object and a factory method for creating one

/**
Card Object
-------------
Title
Status
Tag(s)
Type
Description
Img
**/

// Object that renders data about a post in standardized way for the site
class Card {
	constructor(id, title, status, tagArray, type, description, imgLink) {
        this.id = id ? id : "default";
        this.title = title ? title : "Exciting Placeholder Text";
        this.status = status;
        this.tagArray = tagArray;
        this.type = type ? type : "POST";
        this.description = description;
        this.imgLink = imgLink;
    }

    // Prints component to the screen
    render() {
    	// Determine what type of card to render
    }

    createPostCard() {
    	let card = document.createElement("div");
    	card.classList.add("postcard");

    	let titleElement = document.createElement("h4");
    	titleElement.textContent = this.title;

    	let descriptionElement = document.createElement("p");
    	descriptionElement.textContent = this.description;

    	let container = document.createElement("div");
    	container.classList.add("postbox");
    	container.appendChild(titleElement);
    	container.appendChild(descriptionElement);

    	let imgSpace = document.createElement("img");
    	imgSpace.classList.add("postcardThumbnail")
    	imgSpace.src = this.imgLink;	// Is this a vulnerability?

    	// Check if should put status banner on the card
    	if (this.status) {
    		// Code to put status descriptor on the post
    	}

    	// Put card together
    	card.appendChild(imgSpace);
    	card.appendChild(container);

    	return card;
    }

    createBookCard() {

    }

    createNewsfeedCard() {

    }
}

var postArea = null;
window.onload = function() {
	console.log("Running new card");
	postArea = document.getElementById("testArea");
	for (let i = 0; i < 5; i++) {
		let card = new Card("id", "Test Card", "Newly Finished!", [], "post", "An exciting new card", "../img/cyberPunk.jpg");
		let cardCard = card.createPostCard();
		console.log(cardCard);
		postArea.appendChild(cardCard);
	}
	
}