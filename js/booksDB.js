function newNote(content, date, tags) {
    return new BlogPost(new Note(null, content, date, tags, null));
}

let reading = [
    ["Empires of the Sea: The siege of Malta, The Battle of Lepanto, and the Contest for the Center of the World", "Roger Crowley", './res/books/empiresOfTheSea/icon.jpg', "none", []],
    ["The Metamorphosis", "Franz Kafka", './res/books/metamorphosis/icon.jpg', "none", []],
    ["Steve Jobs", "Walter Isaacson", './res/books/steveJobs/icon.jpg', "none", []],
    ["Orientalism", "Edward W. Said", './res/books/orientalism/icon.jpg', "none", []],
];

let considering = [
    ["The Society of Mind", "Marvin Minsky", "./res/books/societyOfMind/icon.jpg", "none", []],
    ["Life After Google: The Fall of Big Data and the Rise of the Blockchain Economy", "George Glider", './res/books/lifeAfterGoogle/icon.jpg', "none", []],
    ["AI Superpowers: China, Silicon Valley, and the New World Order", "Kai-Fu Lee", './res/books/aiSuperpowers/icon.jpg', "none", []],
    ["Finite and Infinite Games", "James P. Carse", './res/books/finiteAndInfiniteGames/icon.jpg', "none", []],
    ["Tao Te Ching", "Laozi", './res/books/taoTeChing/icon.jpg', "none", []],
    ["Essentialism: The Disciplined Pursuit of Less", "Greg McKeown", './res/books/essentialism/icon.jpg', "none", []],
    ["Without Their Permission: The Story of Reddit and a Blueprint for How to Change the World", "Alexis Ohanian", './res/books/withoutTheirPermission/icon.jpg', "none", []],
    ["How to Change Your Mind: What the New Science of Psychedlics Teaches Abut Consciousness", "Michael Pollan", './res/books/howToChangeMind/icon.jpg', "none", []],
    ["Measure What Matters: How Google, Bono, and the Gates Foundation Rock the World with OKRs", "John Doer", './res/books/measureWhatMatters/icon.jpg', "none", []],
    ["A Geometry of Music: Harmony and Counterpoint in the Extended Common Practice", "Dmitri Tymoczko", './res/books/GeometryOfMusic/icon.jpg', "none", []],
    ["The Role of the Individual in History", "Georgi Plekhanov", './res/books/roleOfIndividual/icon.jpg', "none", []],
    ["The Alchemist", "Paulo Coelho", './res/books/theAlchemist/icon.jpg', "none", []],
    ["The Shallows: What the Internet is Doing to Our Brains", "Nicholas G. Carr", './res/books/theShallows/icon.jpg', "none", []],
    ["This is Your Brain on Music: The Science of a Human Obsession", "Daniel Levitin", './res/books/brainOnMusic/icon.jpg', "none", []],
    ["The Future of Humanity: Terraforming Mars, Interstellar Travel, Immortality, and Our Destiny Beyond Earth", "Michio Kaku", './res/books/futureHumanity/icon.jpg', "none", []],
    ["Life 3.0: Being Human in the Age of Artificial Intelligence", "Max Tegmark", './res/books/life3/icon.jpg', "none", []],
];

let toRead = [
    ["Artificial Intelligence: A Modern Approach", "Peter Norvig and Stuart J. Russell", './res/books/modernApproach/icon.jpg', "none", []],
    ["The Dictator’s Handbook: Why Bad Behavior is Almost Always Good Politics", "Alastair Smith and Bruce Bueno de Mesquita", './res/books/dictatorsHandbook/icon.jpg', "none", []],
];

