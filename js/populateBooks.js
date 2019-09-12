// Should spent the most time re-evaluating the corner stones of a work and little time building from there. Invest time proportional to the time it might save

let reading = [
    ["Godel Escher Bach: An Eternal Golden Braid", "One of my favorites of 2019", '../res/books/geb/icon.jpg', "none", []],
    ["Empires of the Sea: The siege of Malta, The Battle of Lepanto, and the Contest for the Center of the World", "Given to me by a friend", '../res/books/empiresOfTheSea/icon.jpg', "none", []],
    ["Benjamin Franklin: An American Life", "First book loaned out to me from a library I privately joined.", '../res/books/franklinIsaacson/icon.jpg', "none", []],
    ["Meditations", "Book #2 of Book Club", '../res/books/meditations/icon.jpg', "none", []],
]

let considering = [
["The Society of Mind", "", "../res/books/societyOfMind/icon.jpg", "none", []],
["Life After Google: The Fall of Big Data and the Rise of the Blockchain Economy", "", '../res/books/lifeAfterGoogle/icon.jpg', "none", []],
["AI Superpowers: China, Silicon Valley, and the New World Order", "", '../res/books/aiSuperpowers/icon.jpg', "none", []],
["Finite and Infinite Games", "", '../res/books/finiteAndInfiniteGames/icon.jpg', "none", []],
["Tao Te Ching", "", '../res/books/taoTeChing/icon.jpg', "none", []],
["Essentialism: The Disciplined Pursuit of Less", "", '../res/books/essentialism/icon.jpg', "none", []],
["Without Their Permission: The Story of Reddit and a Blueprint for How to Change the World", "", '../res/books/withoutTheirPermission/icon.jpg', "none", []],
["How to Change Your Mind: What the New Science of Psychedlics Teaches Abut Consciousness", "", '../res/books/howToChangeMind/icon.jpg', "none", []],
["Measure What Matters: How Google, Bono, and the Gates Foundation Rock the World with OKRs", "", '../res/books/measureWhatMatters/icon.jpg', "none", []],
["A Geometry of Music: Harmony and Counterpoint in the Extended Common Practice", "", '../res/books/GeometryOfMusic/icon.jpg', "none", []],
["The Role of the Individual in History", "", '../res/books/roleOfIndividual/icon.jpg', "none", []],
["The Alchemist", "", '../res/books/theAlchemist/icon.jpg', "none", []],
["The Shallows: What the Internet is Doing to Our Brains", "", '../res/books/theShallows/icon.jpg', "none", []],
["This is Your Brain on Music: The Science of a Human Obsession", "", '../res/books/brainOnMusic/icon.jpg', "none", []],
]

let toRead = [
["Raise Your Game: High-Performance Secrets from the Best of the Best", "", '../res/books/raiseYourGame/icon.jpg', "none", []],
["The Future of Humanity: Terraforming Mars, Interstellar Travel, Immortality, and Our Destiny Beyond Earth", "", '../res/books/futureHumanity/icon.jpg', "none", []],
["Life 3.0: Being Human in the Age of Artificial Intelligence", "", '../res/books/life3/icon.jpg', "none", []],
["Artificial Intelligence: A Modern Approach", "", '../res/books/modernApproach/icon.jpg', "none", []],
["The Dictator’s Handbook: Why Bad Behavior is Almost Always Good Politics", "", '../res/books/dictatorsHandbook/icon.jpg', "none", []],
["Steve Jobs", "", '../res/books/steveJobs/icon.jpg', "none", []],
["On Writing: A Memoir of the Craft", "", '../res/books/stephenKing/icon.jpg', "none", []],
]

