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

class PictureCard {
	constructor(title, description, imgLink, status, tags) {
		this.title = title;
		this.description = description;
		this.imgLink = imgLink;
		this.status = status;
		this.tags = tags;
	}

	createCard() {
		// Create div for holding everything
		let card = document.createElement("div");
		card.classList.add("card");

		// Make the div to hold the hero-image background
		let heroImage = document.createElement("div");
		let cssString = "background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../res/platoonDynamics/imgs/icon.png');";
		// heroImage.style.cssText = cssString;
		heroImage.setAttribute("style", "background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../res/drl/imgs/icon.png');");
		heroImage.classList.add("hero-image");

		// Make div for the hero text
		let heroText = document.createElement("div");
		heroText.classList.add("hero-text");

		// Create header to hold title
		let titleText = document.createElement("h1");
		titleText.classList.add("marker");
		titleText.innerHTML = this.title;

		let descriptionText = document.createElement("p");
		descriptionText.innerHTML = this.description;

		heroText.appendChild(titleText);
		heroText.appendChild(descriptionText);

		card.appendChild(heroImage);
		card.appendChild(heroText);
		return card;
	}

	createMiniCard() {
		// Create div for holding everything
		let card = document.createElement("div");
		card.classList.add("mini-card");

		// Make the div to hold the hero-image background
		let heroImage = document.createElement("div");
		heroImage.setAttribute("style", "background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + this.imgLink + "');");
		heroImage.classList.add("hero-image");

		// Make div for the hero text
		let heroText = document.createElement("div");
		heroText.classList.add("hero-text");

		// Create header to hold title
		let titleText = document.createElement("h3");
		// titleText.classList.add("marker");
		titleText.innerHTML = this.title;

		let descriptionText = document.createElement("p");
		descriptionText.innerHTML = this.description;

		heroText.appendChild(titleText);
		heroText.appendChild(descriptionText);

		card.appendChild(heroImage);
		card.appendChild(heroText);
		return card;

		card.addEventListener("mouseover", function() {
			console.log("mouseover");
			heroImage.setAttribute("style", "background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('" + this.imgLink + "');");
		});

		card.addEventListener("mouseout", function() {
			console.log("mouseout");
			heroImage.setAttribute("style", "background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('" + this.imgLink + "');");
		});
	}

}

let reading = [
		["Godel Escher Bach: An Eternal Golden Braid", "One of my favorites of 2019", '../res/books/geb/icon.jpg', "none", []],
		["Empires of the Sea: The siege of Malta, The Battle of Lepanto, and the Contest for the Center of the World", "Given to me by a friend", '../res/books/empiresOfTheSea/icon.jpg', "none", []],
		["The Black Swan: The Impact of the Highly Improbable", "", '../res/books/blackSwan/icon.jpg', "none", []],
		["Benjamin Franklin: An American Life", "", '../res/books/franklinIsaacson/icon.jpg', "none", []],
		["Do Androids Dream of Electric Sheep?", "First book of a book club I'm in", '../res/books/electricSheep/icon.png', "none", []],
	]

	let toRead = [
		["Shoe Dog: A Memoir by the Creator of Nike", "", '../res/books/shoeDog/icon.jpg', "none", []],
		["Raise Your Game: High-Performance Secrets from the Best of the Best", "", '../res/books/raiseYourGame/icon.jpg', "none", []],
		["33 Strategies of War", "", '../res/books/33Strategies/icon.jpg', "none", []],
		["The Future of Humanity: Terraforming Mars, Interstellar Travel, Immortality, and Our Destiny Beyond Earth", "", '../res/books/futureHumanity/icon.jpg', "none", []],
		["Bad Blood: Secrets and Lies in a Silicon Valley Startup", "", '../res/books/badBlood/icon.jpg', "none", []],
		["Life 3.0: Being Human in the Age of Artificial Intelligence", "", '../res/books/life3/icon.jpg', "none", []],
		["Artificial Intelligence: A Modern Approach", "", '../res/books/modernApproach/icon.jpg', "none", []],
		["The Dictator’s Handbook: Why Bad Behavior is Almost Always Good Politics", "", '../res/books/dictatorsHandbook/icon.jpg', "none", []],
	]