let read = [
    ["On Writing: A Memoir of the Craft", "Stephen King", './res/books/stephenKing/icon.jpg', "none", [
        newNote("I've been having a number of issues dealing with trying to create projects and how to navigate the inherent ambiguity in doing things for yourself. I'm not sure if this is the right book, but I'm hoping that there might be some insight on how to start to approach or think about those issues in this book.")
    ]],
    ["Godel Escher Bach: An Eternal Golden Braid", "Douglas Hofstadter", './res/books/geb/icon.jpg', "none", [
        newNote("While long, this book has been one of the more rewarding reads of the year and has me thinking about the nature of things and what types of recursive behaviors appear in life and how they might be used.")
    ]],
    ["Benjamin Franklin: An American Life", "Walter Isaacson", './res/books/franklinIsaacson/icon.jpg', "none", [
        newNote("While I'm not the biggest fan of Walter Isaacson books, I can't help reading about their subjects. Benjamin Franklin was a man who dipped his toes in many things to great acclaim, I'd like to understand the how and why to that. I'm just not sure if this is the book to do it.")
    ]],
    ["Don Quixote", "Miguel de Cervantes", './res/books/donQuixote/icon.jpg', "none", []],
    ["Meditations", "Marcus Aurelius", './res/books/meditations/icon.jpg', "none", []],
    ["The Everything Store: Jeff Bezos and the Age of Amazon", "Brad Stone", './res/books/everythingStore/icon.jpg', "none", []],
    ["Do Androids Dream of Electric Sheep?", "Philip Dick", './res/books/electricSheep/icon.png', "none", []],
    ["Einstein", "Walter Isaacson", "./res/books/einstein/icon.jpg", "none", []],
    ["Bad Blood: Secrets and Lies in a Silicon Valley Startup", "John Carreyrou", './res/books/badBlood/icon.jpg', "none", []],
    ["Shoe Dog: A Memoir by the Creator of Nike", "Phil Knight", './res/books/shoeDog/icon.jpg', "none", []],
    ["33 Strategies of War", "Robert Greene", './res/books/33Strategies/icon.jpg', "none", []],
    ["The Black Swan: The Impact of the Highly Improbable", "Nassim Nicholas Taleb", './res/books/blackSwan/icon.jpg', "none", []],
    ["The Signal and the Noise: Why So Many Predictions Fail-but Some Don't", "Nate Silver", './res/books/signalNoise/icon.jpg', "none", []],
    ["The Innovators: How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution", "Walter Isaacson", './res/books/innovators/icon.jpg', "none", []],
    ["The Power of Habit: Why We Do What We Do in Life and Business", "Charles Duhigg", './res/books/powerOfHabit/icon.jpg', "none", []],
    ["21 Lessons for the 21st Century", "Yuval Noah Harari", './res/books/21LessonsFor21stCentury/icon.jpg', "none", []],
    ["Creative Selection: Inside Apple's Design Process During the Golden Age of Steve Jobs", "Ken Kocienda", './res/books/creativeSelection/icon.jpg', "none", []],
    ["Blood, Sweat, and Pixels: The Triumphant, Turbulent Stories Behind How Video Games Are Made", "Jason Schreier", './res/books/bloodSweatPixels/icon.jpg', "none", []],
    ["Buddha's Brain: The Practical Neuroscience of Happiness, Love and Wisdom", "Buddha's Brain: The Practical Neuroscience of Happiness, Love and Wisdom", './res/books/buddhasBrain/icon.jpg', "none", []],
    ["Range: Why Generalists Triumph in a Specialized World", "David Epstein", './res/books/range/icon.jpg', "none", []],
    ["Hyperspace: A Scientific Odyssey Through Parallel Universes, Time Warps, and the 10th Dimension", "Michio Kaku", './res/books/hyperspace/icon.jpg', "none", []],
    ["The Hero With a Thousand Faces", "Joseph Campbell", './res/books/1000Faces/icon.jpg', "none", []],
    ["Dune", "Frank Herbert", './res/books/dune/icon.jpg', "none", []],
    ["Zero to One: Notes on Startups, or How to Build the Future", "Peter Thiel", './res/books/zeroOne/icon.jpg', "none", []],
    ["The Lessons of History", "Will Durant", './res/books/lessonsHistory/icon.jpg', "none", []],
    ["How the Scots Invented the Modern World: The True Story of How Western Europe's Poorest Nation Created Our World & Everything in It", "Arthur L. Herman", './res/books/scotsModern/icon.jpg', "none", []],
    ["Blue Ocean Strategy", "Renée Mauborgne and W. Chan Kim", './res/books/blueOcean/icon.jpg', "none", []],
    ["Loonshots: How to Nurture the Crazy Ideas That Win Wars, Cure Diseases, and Transform Industries", "Safi Bahcall", './res/books/loonshots/icon.jpg', "none", []],
    ["Thinking Fast and Slow", "Daniel Kahneman", './res/books/fastSlow/icon.jpg', "none", []],
    ["A Walk In The Wood: Meditations on Mindfulness with a Bear Named Pooh", "Joseph Parent and Nancy Parent", './res/books/walkWoodsPooh/icon.jpg', "none", []],
    ["Astrophysics for People in a Hurry", "Neil deGrasse Tyson", './res/books/astrophysicsHurry/icon.jpg', "none", []],
    ["Brave New World", "Aldous Huxley", './res/books/braveNewWorld/icon.jpg', "none", []],
    ["Prediction Machines: The Simple Economics of Artificial Intelligence", "Ajay Agrawal, Avi Goldfarb, and Joshua Gans", './res/books/predictionMachines/icon.jpg', "none", []],
    ["How to Create a Mind: The Secret of Human Thought Revealed", "Ray Kurzweil", './res/books/createMind/icon.jpg', "none", []],
    ["48 Laws of Power", "Robert Greene", './res/books/48Power/icon.jpg', "none", []],
    ["Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future", "Ashlee Vance", "./res/books/elonMusk/icon.jpg", "none", []],
    ["Surely You're Joking, Mr. Feynman!", "Richard Feynman", "./res/books/jokingFeynman/icon.jpg", "none", []],
    ["Man's Search for Meaning", "Viktor Frankl", "./res/books/searchMeaning/icon.jpg", "none", []],
    ["Tribe: On Homecoming and Belonging", "Sebastian Junger", "./res/books/tribe/icon.jpg", "none", []],
    ["Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy", "Cathy O'Neil", "./res/books/mathDestruction/icon.jpg", "none", []],
    ["Turning Point: 1997-2008", "Hayao Miyazaki", "./res/books/turningPoint/icon.jpg", "none", []],
    ["Starting Point: 1979-1996", "Hayao Miyazaki", "./res/books/startingPoint/icon.jpg", "none", []],
    ["Mastery", "Robert Greene", "./res/books/mastery/icon.jpg", "none", []],
    ["Principles", "Ray Dalio", "./res/books/principles/icon.jpg", "none", []],
    ["Superintelligence: Paths, Dangers, Strategies", "Nick Bostrom", "./res/books/superintelligence/icon.jpg", "none", []],
    ["The Design of Everyday Things", "Don Norman", "./res/books/designEveryday/icon.jpg", "none", []],
]