let read = [
["Do Androids Dream of Electric Sheep?", "First book of a book club I'm in", '../res/books/electricSheep/icon.png', "none", []],
["Einstein", "", "../res/books/einstein/icon.jpg", "none", []],
["Bad Blood: Secrets and Lies in a Silicon Valley Startup", "", '../res/books/badBlood/icon.jpg', "none", []],
["Shoe Dog: A Memoir by the Creator of Nike", "", '../res/books/shoeDog/icon.jpg', "none", []],
["33 Strategies of War", "", '../res/books/33Strategies/icon.jpg', "none", []],
["The Black Swan: The Impact of the Highly Improbable", "", '../res/books/blackSwan/icon.jpg', "none", []],
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
["Starting Point: 1979-1996", "", "../res/books/startingPoint/icon.jpg", "none", []],
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

let screenWidth = -1;
function renderBookList(attachPoint, bookList) {
    console.log("Screen width: " + window.innerWidth);
    // if (screenWidth === window.innerWidth) {
    // 	return;
    // }

    let newList = document.createElement("table");
    if (window.innerWidth < 500) {
        for (let i = 0; i < bookList.length; i++) {
            let row = document.createElement("tr");
            let entry = document.createElement("td");
            let photoCard = new Project(bookList[i][0], bookList[i][1], bookList[i][2], []);
            // let photoCard = new PictureCard(bookList[i][0], bookList[i][1], bookList[i][2], bookList[i][3], bookList[i][4]);
            // let photoCardHTML = photoCard.createMiniCard();
            // entry.appendChild(photoCardHTML);
            photoCard.render(entry);

            row.appendChild(entry);
            
            newList.appendChild(row);
        }
    } else {
        for (let i = 0; i < bookList.length/2; i++) {
            let row = document.createElement("tr");
            let entry = document.createElement("td");
            let photoCard = new Project(bookList[i * 2][0], bookList[i * 2][1], bookList[i * 2][2], []);
            // let photoCard = new PictureCard(bookList[i * 2][0], bookList[i * 2][1], bookList[i * 2][2], bookList[i * 2][3], bookList[i * 2][4]);
            // let photoCardHTML = photoCard.createMiniCard();
            // entry.appendChild(photoCardHTML);
            photoCard.render(entry);

            let photoCardHTML2 = null;
            let entry2 = document.createElement("td");
            if ((i * 2 + 1) < bookList.length) {
                let photoCard2 = new Project(bookList[i * 2 + 1][0], bookList[i * 2 + 1][1], bookList[i * 2 + 1][2], []);
                // let photoCard2 = new PictureCard(bookList[i * 2 + 1][0], bookList[i * 2 + 1][1], bookList[i * 2 + 1][2], bookList[i * 2 + 1][3], bookList[i * 2 + 1][4]);
                // photoCardHTML2 = photoCard2.createMiniCard();
                // entry2.appendChild(photoCardHTML2);
                photoCard2.render(entry2);
            }

            row.appendChild(entry);
            row.appendChild(entry2);
            
            newList.appendChild(row);
        }
    }

    attachPoint.appendChild(newList);
    screenWidth = window.innerWidth;
}

window.onload = function() {
    this.populateBooks();
}

function populateBooks() {
    console.log("Running new card");
    postArea = document.getElementById("postArea");

    let readingTitle = document.createElement("h1");
    readingTitle.innerHTML = "Books I'm working on (" + reading.length + ")";
    postArea.appendChild(readingTitle);

    renderBookList(postArea, reading);

    let toReadHeader = document.createElement("h1");
    toReadHeader.innerHTML = "Books on my To-Do list (" + toRead.length + ")";
    postArea.appendChild(toReadHeader);

    renderBookList(postArea, toRead);

    let readHeader = document.createElement("h1");
    readHeader.innerHTML = "Books I Finished in 2019! (" + read.length + "/52)";
    postArea.appendChild(readHeader);
    renderBookList(postArea, read);

    let toConsider = document.createElement("h1");
    toConsider.innerHTML = "Books I'm considering (" + considering.length + ")";
    postArea.appendChild(toConsider);

    renderBookList(postArea, considering);

    let didntFinish2019Header = document.createElement("h1");
    didntFinish2019Header.innerHTML = "Books I started and didn't finish (2019)";
    postArea.appendChild(didntFinish2019Header);
    renderBookList(postArea, didntFinish2019);

    let readHeader2018 = document.createElement("h1");
    readHeader2018.innerHTML = "Books I Finished (2018)";
    postArea.appendChild(readHeader2018);
    renderBookList(postArea, read2018);	
}

let screenSize = 0;
window.onresize = function resize() {
    console.log("Resize!");
    // Try not to repopulate for minor changes
    if (screenSize == window.innerWidth) {
        return;
    }
    this.populateBooks();
}