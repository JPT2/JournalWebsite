// Mewsfeed might just be a project that contains a changing list of modified projects?
// Actually think it might be a container, like a project (but maybe not collapsible and no header image?)
    // Although I could see the apeal of having a header image that cycles as you scroll.. or even like a featured thing...
    
// seems like I'll take in a list of projects (where do I get data about their updates?)
// Instead could make it just be a list of events, and the events encapsulate all that nonsense...
    // I like that idea, separation of concerns and all that :D
class Newsfeed {
    constructor(news, cutoffDate) {
        // Maybe should just be initialized with a cutoff date and then request the events from a server or something
        this.news = news;
        this.domElement = this.create();
        // Benefit of this approach is don't need to go to actual projects to see what recent updates actually are
    }

    create() {
        let newsfeed = document.createElement("div");
        newsfeed.classList.add("newsfeed");

        // TODO - probably add menu options for pulling new things or sorting or searching?

        return newsfeed;
    }

    populate() {
        console.log("Populating newsfeed!");
        for (let i = 0; i < this.news.length; i++) {
            this.news[i].render(this.domElement);
            // this.domElement.appendChild(this.news.domElement); // TODO decide how to optimzie loading time stuff
        }
    }

    render(attachPoint) {
        if (attachPoint) {
            attachPoint.appendChild(this.domElement);
        } else {
            console.log("No attach point for newsfeed!");
        }
    }
}

// Not sure if this should be separated from the project/class?
    // Can either link to the related content or populate it there (but if populate there would never really need to visit the project...)
        // Maybe instead do a thing where can see the new post but also go to project if you want to see everything
        // Question really is what is the point of the newsfeed? Well its to communicate with people what new stuff is going on.
            // If someone has visiting before they probably don't want to see the entire project, if its a first time they probably do
class Events {
    constructor(project, date) {
        // Somehow need to wrap a project and its events to be displayed properly
        // Pull all notes from project that are within certain date.
        this.project = project;
        this.date = date;
    }

    create() {
        return this.project.domElement;
    }
}

class News {
    // What could a news update consist of? Images, links, text.
        // Initial version should just be text with links
        // Would most likely be passed in a short text that just need to render (so like add the embdeded html);
    constructor(note) {
        // Other option is to just have explicit updates like "new post in x project..."
        // Guess I can just build out both
        // Benefit of this approach is that its straightforward and familiar, although its not as "interesting"
        // this.status = status; // Need to decide at some point if there will be some type of crazy encoding I'll do
        this.note = note;
        this.domElement = this.create();
    }

    create() {
        let newsPost = document.createElement("div");
        newsPost.classList.add("news");

        let content = document.createElement("div");
        content.classList.add("content");
        content.innerHTML = this.note.getDate() + "| " + this.note.getContent();
        newsPost.appendChild(content);
        return newsPost;
    }

    render(attachPoint) {
        if (attachPoint) {
            attachPoint.appendChild(this.domElement);
        } else {
            console.log("No attach point given for news: " + this.status);
        }
    }
}

/*
Sample newsfeed date
------------------------
New project started
New post
Book finished
New show started
Post changed
Project finished


Future
---------
Feedback needed
Testing open
Milestone complete

*/

/*

*/