let didntFinish2019 = [
    ["The Idea Factory: Bell Labs and the Great Age of American Innovation", "Jon Gertner", "./res/books/ideaFactory/icon.jpg", "none", []],
];

let read2018 = [
    ["Factfulness: Ten Reasons We're Wrong About the World--and Why Things Are Better Than You Think", "Anna Rosling Rönnlund, Hans Rosling, and Ola Rosling", "./res/books/factfulness/icon.jpg", "none", []],
    ["Creativity, Inc.: Overcoming the Unseen Forces That Stand in the Way of True Inspiration", "Amy Wallace and Edwin Catmull", "./res/books/creativityInc/icon.jpg", "none", []],
    ["Guns, Germs, and Steel", "Jared Diamond", "./res/books/gunsGermsSteel/icon.jpg", "none", []],
    ["Leaders Eat Last: Why Some Teams Pull Together and Others Don't", "Simon Sinek", "./res/books/leadersEatLast/icon.jpg", "none", []],
    ["The Brain that Changes Itself", "Norman Doidge", "./res/books/changesItself/icon.jpg", "none", []],
    ["The Third Door: The Wild Quest to Uncover How the World's Most Successful People Launched Their Careers", "Alex Banayan", "./res/books/thirdDoor/icon.jpg", "Got the book from some NYC event in 2018 at an event with the author. At the time I was really heavy into the Tim Ferriss podcast so this book seemed right up my alley.", []],
    ["Scarcity: Why Having Too Little Means So Much", "", "./res/books/scarcity/icon.jpg", "none", []],
    ["Other Minds: The Octopus, the Sea, and the Deep Origins of Consciousness", "", "./res/books/otherMinds/icon.jpg", "none", []],
    ["Homo Deus: A Brief History of Tomorrow", "Yuval Noah Harari", "./res/books/ideaFactory/icon.jpg", "none", []],
    ["Leonardo Da Vinci", "Walter Isaacson", "./res/books/daVinci/icon.jpg", "none", []],
    ["The 4-Hour Workweek: Escape 9–5, Live Anywhere, and Join the New Rich", "Tim Ferriss", "./res/books/4Hour/icon.jpg", "none", []],
    ["Sapiens: A Brief History of Humankind", "Yuval Noah Harari", "./res/books/sapiens/icon.jpg", "none", []],
    ["Why We Sleep: The New Science of Sleep and Dreams", "Matthew Walker", "./res/books/whySleep/icon.jpg", "none", []],
];