	let read = [
		["The Signal and the Noise: Why So Many Predictions Fail-but Some Don't", "", '../res/books/signalNoise/icon.jpg', "none", []],
		["The Innovators: How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution", "", '../res/books/innovators/icon.jpg', "none", []],
		["The Power of Habit: Why We Do What We Do in Life and Business", "", '../res/books/powerOfHabit/icon.jpg', "none", []],
		["21 Lessons for the 21st Century", "", '../res/books/21LessonsFor21stCentury/icon.jpg', "none", []],
		["Creative Selection: Inside Apple's Design Process During the Golden Age of Steve Jobs", "", '../res/books/creativeSelection/icon.jpg', "none", []],
		["Blood, Sweat, and Pixels: The Triumphant, Turbulent Stories Behind How Video Games Are Made", "", '../res/books/bloodSweatPixels/icon.jpg', "none", []],
		["Buddha's Brain: The Practical Neuroscience of Happiness, Love and Wisdom", "", '../res/books/buddhasBrain/icon.jpg', "none", []],
		["Range: Why Generalists Triumph in a Specialized World", "", '../res/books/range/icon.jpg', "none", []],
		["Hyperspace: A Scientific Odyssey Through Parallel Universes, Time Warps, and the 10th Dimension", "", '../res/books/hyperspace/icon.jpg', "none", []],
		["The Hero With a Thousand Faces", "", '../res/books/1000Faces/icon.jpg', "none", []],
		["Dune", "", '../res/books/dune/icon.jpg', "none", []],
		["Zero to One: Notes on Startups, or How to Build the Future", "", '../res/books/zeroOne/icon.jpg', "none", []],
		["The Lessons From History", "", '../res/books/lessonsHistory/icon.jpg', "none", []],
		["How the Scots Invented the Modern World: The True Story of How Western Europe's Poorest Nation Created Our World & Everything in It", "", '../res/books/scotsModern/icon.jpg', "none", []],
		["Blue Ocean Strategy", "", '../res/books/blueOcean/icon.jpg', "none", []],
		["Loonshots: How to Nurture the Crazy Ideas That Win Wars, Cure Diseases, and Transform Industries", "", '../res/books/loonshots/icon.jpg', "none", []],
		["Thinking Fast and Slow", "", '../res/books/fastSlow/icon.jpg', "none", []],
		["A Walk In The Wood: Meditations on Mindfulness with a Bear Named Pooh", "", '../res/books/walkWoodsPooh/icon.jpg', "none", []],
		["Astrophysics for People in a Hurry", "", '../res/books/astrophysicsHurry/icon.jpg', "none", []],
		["Brave New World", "", '../res/books/braveNewWorld/icon.jpg', "none", []],
		["Prediction Machines: The Simple Economics of Artificial Intelligence", "", '../res/books/predictionMachines/icon.jpg', "none", []],
		["How to Create a Mind: The Secret of Human Thought Revealed", "", '../res/books/createMind/icon.jpg', "none", []],
		["48 Laws of Power", "", '../res/books/48Power/icon.jpg', "none", []],
		["Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future", "", "../res/books/elonMusk/icon.jpg", "none", []],
		["Surely You're Joking, Mr. Feynman!", "", "../res/books/jokingFeynman/icon.jpg", "none", []],
		["Man's Search for Meaning", "", "../res/books/searchMeaning/icon.jpg", "none", []],
		["Tribe: On Homecoming and Belonging", "", "../res/books/tribe/icon.jpg", "none", []],
		["Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy", "", "../res/books/mathDestruction/icon.jpg", "none", []],
		["Turning Point: 1997-2008", "", "../res/books/turningPoint/icon.jpg", "none", []],
		["Starting Point: 1979-1996", "", "../res/books/turningPoint/icon.jpg", "none", []],
		["Mastery", "", "../res/books/mastery/icon.jpg", "none", []],
		["Principles", "", "../res/books/principles/icon.jpg", "none", []],
		["Superintelligence: Paths, Dangers, Strategies", "", "../res/books/superintelligence/icon.jpg", "none", []],
		["The Design of Everyday Things", "", "../res/books/designEveryday/icon.jpg", "none", []],
	]

	let didntFinish2019 = [
		["The Idea Factory: Bell Labs and the Great Age of American Innovation", "", "../res/books/ideaFactory/icon.jpg", "none", []],
	]