function wrapBookToProject(bookData) {
    return new Project(bookData[0], bookData[1], bookData[2], bookData[3], bookData[4]);
}

function wrapBooksToProjects(books) {
    let projects = [];
    for (let i = 0; i < books.length; i++) {
        projects.push(wrapBookToProject(books[i]));
    }
    return projects;
}

let booksScroll = [
    new Project("Actively Reading", "Currently reading: " + reading.length + " books", reading[0][2], "I set a goal for my self to read one book a week for the year. I found that when pursuing this goal if the book was short I'd finish too quickly, and if it was long it would take too long to finish. I also found that reading longer books and wrestling with them day in and day out led to burn out pretty quickly. So I decided to try and spice things up by reading 3 books concurrently. Instead of looking to finish one a week, I shoot for three a month. I've found this strategy to be pretty effective as I can spread out my time across the books and not get mired in one if I feel its a slow day.", wrapBooksToProjects(reading)),
    new Project("Reading in 2019", "Currently have read: " + read.length + "/52!", read[0][2], "All the books I've currently read this year. I set a goal of reading 52 books this year and so far I've done a pretty good job of keeping up with that goal. The idea behind this exercise was to get myself back into reading and to develop that habit. It was also just a fun challenge. I used to read a lot growing up so its nice to get back to that. Going into 2020 I'm going to be looking on trying to mix in more fiction books (with the idea of reading books that explore ideas and perspectives that are \"off limits\" for one reason or another) and nonfiction books that help me solve or think about issues I'm currently tryign to wrestle with. I'm also going to be making an effort to go back and update these books with my thoughts and takeaways. But we'll see if I get around to that. No promises :)", wrapBooksToProjects(read)),
    new Project("Books I've acquired", "Currently have " + toRead.length + " waiting in the wings", toRead[0][2], "These are books I've been looking to read and finally picked up. I'll probably get around to reading these books soon, but if you want to see why I picked them up feel free to take a look through the list.", wrapBooksToProjects(toRead)),
    new Project("Books I'm looking to acquire", "Currently considering " + considering.length + " books.", considering[0][2], "These are books I've either good things about or thing might be interesting. If you've heard anything about any of these books feel free to let me know if you'd recommend or advise against anything you see on this list here. If you want to see why I'm considering these books feel free to click through", wrapBooksToProjects(considering)),
    new Project("The Graveyard (2019)", "Books I tried reading but couldn't bring myself to finish.", didntFinish2019[0][2], "These are books I thought would be interesting but somewhere along the way found that it wasn't for me. If you want to poke through and see what I originally was looking to read the book for and why it didn't work for me feel free to take a peak around.", wrapBooksToProjects(didntFinish2019)),
    new Project("Books from 2018", "I read " + read2018.length + " books in 2018!", read2018[0][2], "If you want to see what I ended up getting through in 2018 here's the place to look. Unfortunately, because I didn't get around to making this site until late 2019 its unlikely that I'll ever get back to update these books with the type of information you see for the newer stuff.. Sorry about that, but hey, there is always a chance I'll get to these one day or another.", wrapBooksToProjects(read2018)),
]

function getBooksScrollBar() {
    return booksScroll;
}