	let read2018 = [
		["Factfulness: Ten Reasons We're Wrong About the World--and Why Things Are Better Than You Think", "", "../res/books/factfulness/icon.jpg", "none", []],
		["Creativity, Inc.: Overcoming the Unseen Forces That Stand in the Way of True Inspiration", "", "../res/books/creativityInc/icon.jpg", "none", []],
		["Guns, Germs, and Steel", "", "../res/books/gunsGermsSteel/icon.jpg", "none", []],
		["Leaders Eat Last: Why Some Teams Pull Together and Others Don't", "", "../res/books/leadersEatLast/icon.jpg", "none", []],
		["The Brain that Changes Itself", "", "../res/books/changesItself/icon.jpg", "none", []],
		["The Third Door: The Wild Quest to Uncover How the World's Most Successful People Launched Their Careers", "Got a free copy from some NYC event in 2018.", "../res/books/thirdDoor/icon.jpg", "none", []],
		["Scarcity: Why Having Too Little Means So Much", "", "../res/books/scarcity/icon.jpg", "none", []],
		["Other Minds: The Octopus, the Sea, and the Deep Origins of Consciousness", "", "../res/books/otherMinds/icon.jpg", "none", []],
		["Homo Deus: A Brief History of Tomorrow", "", "../res/books/ideaFactory/icon.jpg", "none", []],
		["Leonardo Da Vinci", "", "../res/books/daVinci/icon.jpg", "none", []],
		["The 4-Hour Workweek: Escape 9–5, Live Anywhere, and Join the New Rich", "", "../res/books/4Hour/icon.jpg", "none", []],
		["Sapiens: A Brief History of Humankind", "", "../res/books/sapiens/icon.jpg", "none", []],
		["Why We Sleep: The New Science of Sleep and Dreams", "", "../res/books/whySleep/icon.jpg", "none", []],
	]
var postArea = null;

function renderBookList(attachPoint, bookList) {
	console.log("Screen width: " + window.innerWidth);

	let newList = document.createElement("table");
	if (window.innerWidth < 500) {
		for (let i = 0; i < bookList.length; i++) {
			let row = document.createElement("tr");
			let entry = document.createElement("td");
			let photoCard = new PictureCard(bookList[i][0], bookList[i][1], bookList[i][2], bookList[i][3], bookList[i][4]);
			let photoCardHTML = photoCard.createMiniCard();
			entry.appendChild(photoCardHTML);

			row.appendChild(entry);
			
			newList.appendChild(row);
		}
	} else {
		for (let i = 0; i < bookList.length/2; i++) {
		let row = document.createElement("tr");
		let entry = document.createElement("td");
		let photoCard = new PictureCard(bookList[i * 2][0], bookList[i * 2][1], bookList[i * 2][2], bookList[i * 2][3], bookList[i * 2][4]);
		let photoCardHTML = photoCard.createMiniCard();
		entry.appendChild(photoCardHTML);

		let photoCardHTML2 = null;
		let entry2 = document.createElement("td");
		if ((i * 2 + 1) < bookList.length) {
			let photoCard2 = new PictureCard(bookList[i * 2 + 1][0], bookList[i * 2 + 1][1], bookList[i * 2 + 1][2], bookList[i * 2 + 1][3], bookList[i * 2 + 1][4]);
			photoCardHTML2 = photoCard2.createMiniCard();
			entry2.appendChild(photoCardHTML2);
		}

		row.appendChild(entry);
		row.appendChild(entry2);
		
		newList.appendChild(row);
	}
	}
	
	attachPoint.appendChild(newList);
}

window.onload = function() {
	console.log("Running new card");
	postArea = document.getElementById("postArea");

	let readingTitle = document.createElement("h1");
	readingTitle.innerHTML = "Books I'm working on";
	postArea.appendChild(readingTitle);

	renderBookList(postArea, reading);

	let toReadHeader = document.createElement("h1");
	toReadHeader.innerHTML = "Books on my To-Do list";
	postArea.appendChild(toReadHeader);

	renderBookList(postArea, toRead);

	let readHeader = document.createElement("h1");
	readHeader.innerHTML = "Books I Finished!";
	postArea.appendChild(readHeader);
	renderBookList(postArea, read);

	let didntFinish2019Header = document.createElement("h1");
	didntFinish2019Header.innerHTML = "Books I started and didn't finish (2019)";
	postArea.appendChild(didntFinish2019Header);
	renderBookList(postArea, didntFinish2019);

	let readHeader2018 = document.createElement("h1");
	readHeader2018.innerHTML = "Books I Finished (2018)";
	postArea.appendChild(readHeader2018);
	renderBookList(postArea, read2018);	
}

window.onresize = function resize() {
	console.log("Resize!");
	let postArea = document.getElementById("postArea");
	// Remove previous elements
	while (postArea.firstChild) {
	    postArea.removeChild(postArea.firstChild);
	}

	let readingTitle = document.createElement("h1");
	readingTitle.innerHTML = "Books I'm working on";
	postArea.appendChild(readingTitle);

	renderBookList(postArea, reading);

	let toReadHeader = document.createElement("h1");
	toReadHeader.innerHTML = "Books on my To-Do list";
	postArea.appendChild(toReadHeader);

	renderBookList(postArea, toRead);

	let readHeader = document.createElement("h1");
	readHeader.innerHTML = "Books I Finished!";
	postArea.appendChild(readHeader);
	renderBookList(postArea, read);

	let didntFinish2019Header = document.createElement("h1");
	didntFinish2019Header.innerHTML = "Books I started and didn't finish (2019)";
	postArea.appendChild(didntFinish2019Header);
	renderBookList(postArea, didntFinish2019);

	let readHeader2018 = document.createElement("h1");
	readHeader2018.innerHTML = "Books I Finished (2018)";
	postArea.appendChild(readHeader2018);
	renderBookList(postArea, read2018);
}